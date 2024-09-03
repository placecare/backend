import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'

export default class Address extends BaseModel {
  static table = 'addresses'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare street: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare region: string

  @column()
  declare country: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Address) {
    model.id = generateSnowflake()
  }
}
