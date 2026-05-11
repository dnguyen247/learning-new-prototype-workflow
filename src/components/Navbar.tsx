import Image from 'next/image'

const navLinks = ['Products', 'Solutions', 'Customers', 'Pricing']

export default function Navbar() {
  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-8 h-[60px] border-b border-neutral-200 bg-white">
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/logo.svg"
            alt="Talosix"
            width={119}
            height={27}
            priority
            className="h-6 w-auto"
          />
        </a>
      </div>
      <div className="flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2.5 justify-end">
        <a
          href="#"
          className="text-[13px] font-medium text-neutral-600 px-3.5 py-[7px] rounded-[6px] border border-neutral-200 hover:bg-neutral-50 transition-colors whitespace-nowrap"
        >
          Login to EDC
        </a>
        <a
          href="#request-demo"
          className="text-[13px] font-semibold text-white bg-brand-500 px-4 py-[7px] rounded-[6px] hover:bg-brand-600 transition-colors whitespace-nowrap"
        >
          Request Demo
        </a>
      </div>
    </nav>
  )
}
