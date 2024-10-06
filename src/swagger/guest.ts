import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateGuestDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  nameInInvitation: string

  @ApiProperty({ description: 'isAttending' })
  @IsOptional()
  isAttending: boolean | null

  @ApiProperty({ description: 'wishes' })
  @IsOptional()
  wishes: string
}

export class UpdateGuestDto {
  @ApiProperty({ description: 'name' })
  @IsOptional()
  name: string

  @ApiProperty({ description: 'name in invatation' })
  @IsOptional()
  nameInInvatation: string

  @ApiProperty({ description: 'isAttending' })
  @IsOptional()
  isAttending: boolean | null

  @ApiProperty({ description: 'wishes' })
  @IsOptional()
  wishes: string
}
