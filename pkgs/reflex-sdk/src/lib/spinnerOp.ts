import ora from 'ora'

interface TestResult {
  success: boolean
  message?: string
}

interface SpinnerOptions {
  text: string
  run: () => Promise<any>
  test?: () => Promise<TestResult>
  exitOnFail?: boolean
}

export default async function spinnerOp(options: SpinnerOptions) {
  const spinner = ora(options.text)
  spinner.start()

  if (options.test) {
    const results = await options.test()
    if (!results.success) {
      spinner.fail(results.message)
    }
  }

  try {
    await options.run()
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    console.error(error)
    if (options.exitOnFail) {
      process.exit()
    }
  }
}
