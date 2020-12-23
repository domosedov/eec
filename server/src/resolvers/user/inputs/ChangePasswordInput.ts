import { Field, InputType } from 'type-graphql'
import { PasswordInputMixin } from './PasswordInputMixin'

@InputType()
export class ChangePasswordInput extends PasswordInputMixin(class {}) {
    @Field()
    token: string
}
