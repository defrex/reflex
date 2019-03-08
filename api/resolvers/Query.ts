import GithubCheck from 'api/models/GithubCheck'

export default {
  hello: (_parent, _args, _ctx) => {
    return 'Hello!'
  },

  githubChecks: async (_parent, _args, _ctx) => {
    return GithubCheck.find()
  },
}
