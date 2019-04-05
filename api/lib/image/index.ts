import sharp from 'sharp'

export async function trimImage(file: string | Buffer): Promise<Buffer> {
  return sharp(file)
    .flip()
    .flop()
    .trim()
    .flop(false)
    .flip(false)
    .toBuffer()
}
