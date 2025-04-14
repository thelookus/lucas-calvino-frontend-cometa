import { afterEach, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
expect.extend(matchers as any)

// Suppress PostCSS warnings during tests
const originalConsoleWarn = console.warn
console.warn = function filterWarnings(msg, ...args) {
  if (typeof msg === 'string' && (
    msg.includes('PostCSS') ||
    msg.includes('Failed to load PostCSS')
  )) {
    return
  }
  return originalConsoleWarn(msg, ...args)
}

afterEach(() => {
  cleanup()
})
