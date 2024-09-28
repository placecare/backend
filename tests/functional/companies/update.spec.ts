import { Roles } from '#apps/shared/contracts/roles'
import Professional from '#apps/shared/models/professional'
import { test } from '@japa/runner'

test.group('Companies update', () => {
  test('should sucessfully update a company with valid data', async ({ assert, client }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .put('/v1/companies/9890153540490362881974927')
      .json({
        name: 'New Hopital de Montpellier',
      })
      .loginAs(professional, [Roles.CREATE_COMPANY])

    response.assertStatus(200)

    assert.deepInclude(response.body(), {
      name: 'New Hopital de Montpellier',
    })
  })

  test('should fail to update a company with non existing id', async ({ client, assert }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .put('/v1/companies/1')
      .json({
        name: 'New Hopital de Montpellier',
      })
      .loginAs(professional, [Roles.CREATE_COMPANY])

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'Row not found')
    assert.equal(response.body().code, 'E_ROW_NOT_FOUND')
    assert.equal(response.body().status, 404)

    response.assertStatus(404)
  })

  test('should fail to update a company with bad id and no authorized user', async ({
    client,
    assert,
  }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .put('/v1/companies/1')
      .json({
        name: 'New Hopital de Montpellier',
      })
      .loginAs(professional, [])

    response.assertStatus(403)

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'You are not authorized to update companies')
    assert.equal(response.body().code, 'E_COMPANY_FORBIDDEN')
    assert.equal(response.body().status, 403)
  })

  test('should fail to update a company if the user is not authenticated', async ({
    client,
    assert,
  }) => {
    const response = await client.put('/v1/companies/1').json({})

    response.assertStatus(401)

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'Unauthorized')
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
    assert.equal(response.body().status, 401)
  })
})
