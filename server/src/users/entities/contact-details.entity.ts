import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('contact_details')
export class ContactDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  landline: string;

  @Column({
    unique: true,
  })
  mobile: string;

  @OneToOne(() => UserEntity, user => user.contactDetails, {onDelete: "CASCADE"})
  user: UserEntity;
}
