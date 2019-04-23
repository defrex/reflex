export default async function sleep(milis: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milis)
  })
}
