import { Application } from 'probot'

export default (app: Application) => {
  app.on('issues.opened', async (_context) => {
    console.log('Hello GitHub')
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
