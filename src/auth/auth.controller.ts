import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserLoginDto } from '../swagger/user'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Create a guest' })
  @ApiResponse({ status: 201, description: 'Create a guest' })
  async login(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.validateUser(userLogin.username, userLogin.password)
    return this.authService.login(user)
  }
}
