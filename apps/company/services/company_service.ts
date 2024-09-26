import Company from '#apps/shared/models/company'
import { CreateCompanySchema, GetCompaniesSchema } from '#apps/company/validators/company'

export default class CompanyService {
  async findAll({ page = 1, limit = 10 }: GetCompaniesSchema) {
    return Company.query().paginate(page, limit)
  }

  async findById(id: string) {
    return Company.query().where('id', id).preload('professionals').firstOrFail()
  }

  async create(payload: CreateCompanySchema) {
    return Company.create(payload)
  }

  async deleteById(id: string) {
    const company = await this.findById(id)

    return company.delete()
  }
}
