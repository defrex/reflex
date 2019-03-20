import { css } from '@emotion/core'

export default {
  root: css`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    padding: 8px 16px;
    height: 32px;
    line-height: 16px;
    border-radius: 4px;

    background-color: white;
    color: #0a1c35;
    text-decoration: none;

    &:hover {
      background-color: #f3f8ff;
    }

    &:active {
      background-color: #e5f0ff;
    }

    & > img {
      max-height: 16px;
      margin-right: 4px;
    }
  `,
}
