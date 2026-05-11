import { render, screen } from '@testing-library/react'
import FooterCTA from '../FooterCTA'

describe('FooterCTA', () => {
  it('renders the headline', () => {
    render(<FooterCTA />)
    expect(screen.getByText('Ready to modernize your clinical trials?')).toBeInTheDocument()
  })

  it('renders both action buttons', () => {
    render(<FooterCTA />)
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
    expect(screen.getByText('Talk to Sales')).toBeInTheDocument()
  })
})
