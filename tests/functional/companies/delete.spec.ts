import { Roles } from '#apps/shared/contracts/roles'
import Professional from '#apps/shared/models/professional'
import { test } from '@japa/runner'

test.group('Companies delete', () => {
  test('should sucessfully delete a company with valid id', async ({ client }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .delete('/v1/companies/9890150790490362881976491')
      .loginAs(professional, [Roles.CREATE_COMPANY])

    response.assertStatus(204)
  })

  test('should fail to delete a company with non existing id', async ({ client, assert }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .delete('/v1/companies/1')
      .loginAs(professional, [Roles.CREATE_COMPANY])

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'Row not found')
    assert.equal(response.body().code, 'E_ROW_NOT_FOUND')
    assert.equal(response.body().status, 404)
    response.assertStatus(404)
  })

  test('should fail to delete a company with bad id and no authorized user', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.firstOrFail()

    const response = await client.delete('/v1/companies/1').loginAs(professional, [])

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'You are not authorized to delete companies')
    assert.equal(response.body().code, 'E_COMPANY_FORBIDDEN')
    assert.equal(response.body().status, 403)
    response.assertStatus(403)
  })

  test('should fail to delete a company if the user is not authenticated', async ({
    assert,
    client,
  }) => {
    const response = await client.delete('/v1/companies/1')

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'Unauthorized')
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
    assert.equal(response.body().status, 401)
    response.assertStatus(401)
  })
})
