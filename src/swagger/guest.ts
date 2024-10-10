import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateGuestDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'name in invitation' })
  @IsNotEmpty()
  nameInInvitation: string

  @ApiProperty({ description: 'isAttend' })
  @IsOptional()
  isAttending: boolean | null

  @ApiProperty({ description: 'wishes' })
  @IsOptional()
  wishes: string

  @ApiProperty({ description: 'host of the party' })
  @IsNotEmpty()
  host: string

  @ApiProperty({ description: 'bạn | thầy | cô | anh | chị' })
  @IsNotEmpty()
  role: string
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

  @ApiProperty({ description: 'host of the party' })
  @IsOptional()
  host: string

  @ApiProperty({ description: 'bạn | thầy | cô | anh | chị' })
  @IsOptional()
  role: string
}
