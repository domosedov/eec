import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  BaseEntity
} from 'typeorm'
import { City } from './City'
import { Gender } from '../resolvers/enums/Gender.enum'
import { Metro } from './Metro'
import { Place } from './Place'
import { Profile } from './Profile'
import { Student } from './Student'
import { Subject } from './Subject'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Vacancy extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    default: 'f'
  })
  isPublished: boolean;

  @Field()
  @Column({
    default: 'f'
  })
  isCompleted: boolean;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true
  })
  area: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true
  })
  description: string;

  @Field()
  @Column()
  goal: string;

  @Field(() => Int)
  @Column()
  hourlyRate: number;

  @Field(() => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.ALL
  })
  gender: Gender;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => City)
  @ManyToOne(() => City, (city) => city.vacancy, {
    eager: true
  })
  city: City;

  @Field(() => Metro, { nullable: true })
  @ManyToOne(() => Metro, (metro) => metro.vacancy, {
    eager: true,
    nullable: true
  })
  metro: Metro;

  @Field(() => Place)
  @ManyToOne(() => Place, (place) => place.vacancy, {
    eager: true,
    nullable: false
  })
  place: Place;

  @Field(() => Subject)
  @ManyToOne(() => Subject, (subject) => subject.vacancy, {
    eager: true,
    nullable: false
  })
  subject: Subject;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.vacancy, {
    eager: true,
    nullable: false
  })
  student: Student;

  @ManyToOne(() => Profile, (profile) => profile.selectedByVacancy, {
    nullable: true
  })
  selectedProfile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.executableVacancy)
  executorProfile: Profile;

  @ManyToMany(() => Profile)
  @JoinTable()
  candidatesProfiles: Profile[];
}
