import { Field, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { IsEmailAlreadyExist } from '../../../validators/isEmailAlreadyExist'
import { PasswordInputMixin } from './PasswordInputMixin'

@InputType()
export class RegisterInput extends PasswordInputMixin(class {}) {
    @Field()
    @Length(1, 255)
    @IsEmailAlreadyExist({
      message: 'Данный логин уже занят.'
    })
    login: string

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({
      message: 'Этот email уже используется.'
    })
    email: string
}
