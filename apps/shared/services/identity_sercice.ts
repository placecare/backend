import Identity from '#apps/shared/models/identity'
import { CreateIdentitySchema } from '#apps/shared/validators/identity_validator'

export default class IdentityService {
  async create(payload: CreateIdentitySchema) {
    return Identity.create(payload)
  }
}
