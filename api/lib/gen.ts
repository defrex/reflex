import { generate } from '@graphql-codegen/cli'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

export default function gen(): Promise<any> {
  return generate({
    schema: config.graphqlSchemaPath,
    documents: config.graphqlDocumentPaths,
    generates: {
      [absolutePath('api/gen.ts')]: {
        plugins: ['typescript', 'typescript-resolvers'],
      },
      [absolutePath('ui/gen.tsx')]: {
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo',
        ],
      },
    },
  })
}
