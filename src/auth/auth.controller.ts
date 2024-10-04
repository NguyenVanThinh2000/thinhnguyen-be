import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserLoginDto } from '../swagger/user'
import { Response } from 'express'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Create a guest' })
  @ApiResponse({ status: 201, description: 'Create a guest' })
  async login(@Body() userLogin: UserLoginDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(userLogin.username, userLogin.password)
    const { access_token } = await this.authService.login(user)

    // set the JWT in an HttpOnly cookie
    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return user
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, description: 'Logout' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return { message: 'Logout successfully' }
  }
}
