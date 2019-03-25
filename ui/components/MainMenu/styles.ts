import { css } from '@emotion/core'

// import { primary } from 'ui/lib/colors'

export default {
  mainMenu: css`
    position: absolute;
    top: 64px;
    left: 0px;
    height: calc(100vh - 64px);
    width: 256px;

    background-color: white;
    border-right: 1px solid gray;
  `,
  list: css`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
  item: css`
    padding: 8px 16px;
  `,
  username: css`
    display: block;
    font-size: 18px;
  `,
  lowEmphisis: css`
    color: gray;
  `,
}
