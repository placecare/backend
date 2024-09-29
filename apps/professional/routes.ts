import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProfessionalsController = () =>
  import('#apps/professional/controllers/professionals_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ProfessionalsController, 'index'])
        router.get('/:id', [ProfessionalsController, 'show'])

        router.post('/', [ProfessionalsController, 'store'])
        router.put('/:id', [ProfessionalsController, 'update'])
        router.delete('/:id', [ProfessionalsController, 'destroy'])
      })
      .prefix('/v1/professionals')
  })
  .use(middleware.auth())
