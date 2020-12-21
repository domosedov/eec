import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum Role {
  ADMIN = "admin",
  TUTOR = "tutor",
  GUEST = "guest",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  login: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @Column({
    default: "f",
  })
  isBanned: boolean;

  @Column({
    default: "f"
  })
  isConfirmed: boolean;

  @CreateDateColumn()
  registeredAt: Date;  
}
