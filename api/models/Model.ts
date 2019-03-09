import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

import { graphIdforModel, modelForGraphId } from 'api/lib/graphIds'

export type StaticThis<T> = { new (): T }

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
