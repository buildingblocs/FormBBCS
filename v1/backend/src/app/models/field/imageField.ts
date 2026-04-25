import { Schema } from 'mongoose'

import { IImageFieldSchema } from '../../../types'

const createImageFieldSchema = () => {
  return new Schema<IImageFieldSchema>({
    url: {
      type: String,
      required: true,
    },
    fileMd5Hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  })
}
export default createImageFieldSchema