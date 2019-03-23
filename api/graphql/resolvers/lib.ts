interface MutationError {
  message: string
  field?: string
}

interface MutationStatus {
  success: boolean
  errors?: MutationError[]
}

interface MutationResponse {
  status: MutationStatus
}

export function success(kwargs: { [key: string]: any } = {}): MutationResponse {
  return {
    status: {
      success: true,
    },
    ...kwargs,
  }
}

export function fail(error: MutationError): MutationResponse
export function fail(errors: MutationError[]): MutationResponse
export function fail(message: string): MutationResponse
export function fail(field: string, message: string): MutationResponse
export function fail(
  arg1: MutationError | MutationError[] | string,
  arg2?: string,
): MutationResponse {
  return {
    status: {
      success: false,
      errors: Array.isArray(arg1)
        ? arg1
        : typeof arg1 === 'object'
        ? [arg1]
        : typeof arg1 === 'string' && !arg2
        ? [{ message: arg1 }]
        : typeof arg1 === 'string' && arg2
        ? [{ field: arg1, message: arg2 }]
        : undefined,
    },
  }
}
