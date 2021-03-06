import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm'
import { Vacancy } from './Vacancy'

@ObjectType()
@Entity()
export class Student extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.student)
  vacancy: Vacancy;
}
