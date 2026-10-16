import { useNavigate } from 'react-router-dom'
import { GradientPanel } from '../../components/layout'
import { Icon, StatusBadge } from '../../components/common'
import TopUtilityBar from '../../components/common/TopUtilityBar'
import { useTranslation } from 'react-i18next'

export default function AIAnalysisResult() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 animate-fade-in">
      <TopUtilityBar />
      <GradientPanel title={t('chat.title')}>
        {/* AI icon + status */}
        <div className="px-4 pb-8 pt-2 flex flex-col lg:flex-row lg:items-center lg:gap-10 lg:pb-10 animate-bounce-in">
          <div className="flex justify-center lg:justify-start shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
              <div className="relative size-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center backdrop-blur-sm">
                <Icon name="smart_toy" fill className="text-white" size="text-5xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 size-9 rounded-full bg-green-400 border-4 border-white dark:border-slate-900 flex items-center justify-center">
                <Icon name="check_circle" fill className="text-white" size="text-base" />
              </div>
            </div>
          </div>
          <div className="mt-5 lg:mt-0 text-center lg:text-left">
            <h1 className="text-white text-xl lg:text-2xl font-black">{t('ai.title')}</h1>
            <p className="text-blue-100/80 text-xs lg:text-sm mt-1">{t('ai.accuracy')}</p>
            <div className="hidden lg:flex items-center gap-1 mt-3 bg-green-400/20 border border-green-400/30 px-3 py-1.5 rounded-full w-fit">
              <Icon name="verified" fill className="text-green-300" size="text-sm" />
              <span className="text-green-200 text-xs font-bold">{t('ai.created')}</span>
            </div>
          </div>
        </div>
      </GradientPanel>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
        <div className="p-4 max-w-4xl mx-auto animate-slide-up">
          <div className="card overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-primary/[0.04] border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="analytics" fill className="text-primary" size="text-sm" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-primary">{t('ai.report')}</span>
              </div>
              <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded-full">
                <Icon name="priority_high" fill className="text-red-600" size="text-xs" />
                <span className="text-[10px] font-black text-red-600 dark:text-red-400">{t('ai.urgency')}</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-black text-lg">{t('ai.understood')}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: 'cleaning_services', label: t('ai.issue'),   value: t('ai.cleanliness', 'Cleanliness Issue'), color: 'bg-blue-50   dark:bg-blue-900/20   text-blue-600' },
                  { icon: 'fingerprint',        label: t('ai.complaintId'), value: 'RM-2025-48291',     color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
                  { icon: 'group',              label: t('ai.department'),   value: t('ai.housekeeping', 'Housekeeping'),      color: 'bg-green-50  dark:bg-green-900/20  text-green-600' },
                  { icon: 'schedule',           label: t('ai.status'),       value: t('ai.pending'),    color: 'bg-amber-50  dark:bg-amber-900/20  text-amber-600' },
                ].map(({ icon, label, value, color }) => (
                  <div key={label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                    <div className={`size-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
                      <Icon name={icon} size="text-base" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">{label}</p>
                    <p className="text-sm font-bold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  &ldquo;{t('ai.quote')}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/complaints')}
            className="btn-primary mt-4 w-full h-14 text-base flex items-center justify-center gap-2"
          >
            <Icon name="track_changes" fill size="text-xl" />
            {t('ai.track')}
          </button>
        </div>
      </div>
    </div>
  )
}
