import { ValidationError } from 'yup'

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = []

  if (err.inner.length) {
    err.inner.forEach(errorMessage => {
      errors.push({
        path: errorMessage.path,
        message: errorMessage.message
      })
    })
  } else {
    err.errors.forEach(errorMessage => {
      errors.push({
        path: err.path,
        message: errorMessage
      })
    })
  }

  return errors
}
