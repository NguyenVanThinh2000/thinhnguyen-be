import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../swagger/user'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'Create a user' })
  async create(@Body() guest: CreateUserDto) {
    if (!guest.username || !guest.password || !guest.name) {
      throw new Error('Missing required fields')
    }
    const newUser = await this.userService.create(guest)
    return {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
    }
  }
}
