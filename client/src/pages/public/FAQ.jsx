import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/common/Icon'
import TopUtilityBar from '../../components/common/TopUtilityBar'


export default function FAQ() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [openItem, setOpenItem] = useState('General-0')

  const FAQ_DATA = [
    {
      category: t('faqPage.categories.general'),
      items: [
        { q: t('faqPage.q1'), a: t('faqPage.a1') },
        { q: t('faqPage.q2'), a: t('faqPage.a2') },
      ],
    },
    {
      category: t('faqPage.categories.filingTracking'),
      items: [
        { q: t('faqPage.q3'), a: t('faqPage.a3') },
        { q: t('faqPage.q4'), a: t('faqPage.a4') },
        { q: t('faqPage.q5'), a: t('faqPage.a5') },
      ],
    },
    {
      category: t('faqPage.categories.securityMedical'),
      items: [
        { q: t('faqPage.q6'), a: t('faqPage.a6') },
        { q: t('faqPage.q7'), a: t('faqPage.a7') },
      ],
    },
  ]


  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans flex flex-col">
      <TopUtilityBar />

      {/* Official Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto w-full flex items-center gap-4 px-4 py-3 md:py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex shrink-0 size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors"
          >
            <Icon name="arrow_back" size="text-[22px]" />
          </button>

          <div className="flex shrink-0 size-12 rounded-full items-center justify-center bg-[#1a3a6b] shadow-sm">
            <Icon name="train" className="text-white" size="text-2xl" fill />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              {t('common.govIndia')}
            </p>
            <h1 className="text-lg md:text-xl font-bold text-[#1a3a6b] tracking-tight mt-0.5">
              {t('faqPage.infoCenter')}
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-2.5 text-xs flex items-center gap-2">
            <span className="font-semibold text-[#1a3a6b] cursor-pointer hover:underline" onClick={() => navigate('/')}>{t('common.home')}</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-600 font-medium">{t('common.faq')}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-8 pb-20">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a3a6b] tracking-tight mb-2">{t('faqPage.title')}</h2>
            <p className="text-slate-500 font-medium">{t('faqPage.subtitle')}</p>
          </div>
          <button onClick={() => navigate('/file-complaint')} className="px-5 py-2.5 rounded-xl bg-[#ff6b00] text-white text-sm font-bold shadow-sm hover:bg-[#e66000] transition-colors flex items-center gap-2 whitespace-nowrap">
            <Icon name="headset_mic" size="text-lg" />
            {t('faqPage.contactSupport')}
          </button>
        </div>

        <div className="space-y-8">
          {FAQ_DATA.map((section) => (
            <section key={section.category} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-5 py-3.5 bg-[#1a3a6b] border-b border-slate-200 flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-[#ff6b00]" />
                <h3 className="text-white text-sm font-bold uppercase tracking-wide">{section.category}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {section.items.map((item, idx) => {
                  const id = `${section.category}-${idx}`
                  const isOpen = openItem === id
                  return (
                    <div key={id} className="transition-colors">
                      <button
                        onClick={() => setOpenItem(isOpen ? null : id)}
                        className={`w-full text-left px-5 py-4 flex items-start gap-4 transition-colors hover:bg-slate-50 ${isOpen ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className={`mt-0.5 flex items-center justify-center size-6 rounded-full shrink-0 transition-colors ${isOpen ? 'bg-[#ff6b00] text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <Icon name={isOpen ? 'remove' : 'add'} size="text-sm" />
                        </div>
                        <h4 className={`flex-1 text-sm font-bold leading-snug transition-colors ${isOpen ? 'text-[#1a3a6b]' : 'text-slate-700'}`}>
                          {item.q}
                        </h4>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pl-[3.25rem] text-sm text-slate-600 leading-relaxed font-medium bg-blue-50/30">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>Content managed by <strong className="text-slate-700">Railway Board</strong> · Hosted by NIC</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors" onClick={() => navigate('/privacy')}>{t('common.privacyPolicy')}</span>
            <span className="text-slate-300">|</span>
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors">{t('common.termsOfUse')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
