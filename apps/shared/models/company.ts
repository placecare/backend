import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Professional from '#apps/shared/models/professional'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Address from '#apps/shared/models/address'
import Contact from '#apps/shared/models/contact'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare addressId: string

  @column()
  declare contactId: string

  @column()
  declare siret: string

  @column()
  declare approvalNumber: string

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => Contact)
  declare contact: BelongsTo<typeof Contact>

  @manyToMany(() => Professional)
  declare professionals: ManyToMany<typeof Professional>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Company) {
    if (!model.id) {
      model.id = generateSnowflake()
    }
  }
}
