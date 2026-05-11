import { Plus, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center pt-[72px] pb-12 px-10 max-w-[720px] mx-auto">
      <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-500 bg-brand-100 rounded-full px-3 py-1 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        Clinical Data Management Platform
      </div>
      <h1 className="text-[44px] font-extrabold leading-[1.15] tracking-[-0.05em] text-neutral-900 mb-4">
        Run Smarter{' '}
        <span className="text-brand-500">Clinical Trials</span>
      </h1>
      <p className="text-base text-neutral-600 leading-relaxed max-w-[560px] mb-8">
        Talosix EDC unifies your trial data across EDC, eTMF, CTMS, and eCOA —
        giving your team one platform to capture, manage, and analyze with
        confidence.
      </p>
      <div className="flex items-center gap-3">
        <a
          href="#request-demo"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white bg-brand-500 px-6 py-[11px] rounded-[7px] hover:bg-brand-600 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Request Demo
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-neutral-700 border border-neutral-200 px-5 py-[11px] rounded-[7px] hover:bg-neutral-50 transition-colors"
        >
          <Play size={14} fill="#334155" strokeWidth={0} />
          Watch Overview
        </a>
      </div>
    </section>
  )
}
