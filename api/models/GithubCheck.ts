import { Entity, Column } from 'typeorm'

import Model from './Model'

@Entity()
export default class GithubCheck extends Model {
  @Column()
  repo: string

  @Column()
  headSha: string

  @Column({ nullable: true })
  githubCheckId: number
}
