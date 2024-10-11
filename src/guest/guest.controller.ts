import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GuestService } from './guest.service'
import { Guest } from '../schemas'
import { CreateGuestDto, UpdateGuestDto } from '../swagger/guest'
import { TGuestsQueryParams } from './guest.dto'

@ApiTags('guests')
@Controller('/api/guests')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @ApiBearerAuth('jwt')
  @Get()
  @ApiOperation({ summary: 'Get all guest' })
  @ApiResponse({ status: 200, description: 'Return all guest' })
  async findAll(@Query() queryParams: TGuestsQueryParams): Promise<Guest[]> {
    return this.guestService.findAll(queryParams)
  }

  @ApiBearerAuth('jwt')
  @Get('/:id')
  @ApiOperation({ summary: 'Get a guest' })
  @ApiResponse({ status: 200, description: 'Return a guest' })
  async findOne(@Param('id') id: string): Promise<Guest> {
    return this.guestService.findOne(id)
  }

  @ApiBearerAuth('jwt')
  @Post()
  @ApiOperation({ summary: 'Create a guest' })
  @ApiResponse({ status: 201, description: 'Create a guest' })
  async create(@Body() guest: CreateGuestDto) {
    return this.guestService.create(guest)
  }

  @ApiBearerAuth('jwt')
  @Patch('/:id')
  @ApiOperation({ summary: 'Update a guest' })
  @ApiResponse({ status: 200, description: 'Update a guest' })
  async update(@Param('id') id: string, @Body() guest: UpdateGuestDto) {
    return this.guestService.update(id, guest)
  }

  @ApiBearerAuth('jwt')
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a guest' })
  @ApiResponse({ status: 200, description: 'Delete a guest' })
  async delete(@Param('id') id: string) {
    return this.guestService.delete(id)
  }
}
