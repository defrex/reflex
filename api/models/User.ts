import { Entity, Column } from 'typeorm'

import Model from 'api/models/Model'

@Entity()
export default class User extends Model {
  @Column()
  name: string

  @Column()
  email: string

  @Column({ unique: true })
  githubUsername: string

  @Column()
  githubAvatarUrl: string

  @Column()
  githubAccessToken: string

  @Column({ nullable: true })
  figmaAccessToken?: string

  @Column({ nullable: true })
  figmaRefreshToken?: string

  get figmaConnected() {
    return !!this.figmaAccessToken
  }
}
