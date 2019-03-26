const routes = require('next-routes')

export default routes()
  .add('index', '/')
  .add('dashboard', '/dashboard')
  .add('createTeam', '/team')
  .add('team', '/teams/:id')
  .add('library', '/teams/:id/library')
