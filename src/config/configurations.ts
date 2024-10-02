import { ConfigFactory } from '@nestjs/config'

export const configurations: ConfigFactory = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
})
