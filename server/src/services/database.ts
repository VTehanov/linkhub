import {
  getConnectionManager,
  getConnectionOptions,
  Connection,
  createConnection,
  ConnectionManager,
  ConnectionOptions
} from 'typeorm'

class DB {
  connection: Connection
  connectionManager: ConnectionManager
  connectionOptions: ConnectionOptions
  nodeEnv: string

  constructor() {
    this.connectionManager = getConnectionManager()
    this.nodeEnv = process.env.NODE_ENV as string
  }

  async createConnection() {
    const connectionOptions = await getConnectionOptions(this.nodeEnv)
    const resetDB = this.nodeEnv === 'test'
    this.connection = await createConnection({
      ...connectionOptions,
      name: 'default',
      synchronize: resetDB,
      dropSchema: resetDB
    })
  }

  getConnection() {
    return this.connectionManager.get('default')
  }
}

export const Database = new DB()
