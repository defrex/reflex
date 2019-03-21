import { Entity, Column } from 'typeorm'

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

  get figmaConnected() {
    return !!this.figmaAccessToken
  }

  get figma() {
    return new Figma(this)
  }

  get githubConnected() {
    return !!this.githubAccessToken
  }
}
