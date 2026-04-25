// notes: yes i did use chatgpt to make this
import { err, ok, okAsync, ResultAsync } from 'neverthrow'
// ❌ remove: import puppeteer from 'puppeteer-core'

import config, { aws as AwsConfig } from '../config/config'
import { createLoggerWithLabel } from '../config/logger'
import {
  PdfGenerationLambdaFailureError,
  PdfGenerationLambdaInvocationError,
  PdfGenerationLambdaJsonParseError,
} from '../modules/core/core.errors'
import {
  startStopwatch,
  submitPdfGenerationLatencyMetric,
} from '../modules/datadog/datadog.utils'

const logger = createLoggerWithLabel(module)

const STUB_PDF_BASE64 =
  'JVBERi0xLjQKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nPj4KZW5kb2JqCnhyZWYKMCAyCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxMCAwMDAwMCBuIAp0cmFpbGVyCjw8IC9Sb290IDEgMCBSID4+CnN0YXJ0eHJlZgoxMAolJUVPRgo='

// ---- Local path (stub) ----
const generatePdfFromHtmlLocally = async (summaryHtml: string): Promise<Buffer> => {
  logger.info({
    message: 'Successfully generated pdf from html using local (stub)',
    meta: { action: 'generatePdfFromHtmlLocally' },
  })
  return Buffer.from(STUB_PDF_BASE64, 'base64')
}

// ---- Lambda path (stub) ----
const generatePdfFromHtmlLambda = (
  summaryHtml: string,
): ResultAsync<
  Buffer,
  | PdfGenerationLambdaInvocationError
  | PdfGenerationLambdaJsonParseError
  | PdfGenerationLambdaFailureError
> => {
  const logMeta = { action: 'generatePdfFromHtmlLambda' }

  logger.info({ message: 'Invoking pdf generator lambda (stub)', meta: logMeta })

  const pdfBuffer = Buffer.from(STUB_PDF_BASE64, 'base64')
  return okAsync(pdfBuffer).map((buf) => {
    logger.info({
      message: 'Successfully retrieved pdf response from pdf generator lambda (stub)',
      meta: logMeta,
    })
    return buf
  })
}

/**
 * Utility function to generate a PDF from HTML.
 * Used to send autoreply emails, and to generate payment receipts
 * @param summaryHtml HTML to generate PDF from
 * @returns PDF Buffer
 */
export const generatePdfFromHtml = async (
  summaryHtml: string,
  isUseLambdaOutput: boolean,
): Promise<Buffer> => {
  const logMeta = { action: 'generatePdfFromHtml', isUseLambdaOutput }

  logger.info({ message: 'Generating pdf from html started', meta: logMeta })

  const localStopwatch = startStopwatch()
  const localResult = generatePdfFromHtmlLocally(summaryHtml).then((result) => {
    const latencyMs = localStopwatch.stop()
    logger.info({
      message: 'Successfully generated pdf from html using local (stub)',
      meta: { ...logMeta, latencyMs },
    })
    submitPdfGenerationLatencyMetric({ latencyMs, isLocal: true })
    return result
  })

  const isPdfGenerationLambdaConfigured = !!AwsConfig.pdfGeneratorLambdaFunctionName
  if (!isPdfGenerationLambdaConfigured) {
    logger.info({
      message:
        'Pdf generation lambda is not configured - using result from local pdf generation (stub)',
      meta: logMeta,
    })
    return localResult
  }

  const lambdaStopwatch = startStopwatch()
  const lambdaResultAsync = generatePdfFromHtmlLambda(summaryHtml).map((result) => {
    const latencyMs = lambdaStopwatch.stop()
    logger.info({
      message: 'Successfully generated pdf from html using lambda (stub)',
      meta: { ...logMeta, latencyMs },
    })
    submitPdfGenerationLatencyMetric({ latencyMs, isLocal: false })
    return result
  })

  if (isUseLambdaOutput) {
    const lambdaResult = await lambdaResultAsync
    if (lambdaResult.isErr()) {
      logger.error({
        message: 'Error generating pdf from html using lambda (stub)',
        meta: logMeta,
        error: lambdaResult.error,
      })
      throw lambdaResult.error
    }
    logger.info({
      message:
        'Successfully generated pdf from html - using result from lambda pdf generation (stub)',
      meta: logMeta,
    })
    return lambdaResult.value
  }

  logger.info({
    message:
      'Successfully generated pdf from html - using result from local pdf generation (stub)',
    meta: logMeta,
  })
  return await localResult
}

export const _generatePdfFromHtmlLocallyForTest = generatePdfFromHtmlLocally
export const _generatePdfFromHtmlLambdaForTest = generatePdfFromHtmlLambda
