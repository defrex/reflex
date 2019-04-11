import Configstore from 'configstore'

const CONFIG_NAME = 'reflex'

export default async function cli() {
  console.log('Hello CLI!')
  const conf = new Configstore(CONFIG_NAME)
  console.log(conf)
}
