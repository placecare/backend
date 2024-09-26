import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'professionals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('oidc_id').unique().notNullable()
      table
        .string('professional_type_id')
        .notNullable()
        .references('id')
        .inTable('professional_types')
      table.string('identity_id').notNullable().references('id').inTable('identities')
      table.string('address_id').notNullable().references('id').inTable('addresses')
      table.string('contact_id').notNullable().references('id').inTable('contacts')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
