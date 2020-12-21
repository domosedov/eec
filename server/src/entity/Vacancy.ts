import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { City } from "./City";
import { Gender } from "./Enums";
import { Metro } from "./Metro";
import { Place } from "./Place";
import { Profile } from "./Profile";
import { Student } from "./Student";
import { Subject } from "./Subject";

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: "f",
  })
  isOpen: boolean;

  @Column({
    default: "f",
  })
  isCompleted: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.ALL,
  })
  gender: Gender;

  @Column({
    default: "",
  })
  area: string;

  @Column({
    default: "",
  })
  description: string;

  @Column()
  goal: string;

  @Column()
  hourlyRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => City, (city) => city.vacancy, {
    nullable: false
  })
  city: City;

  @ManyToOne(() => Metro, (metro) => metro.vacancy)
  metro: Metro;

  @ManyToOne(() => Place, (place) => place.vacancy)
  place: Place;

  @ManyToOne(() => Subject, (subject) => subject.vacancy, {
    nullable: false
  })
  subject: Subject;

  @ManyToOne(() => Student, (student) => student.vacancy, {
    nullable: false
  })
  student: Student;

  @ManyToOne(() => Profile, (profile) => profile.selectedByVacancy)
  selectedProfile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.executableVacancy)
  executorProfile: Profile;

  @ManyToMany(() => Profile)
  @JoinTable()
  candidatesProfiles: Profile[];
}
