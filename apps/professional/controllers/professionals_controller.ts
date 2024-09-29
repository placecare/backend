import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionalService from '#apps/professional/services/professional_service'
import ProfessionalPolicy from '#apps/professional/policies/professional_policy'
import { getProfessionalsValidator } from '#apps/professional/validators/professional'

@inject()
export default class ProfessionalsController {
  constructor(private professionalService: ProfessionalService) {}

  /**
   * Display a list of resource
   */
  async index({ request, bouncer }: HttpContext) {
    await bouncer.with(ProfessionalPolicy).authorize('view' as never)
    const data = await request.validateUsing(getProfessionalsValidator)

    return this.professionalService.findAll(data)
  }

  /**
   * Handle form submission for the create action
   */
  async store({}: HttpContext) {}

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
