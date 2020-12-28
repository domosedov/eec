import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'
import { Profile } from './Profile'
import { Vacancy } from './Vacancy'

@ObjectType()
@Entity()
export class City {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true
  })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.city)
  profile: Profile;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.city)
  vacancy: Vacancy;
}
