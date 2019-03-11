const routes = require('next-routes')

export default routes()
  .add('index', '/')
  .add('checks', '/checks/:repoOwner/:repoName/:commitSha')
