import GithubCheck from 'api/models/GithubCheck'

import Context from 'api/context'

export default {
  hello: (_parent: null, _args: null, _ctx: Context) => {
    return 'Hello!'
  },

  githubChecks: async (_parent: null, _args: null, _ctx: Context) => {
    return GithubCheck.find()
  },
}
