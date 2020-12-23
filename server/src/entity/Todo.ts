import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    type: 'text',
    default: ''
  })
  description: string;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  // @Field(() => User, { nullable: true })
  // @ManyToOne(() => User, user => user.todos)
  // user: User

  // @Field(() => Int)
  // userId (@Root() parent: Todo): number {
  //   return parent.user.id
  // }
}
