import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { AddressEntity } from './users/entities/address.entity';
import { ContactDetailsEntity } from './users/entities/contact-details.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      username: "postgres",
      password: "docker",
      database: "fluent_interaction",
      entities: [UserEntity, AddressEntity, ContactDetailsEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
