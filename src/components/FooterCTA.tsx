export default function FooterCTA() {
  return (
    <section
      id="request-demo"
      className="bg-neutral-50 border-t border-neutral-200 text-center px-10 py-10"
    >
      <h2 className="text-[22px] font-bold text-neutral-900 mb-2 tracking-tight">
        Ready to modernize your clinical trials?
      </h2>
      <p className="text-[14px] text-neutral-500 mb-5">
        Join 200+ sponsors, CROs, and sites already running on Talosix.
      </p>
      <div className="flex items-center gap-3 justify-center">
        <a
          href="#"
          className="inline-flex items-center text-[14px] font-semibold text-white bg-brand-500 px-6 py-[11px] rounded-[7px] hover:bg-brand-600 transition-colors"
        >
          Request Demo
        </a>
        <a
          href="#"
          className="inline-flex items-center text-[14px] font-medium text-neutral-700 border border-neutral-200 px-5 py-[11px] rounded-[7px] hover:bg-neutral-50 transition-colors"
        >
          Talk to Sales
        </a>
      </div>
    </section>
  )
}
