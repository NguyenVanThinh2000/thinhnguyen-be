import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../swagger/user'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'

import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    // check if user already exists
    const existingUser = await this.findByUsername(user.username)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // has the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    })
    return newUser.save()
  }

  async updatePassword(id: string, password: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { password }).exec()
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec()
  }

  async valitateUser(username: string, password: string): Promise<User> {
    const user = await this.findByUsername(username)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) return user
      else throw new HttpException('Invalid password', 400)
    } else throw new HttpException('User not found', 404)
  }

  async saveAccessToken(id: string, accessToken: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { accessToken }).exec()
  }

  async removeAccessToken(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { accessToken: '' }).exec()
  }

  async findAccessToken(username: string): Promise<{ accessToken: string } | null> {
    const user = await this.findByUsername(username)
    if (!user) return null
    return { accessToken: user.accessToken }
  }
}
