import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Vacancy } from './Vacancy'
  @ObjectType()
  @Entity()
export class Place extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({
      unique: true
    })
    name: string;

    @OneToMany(() => Vacancy, (vacancy) => vacancy.place)
    vacancy: Vacancy;
}
