import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionalService from '#apps/professional/services/professional_service'
import ProfessionalPolicy from '#apps/professional/policies/professional_policy'
import {
  createProfessionalValidator,
  getProfessionalsValidator,
} from '#apps/professional/validators/professional'

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
  async store({ request, bouncer, response }: HttpContext) {
    await bouncer.with(ProfessionalPolicy).authorize('create' as never)
    const data = await request.validateUsing(createProfessionalValidator)
    const professional = await this.professionalService.create(data)

    return response.created(professional)
  }

  /**
   * Show individual record
   */
  async show({ params, bouncer }: HttpContext) {
    await bouncer.with(ProfessionalPolicy).authorize('view' as never)
    return this.professionalService.findById(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
