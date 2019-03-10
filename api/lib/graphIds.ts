import aes256 from 'aes256'

import Model from 'api/models/Model'
import config from 'api/config'

export async function graphIdforModel (model: Model): Promise<string> {
  const plaintext = [model.constructor.name, model.id].join(':')
  const ciphertext = aes256.encrypt(config.secretKey, plaintext)
  return Promise.resolve(ciphertext)
}

export async function modelForGraphId (graphId: string): Promise<Model> {
  const plaintext = aes256.decrypt(config.secretKey, graphId)
  const [modelName, modelId] = plaintext.split(':')

  const Model = (await import(`api/models/${modelName}`)).default
  const model: Model = await Model.findOne(modelId)

  return model
}
