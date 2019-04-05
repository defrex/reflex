import sharp from 'sharp'

export async function trimImage(filename: string) {
  const image = sharp(filename)
  const stats = await image.stats()
  console.log(stats)
}

// export async function trimImage(filename: string) {
//   const pixels = await getPixels(filename)
//   let stopX = 0
//   let stopY = 0
//   let white = 0
//   let nonWhite = 0
//   const [width, height, channels] = pixels.shape
//   console.log({ width, height, channels })
//   for (let x = width; x > 0; x--) {
//     for (let y = height; y > 0; y--) {
//       for (let channel = channels; channel > 0; channel--) {
//         const color = pixels.get(x, y, channel)
//         if (color !== 255) {
//           nonWhite++
//           // console.log({ x, y, channel, color })
//           if (x > stopX) {
//             stopX = x
//           }
//           if (y > stopY) {
//             stopY = y
//           }
//         } else {
//           white++
//         }
//       }
//     }
//   }

//   console.log({ stopX, stopY, white, nonWhite })
// }
