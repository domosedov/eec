import { InputType, ClassType, Field } from 'type-graphql'
import { MinLength } from 'class-validator'

export const PasswordInputMixin = <T extends ClassType>(BaseClass: T) => {
    @InputType()
  class PasswordInput extends BaseClass {
        @Field()
        @MinLength(1, {
          message: 'Пароль не должен быть пустым.'
        })
        password: string
    }

    return PasswordInput
}
