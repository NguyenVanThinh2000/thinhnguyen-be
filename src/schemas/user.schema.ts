import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User extends Document {
  @Prop({ required: true })
  username: string

  @Prop()
  name: string

  @Prop({ required: true })
  password: string

  @Prop({ default: '' })
  accessToken: string
}

export type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('id').get(function () {
  return this._id
})

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
    delete ret.password
    delete ret.accessToken
  },
})

export { UserSchema }
