import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import FooterCTA from '@/components/FooterCTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <FooterCTA />
    </main>
  )
}
