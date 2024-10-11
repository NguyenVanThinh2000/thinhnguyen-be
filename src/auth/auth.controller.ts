import { Body, Controller, HttpException, Patch, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { ChangePasswordDto, UserLoginDto } from '../swagger/user'
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user'
import { ENVKEYS } from 'src/config/enum'
import * as bcrypt from 'bcryptjs'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Create a guest' })
  @ApiResponse({ status: 201, description: 'Create a guest' })
  async login(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.validateUser(userLogin.username, userLogin.password)
    const { access_token } = await this.authService.login(user)
    await this.userService.saveAccessToken(user.id, access_token)
    return { user, access_token }
  }

  @ApiBearerAuth('jwt')
  @Patch('change-password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Change password' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: Request) {
    const jwtAccessToken = req.cookies['jwt']
    const { username } = this.jwtService.verify(jwtAccessToken, {
      secret: this.configService.get(ENVKEYS.JWT_SECRET),
    })

    const user = await this.userService.findByUsername(username)
    if (!user) throw new HttpException('User not found', 404)

    const isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password)
    if (!isMatch) throw new HttpException('Invalid password', 400)

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10)

    return await this.userService.updatePassword(user.id, hashedPassword)
  }

  @ApiBearerAuth('jwt')
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, description: 'Logout' })
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.userService.removeAccessToken(response.locals.user.id)
    return { message: 'Logout successfully' }
  }
}
