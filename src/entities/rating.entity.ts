import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Product } from "./products.entity";
  import { User } from "./user.entity";
  
  @Entity("rating")
  export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("integer")
    rating: number;
  
    @Column({ length: 158 })
    userId: string;
  
    @Column({ length: 158 })
    productId: string;
  
    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "userId" })
    user: User;
  
    @ManyToOne(() => Product, (product) => product.comments)
    @JoinColumn({ name: "productId" })
    product: Product;
  }
  