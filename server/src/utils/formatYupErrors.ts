import { ValidationError } from 'yup'

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = []

  err.errors.forEach(errorMessage => {
    errors.push({
      path: err.path,
      message: errorMessage
    })
  })

  return errors
}
