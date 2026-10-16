import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GradientPanel } from '../../components/layout'
import { Icon, InfoBanner } from '../../components/common'
import TopUtilityBar from '../../components/common/TopUtilityBar'
import { SENTIMENTS } from '../../constants/mockData'
import { useTranslation } from 'react-i18next'

export default function FeedbackRating() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(-1)
  const [comment, setComment] = useState('')

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <TopUtilityBar />
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <GradientPanel title="">
          <div className="px-4 pb-6 text-center">
            <div className="inline-flex items-center justify-center size-16 rounded-3xl bg-white/20 border border-white/30 mb-4">
              <Icon name="rate_review" fill className="text-white" size="text-4xl" />
            </div>
            <h1 className="text-white text-2xl font-extrabold tracking-tight">{t('feedback.title')}</h1>
            <p className="text-white/70 text-sm mt-1">{t('feedback.subtitle')}</p>
          </div>
        </GradientPanel>

        {/* White bottom sheet */}
        <div className="-mt-6 lg:mt-0 flex-1 rounded-t-[32px] lg:rounded-none bg-white dark:bg-slate-900 pt-8 pb-32 lg:pb-8">
          <div className="max-w-2xl mx-auto px-5">
            {/* Sentiment picker */}
            <div className="mb-8">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-5 text-center">
                {t('feedback.prompt')}
              </p>
              <div className="flex justify-between items-center">
                {SENTIMENTS.map(({ icon, label, activeColor, activeBg }, i) => {
                  const isActive = i === selected
                  return (
                    <button key={label} onClick={() => setSelected(i)} className="flex flex-col items-center gap-2">
                      <div
                        className={`flex size-14 items-center justify-center rounded-2xl transition-all duration-200 ${
                          isActive ? `${activeBg} scale-110 shadow-card` : 'bg-slate-100 dark:bg-slate-800 hover:scale-105'
                        }`}
                      >
                        <Icon
                          name={icon}
                          fill={isActive}
                          className={`transition-colors ${isActive ? activeColor : 'text-slate-400'}`}
                          size="text-3xl"
                        />
                      </div>
                      <span className={`text-[11px] font-bold transition-colors ${isActive ? activeColor : 'text-slate-400'}`}>
                        {t(`feedback.${label.toLowerCase()}`, label)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">{t('feedback.comments')}</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder={t('feedback.placeholder')}
                className="input-field w-full !h-auto resize-none pt-4 text-sm"
              />
            </div>

            {/* Tip */}
            <InfoBanner className="mb-8" icon="info">
              {t('feedback.anonymous')}
            </InfoBanner>

            {/* Submit */}
            <button onClick={() => navigate('/home')} className="btn-primary w-full flex items-center justify-center gap-2">
              <Icon name="send" fill />
              {t('feedback.submit')}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-4">{t('feedback.powered')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
