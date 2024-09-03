import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
//import CompanyService from '#apps/company/services/company_service'

@inject()
export default class CompaniesController {
  //constructor(private companyService: CompanyService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

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
