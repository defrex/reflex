const routes = require('next-routes')

console.log(routes)
export default routes()
  .add('index', '/')
  .add('checks', '/checks/:repoOwner/:repoName/:headSha')
