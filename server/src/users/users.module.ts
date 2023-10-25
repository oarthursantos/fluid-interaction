import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
// import { UsersService } from './in-memory-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ContactDetailsEntity } from './entities/contact-details.entity';
import { AddressEntity } from './entities/address.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ContactDetailsEntity, AddressEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
