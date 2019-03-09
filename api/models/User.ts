import { Entity, Column } from 'typeorm'

import Model from './Model'

@Entity()
export default class User extends Model {
  @Column()
  name: string

  @Column()
  email: string
}
