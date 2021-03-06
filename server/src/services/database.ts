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
    const resetDB = this.nodeEnv === 'test' || process.env.NUKE_DB === 'true'
    this.connection = await createConnection({
      ...connectionOptions,
      name: 'default',
      synchronize: resetDB,
      dropSchema: resetDB
    })

    await this.connection.synchronize()
  }

  getConnection() {
    return this.connectionManager.get('default')
  }
}

export const Database = new DB()
