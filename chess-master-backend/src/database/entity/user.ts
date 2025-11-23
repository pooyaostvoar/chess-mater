import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleSlot } from "./schedule-slots";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  username: string;

  @Column("boolean", { default: false })
  isMaster: boolean;

  @Column("text", { nullable: true })
  title: string | null;

  @Column("integer", { nullable: true })
  rating: number | null;

  @Column("text", { nullable: true })
  bio: string | null;

  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column("text", { nullable: true })
  chesscomUrl: string | null;

  @Column("text", { nullable: true })
  lichessUrl: string | null;

  @Column("bytea")
  password: Buffer;

  @Column("bytea")
  salt: Buffer;

  @OneToMany(() => ScheduleSlot, (slot) => slot.master)
  schedule: ScheduleSlot[];
}
