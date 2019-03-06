import { Application } from 'probot'

export default (app: Application) => {
  app.on('pull_request', async (context) => {
    app.log(context)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
