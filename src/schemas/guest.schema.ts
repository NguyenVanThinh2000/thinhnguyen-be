import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { THost } from 'src/guest/guest.dto'

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Guest extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  nameInInvitation: string

  @Prop({ default: null })
  isAttending: boolean | null

  @Prop()
  wishes: string

  @Prop({ required: true })
  host: THost

  @Prop({ default: 'bạn' })
  role: string

  @Prop({ default: false })
  isSent: string

  @Prop({ default: null })
  gift: string | null
}

export type GuestDocument = HydratedDocument<Guest>
const GuestSchema = SchemaFactory.createForClass(Guest)

GuestSchema.virtual('id').get(function () {
  return this._id
})

GuestSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
    return {
      ...ret,
      isSent: ret.isSent === 'true' ? true : false,
    }
  },
})

export { GuestSchema }
