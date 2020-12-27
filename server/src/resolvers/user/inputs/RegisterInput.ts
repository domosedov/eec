import { Field, InputType } from 'type-graphql'
import { IsAlphanumeric, IsEmail, Length } from 'class-validator'
import { IsEmailAlreadyExist } from '../../../validators/isEmailAlreadyExist'
import { PasswordInputMixin } from './PasswordInputMixin'
import { IsLoginAlreadyExist } from '../../../validators/isLoginAlreadyExist'

// TODO Добавить сообщения вывода ошибок
@InputType()
export class RegisterInput extends PasswordInputMixin(class {}) {
  @Field()
  @Length(1, 255)
  @IsAlphanumeric()
  @IsLoginAlreadyExist({
    message: 'Данный логин уже занят.'
  })
  login: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'Этот email уже используется.'
  })
  email: string;
}
