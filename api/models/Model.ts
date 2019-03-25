import * as orm from 'typeorm'

export type StaticThis<T> = { new (): T }

export default abstract class Model extends orm.BaseEntity {
  @orm.PrimaryGeneratedColumn()
  id: number

  @orm.CreateDateColumn({ default: new Date() })
  createdAt: Date

  @orm.UpdateDateColumn({ default: new Date() })
  updatedAt: Date
}
