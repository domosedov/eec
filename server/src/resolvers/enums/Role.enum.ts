import { registerEnumType } from 'type-graphql'

export enum Role {
    GUEST = 'guest',
    ADMIN = 'admin',
    TUTOR = 'tutor'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'user Role type'
})
