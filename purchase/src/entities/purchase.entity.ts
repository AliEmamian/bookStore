import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusEnum {
  INCOMPLETE = 'incomplete',
  PENDING = 'pending',
  DONE = 'done',
  CANCEL = 'cancel'
}
export interface basket {
  id: string,
  count: number,
  price: number,
  totalPrice: number
}

@Entity('purchase')
export class Purchase {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({
    type: 'varchar', nullable: false,
  })
  public userId: string;

  @Column({
    type: 'varchar', nullable: false,
  })
  public authority: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public status: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public totalPrice: number;

  @Column({
    type: 'varchar', nullable: true,
  })
  public discount: number;

  @Column({
    type: 'varchar', nullable: true,
  })
  public finalPrice: number;

  @Column('text', { nullable: true, unique: false, array: true, name: 'basket' })
  public basket: Array<basket>;
}
