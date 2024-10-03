import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../schemas/user.schema'
import { UserService } from '../user'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.valitateUser(username, password)
    if (!user) throw new HttpException('User not found', 404)
    return user
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
