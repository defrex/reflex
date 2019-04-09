import sampler from '@reflexui/sampler'
import { absolutePath } from 'api/lib/path'

async function main() {
  console.log('🏁')

  await sampler({
    path: absolutePath('ui/components/*/samples.tsx'),
  })

  console.log('✅')
}
main()
