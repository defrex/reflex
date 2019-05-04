export class TypedError extends Error {
  static type = 'ERROR'

  constructor(...args: any[]) {
    super(...args)

    const klass = this.constructor as typeof TypedError
    if (this.message) {
      this.message = `${klass.type}:${this.message}`
    } else {
      this.message = klass.type
    }
  }
}

export class AuthenticationError extends TypedError {
  static type = 'AUTHENTICATION_ERROR'
}

export class AuthorizationError extends TypedError {
  static type = 'AUTHORIZATION_ERROR'
}

export class NotImplementedError extends TypedError {
  static type = 'NOT_IMPLEMENTED_ERROR'
}

export class GithubError extends TypedError {
  static type = 'GITHUB_ERROR'
}
