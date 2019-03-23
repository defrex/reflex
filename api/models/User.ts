import { Entity, Column, OneToMany, ManyToMany } from 'typeorm'
import Octokit from '@octokit/rest'
import { Client as Figma, ClientInterface } from 'figma-js'

import Model from 'api/models/Model'
import Membership from './Membership'
import Organization from './Organization'

@Entity()
export default class User extends Model {
  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[]

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[]

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

  get figma(): ClientInterface | void {
    if (!this.figmaConnected) {
      return
    }
    return Figma({
      accessToken: this.figmaAccessToken,
    })
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
