import { generateUUID } from '../utils'

export const taskList = [
  {
    id: generateUUID(),
    title: 'Task 1',
    description: 'Description 1',
    status: 'todo',
  },
  {
    id: generateUUID(),
    title: 'Task 1.2',
    description: 'Description 1.2',
    status: 'todo',
  },
  {
    id: generateUUID(),
    title: 'Task 2',
    description: 'Description 2',
    status: 'inProgress',
  },
  {
    id: generateUUID(),
    title: 'Task 3',
    description: 'Description 3',
    status: 'inReview',
  },
  {
    id: generateUUID(),
    title: 'Task 3.1',
    description: 'Description 3.1',
    status: 'inReview',
  },
  {
    id: generateUUID(),
    title: 'Task 4',
    description: 'Description 4',
    status: 'done',
  },
]
