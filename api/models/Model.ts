import * as orm from 'typeorm'

import { graphIdforModel, modelForGraphId } from 'api/lib/graphIds'

export type StaticThis<T> = { new (): T }

export default abstract class Model extends orm.BaseEntity {
  @orm.PrimaryGeneratedColumn()
  id: number

  @orm.CreateDateColumn({ default: new Date() })
  createdAt: Date

  @orm.UpdateDateColumn({ default: new Date() })
  updatedAt: Date

  public async fromGraphId<T extends Model> (this: StaticThis<T>, graphId: string): Promise<T> {
    const model = await modelForGraphId(graphId)
    if (model instanceof this) {
      return model
    }
    throw new Error(`Expected ${this}, got ${model}`)
  }

  async graphId () {
    return graphIdforModel(this)
  }
}
