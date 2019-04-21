export type FormEvent = React.FormEvent<HTMLFormElement>
export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type GraphQLGenericError = {
  path: string
  message: string
}

export type User = {
  id: string
  email: string
}

export type Project = {
  id: string
  name: string
  description: string
  tags?: Tag[]
  creator: User
}

export type Tag = {
  id: string
  name: string
  projects?: Project[]
}

export type ProjectJoinRequest = {
  id: string
  project: Project
}
