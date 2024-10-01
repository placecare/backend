import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Identity from '#apps/shared/models/identity'
import Address from '#apps/shared/models/address'
import Contact from '#apps/shared/models/contact'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Company from '#apps/shared/models/company'
import Profession from '#apps/shared/models/profession'

export default class Professional extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare oidcId: string

  @column()
  declare professionId: string

  @column()
  declare identityId: string

  @column()
  declare addressId: string

  @column()
  declare contactId: string

  @belongsTo(() => Identity)
  declare identity: BelongsTo<typeof Identity>

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => Contact)
  declare contact: BelongsTo<typeof Contact>

  @belongsTo(() => Profession)
  declare profession: BelongsTo<typeof Profession>

  @manyToMany(() => Company)
  declare companies: ManyToMany<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Professional) {
    model.id = generateSnowflake()
  }
}
