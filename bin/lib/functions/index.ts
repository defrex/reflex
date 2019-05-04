import absolutePath from 'bin/lib/absolutePath'
import { readdir as _readdir } from 'fs'
import { ParsedArgs } from 'minimist'
import { promisify } from 'util'
import build from './build'
import deploy from './deploy'
import upload from './upload'

const readdir = promisify(_readdir)

export default async function main(argv: ParsedArgs) {
  const allFunctionNames = await readdir(absolutePath('functions'))
  const functionNames: Array<string> =
    argv._.length > 0 ? argv._ : allFunctionNames

  for (const functionName of functionNames) {
    if (allFunctionNames.indexOf(functionName) === -1) {
      throw new Error(`unknown function ${functionName}`)
    }
  }

  for (const functionName of functionNames) {
    await build(functionName)
    const uri = await upload(functionName)
    await deploy(functionName, uri)
  }
}
