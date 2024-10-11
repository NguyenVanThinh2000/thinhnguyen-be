import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { TTaskListResponseDto } from './task.dto'
import { TaskService } from './task.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTaskDto, UpdateTaskDto } from '../swagger/task'

@ApiTags('tasks')
@Controller('/api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('jwt')
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  async findAll(): Promise<TTaskListResponseDto> {
    return this.taskService.findAll()
  }

  @ApiBearerAuth('jwt')
  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'Create a task' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @ApiBearerAuth('jwt')
  @Patch('/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Update a task' })
  async update(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.taskService.update(updateTaskDto, id)
  }
}
