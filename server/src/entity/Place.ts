import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Vacancy } from "./Vacancy";

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.place)
  vacancy: Vacancy;
}
