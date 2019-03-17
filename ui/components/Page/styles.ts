import { css } from '@emotion/core'

export default {
  content: css`
    max-width: 1024px;
    margin: 32px auto;

    @media (max-width: 1024px) {
      margin: 32px 16px;
      width: calc(100vw - 64px);
      overflow: hidden;
    }
  `,
}
