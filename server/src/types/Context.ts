import { Prisma } from '../generated/prisma'



export interface MyContext {
  db: Prisma
  req: Request
  res: Response
}