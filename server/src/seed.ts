import { User } from './entity/User'
import { Role, Todo } from './entity/Todo'

async function up () {
  await User.create({
    firstName: 'Aleksandr',
    lastName: 'Grigorii',
    email: 'domosedov.dev@gmail.com',
    password: '2001'
  }).save()

  await User.create({
    firstName: 'Sonya',
    lastName: 'Tamartsewa',
    email: 'tamartsewa@yandex.ru',
    password: '2001'
  }).save()

  await User.create({
    firstName: 'Vlad',
    lastName: 'Grigorii',
    email: 'vlad.streams@gmail.com',
    password: '2001'
  }).save()

  await Todo.create({
    title: 'todo 1',
    description: 'desc 1',
    user: {
      id: 1
    },
    role: Role.ADMIN
  }).save()

  await Todo.create({
    title: 'todo 2',
    description: 'desc 1',
    user: {
      id: 1
    }
  }).save()

  await Todo.create({
    title: 'todo 3',
    description: 'desc 1',
    user: {
      id: 2
    }
  }).save()

  await Todo.create({
    title: 'todo 4',
    description: 'desc 1',
    isCompleted: true,
    user: {
      id: 3
    }
  }).save()
}

export default up
