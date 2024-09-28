import { Roles } from '#apps/shared/contracts/roles'
import Professional from '#apps/shared/models/professional'
import { test } from '@japa/runner'

test.group('Companies create', () => {
  test('should sucessfully create a company with valid data', async ({ assert, client }) => {
    const professional = await Professional.firstOrFail()
    const response = await client
      .post('/v1/companies')
      .json({
        name: 'Test',
        siret: '398129038',
        approvalNumber: '3737713',
        address: {
          street: 'Paulin daudé',
          postalCode: '48000',
          city: 'Mende',
          region: 'Occitanie',
          country: 'France',
        },
        contact: {
          email: 'nathael@bonnal.cloud',
        },
      })
      .loginAs(professional, [Roles.CREATE_COMPANY])

    assert.properties(response.body(), [
      'id',
      'siret',
      'approvalNumber',
      'name',
      'address',
      'contact',
      'createdAt',
      'updatedAt',
    ])

    assert.deepInclude(
      {
        name: response.body().name,
        siret: response.body().siret,
        approvalNumber: response.body().approvalNumber,
        address: {
          street: response.body().address.street,
          postalCode: response.body().address.postalCode,
          city: response.body().address.city,
          region: response.body().address.region,
          country: response.body().address.country,
        },
        contact: {
          email: response.body().contact.email,
        },
      },
      {
        name: 'Test',
        siret: '398129038',
        approvalNumber: '3737713',
        address: {
          street: 'Paulin daudé',
          postalCode: '48000',
          city: 'Mende',
          region: 'Occitanie',
          country: 'France',
        },
        contact: {
          email: 'nathael@bonnal.cloud',
        },
      }
    )

    response.assertStatus(201)
  })

  test('should fail to create a company with missing data', async ({ assert, client }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .post('/v1/companies')
      .json({
        name: 'Test',
      })
      .loginAs(professional, [Roles.CREATE_COMPANY])

    response.assertStatus(422)
    assert.properties(response.body(), ['errors'])

    assert.includeDeepMembers(response.body().errors, [
      {
        message: 'The siret field must be defined',
        rule: 'required',
        field: 'siret',
      },
      {
        message: 'The approvalNumber field must be defined',
        rule: 'required',
        field: 'approvalNumber',
      },
      {
        message: 'The address field must be defined',
        rule: 'required',
        field: 'address',
      },
      {
        message: 'The contact field must be defined',
        rule: 'required',
        field: 'contact',
      },
    ])
  })

  test('should fail to create a company with not authorized user', async ({ assert, client }) => {
    const professional = await Professional.firstOrFail()

    const response = await client.post('/v1/companies').json({}).loginAs(professional, [])

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'You are not authorized to create companies')
    assert.equal(response.body().code, 'E_COMPANY_FORBIDDEN')
    assert.equal(response.body().status, 403)

    response.assertStatus(403)
  })

  test('should fail to create a company without being authenticated', async ({
    assert,
    client,
  }) => {
    const response = await client.post('/v1/companies').json({})

    assert.properties(response.body(), ['message', 'code', 'status'])
    assert.equal(response.body().message, 'Unauthorized')
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
    assert.equal(response.body().status, 401)
    response.assertStatus(401)
  })
})
