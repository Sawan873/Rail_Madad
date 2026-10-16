import Icon from '../../../components/common/Icon'
import { useTranslation } from 'react-i18next'

const GOV_NAVY = '#0f2747'
const GOV_ORANGE = '#ff6b00'

export default function ContactSection() {
  const { t } = useTranslation()
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
      style={{
        background: '#f4f7fb',
      }}
    >
      {/* DECOR */}

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'rgba(15,39,71,0.05)',
          transform: 'translate(30%, -40%)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'rgba(255,107,0,0.05)',
          transform: 'translate(-40%, 40%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* HEADER */}

        <div className="text-center mb-16">
          
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6"
            style={{
              background: '#fff',
              border: '1px solid #e5eaf2',
            }}
          >
            <div
              className="size-2 rounded-full"
              style={{
                background: GOV_ORANGE,
              }}
            />

            <span
              className="text-xs font-black uppercase tracking-[0.18em]"
              style={{
                color: GOV_NAVY,
              }}
            >
              Citizen Support Services
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{
              color: '#0f172a',
            }}
          >
            {t('landing.needAssistance')}
          </h2>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            {t('landing.contactBody')}
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          
          {/* LEFT SIDE */}

          <div className="space-y-6">
            
            {/* SUPPORT CARD */}

            <div
              className="rounded-[2rem] p-8 shadow-sm"
              style={{
                background: '#fff',
                border: '1px solid #e5eaf2',
              }}
            >
              <div className="flex items-start gap-5">
                
                <div
                  className="size-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: '#eef3fb',
                  }}
                >
                  <Icon
                    name="support_agent"
                    fill
                    size="text-3xl"
                    style={{
                      color: GOV_NAVY,
                    }}
                  />
                </div>

                <div>
                  <h3
                    className="text-2xl font-black"
                    style={{
                      color: GOV_NAVY,
                    }}
                  >
                    {t('landing.railwaySupport')}
                  </h3>

                  <p className="text-slate-500 mt-3 leading-relaxed">
                    Our support team is dedicated to providing
                    citizens with fast and efficient grievance
                    resolution services across Indian Railways.
                  </p>
                </div>
              </div>

              {/* CONTACT INFO */}

              <div className="space-y-5 mt-8">
                
                {[
                  {
                    icon: 'call',
                    title: t('landing.helpline'),
                    value: '139 (Toll Free)',
                  },

                  {
                    icon: 'mail',
                    title: t('landing.officialEmail'),
                    value:
                      'support@railmadad.gov.in',
                  },

                  {
                    icon: 'schedule',
                    title: t('landing.supportHours'),
                    value: '24×7 Citizen Support',
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: '#f8fafc',
                    }}
                  >
                    <div
                      className="size-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: '#eef3fb',
                      }}
                    >
                      <Icon
                        name={item.icon}
                        fill
                        size="text-xl"
                        style={{
                          color: GOV_NAVY,
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500 font-bold">
                        {item.title}
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE FORM */}

          <div
            className="relative rounded-[2.5rem] p-8 lg:p-10 shadow-xl overflow-hidden"
            style={{
              background:
                'rgba(255,255,255,0.75)',

              backdropFilter: 'blur(16px)',

              border:
                '1px solid rgba(255,255,255,0.6)',
            }}
          >
            {/* DECOR */}

            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(255,107,0,0.08)',
              }}
            />

            <div className="relative z-10">
              
              {/* FORM HEADER */}

              <div className="mb-8">
                
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                  style={{
                    background: '#eef3fb',
                  }}
                >
                  <Icon
                    name="mail"
                    fill
                    size="text-base"
                    style={{
                      color: GOV_NAVY,
                    }}
                  />

                  <span
                    className="text-xs font-bold uppercase tracking-[0.16em]"
                    style={{
                      color: GOV_NAVY,
                    }}
                  >
                    {t('landing.contactForm')}
                  </span>
                </div>

                <h3
                  className="text-3xl font-black"
                  style={{
                    color: '#0f172a',
                  }}
                >
                  {t('landing.query')}
                </h3>

                <p className="text-slate-500 mt-3 leading-relaxed">
                  {t('landing.queryBody')}
                </p>
              </div>

              {/* FORM */}

              <div className="space-y-5">
                
                {/* NAME */}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('landing.fullName')}
                  </label>

                  <div className="relative">
                    <Icon
                      name="person"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size="text-lg"
                    />

                    <input
                      type="text"
                      placeholder={t('landing.enterName')}
                      autoComplete="name"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:ring-2 transition-all"
                      style={{
                        focusRingColor:
                          'rgba(15,39,71,0.2)',
                      }}
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('landing.emailAddress')}
                  </label>

                  <div className="relative">
                    <Icon
                      name="mail"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size="text-lg"
                    />

                    <input
                      type="email"
                      placeholder={t('landing.enterEmail')}
                      autoComplete="email"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('landing.message')}
                  </label>

                  <div className="relative">
                    <Icon
                      name="chat"
                      className="absolute left-4 top-5 text-slate-400"
                      size="text-lg"
                    />

                    <textarea
                      rows="5"
                      placeholder={t('landing.describeIssue')}
                      className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-4 outline-none resize-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>

                {/* BUTTON */}

                <button
                  className="w-full h-14 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 shadow-sm transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: GOV_NAVY,
                  }}
                >
                  <span>{t('landing.submitInquiry')}</span>

                  <Icon
                    name="send"
                    size="text-lg"
                  />
                </button>

                {/* FOOT NOTE */}

                <p className="text-xs text-center text-slate-400 leading-relaxed">
                  {t('landing.submitPolicies')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
