import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CompanyService from '#apps/company/services/company_service'
import {
  createCompanyValidator,
  getCompaniesValidator,
  updateCompanyValidator,
} from '#apps/company/validators/company'
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
   * @show
   * @operationId getCompany
   */
  async show({ params, bouncer }: HttpContext) {
    const { id } = params
    await bouncer.with(CompanyPolicy).authorize('view' as never)
    return this.companyService.findById(id)
  }

  /**
   * @create
   */
  async store({ request, bouncer, response }: HttpContext) {
    await bouncer.with(CompanyPolicy).authorize('create' as never)
    const data = await request.validateUsing(createCompanyValidator)

    const company = await this.companyService.create(data)
    return response.created(company)
    //return this.companyService.create(data)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, bouncer, params }: HttpContext) {
    await bouncer.with(CompanyPolicy).authorize('update' as never)
    const data = await request.validateUsing(updateCompanyValidator)
    const { id } = params

    return this.companyService.updateById(id, data)
  }

  /**
   * Delete record
   */
  async delete({ bouncer, params, response }: HttpContext) {
    await bouncer.with(CompanyPolicy).authorize('delete' as never)
    await this.companyService.deleteById(params.id)

    return response.noContent()
  }
}
