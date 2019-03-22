export type FormEvent = React.FormEvent<HTMLFormElement>
export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type GraphQLGenericError = {
  path: string
  message: string
}

export type Project = {
  name: string
  description: string
}
