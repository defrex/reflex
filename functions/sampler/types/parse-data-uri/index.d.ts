declare module 'parse-data-uri' {
  export default function(
    uri: string,
  ): {
    mimeType: string
    data: Buffer
  }
}
