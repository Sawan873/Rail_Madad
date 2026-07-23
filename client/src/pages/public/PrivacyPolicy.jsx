import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/common/Icon'
import TopUtilityBar from '../../components/common/TopUtilityBar'

export default function PrivacyPolicy() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans flex flex-col">
      <TopUtilityBar />

      {/* Official Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto w-full flex items-center gap-4 px-4 py-3 md:py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex shrink-0 size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors"
          >
            <Icon name="arrow_back" size="text-[22px]" />
          </button>

          <div className="flex shrink-0 size-12 rounded-full items-center justify-center bg-[#1a3a6b] shadow-sm">
            <Icon name="policy" className="text-white" size="text-2xl" fill />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              {t('common.govIndia')}
            </p>
            <h1 className="text-lg md:text-xl font-bold text-[#1a3a6b] tracking-tight mt-0.5">
              {t('common.privacyPolicy')}
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-2.5 text-xs flex items-center gap-2">
            <span className="font-semibold text-[#1a3a6b] cursor-pointer hover:underline" onClick={() => navigate('/')}>{t('common.home')}</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-600 font-medium">{t('common.privacyPolicy')}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-8 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-10 prose prose-slate max-w-none">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <Icon name="verified_user" size="text-3xl" className="text-[#1a3a6b]" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">{t('privacyPage.title')}</h2>
                <p className="text-sm font-medium text-slate-500 m-0 mt-1">{t('privacyPage.lastUpdated')}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">{t('privacyPage.h1')}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {t('privacyPage.p1')}
            </p>

            <h3 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide mt-8">{t('privacyPage.h2')}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {t('privacyPage.p2')}
            </p>

            <h3 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide mt-8">{t('privacyPage.h3')}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {t('privacyPage.p3')}
            </p>

            <h3 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide mt-8">{t('privacyPage.h4')}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {t('privacyPage.p4')}
            </p>

            <div className="mt-10 p-5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-4">
              <div className="mt-0.5">
                <Icon name="gavel" size="text-xl" className="text-amber-600" />
              </div>
              <p className="text-sm font-bold text-amber-900 leading-relaxed m-0">
                {t('privacyPage.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>Content managed by <strong className="text-slate-700">Railway Board</strong> · Hosted by NIC</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors" onClick={() => navigate('/faq')}>{t('common.faq')}</span>
            <span className="text-slate-300">|</span>
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors">{t('common.termsOfUse')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
