import { css, SerializedStyles } from '@emotion/core'

// import { primary, dark, light, gray } from 'ui/lib/colors'

export default {
  libraryItem: css`
    margin-bottom: 64px;
  `,
  libraryItemTitle: css`
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  `,
  libraryInstance: css`
    margin-bottom: 16px;
  `,
  libraryInstanceTitle: css`
    margin-bottom: 4px;
    font-size: 16px;
  `,
} as {
  [index: string]: SerializedStyles
}
