import sharp from 'sharp'

export async function trimImage(file: string | Buffer): Promise<Buffer> {
  const image = sharp(file)
  return await image
    .flip()
    .flop()
    .trim()
    .flop(false)
    .flip(false)
    .toBuffer()
}
