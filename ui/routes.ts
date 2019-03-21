const routes = require('next-routes')

export default routes()
  .add('index', '/')
  .add('check', '/checks/:repoOwner/:repoName/:commitSha')
  .add('project', '/projects/:repoOwner/:repoName')
  .add('profile', '/profile')
  .add('dashboard', '/dashboard')
