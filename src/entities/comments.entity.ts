import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./products.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 1000 })
  content: string;

  @Column({ length: 158 })
  userId: string;

  @Column({ length: 158 })
  productId: string;

  @Column("integer")
  rating: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: "productId" })
  product: Product;
}
