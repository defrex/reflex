import { css, SerializedStyles } from '@emotion/core'
import tinycolor from 'tinycolor2'

import { primary, dark, light, gray } from 'ui/lib/colors'

export default {
  button: css`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    padding: 8px 16px;
    height: 32px;

    border-width: 1px;
    border-style: solid;
    border-radius: 4px;

    line-height: 16px;
    text-decoration: none;

    & > img {
      max-height: 16px;
      margin-right: 4px;
    }
  `,
  light: css`
    border-color: ${gray};
    background-color: ${light};
    color: ${dark};

    &:hover {
      background-color: ${tinycolor(light)
        .darken(5)
        .toString()};
    }

    &:active {
      background-color: ${tinycolor(light)
        .darken(10)
        .toString()};
    }
  `,
  primary: css`
    border-color: ${gray};
    background-color: ${primary};
    color: ${light};

    &:hover {
      background-color: ${tinycolor(primary)
        .lighten(5)
        .toString()};
    }

    &:active {
      background-color: ${tinycolor(primary)
        .lighten(10)
        .toString()};
    }
  `,
} as {
  [index: string]: SerializedStyles
}
