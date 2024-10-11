import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../schemas/user.schema'
import { UserService } from '../user'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    return await this.userService.valitateUser(username, password)
  }

  async login(user: User) {
    const payload = { username: user.username }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
