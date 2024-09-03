import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Professional from '#apps/professional/models/professional'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @manyToMany(() => Professional)
  declare professionals: ManyToMany<typeof Professional>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Company) {
    model.id = generateSnowflake()
  }
}
