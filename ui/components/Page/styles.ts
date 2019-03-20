import { css } from '@emotion/core'

export default {
  contentWrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  content: css`
    flex-grow: 1;
    max-width: 1024px;
    margin-top: 32px;
    margin-bottom: 32px;

    @media (max-width: 1024px) {
      margin-left: 16px;
      margin-right: 16px;
      width: calc(100vw - 64px);
      overflow: hidden;
    }
  `,
}
