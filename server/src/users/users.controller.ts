import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { UsersService } from './in-memory-users.service';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async index(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Post('create')
  @ApiBody({ type: UserDTO })
  async create(@Body() userDTO: UserDTO): Promise<UserEntity | void> {
    return await this.usersService.create(userDTO);
  }
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() userUpdate: UpdateUserDTO,
  ): Promise<void> {
    console.log(userUpdate)
    return await this.usersService.update(id, userUpdate);
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id);
  }
}
