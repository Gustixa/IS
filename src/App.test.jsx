import App from './App'
import { render, screen } from '@test/utils'
import userEvent from '@testing-library/user-event'

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
  })

})
