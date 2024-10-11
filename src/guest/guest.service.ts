import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Guest } from '../schemas'
import { CreateGuestDto, UpdateGuestDto } from '../swagger/guest'
import { TGuestsQueryParams } from './guest.dto'

@Injectable()
export class GuestService {
  constructor(@InjectModel(Guest.name) private guestModel: Model<Guest>) {}

  create(task: CreateGuestDto): Promise<Guest> {
    const createdGuest = new this.guestModel(task)
    return createdGuest.save()
  }

  findAll(queryParams: TGuestsQueryParams): Promise<Guest[]> {
    const { keyword, host } = queryParams
    const query = {}
    if (host) {
      query['host'] = { $in: host }
    }
    if (keyword) {
      query['$or'] = [
        { name: { $regex: keyword, $options: 'i' } },
        { nameInInvitation: { $regex: keyword, $options: 'i' } },
        { wishes: { $regex: keyword, $options: 'i' } },
      ]
    }
    return this.guestModel.find(query).exec()
  }

  findOne(id: string): Promise<Guest> {
    return this.guestModel.findById(id).exec()
  }

  update(id: string, task: UpdateGuestDto): Promise<Guest> {
    return this.guestModel.findByIdAndUpdate(id, task, { new: true }).exec()
  }

  delete(id: string): Promise<Guest> {
    return this.guestModel.findByIdAndDelete(id).exec()
  }
}
