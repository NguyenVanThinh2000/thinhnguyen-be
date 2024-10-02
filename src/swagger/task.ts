import { TTaskStatus } from '../task/task.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTaskDto {
  @ApiProperty({ description: 'title' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'description' })
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: 'status' })
  @IsNotEmpty()
  status: TTaskStatus
}

export class UpdateTaskDto {
  @ApiProperty({ description: 'title' })
  @IsOptional()
  title: string

  @ApiProperty({ description: 'description' })
  @IsOptional()
  description: string

  @ApiProperty({ description: 'status' })
  @IsOptional()
  status: TTaskStatus
}
