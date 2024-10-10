import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../swagger/user'
import { UserService } from './user.service'
import { Request } from 'express'

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'Create a user' })
  async create(@Body() user: CreateUserDto) {
    if (!user.username || !user.password || !user.name) {
      throw new Error('Missing required fields')
    }
    const newUser = await this.userService.create(user)
    return {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
    }
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get me' })
  @ApiResponse({ status: 200, description: 'Return me' })
  async me(@Req() request: Request) {
    return request.user
  }
}
