import { render, screen } from '@testing-library/react'
import { FileText } from 'lucide-react'
import ModuleCard from '../ModuleCard'

const props = {
  icon: FileText,
  iconBg: '#e4d6ff',
  iconColor: '#7733ff',
  title: 'eTMF',
  description: 'Digital Trial Master File.',
  tagLabel: 'Document Management',
  tagBg: '#f1d6ff',
  tagColor: '#7733ff',
}

describe('ModuleCard', () => {
  it('renders the title', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('eTMF')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('Digital Trial Master File.')).toBeInTheDocument()
  })

  it('renders the tag label', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('Document Management')).toBeInTheDocument()
  })
})
