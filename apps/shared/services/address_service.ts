import Address from '#apps/shared/models/address'
import { CreateAddressSchema } from '#apps/shared/validators/address_validator'

export default class AddressService {
  async create(payload: CreateAddressSchema) {
    return Address.create(payload)
  }
}
