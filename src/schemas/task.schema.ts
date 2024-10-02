import { TTaskStatus } from '@/task'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Task extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  status: TTaskStatus
}

export type TaskDocument = HydratedDocument<Task>
const TaskSchema = SchemaFactory.createForClass(Task)

TaskSchema.virtual('id').get(function () {
  return this._id
})

TaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
  },
})

export { TaskSchema }
