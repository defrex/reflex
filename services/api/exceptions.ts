export class AuthenticationError extends Error {
  message = 'AUTHENTICATION_ERROR'
}

export class AuthorizationError extends Error {
  message = 'AUTHORIZATION_ERROR'
}

export class NotImplementedError extends Error {
  message = 'NOT_IMPLEMENTED_ERROR'
}
