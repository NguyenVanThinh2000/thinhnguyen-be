import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { TLocation } from 'src/guest/guest.dto'

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

  @ApiProperty({ description: 'saigon | undefined' })
  @IsNotEmpty()
  location: TLocation
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

  @ApiProperty({ description: 'isSent' })
  @IsOptional()
  isSent: boolean

  @ApiProperty({ description: 'gift' })
  @IsOptional()
  gift: string | null

  @ApiProperty({ description: 'location of the party' })
  @IsOptional()
  location: TLocation
}
