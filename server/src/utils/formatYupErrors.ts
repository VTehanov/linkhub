import { ValidationError } from 'yup'

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = []

  if (err.inner.length) {
    err.inner.forEach(e => {
      errors.push({
        path: e.path,
        message: e.message
      })
    })
  } else {
    const { path, message } = err
    errors.push({ path, message })
  }

  return errors
}
