import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the platform badge', () => {
    render(<Hero />)
    expect(screen.getByText('Clinical Data Management Platform')).toBeInTheDocument()
  })

  it('renders the headline', () => {
    render(<Hero />)
    expect(screen.getByText('Run Smarter')).toBeInTheDocument()
    expect(screen.getByText('Clinical Trials')).toBeInTheDocument()
  })

  it('renders both CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
    expect(screen.getByText('Watch Overview')).toBeInTheDocument()
  })
})
