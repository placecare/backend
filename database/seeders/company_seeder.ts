import Address from '#apps/shared/models/address'
import Company from '#apps/shared/models/company'
import Contact from '#apps/shared/models/contact'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const address = await Address.create({
      city: 'Montpellier',
      country: 'France',
      postalCode: '34000',
      region: 'Occitanie',
      street: 'Rue de la République',
    })

    const contact = await Contact.create({
      email: 'contact@hopital.fr',
    })

    await Company.create({
      id: '9890153540490362881974927',
      addressId: address.id,
      contactId: contact.id,
      name: 'Hopital de Montpellier',
      siret: '88842148184',
      approvalNumber: '99481818',
    })

    await Company.create({
      id: '9890150790490362881976491',
      addressId: address.id,
      contactId: contact.id,
      name: '[delete] Hopital De Paris ',
      siret: '13099499419',
      approvalNumber: '1557181',
    })
  }
}
