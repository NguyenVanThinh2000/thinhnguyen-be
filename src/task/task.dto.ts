import { Task } from '../schemas'
import { ETaskStatus } from './enum'

export type TTaskDto = {
  id: string
  title: string
  description: string
  status: TTaskStatus
}

export type TTaskStatus = keyof typeof ETaskStatus

export type TTaskListResponseDto = {
  [key in TTaskStatus]: Task[]
}

export type TCreateTaskDto = {
  title: string
  description: string
  status: TTaskStatus
}

export type TUpdateTaskDto = {
  title?: string
  description?: string
  status?: TTaskStatus
}
