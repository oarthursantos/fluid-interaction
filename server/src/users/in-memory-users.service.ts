// import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
// import { UserDTO } from './dtos/user.dto';

// @Injectable()
// export class InMemoryUsersService {
//   private users: User[] = [];

//   create(userDTO: UserDTO): User {
//     this.users.push(userDTO);
//     return userDTO;
//   }
//   findAll(): User[] {
//     return this.users;
//   }
//   update(userUpdate: User): User {
//     const user = this.findByEmail(userUpdate.email);
//     if (!user) {
//       throw new NotFoundException({
//         statusCode: 404,
//         message: `${userUpdate.email} not found`,
//       });
//     }
//     return userUpdate;
//   }
//   delete(id: string): User[] {
//     const user = this.findById(id);
//     if (!user) {
//       throw new NotFoundException({
//         statusCode: 404,
//         message: `${user.id} not found`,
//       });
//     }
//     const userIndex = this.users.indexOf(user);
//     if (userIndex !== -1) {
//       this.users.splice(userIndex, 1);
//       return this.users;
//     }
//   }

//   findByEmail(email: string): User {
//     return this.users.find((user) => user.email == email);
//   }
//   findById(id: string): User {
//     return this.users.find((user) => user.id == id);
//   }
// }
