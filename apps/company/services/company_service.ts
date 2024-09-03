import Company from '#apps/company/models/company'

export default class CompanyService {
  async findAll() {
    return Company.query().paginate(1, 10)
  }
}
