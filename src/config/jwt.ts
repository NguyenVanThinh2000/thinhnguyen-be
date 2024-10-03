import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions } from '@nestjs/jwt'
import { ENVKEYS } from './enum'

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>(ENVKEYS.JWT_SECRET),
    signOptions: { expiresIn: '1d' },
  }),
}
