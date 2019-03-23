import { Entity, Column, OneToMany, ManyToMany } from 'typeorm'

import Model from './Model'
import Membership from './Membership'
import User from './User'

@Entity()
export default class Organization extends Model {
  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[]

  @ManyToMany(() => User, (user) => user.organizations)
  users: User[]

  @Column()
  name: string

  @Column()
  figmaTeamId: string
}
