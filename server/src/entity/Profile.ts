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
  OneToMany
} from 'typeorm'
import { City } from './City'
import { Gender } from './Enums'
import { Mark } from './Mark'
import { Metro } from './Metro'
import { Place } from './Place'
import { Status } from './Status'
import { Student } from './Student'
import { Subject } from './Subject'
import { User } from './User'
import { Vacancy } from './Vacancy'
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'f'
  })
  isOpen: boolean;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  birthYear: number;

  @Column()
  careerStartYear: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NONE
  })
  gender: Gender;

  @Column({
    default: ''
  })
  area: string;

  @Column({
    default: ''
  })
  description: string;

  @Column()
  education: string;

  @Column()
  hourlyRate: number;

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

  @ManyToMany(() => Subject, {
    eager: true
  })
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @ManyToMany(() => Place)
  @JoinTable()
  places: Place[];

  @ManyToMany(() => Mark)
  @JoinTable()
  marks: Mark[];

  @ManyToOne(() => City, (city) => city.profile, {
    eager: true
  })
  city: City;

  @ManyToOne(() => Metro, (metro) => metro.profile, {
    eager: true
  })
  metro: Metro;

  @ManyToOne(() => Status, (status) => status.profile)
  status: Status;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.selectedProfile)
  selectedByVacancy: Vacancy;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.executorProfile)
  executableVacancy: Vacancy;
}
