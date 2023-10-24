import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Comment } from "./comments.entity";

@Entity("products")
@Unique(["title"])
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice: number;

  @Column("integer")
  amount: number;

  @OneToMany(() => Comment, (comment) => comment.product) // Relação um para muitos com Comment
  comments: Comment[];
}
