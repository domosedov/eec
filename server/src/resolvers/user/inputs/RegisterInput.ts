import { Field, InputType } from 'type-graphql'
import { IsAlphanumeric, IsEmail, Length } from 'class-validator'
import { IsEmailAlreadyExist } from '../../../validators/isEmailAlreadyExist'
import { PasswordInputMixin } from './PasswordInputMixin'
import { IsLoginAlreadyExist } from '../../../validators/isLoginAlreadyExist'
@InputType()
export class RegisterInput extends PasswordInputMixin(class {}) {
  @Field()
  @Length(1, 255, {
    message: 'Логин не может быть пустым.'
  })
  @IsAlphanumeric('en-US', {
    message: 'Логин может содержать только латинские символы и цифры'
  })
  @IsLoginAlreadyExist({
    message: 'Данный логин уже занят.'
  })
  login: string;

  @Field()
  @IsEmail(
    {},
    {
      message: 'Невалидный Email'
    }
  )
  @IsEmailAlreadyExist({
    message: 'Этот email уже используется.'
  })
  email: string;
}
