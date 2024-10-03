import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../user'
import { JwtPayload } from './jwt-payload.interface'
import { ENVKEYS } from '../config/enum'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ENVKEYS.JWT_SECRET),
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload
    return this.userService.findByUsername(username)
  }
}
