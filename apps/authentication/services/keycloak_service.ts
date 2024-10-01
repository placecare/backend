import keycloakConfig from '#config/keycloak'
import KeycloakException from '../exceptions/keycloak_exception.js'

type WellKnownKeyResponse = {
  keys: {
    'kid': string
    'kty': string
    'alg': string
    'use': string
    'n': string
    'e': string
    'x5c': string[]
    'x5t': string
    'x5t#S256': string
  }[]
}

export type KeycloakConfig = {
  realm?: string
  url?: string
  clientId?: string
  clientSecret?: string
  admin: {
    clientId?: string
    clientSecret?: string
  }
}

export interface KeycloakResponseToken {
  'access_token': string
  'expires_in': number
  'refresh_expires_in': number
  'refresh_token': string
  'token_type': string
  'not-before-policy': number
  'session_state': string
  'scope': string
}

export type KeycloakCreateUserRequest = {
  username: string
  email: string
  enabled: boolean
  firstName: string
  lastName: string
}

export default class KeycloakService {
  private publicCert?: string

  async getPublicCert(): Promise<string> {
    return this.publicCert ?? (await this.fetchOidcCert())
  }

  private async fetchOidcCert(): Promise<string> {
    const url = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/certs`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch OIDC certs')
    }

    const data: WellKnownKeyResponse = (await response.json()) as WellKnownKeyResponse
    const rs256key = data.keys.filter((key) => key.alg === 'RS256')

    if (!rs256key) {
      throw new Error('RS256 key not found')
    }

    this.publicCert = rs256key[0].x5c[0]

    return this.publicCert
  }

  async createAccessToken(username: string, password: string): Promise<string> {
    var urlencoded = new URLSearchParams()
    urlencoded.append('grant_type', 'password')
    urlencoded.append('client_id', keycloakConfig.clientId!)
    urlencoded.append('client_secret', keycloakConfig.clientSecret!)
    urlencoded.append('username', username)
    urlencoded.append('password', password)

    var requestOptions = {
      method: 'POST',
      body: urlencoded,
    }

    const response = await fetch(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      requestOptions
    )

    const data: KeycloakResponseToken = (await response.json()) as KeycloakResponseToken

    return data.access_token
  }

  private async getAdminToken() {
    const url = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`

    const data = {
      grant_type: 'client_credentials',
      client_id: keycloakConfig.clientId!,
      client_secret: keycloakConfig.clientSecret!,
    }

    const response = await fetch(url, {
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const result: any = await response.json()

    return result.access_token
  }

  async createUser(user: KeycloakCreateUserRequest) {
    const url = `${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users`

    const token = await this.getAdminToken()

    const parsedUser: KeycloakCreateUserRequest = {
      ...user,
      lastName: user.lastName.replace(' ', '-'),
      firstName: user.firstName.replace(' ', '-'),
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(parsedUser),
    })

    if (!response.ok) {
      const text = await response.text()
      const textParsed = JSON.parse(text)
      throw new KeycloakException(textParsed.errorMessage || 'failed to create user', {
        status: response.status,
        code: 'E_KEYCLOAK_CREATE_USER',
      })
    }

    const locationHeader = response.headers.get('location')

    if (!locationHeader) {
      throw new KeycloakException('Location header not found', {
        status: 500,
        code: 'E_KEYCLOAK_CREATE_USER',
      })
    }

    return locationHeader.split('/').pop()
  }
}
