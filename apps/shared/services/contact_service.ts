import Contact from '#apps/shared/models/contact'
import { CreateContactSchema } from '#apps/shared/validators/contact_validator'

export default class ContactService {
  async create(payload: CreateContactSchema) {
    return Contact.create(payload)
  }
}
