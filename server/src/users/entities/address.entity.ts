import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity("addresses")
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  cep: string;
  @Column()
  street: string;
  @Column()
  number: number;
  @Column()
  neighborhood: string;
  @Column()
  complement: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  referencePoint: string;

  @ManyToMany(() => UserEntity, user => user.addresses, {onDelete: "CASCADE"})
  users: UserEntity[]

}
