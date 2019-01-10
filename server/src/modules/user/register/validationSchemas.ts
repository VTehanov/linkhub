import * as yup from 'yup'

import { INVALID_EMAIL } from './errorMessages'
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH
} from '../../../constants/dataConstraints'

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email(INVALID_EMAIL)
    .min(EMAIL_MIN_LENGTH)
    .max(EMAIL_MAX_LENGTH)
})
