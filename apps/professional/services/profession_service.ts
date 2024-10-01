import Profession from '#apps/shared/models/profession'
import ProfessionalType from '#apps/shared/models/profession'

export default class ProfessionService {
  async findAll() {
    return Profession.query().paginate(1, 10)
  }
  async findByName(name: string) {
    return ProfessionalType.findByOrFail('name', name)
  }
}
