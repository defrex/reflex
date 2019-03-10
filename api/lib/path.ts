import * as path from 'path'

import config from 'api/config'

export const absolutePath = path.join.bind(path, config.basePath)
