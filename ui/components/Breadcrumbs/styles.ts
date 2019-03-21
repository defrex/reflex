import { css } from '@emotion/core'

export default {
  root: css`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;

    list-style: none;

    & > li::after {
      content: '>';
      margin: 0 8px;
    }
    & > li:last-child::after {
      content: '';
    }
  `,
}
