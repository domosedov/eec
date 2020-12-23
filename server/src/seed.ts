import { User } from './entity/User'
import { Role } from './resolvers/enums/Role.enum'
import { hash } from 'bcryptjs'

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
    role: Role.TUTOR,
    isConfirmed: true
  }).save()

  await User.create({
    login: 'Vlad',
    email: 'vlad.streams@gmail.com',
    password: await hash('2001', 10),
    isConfirmed: true
  }).save()
}

export default up
