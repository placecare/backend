import KeycloakService from '#apps/authentication/services/keycloak_service'
import {
  CreateProfessionalSchema,
  GetProfessionalsSchema,
} from '#apps/professional/validators/professional'
import Professional from '#apps/shared/models/professional'
import AddressService from '#apps/shared/services/address_service'
import ContactService from '#apps/shared/services/contact_service'
import IdentityService from '#apps/shared/services/identity_sercice'
import { inject } from '@adonisjs/core'
import ProfessionService from '#apps/professional/services/profession_service'

@inject()
export default class ProfessionalService {
  constructor(
    protected keycloakService: KeycloakService,
    protected identityService: IdentityService,
    protected addressService: AddressService,
    protected contactService: ContactService,
    protected professionService: ProfessionService
  ) {}

  async findAll({ page = 1, limit = 10, companyId }: GetProfessionalsSchema) {
    return Professional.query()
      .if(companyId, (query) => {
        query.whereHas('companies', (builder) => {
          builder.where('company_id', companyId!)
        })
      })
      .paginate(page, limit)
  }

  async findById(id: string) {
    return Professional.findOrFail(id)
  }

  async create(payload: CreateProfessionalSchema) {
    const profession = await this.professionService.findByName(payload.profession)
    const identity = await this.identityService.create(payload.identity)
    const adress = await this.addressService.create(payload.address)
    const contact = await this.contactService.create(payload.contact)

    const oidcId = await this.keycloakService.createUser({
      email: payload.contact.email,
      firstName: payload.identity.firstname,
      lastName: payload.identity.lastname,
      enabled: true,
      username: payload.contact.email,
    })

    const professional = await Professional.create({
      oidcId,
      identityId: identity.id,
      addressId: adress.id,
      contactId: contact.id,
      professionId: profession.id,
    })

    await Promise.all([
      professional.load('address'),
      professional.load('contact'),
      professional.load('identity'),
      professional.load('profession'),
    ])

    return professional
  }
}
