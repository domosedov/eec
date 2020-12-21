import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vacancy } from "./Vacancy";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.student)
  vacancy: Vacancy;
}
