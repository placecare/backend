import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CompanyService from '#apps/company/services/company_service'
import { createCompanyValidator, getCompaniesValidator } from '#apps/company/validators/company'
import CompanyPolicy from '#apps/company/policies/company_policy'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  /**
   * @index
   * @operationId getCompanies
   * @description Returns array of companies
   * @responseBody 200 - <Company[]>.paginated()
   * @paramUse(sortable, filterable)
   * @responseHeader 200 - @use(paginated)
   * @responseHeader 200 - X-pages - A description of the header - @example(test)
   */
  async index({ request, bouncer }: HttpContext) {
    await bouncer.with(CompanyPolicy).authorize('view' as never)
    const data = await request.validateUsing(getCompaniesValidator)
    return this.companyService.findAll(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    return this.companyService.findById(id)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, bouncer }: HttpContext) {
    await bouncer.with(CompanyPolicy).authorize('create' as never)
    const data = await request.validateUsing(createCompanyValidator)

    return data
    //return this.companyService.create(data)
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
