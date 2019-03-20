import { css } from '@emotion/core'

import { primary } from 'ui/lib/colors'

export default {
  appBarOuter: css`
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: ${primary};
  `,
  appBarInner: css`
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1024px) {
      margin-left: 16px;
      margin-right: 16px;
    }
  `,
  logo: css`
    height: 32px;
    margin: 16px 0;
  `,
  links: css`
    a {
      color: white;
      text-decoration: none;
    }
  `,
}
