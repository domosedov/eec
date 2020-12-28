import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Profile } from './Profile'
import { Vacancy } from './Vacancy'

@ObjectType()
@Entity()
export class Metro extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true
  })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.metro)
  profile: Profile;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.metro)
  vacancy: Vacancy;
}
