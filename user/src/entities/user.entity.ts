import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserTypeEnum {
  PREMIUM = 'premium',
  NORMAL = 'normal'
}

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: string;

  @Column({
    type: 'varchar', nullable: false,
  })
  public phone: string;

  @Column({
    type: 'varchar', nullable: false,
  })
  public password: string;

  @Column({
    type: 'varchar', nullable: true, default: UserTypeEnum.NORMAL
  })
  public type: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public name: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public address: string;

  @Column('text', { nullable: true, unique: false, array: true, name: 'favorites' })
  public favorites: Array<string>;
}
