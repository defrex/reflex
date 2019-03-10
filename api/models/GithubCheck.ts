import { Entity, Column } from 'typeorm'

import Model from './Model'

@Entity()
export default class GithubCheck extends Model {
  @Column({ default: 'defrex' })
  repoOwner: string

  @Column({ default: 'syncui' })
  repoName: string

  @Column()
  headSha: string

  @Column({ nullable: true })
  githubCheckId: number
}
