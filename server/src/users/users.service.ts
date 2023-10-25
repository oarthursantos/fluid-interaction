import { Injectable } from '@nestjs/common';
import { Service } from './interfaces/service.interface';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService
  implements Service<UserEntity, UserDTO, UpdateUserDTO>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(item: UserDTO): Promise<UserEntity | void> {
    try {
      const newUser = this.userRepository.create(item);

      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        relations: {
          addresses: true,
          contactDetails: true,
        },
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, item: UpdateUserDTO): Promise<void> {
    try {
      const user = await this.findById(id);
      if (user) {
        await this.userRepository.update({ id }, item);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      await this.userRepository.delete(user.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
