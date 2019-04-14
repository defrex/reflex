/// <reference path="../../@types/ansi-styles.d.ts" />

import style from 'ansi-styles'
import config from 'api/config'

if (process.stdout.isTTY && config.environment === 'development') {
  const trueWrite = process.stdout.write
  process.stdout.write = function(output: string): boolean {
    ;(trueWrite as any).apply(process.stdout, [
      cleanOutput(output),
      ...Array.prototype.slice.call(arguments, 1),
    ])
    return true
  }
}

function cleanOutput(output: string): string {
  if (typeof output !== 'string') {
    return output
  }
  return output
    .replace(style.grey.open, style.white.open)
    .replace(style.grey.close, style.white.close)
  // .replace(style.reset.open, '(reset-')
  // .replace(style.reset.close, '-reset)')

  // .replace(style.bold.open, '(bold-')
  // .replace(style.bold.close, '-bold)')
  // .replace(style.dim.open, '(dim-')
  // .replace(style.dim.close, '-dim)')
  // .replace(style.italic.open, '(italic-')
  // .replace(style.italic.close, '-italic)')
  // .replace(style.underline.open, '(underline-')
  // .replace(style.underline.close, '-underline)')
  // .replace(style.inverse.open, '(inverse-')
  // .replace(style.inverse.close, '-inverse)')
  // .replace(style.hidden.open, '(hidden-')
  // .replace(style.hidden.close, '-hidden)')
  // .replace(style.strikethrough.open, '(strikethrough-')
  // .replace(style.strikethrough.close, '-strikethrough)')

  // .replace(style.black.open, '(black-')
  // .replace(style.black.close, '-black)')
  // .replace(style.red.open, '(red-')
  // .replace(style.red.close, '-red)')
  // .replace(style.green.open, '(green-')
  // .replace(style.green.close, '-green)')
  // .replace(style.yellow.open, '(yellow-')
  // .replace(style.yellow.close, '-yellow)')
  // .replace(style.blue.open, '(blue-')
  // .replace(style.blue.close, '-blue)')
  // .replace(style.magenta.open, '(magenta-')
  // .replace(style.magenta.close, '-magenta)')
  // .replace(style.cyan.open, '(cyan-')
  // .replace(style.cyan.close, '-cyan)')
  // .replace(style.white.open, '(white-')
  // .replace(style.white.close, '-white)')
  // .replace(style.grey.open, '(grey-')
  // .replace(style.grey.close, '-grey)')

  // .replace(style.redBright.open, '(redBright-')
  // .replace(style.redBright.close, '-redBright)')
  // .replace(style.greenBright.open, '(greenBright-')
  // .replace(style.greenBright.close, '-greenBright)')
  // .replace(style.yellowBright.open, '(yellowBright-')
  // .replace(style.yellowBright.close, '-yellowBright)')
  // .replace(style.blueBright.open, '(blueBright-')
  // .replace(style.blueBright.close, '-blueBright)')
  // .replace(style.magentaBright.open, '(magentaBright-')
  // .replace(style.magentaBright.close, '-magentaBright)')
  // .replace(style.cyanBright.open, '(cyanBright-')
  // .replace(style.cyanBright.close, '-cyanBright)')
  // .replace(style.whiteBright.open, '(whiteBright-')
  // .replace(style.whiteBright.close, '-whiteBright)')

  // .replace(style.bgBlack.open, '(bgBlack-')
  // .replace(style.bgBlack.close, '-bgBlack)')
  // .replace(style.bgRed.open, '(bgRed-')
  // .replace(style.bgRed.close, '-bgRed)')
  // .replace(style.bgGreen.open, '(bgGreen-')
  // .replace(style.bgGreen.close, '-bgGreen)')
  // .replace(style.bgYellow.open, '(bgYellow-')
  // .replace(style.bgYellow.close, '-bgYellow)')
  // .replace(style.bgBlue.open, '(bgBlue-')
  // .replace(style.bgBlue.close, '-bgBlue)')
  // .replace(style.bgMagenta.open, '(bgMagenta-')
  // .replace(style.bgMagenta.close, '-bgMagenta)')
  // .replace(style.bgCyan.open, '(bgCyan-')
  // .replace(style.bgCyan.close, '-bgCyan)')
  // .replace(style.bgWhite.open, '(bgWhite-')
  // .replace(style.bgWhite.close, '-bgWhite)')
  // .replace(style.bgGrey.open, '(bgGrey-')
  // .replace(style.bgGrey.close, '-bgGrey)')

  // .replace(style.bgRedBright.open, '(bgRedBright-')
  // .replace(style.bgRedBright.close, '-bgRedBright)')
  // .replace(style.bgGreenBright.open, '(bgGreenBright-')
  // .replace(style.bgGreenBright.close, '-bgGreenBright)')
  // .replace(style.bgYellowBright.open, '(bgYellowBright-')
  // .replace(style.bgYellowBright.close, '-bgYellowBright)')
  // .replace(style.bgBlueBright.open, '(bgBlueBright-')
  // .replace(style.bgBlueBright.close, '-bgBlueBright)')
  // .replace(style.bgMagentaBright.open, '(bgMagentaBright-')
  // .replace(style.bgMagentaBright.close, '-bgMagentaBright)')
  // .replace(style.bgCyanBright.open, '(bgCyanBright-')
  // .replace(style.bgCyanBright.close, '-bgCyanBright)')
  // .replace(style.bgWhiteBright.open, '(bgWhiteBright-')
  // .replace(style.bgWhiteBright.close, '-bgWhiteBright)')
}
