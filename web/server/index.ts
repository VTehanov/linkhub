import * as express from 'express'
import { Request, Response } from 'express'
import * as next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/project/create', (req: Request, res: Response) =>
      app.render(req, res, '/project/create')
    )
    server.get('/project/:slug', (req: Request, res: Response) => {
      const actualPage = '/project'
      const queryParams = { slug: req.params.slug }

      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req: Request, res: Response) => handle(req, res))
    server.listen(3000, (err: Error) => {
      if (err) throw err
      console.log('> Server ready on http://localhost:3000')
    })
  })
  .catch((err: Error) => {
    console.error(err.stack)
    process.exit(1)
  })
