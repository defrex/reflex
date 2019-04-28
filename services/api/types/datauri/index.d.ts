declare module 'datauri' {
  export default class DataURI {
    format: (extension: string, data: Buffer) => void
    content: string
  }
}
