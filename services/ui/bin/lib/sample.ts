import { sampler, SampleRenderFn } from '@reflexui/sdk'
import ReactDomServer from 'react-dom/server'
import { getStyles } from 'typestyle'

async function main() {
  await sampler({
    paths: './components/*/samples.tsx',
    renderSampleToStrings: async (sampleRender: SampleRenderFn) => {
      const rendered = await sampleRender()
      return {
        html: ReactDomServer.renderToString(rendered),
        css: getStyles(),
      }
    },
  })
}
main()
