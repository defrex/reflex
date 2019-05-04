import { stylesheet } from 'typestyle'
import { gray, darkGray } from 'ui/lib/colors'

export default stylesheet({
  label: {
    display: 'block',
    marginBottom: 16,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  labelOptional: {
    fontWeight: 'normal',
    color: darkGray,
  },
  input: {
    border: `1px solid ${gray}`,
    borderRadius: 2,
    padding: 4,
  },
})
