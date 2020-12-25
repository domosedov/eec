import { RegisterResolver } from './Register'
import { ConfirmResolver } from './Confirm'
import { LoginResolver } from './Login'
import { LogoutResolver } from './Logout'
import { ChangePasswordResolver } from './ChangePassword'
import { ForgotPasswordResolver } from './ForgotPassword'

export default [RegisterResolver, ConfirmResolver, LoginResolver, LogoutResolver, ChangePasswordResolver, ForgotPasswordResolver] as const
