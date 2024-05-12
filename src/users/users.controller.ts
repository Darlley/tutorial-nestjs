import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDtop } from './dtos/updateUserInput.dto';
import { UsersService } from './users.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'id', type: Number, required: false })
  @ApiResponse({ type: CreateUserInputDTO, isArray: true, status: 200 })
  findAll(@Query('id', new DefaultValuePipe(0), new ParseIntPipe()) id = 0) {
    return this.usersService.findAll(id);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiResponse({ type: CreateUserInputDTO, status: 200 })
  create(@Body() body: CreateUserInputDTO) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserInputDtop,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
