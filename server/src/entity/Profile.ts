import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { City } from './City'
import { Gender } from '../resolvers/enums/Gender.enum'
import { Mark } from './Mark'
import { Metro } from './Metro'
import { Place } from './Place'
import { Status } from './Status'
import { Student } from './Student'
import { Subject } from './Subject'
import { User } from './User'
import { Vacancy } from './Vacancy'

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    default: 'f'
  })
  isPublished: boolean;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  middleName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({
    unique: true
  })
  email: string;

  @Field(() => Int)
  @Column()
  birthYear: number;

  @Field(() => Int)
  @Column()
  careerStartYear: number;

  @Field(() => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NONE
  })
  gender: Gender;

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
  education: string;

  @Field(() => Int)
  @Column()
  hourlyRate: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn()
  user: User;

  @Field(() => [Subject])
  @ManyToMany(() => Subject, {
    eager: true,
    nullable: false
  })
  @JoinTable()
  subjects: Subject[];

  @Field(() => [Student])
  @ManyToMany(() => Student, {
    eager: true,
    nullable: false
  })
  @JoinTable()
  students: Student[];

  @Field(() => [Place])
  @ManyToMany(() => Place, {
    eager: true,
    nullable: false
  })
  @JoinTable()
  places: Place[];

  @Field(() => [Mark])
  @ManyToMany(() => Mark, {
    eager: true,
    nullable: true
  })
  @JoinTable()
  marks: Mark[];

  @Field(() => City)
  @ManyToOne(() => City, (city) => city.profile, {
    eager: true,
    nullable: false
  })
  city: City;

  @Field(() => Metro, { nullable: true })
  @ManyToOne(() => Metro, (metro) => metro.profile, {
    eager: true,
    nullable: true
  })
  metro: Metro;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.profile, {
    eager: true,
    nullable: false
  })
  status: Status;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.selectedProfile, {
    eager: true,
    nullable: true
  })
  selectedByVacancy: Vacancy;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.executorProfile, {
    eager: true,
    nullable: true
  })
  executableVacancy: Vacancy;
}
