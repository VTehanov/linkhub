import * as yup from 'yup'

import {
  INVALID_EMAIL,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  REQUIRED_EMAIL,
  REQUIRED_PASSWORD
} from './errorMessages'
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from '../../../constants/dataConstraints'

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required(REQUIRED_EMAIL)
    .email(INVALID_EMAIL)
    .min(EMAIL_MIN_LENGTH)
    .max(EMAIL_MAX_LENGTH),
  password: yup
    .string()
    .required(REQUIRED_PASSWORD)
    .min(PASSWORD_MIN_LENGTH, PASSWORD_TOO_SHORT)
    .max(PASSWORD_MAX_LENGTH, PASSWORD_TOO_LONG)
})
