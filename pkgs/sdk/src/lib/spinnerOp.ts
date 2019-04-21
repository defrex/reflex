import ora from 'ora'

interface RunnerResult {
  success: boolean
  message?: string
}

type Runner = () => RunnerResult | void | Promise<RunnerResult | void>

interface SpinnerOptions {
  text: string
  run: Runner | Runner[]
  exitOnFail?: boolean
}

export default async function spinnerOp(options: SpinnerOptions) {
  const runners = Array.isArray(options.run) ? options.run : [options.run]

  const spinner = ora(options.text)
  spinner.start()

  for (const runner of runners) {
    try {
      const response = await runner()
      if (response && response.success === false) {
        spinner.fail(response.message)
        return
      }
    } catch (error) {
      spinner.fail()
      console.error(error)
      if (options.exitOnFail) {
        process.exit()
      } else {
        return
      }
    }
  }
  spinner.succeed()
}
