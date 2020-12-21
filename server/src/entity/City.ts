import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile";
import { Vacancy } from "./Vacancy";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.city)
  profile: Profile;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.city)
  vacancy: Vacancy;
}
