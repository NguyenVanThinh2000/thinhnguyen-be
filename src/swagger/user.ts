import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: 'username' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  password: string
}

export class UserLoginDto {
  @ApiProperty({ description: 'username' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  password: string
}
