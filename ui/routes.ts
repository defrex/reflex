const routes = require('next-routes')

export default routes()
  .add('index', '/')
  .add('check', '/checks/:repoOwner/:repoName/:commitSha')
  .add('checks', '/checks/:repoOwner/:repoName')
