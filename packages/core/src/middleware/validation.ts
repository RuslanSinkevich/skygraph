import type { Middleware, WriteEvent, NextFn } from '../types'

export type Validator = (event: WriteEvent) => boolean | string

/**
 * Validates writes against a map of path -> validator.
 * If the validator returns false or a string (error message),
 * the write is silently dropped.
 */
export function validationMiddleware(
  validators: Record<string, Validator>,
): Middleware {
  return (event: WriteEvent, next: NextFn) => {
    const validator = validators[event.path]
    if (validator) {
      const result = validator(event)
      if (result === false || typeof result === 'string') {
        return
      }
    }
    next(event)
  }
}
