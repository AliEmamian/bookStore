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


@Entity('book')
export class Book {
  @ObjectIdColumn()
  id: string;


  @Column({
    type: 'varchar', nullable: false,
  })
  public name: string;


  @Column({
    type: 'varchar', nullable: true,
  })
  public author: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public genre: string;
  
  @Column({
    type: 'varchar', nullable: true,
  })
  public year: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  public price: string;

}
