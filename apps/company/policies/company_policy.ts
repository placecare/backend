import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import RoleService from '#apps/shared/services/role_service'
import { inject } from '@adonisjs/core'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import { Roles } from '#apps/shared/contracts/roles'
import CompanyException from '#apps/company/exceptions/company_exception'

@inject()
export default class CompanyPolicy extends BasePolicy {
  constructor(protected roleService: RoleService) {
    super()
  }

  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new CompanyException(response.message, {
        status: response.status,
        code: 'E_COMPANY_FORBIDDEN',
      })
    }
  }

  async view(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.VIEW_COMPANY)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to view companies', 403)
  }

  async create(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.CREATE_COMPANY)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to create companies', 403)
  }

  async update(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.CREATE_COMPANY)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to update companies', 403)
  }

  async delete(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.CREATE_COMPANY)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to delete companies', 403)
  }
}
