import { generate } from 'graphql-code-generator'

import config from 'api/config'
import { absolutePath } from 'api/lib/path'

export default function gen(): Promise<any> {
  return generate({
    schema: config.graphqlSchemaPath,
    overwrite: true,
    generates: {
      [absolutePath('gen/schema.d.ts')]: {
        plugins: ['typescript-common', 'typescript-server'],
      },
      [absolutePath('@types/graphqlDocuments.d.ts')]: {
        documents: config.graphqlDocumentPaths,
        plugins: ['typescript-graphql-files-modules'],
      },
      [absolutePath('gen/resolvers.d.ts')]: {
        plugins: ['typescript-common', 'typescript-resolvers'],
        config: {
          contextType: 'api/context#Context',
        },
      },
    },
  })
}
