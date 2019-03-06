import { Application } from 'probot'

export default (app: Application) => {
  app.on('pull_request', async (context) => {
    app.log(context.name)
  })
}
