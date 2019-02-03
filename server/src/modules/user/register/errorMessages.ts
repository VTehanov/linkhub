import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from '../../../constants/dataConstraints'

export const REQUIRED_EMAIL = 'Please provide an email address!'
export const DUPLICATE_EMAIL = 'Email already in use!'
export const INVALID_EMAIL = 'Please enter a valid email!'

export const REQUIRED_PASSWORD = 'Please enter a password!'
export const PASSWORD_TOO_SHORT = `Password must at least ${PASSWORD_MIN_LENGTH} characters!`
export const PASSWORD_TOO_LONG = `Password must be below ${PASSWORD_MAX_LENGTH} characters!`
