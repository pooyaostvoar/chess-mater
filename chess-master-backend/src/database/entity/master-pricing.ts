import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("master_pricing")
export class MasterPricing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pricing, { 
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "masterId" })
  master: User;

  @Column("integer", { unique: true })
  masterId: number;

  @Column("integer", { nullable: true })
  price5min: number | null;

  @Column("integer", { nullable: true })
  price10min: number | null;

  @Column("integer", { nullable: true })
  price15min: number | null;

  @Column("integer", { nullable: true })
  price30min: number | null;

  @Column("integer", { nullable: true })
  price45min: number | null;

  @Column("integer", { nullable: true })
  price60min: number | null;
}

