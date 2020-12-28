import { registerEnumType } from 'type-graphql'

export enum Gender {
  NONE = 'Не указан',
  MEN = 'Мужской',
  WOMEN = 'Женский',
  ANOTHER = 'Другой',
  ALL = 'Любой',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Пол человека'
})
