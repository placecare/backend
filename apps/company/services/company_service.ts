import Company from '#apps/shared/models/company'
import {
  CreateCompanySchema,
  GetCompaniesSchema,
  UpdateCompanySchema,
} from '#apps/company/validators/company'
import { inject } from '@adonisjs/core'
import AddressService from '#apps/shared/services/address_service'
import ContactService from '#apps/shared/services/contact_service'

@inject()
export default class CompanyService {
  constructor(
    protected addressService: AddressService,
    protected contactService: ContactService
  ) {}

  async findAll({ page = 1, limit = 10 }: GetCompaniesSchema) {
    return Company.query().paginate(page, limit)
  }

  async findById(id: string) {
    return Company.query()
      .where('id', id)
      .preload('professionals')
      .preload('address')
      .preload('contact')
      .firstOrFail()
  }

  async create(payload: CreateCompanySchema) {
    const address = await this.addressService.create(payload.address)
    const contact = await this.contactService.create(payload.contact)

    const company = await Company.create({
      ...payload,
      addressId: address.id,
      contactId: contact.id,
    })
    await company.load('address')
    await company.load('contact')

    return company
  }

  async updateById(id: string, payload: UpdateCompanySchema) {
    const company = await this.findById(id)

    if (payload.address) {
      await company.address.merge(payload.address).save()
    }

    if (payload.contact) {
      await company.contact.merge(payload.contact).save()
    }

    return company.merge(payload).save()
  }

  async deleteById(id: string) {
    const company = await this.findById(id)

    return company.delete()
  }
}
