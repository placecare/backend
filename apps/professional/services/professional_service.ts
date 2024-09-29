import { GetProfessionalsSchema } from '#apps/professional/validators/professional'
import Professional from '#apps/shared/models/professional'

export default class ProfessionalService {
  async findAll({ page = 1, limit = 10, companyId }: GetProfessionalsSchema) {
    return Professional.query()
      .if(companyId, (query) => {
        query.whereHas('companies', (builder) => {
          builder.where('company_id', companyId!)
        })
      })
      .paginate(page, limit)
  }
}
