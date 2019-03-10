import Routes from 'next-routes'

export default new Routes()
  .add('index', '/')
  .add('checks', '/checks/:repoOwner/:repoName/:headSha')
