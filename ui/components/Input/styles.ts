import { css } from '@emotion/core'
import { gray, darkGray } from 'ui/lib/colors'

export default {
  label: css`
    display: block;
    margin-bottom: 16px;
  `,
  labelText: css`
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 4px;
  `,
  labelOptional: css`
    font-weight: normal;
    color: ${darkGray};
  `,
  input: css`
    border: 1px solid ${gray};
    border-radius: 2px;
    padding: 4px;
  `,
}
