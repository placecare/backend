import Address from '#apps/shared/models/address'
import Contact from '#apps/shared/models/contact'
import Identity from '#apps/shared/models/identity'
import Professional from '#apps/shared/models/professional'
import Profession from '#apps/shared/models/profession'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const contact = await Contact.create({
      email: 'pro.nathaelbonnal@gmail.com',
    })

    const address = await Address.create({
      city: 'Montpellier',
      country: 'France',
      postalCode: '34000',
      region: 'Occitanie',
      street: 'Rue de la République',
    })

    const identity = await Identity.create({
      firstname: 'Nathael',
      gender: 'Male',
      lastname: 'Bonnal',
      birthdate: DateTime.fromISO('2003-05-07'),
    })

    const profession = await Profession.create({
      name: 'Software Engineer',
    })

    await Professional.create({
      addressId: address.id,
      contactId: contact.id,
      identityId: identity.id,
      oidcId: '1234567890',
      professionId: profession.id,
    })
  }
}
