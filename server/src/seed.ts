import { User } from './entity/User'
import { Role } from './resolvers/enums/Role.enum'

async function up () {
  await User.create({
    login: 'Aleksandr',
    email: 'domosedov.dev@gmail.com',
    password: '2001',
    role: Role.ADMIN
  }).save()

  await User.create({
    login: 'Sonya',
    email: 'tamartsewa@yandex.ru',
    password: '2001'
  }).save()

  await User.create({
    login: 'Vlad',
    email: 'vlad.streams@gmail.com',
    password: '2001'
  }).save()
}

export default up
