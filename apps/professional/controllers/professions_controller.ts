import { HttpContext } from '@adonisjs/core/http'
import ProfessionService from '#apps/professional/services/profession_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ProfessionsController {
  constructor(protected professionService: ProfessionService) {}
  async index({}: HttpContext) {
    return this.professionService.findAll()
  }
}
