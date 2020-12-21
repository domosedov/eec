import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vacancy } from "./Vacancy";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.subject)
  vacancy: Vacancy;
}
