import { Entity, Column } from 'typeorm'

import Model from 'api/models/Model'

@Entity()
export default class User extends Model {
  @Column()
  name: string

  @Column()
  email: string
}
