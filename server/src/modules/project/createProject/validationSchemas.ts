import * as yup from 'yup'
import {
  PROJECT_NAME_MIN_LENGTH,
  PROJECT_NAME_MAX_LENGTH,
  PROJECT_DESCRIPTION_MIN_LENGTH
} from '../../../constants/dataConstraints'
import {
  NAME_TOO_SHORT,
  NAME_TOO_LONG,
  DESCRIPTION_TOO_SHORT,
  DESCRIPTION_TOO_LONG
} from './errorMessages'

export const createProjectSchema = yup.object().shape({
  name: yup
    .string()
    .min(PROJECT_NAME_MIN_LENGTH, NAME_TOO_SHORT)
    .max(PROJECT_NAME_MAX_LENGTH, NAME_TOO_LONG),
  description: yup
    .string()
    .min(PROJECT_DESCRIPTION_MIN_LENGTH, DESCRIPTION_TOO_SHORT)
    .max(PROJECT_NAME_MAX_LENGTH, DESCRIPTION_TOO_LONG)
})
