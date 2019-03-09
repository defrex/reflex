import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

// import 'api/db' // ensure this is loaded if a Model is loaded
// console.log('connection')

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
}
