import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { GraphQLEmailAddress } from 'graphql-scalars'
import { Role } from '../resolvers/enums/Role.enum'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true
  })
  login: string

  @Field(() => GraphQLEmailAddress)
  @Column('varchar', { unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  registeredAt: Date

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST
  })
  role: Role

  @Field()
  @Column('bool', { default: false })
  isConfirmed: boolean;

  @Field()
  @Column('bool', { default: false })
  isBanned: boolean;
}
