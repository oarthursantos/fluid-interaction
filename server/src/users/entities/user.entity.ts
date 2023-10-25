import {
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ContactDetailsEntity } from './contact-details.entity';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  gender: string;

  @Column({
    unique: true,
  })
  cpf: string;

  // shipping data

  @ManyToMany(() => AddressEntity, {
    cascade: true
  })
  @JoinTable()
  addresses: AddressEntity[];

  // contact data
  @OneToOne(() => ContactDetailsEntity, {
    cascade: true
  })
  @JoinColumn()
  contactDetails: ContactDetailsEntity;

  // account data

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}
