import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export default class GithubCheck extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  githubCheckId: number

  @Column()
  githubRepoId: string
}
