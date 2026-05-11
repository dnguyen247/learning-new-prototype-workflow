import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the Talosix logo image', () => {
    render(<Navbar />)
    expect(screen.getByAltText('Talosix')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Solutions')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })

  it('renders right-side actions', () => {
    render(<Navbar />)
    expect(screen.getByText('Login to EDC')).toBeInTheDocument()
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
  })
})
