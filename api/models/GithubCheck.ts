import { Entity, Column } from 'typeorm'

import Model from './Model'

@Entity()
export default class GithubCheck extends Model {
  @Column()
  githubCheckSuiteId: number

  @Column()
  githubRepoId: string
}
