import { HeartPulse, FileText, FlaskConical, Stethoscope, PackageOpen } from 'lucide-react'
import ModuleCard from './ModuleCard'

const modules = [
  {
    icon: FileText,
    iconBg: '#e4d6ff',
    iconColor: '#7733ff',
    title: 'eTMF',
    description: 'Digital Trial Master File aligned to DIA Reference Model. Automated completeness tracking with role-based access.',
    tagLabel: 'Document Management',
    tagBg: '#f1d6ff',
    tagColor: '#7733ff',
  },
  {
    icon: FlaskConical,
    iconBg: '#ccebd6',
    iconColor: '#009933',
    title: 'CTMS',
    description: 'Track sites, subjects, visits, and milestones. Real-time enrollment dashboards and budget management.',
    tagLabel: 'Trial Management',
    tagBg: '#ccebd6',
    tagColor: '#007a29',
  },
  {
    icon: Stethoscope,
    iconBg: '#fff5cc',
    iconColor: '#cc6600',
    title: 'eCOA',
    description: 'Patient and clinician-reported outcomes on any device. Offline support and multilingual questionnaires.',
    tagLabel: 'Patient Outcomes',
    tagBg: '#fff5cc',
    tagColor: '#994d00',
  },
  {
    icon: PackageOpen,
    iconBg: '#cceeff',
    iconColor: '#0088cc',
    title: 'RTSM / IRT',
    description: 'Randomization and trial supply management integrated with your EDC data for end-to-end trial control.',
    tagLabel: 'Randomization',
    tagBg: '#cceeff',
    tagColor: '#006699',
  },
]

const mockRows = [
  { id: 'inprogress', dot: '#3355ff', badgeBg: '#d6ddff', width: '55%' },
  { id: 'complete',   dot: '#009933', badgeBg: '#ccebd6', width: '70%' },
  { id: 'pending',    dot: '#ff7f00', badgeBg: '#ffe6cc', width: '40%' },
  { id: 'na',         dot: '#94a3b8', badgeBg: '#f1f5f9', width: '62%' },
]

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-[1.55fr_1fr_1fr] grid-rows-2 gap-3 px-10 pb-16 max-w-[1000px] mx-auto">
      <div className="row-span-2 bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col gap-3">
        <div className="w-10 h-10 bg-brand-500 rounded-[10px] flex items-center justify-center">
          <HeartPulse size={20} color="white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
          Electronic Data Capture
        </h3>
        <p className="text-[13px] text-neutral-600 leading-relaxed">
          Build and deploy eCRFs in minutes. Real-time data validation, query
          management, and audit trails built for FDA 21 CFR Part 11 compliance.
        </p>
        <div className="mt-auto flex-1 bg-white border border-neutral-200 rounded-lg p-3 flex flex-col gap-2">
          <p className="text-[9px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">
            Subject Data — Visit 2
          </p>
          {mockRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: row.dot }} />
              <div className="h-1.5 rounded bg-neutral-200 flex-1" style={{ maxWidth: row.width }} />
              <span className="w-9 h-3.5 rounded flex-shrink-0" style={{ backgroundColor: row.badgeBg }} />
            </div>
          ))}
          <div className="flex gap-1.5 mt-2 pt-2 border-t border-neutral-200">
            <div className="w-14 h-6 bg-brand-500 rounded-md" />
            <div className="w-10 h-6 border border-neutral-200 rounded-md" />
          </div>
        </div>
      </div>
      {modules.map((mod) => (
        <ModuleCard key={mod.title} {...mod} />
      ))}
    </div>
  )
}
