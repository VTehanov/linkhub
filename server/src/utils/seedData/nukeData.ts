import { Database } from '../../services/database'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const askQuestion = async (question: string) => {
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close()
      resolve(answer)
    })
  )
}

const nukeData = async () => {
  const currentEnv = process.env.NODE_ENV as string
  const positiveAnswers = ['y', 'yes', 'ye', 'ya', 'yup']

  const firstAnswer = (await askQuestion(
    `You want to nuke ${currentEnv.toUpperCase()} database? `
  )) as string

  if (positiveAnswers.includes(firstAnswer)) {
    console.log(`💥 Nuking ${currentEnv.toUpperCase()} database!!!`)
    await Database.createConnection()
  } else {
    console.log('Good call...')
  }
}

nukeData()
