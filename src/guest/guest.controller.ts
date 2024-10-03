import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GuestService } from './guest.service'
import { Guest } from '../schemas'
import { CreateGuestDto, UpdateGuestDto } from '../swagger/guest'

@ApiTags('guests')
@Controller('/api/guests')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all guest' })
  @ApiResponse({ status: 200, description: 'Return all guest' })
  async findAll(): Promise<Guest[]> {
    return this.guestService.findAll()
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a guest' })
  @ApiResponse({ status: 201, description: 'Create a guest' })
  async create(@Body() guest: CreateGuestDto) {
    return this.guestService.create(guest)
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a guest' })
  @ApiResponse({ status: 200, description: 'Update a guest' })
  async update(@Param('id') id: string, @Body() guest: UpdateGuestDto) {
    return this.guestService.update(id, guest)
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a guest' })
  @ApiResponse({ status: 200, description: 'Delete a guest' })
  async delete(@Param('id') id: string) {
    return this.guestService.delete(id)
  }
}
