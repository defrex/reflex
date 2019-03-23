import { Entity, ManyToOne, Column } from 'typeorm'

import Model from './Model'
import User from './User'
import Organization from './Organization'

@Entity()
export default class Membership extends Model {
  @ManyToOne(() => User, (user) => user.memberships)
  user: User

  @ManyToOne(() => Organization, (organization) => organization.memberships)
  organization: Organization

  @Column({ default: 'member' })
  role: 'member' | 'admin'
}
