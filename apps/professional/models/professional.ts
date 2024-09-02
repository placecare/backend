import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import { generateSnowflake } from "#apps/shared/services/snowflake_service";

export default class Professional extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare oidcId: string;

  @column()
  declare type: string; // ProfessionalType

  @column()
  declare identityId: string;

  @column()
  declare contactId: string;

  @column()
  declare addressId: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @beforeCreate()
  static async generateUuid(model: Professional) {
    model.id = generateSnowflake();
  }
}
