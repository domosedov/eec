import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Profile } from './Profile'

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true
  })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.status)
  profile: Profile;
}
