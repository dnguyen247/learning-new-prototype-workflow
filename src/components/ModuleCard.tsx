import { LucideIcon } from 'lucide-react'

interface ModuleCardProps {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  tagLabel: string
  tagBg: string
  tagColor: string
}

export default function ModuleCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  tagLabel,
  tagBg,
  tagColor,
}: ModuleCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 overflow-hidden">
      <div
        className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} color={iconColor} strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-bold text-neutral-900 mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-[12px] text-neutral-500 leading-relaxed">
        {description}
      </p>
      <span
        className="inline-block mt-2.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
        style={{ backgroundColor: tagBg, color: tagColor }}
      >
        {tagLabel}
      </span>
    </div>
  )
}
