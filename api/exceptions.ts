export class AuthenticationError extends Error {
  message = 'You must login'
}

export class AuthorizationError extends Error {
  message = 'You do not have permissions'
}
