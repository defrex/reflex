import { generate } from 'graphql-code-generator'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

export default function gen(): Promise<any> {
  return generate({
    schema: config.graphqlSchemaPath,
    overwrite: true,
    generates: {
      [absolutePath('api/gen.ts')]: {
        plugins: [
          'typescript-common',
          'typescript-server',
          'typescript-resolvers',
        ],
        config: {
          contextType: 'api/context#Context',
        },
      },
      [absolutePath('ui/gen.tmp.tsx')]: {
        documents: config.graphqlDocumentPaths,
        plugins: [
          'typescript-common',
          'typescript-client',
          'typescript-react-apollo',
        ],
        config: {
          noHOC: true,
          noNamepsaces: true,
        },
      },
    },
  })
}
