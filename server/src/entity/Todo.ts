import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import {ObjectType, Field, ID, Int, Root, registerEnumType} from "type-graphql";
import { User } from "./User";

export enum Role {
  GUEST = "guest",
  ADMIN = "admin",
  TUTOR = "tutor"
}

registerEnumType(Role, {
  name: "Role",
  description: "user Role type"
})


@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Role)
  @Column({
    type: "enum",
    enum: Role,
    default: Role.GUEST
  })
  role: Role

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    type: "text",
    default: "",
  })
  description: string;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  @Field(() => User, {nullable: true})
  @ManyToOne(() => User, user => user.todos)
  user: User

  @Field(() => Int)
  userId(@Root() parent: Todo): number {
    return parent.user.id;
  }
}
