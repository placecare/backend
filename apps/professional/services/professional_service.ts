import { GetProfessionalsSchema } from '#apps/professional/validators/professional'
import Professional from '#apps/shared/models/professional'

export default class ProfessionalService {
  async findAll({ page = 1, limit = 10 }: GetProfessionalsSchema) {
    return Professional.query().paginate(page, limit)
  }
}
