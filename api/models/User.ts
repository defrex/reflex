import { Entity, Column } from 'typeorm'
import Octokit from '@octokit/rest'

import Model from 'api/models/Model'
import Figma from 'api/figma/client'

@Entity()
export default class User extends Model {
  @Column()
  name: string

  @Column()
  email: string

  @Column({ unique: true, nullable: true })
  githubUsername?: string

  @Column({ nullable: true })
  githubAvatarUrl?: string

  @Column({ nullable: true })
  githubAccessToken?: string

  @Column({ nullable: true })
  figmaAccessToken?: string

  @Column({ nullable: true })
  figmaRefreshToken?: string

  get figmaConnected(): boolean {
    return !!this.figmaAccessToken
  }

  get figma(): Figma | void {
    if (!this.figmaConnected) {
      return
    }
    return new Figma(this)
  }

  get githubConnected(): boolean {
    return !!this.githubAccessToken
  }

  get github(): Octokit | void {
    if (!this.githubConnected) {
      return
    }
    return new Octokit({
      auth: `token ${this.githubAccessToken}`,
    })
  }
}
