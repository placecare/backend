import { Roles } from '#apps/shared/contracts/roles'
import Professional from '#apps/shared/models/professional'
import { test } from '@japa/runner'

test.group('Professionals list', () => {
  test('should return a list of professionals', async ({ client, assert }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .get('/v1/professionals')
      .loginAs(professional, [Roles.VIEW_PROFESSIONAL])

    response.assertStatus(200)

    assert.properties(response.body(), ['data', 'meta'])
  })

  // not authorized user
  test('should fail to return a list of professionals with no authorized user', async ({
    client,
    assert,
  }) => {
    const professional = await Professional.firstOrFail()

    const response = await client.get('/v1/professionals').loginAs(professional, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'code', 'status'])

    assert.equal(response.body().message, 'You are not authorized to view professionals')
    assert.equal(response.body().code, 'E_PROFESSIONAL_FORBIDDEN')
    assert.equal(response.body().status, 403)
  })

  test('should fail to return a list of professionals without being authenticated', async ({
    assert,
    client,
  }) => {
    const response = await client.get('/v1/professionals')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'code', 'status'])

    assert.equal(response.body().message, 'Unauthorized')
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
    assert.equal(response.body().status, 401)
  })
})
