import { User } from './entity/User'
import { Role } from './resolvers/enums/Role.enum'
import { hash } from 'bcryptjs'
import { City } from './entity/City'
import { getConnection } from 'typeorm'
import { Metro } from './entity/Metro'
import { Place } from './entity/Place'
import { Subject } from './entity/Subject'
import { Student } from './entity/Student'
import { Status } from './entity/Status'
import { Mark } from './entity/Mark'
import { Profile } from './entity/Profile'
import { Gender } from './resolvers/enums/Gender.enum'
import { Todo } from './entity/Todo'
import { Vacancy } from './entity/Vacancy'

async function up () {
  await User.create({
    login: 'domosed',
    email: 'domosedov.dev@gmail.com',
    password: await hash('2001', 10),
    role: Role.ADMIN,
    isConfirmed: true
  }).save()

  await User.create({
    login: 'Sonya',
    email: 'tamartsewa@yandex.ru',
    password: await hash('2001', 10),
    role: Role.GUEST,
    isConfirmed: true
  }).save()

  await User.create({
    login: 'Vlad',
    email: 'vlad.streams@gmail.com',
    password: await hash('2001', 10),
    isConfirmed: true
  }).save()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(City)
    .values([
      { name: 'Москва' },
      { name: 'Химки' },
      { name: 'Куркино' },
      { name: 'Реутов' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Metro)
    .values([
      { name: 'Планерная' },
      { name: 'Сходненская' },
      { name: 'Спартак' },
      { name: 'Полежаевская' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Place)
    .values([
      { name: 'У ученика' },
      { name: 'У репетитора' },
      { name: 'Дистанционно' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Subject)
    .values([
      { name: 'Руссий язык' },
      { name: 'История' },
      { name: 'Математика' },
      { name: 'Химия' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Subject)
    .values([
      { name: 'Руссий язык' },
      { name: 'История' },
      { name: 'Математика' },
      { name: 'Химия' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Student)
    .values([
      { name: 'Дошкольник' },
      { name: '1-4 класс' },
      { name: '5-9 класс' },
      { name: '10-11 класс' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Mark)
    .values([
      { name: 'Рекомендован' },
      { name: 'Аккредитован' }
    ])
    .execute()

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Status)
    .values([
      { name: 'Студент' },
      { name: 'Аспирант' },
      { name: 'Школьный преподаватель' },
      { name: 'Преподаватель вуза' }
    ])
    .execute()

  await Profile.create({
    firstName: 'Иван',
    middleName: 'Петрович',
    lastName: 'Алекссев',
    phone: '+79990000000',
    email: 'pro@file.com',
    city: {
      id: 1
    },
    metro: {
      id: 3
    },
    status: {
      id: 2
    },
    birthYear: 1992,
    careerStartYear: 2009,
    education: 'Образование',
    gender: Gender.MEN,
    hourlyRate: 1000,
    user: {
      id: 1
    },
    places: [{ id: 1 }, { id: 2 }],
    subjects: [
      {
        id: 2
      },
      { id: 4 }
    ],
    students: [
      { id: 4 }
    ]
  }).save()

  await Todo.create({
    title: 'Todo 1',
    description: 'None 1',
    isCompleted: true
  }).save()

  await Todo.create({
    title: 'Todo 2',
    description: 'Some description'
  }).save()

  await Vacancy.create({
    firstName: 'Alex',
    lastName: 'Hellix',
    city: {
      id: 1
    },
    email: 'asdasd@dsa.as',
    phone: '12124124',
    hourlyRate: 121313,
    goal: 'sadasdasd',
    place: {
      id: 2
    },
    subject: {
      id: 3
    },
    student: {
      id: 1
    },
    selectedProfile: {
      id: 1
    }
  }).save()
}

export default up
