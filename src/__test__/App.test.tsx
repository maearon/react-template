import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    expect(screen.getByText('Unit')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()
  })
})
