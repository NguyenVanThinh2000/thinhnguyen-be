import { Injectable } from '@nestjs/common'
import { TCreateTaskDto, TTaskListResponseDto, TUpdateTaskDto } from './task.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ETaskStatus } from './enum'
import { Task } from '../schemas'

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  create(task: TCreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(task)
    return createdTask.save()
  }

  async findAll(): Promise<TTaskListResponseDto> {
    const tasks = await this.taskModel.find().exec()
    return {
      todo: tasks.filter((task) => task.status === ETaskStatus.todo),
      inProgress: tasks.filter((task) => task.status === ETaskStatus.inProgress),
      inReview: tasks.filter((task) => task.status === ETaskStatus.inReview),
      done: tasks.filter((task) => task.status === ETaskStatus.done),
    }
  }

  async update(task: TUpdateTaskDto, id: string): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    })
  }
}
