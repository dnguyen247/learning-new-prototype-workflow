import { render, screen } from '@testing-library/react'
import BentoGrid from '../BentoGrid'

describe('BentoGrid', () => {
  it('renders the EDC featured card', () => {
    render(<BentoGrid />)
    expect(screen.getByText('Electronic Data Capture')).toBeInTheDocument()
  })

  it('renders all 4 module cards', () => {
    render(<BentoGrid />)
    expect(screen.getByText('eTMF')).toBeInTheDocument()
    expect(screen.getByText('CTMS')).toBeInTheDocument()
    expect(screen.getByText('eCOA')).toBeInTheDocument()
    expect(screen.getByText('RTSM / IRT')).toBeInTheDocument()
  })

  it('renders the EDC compliance description', () => {
    render(<BentoGrid />)
    expect(screen.getByText(/FDA 21 CFR Part 11/)).toBeInTheDocument()
  })
})
