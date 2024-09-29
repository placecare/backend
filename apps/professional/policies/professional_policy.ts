import { JWTPayload } from '#apps/authentication/contracts/jwt'
import RoleService from '#apps/shared/services/role_service'
import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import ProfessionalException from '#apps/professional/exceptions/professional_exception'
import { Roles } from '#apps/shared/contracts/roles'
import { inject } from '@adonisjs/core'

@inject()
export default class ProfessionalPolicy extends BasePolicy {
  constructor(protected roleService: RoleService) {
    super()
  }

  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new ProfessionalException(response.message, {
        status: response.status,
        code: 'E_PROFESSIONAL_FORBIDDEN',
      })
    }
  }

  async view(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.VIEW_PROFESSIONAL)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to view professionals', 403)
  }
}
