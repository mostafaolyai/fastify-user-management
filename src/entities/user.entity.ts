import { Entity, Column, ObjectIdColumn, ObjectId, Index } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  @Index()
  email: string;

  @Column({ type: Number, nullable: false })
  @Index()
  age: number;
}
