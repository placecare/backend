import { Roles } from '#apps/shared/contracts/roles'
import Professional from '#apps/shared/models/professional'
import { test } from '@japa/runner'

test.group('Companies list', () => {
  test('should return unauthorized error when no user is logged in', async ({ assert, client }) => {
    const response = await client.get('/v1/companies')

    assert.properties(response.body(), ['message', 'code', 'status'])

    assert.equal(response.body().message, 'Unauthorized')
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
    assert.equal(response.body().status, 401)

    response.assertStatus(401)
  })

  test('should return forbidden error when a non-authorized professional tries to view companies', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.firstOrFail()
    const response = await client.get('/v1/companies').loginAs(professional, [])

    assert.properties(response.body(), ['message', 'code', 'status'])

    assert.equal(response.body().message, 'You are not authorized to view companies')
    assert.equal(response.body().code, 'E_COMPANY_FORBIDDEN')
    assert.equal(response.body().status, 403)

    response.assertStatus(403)
  })

  test('should return list of companies when an authorized professional is logged in', async ({
    client,
    assert,
  }) => {
    const professional = await Professional.firstOrFail()
    const response = await client.get('/v1/companies').loginAs(professional, [Roles.VIEW_COMPANY])

    response.assertStatus(200)
    assert.properties(response.body(), ['data', 'meta'])
  })
})
