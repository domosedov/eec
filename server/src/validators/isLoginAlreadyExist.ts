import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { User } from '../entity/User'

@ValidatorConstraint({ async: true })
export class IsLoginAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate (login: string) {
    const user = await User.findOne({ where: { login } })
    return !user
  }
}

export function IsLoginAlreadyExist (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLoginAlreadyExistConstraint
    })
  }
}
