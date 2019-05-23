import { Router } from 'express'
import { componentSet } from 'src/componentSet'

export const apiRouter = Router()

apiRouter.get('save', async (req, res) => {
  const { componentName, sampleName } = req.body
  const component = componentSet.find(componentName)

  if (!component) {
    res.status(400).send(`Cannot find component named ${componentName}`)
    return
  }

  const sample = component.find(sampleName)

  if (!sample) {
    res.status(400).send(`Cannot find sample named ${sampleName} for component ${componentName}`)
    return
  }

  await sample.save()
  res.redirect('/')
})
