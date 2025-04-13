import { afterEach, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
expect.extend(matchers as any)

afterEach(() => {
  cleanup()
})
