import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CompaniesController = () => import('#apps/company/controllers/companies_controller')
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [CompaniesController, 'index'])
        router.get('/:id', [CompaniesController, 'show'])
        router.post('/', [CompaniesController, 'store'])
      })
      .prefix('/v1/companies')
  })
  .use(middleware.auth())
