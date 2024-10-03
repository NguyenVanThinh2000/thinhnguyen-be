import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Guest, GuestSchema } from '../schemas'
import { GuestController } from './guest.controller'
import { GuestService } from './guest.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guest.name,
        schema: GuestSchema,
      },
    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestModule {}
