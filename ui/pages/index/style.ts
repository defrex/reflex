import { css } from '@emotion/core'

import { primary } from 'ui/lib/colors'

export default {
  root: css`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    background-color: ${primary};

    img {
      display: block;
      max-height: 100px;
      margin: 0 32px;
    }
  `,
  buttonWrapper: css`
    margin-top: 32px;
  `,
}
