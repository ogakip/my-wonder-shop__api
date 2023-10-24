import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Comment } from "./comments.entity";

@Entity("users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  firstName: string;

  @Column({ length: 158 })
  lastName: string;

  @Column({ length: 158 })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Comment, (comment) => comment.user) // Relação um para muitos com Comment
  comments: Comment[];
}
