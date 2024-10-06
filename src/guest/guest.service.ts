import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Guest } from '../schemas'
import { CreateGuestDto, UpdateGuestDto } from '../swagger/guest'

@Injectable()
export class GuestService {
  constructor(@InjectModel(Guest.name) private guestModel: Model<Guest>) {}

  create(task: CreateGuestDto): Promise<Guest> {
    const createdGuest = new this.guestModel(task)
    return createdGuest.save()
  }

  findAll(): Promise<Guest[]> {
    return this.guestModel.find().exec()
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
