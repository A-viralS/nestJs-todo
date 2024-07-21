import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorator/user-email.decorator';
import { log } from 'console';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'to register with email', summary: 'Create a new todo'})
  @Post()
  create(@Body() createTodoDto: CreateTodoDto,@UserEmail()
  userEmail:string) {
    return this.todoService.create(createTodoDto,userEmail);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'get tasks', summary: 'get all task'})
  @Get()
  findAll(
    @UserEmail()
    userEmail:string
  ) 
  {
    console.log(UserEmail);
    return this.todoService.findAll(userEmail);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'get specific user task', summary: 'get specific task'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'update task', summary: 'update task'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
@ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'delete task', summary: 'delete task'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
