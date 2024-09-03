import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('address_id').references('id').inTable('addresses').onDelete('CASCADE')
      table.string('contact_id').references('id').inTable('contacts').onDelete('CASCADE')

      table.string('siret').notNullable()
      table.string('approval_number').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
