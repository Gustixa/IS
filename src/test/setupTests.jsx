import { expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
    cleanup()
})