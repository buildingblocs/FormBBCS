import { GrowthBook } from '@growthbook/growthbook-react'

import { GROWTHBOOK_DEV_PROXY } from '~shared/constants/links'
import { GROWTHBOOK_API_HOST_PATH } from '~shared/constants/routes'

export const createGrowthbookInstance = (clientKey: string) => {
  const isDev = import.meta.env.MODE === 'development'

  const apiHost = `${
    isDev ? GROWTHBOOK_DEV_PROXY : "https://formsg-1.fly.dev"
  }${GROWTHBOOK_API_HOST_PATH}`

  return new GrowthBook({
    apiHost,
    clientKey: clientKey,
    // Enable easier debugging during development
    enableDevMode: isDev,
  })
}
