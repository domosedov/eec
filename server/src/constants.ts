import { join } from 'path'

export const __prod__ = process.env.NODE_ENV === 'production'
export const COOKIE_NAME = 'qid'
export const REDIS_PREFIX_CONFIRM_USER = 'user-confirmation:'
export const REDIS_PREFIX_FORGOT_PASSWORD = 'forgot-password:'
export const ROOT_DIR = join(process.cwd())
export const PUBLIC_DIR = join(ROOT_DIR, 'public')
export const UPLOADS_DIR = join(PUBLIC_DIR, 'uploads')
