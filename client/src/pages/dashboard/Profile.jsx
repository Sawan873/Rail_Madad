import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/common/Icon'
import { PROFILE_STATS, PROFILE_MENU_SECTIONS } from '../../constants/mockData'
import { useAuth } from '../../context/AuthContext.jsx'
import TopUtilityBar from '../../components/common/TopUtilityBar'
import api from '../../services/api.js'
import { useTranslation } from 'react-i18next'

const GOV_NAVY   = '#1a3a6b'
const GOV_ORANGE = '#FF6600'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, complaintsRes] = await Promise.all([
          api.get('/auth/profile').catch(() => null),
          api.get('/complaints/my-complaints').catch(() => null),
        ])
        if (profileRes?.success && profileRes?.user) setProfileData(profileRes.user)
        if (complaintsRes?.success && complaintsRes?.data) {
          const c = complaintsRes.data
          setStats({
            total: c.length,
            resolved: c.filter(x => x.status === 'Resolved').length,
            pending:  c.filter(x => x.status === 'Pending' || x.status === 'In Progress').length,
          })
        }
      } catch (err) {
        console.error('Error fetching profile data:', err)
      }
    }
    fetchData()
  }, [])

  const displayUser = profileData || user

  const profileStats = [
    { label: t('profile.totalFiled'), value: stats.total,    icon: 'assignment',   accent: GOV_NAVY   },
    { label: t('complaintList.resolved'),    value: stats.resolved,  icon: 'check_circle', accent: '#2a7a2a'  },
    { label: t('dashboard.active'),     value: stats.pending,   icon: 'schedule',     accent: '#9a5800'  },
  ]

  const handleSignOut = () => { logout(); navigate('/') }

  const fullName = displayUser?.firstName
    ? `${displayUser.firstName} ${displayUser.lastName || ''}`.trim()
    : displayUser?.name || 'Traveler'

  return (
    <div style={{ background: '#f0f4f8', fontFamily: i18n.resolvedLanguage === 'ur' ? "'Noto Nastaliq Urdu', serif" : "'Noto Sans', sans-serif", minHeight: '100vh' }}>

      <TopUtilityBar />

      {/* ── Hero profile header ── */}
      <div style={{
        background: `linear-gradient(150deg, ${GOV_NAVY} 0%, #0f2548 60%, #122d58 100%)`,
        borderBottom: `3px solid ${GOV_ORANGE}`,
        position: 'relative',
        overflow: 'hidden',
      }} className="px-4 pt-5 pb-24">
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,102,0,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        {/* back + title */}
        <div className="relative z-10 flex items-center mb-6">
          <button onClick={() => navigate(-1)}
            className="flex size-9 items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 12 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <Icon name="arrow_back" size="text-xl" />
          </button>
          <h2 className="text-white font-bold flex-1 text-center text-sm tracking-wide uppercase">{t('profile.title')}</h2>
          <div className="size-9" />
        </div>

        {/* avatar + identity */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-5">
          <div className="relative">
            <div className="flex size-24 items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 16 }}>
              <Icon name="person" fill className="text-white" size="text-5xl" />
            </div>
            {/* verified badge */}
            <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full"
              style={{ background: GOV_ORANGE, border: '2px solid #fff' }}>
              <Icon name="verified" fill className="text-white" size="text-sm" />
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <h1 className="text-white text-xl font-bold tracking-tight">{fullName}</h1>
            </div>
            <p className="text-sm" style={{ color: '#8aa8d5' }}>{displayUser?.email || t('profile.noEmail')}</p>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs px-3 py-1.5"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#d0dff0', borderRadius: 8 }}>
                <Icon name="phone" size="text-xs" />
                {displayUser?.phoneNumber || t('profile.noPhone')}
              </div>
              <div className="flex items-center gap-1.5 text-xs px-3 py-1.5"
                style={{ background: 'rgba(255,102,0,0.2)', border: `1px solid rgba(255,102,0,0.4)`, color: '#FFB380', borderRadius: 8 }}>
                <Icon name="badge" size="text-xs" />
                RM-IND-2025-00421
              </div>
            </div>
          </div>

          {/* desktop stats inline */}
          <div className="hidden lg:flex gap-3 shrink-0">
            {profileStats.map(({ label, value, icon, accent }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-5 py-3 min-w-[80px]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12 }}>
                <Icon name={icon} fill className="text-white/70" size="text-lg" />
                <p className="text-white text-2xl font-bold leading-none">{value}</p>
                <p className="text-[9px] uppercase tracking-wider text-center" style={{ color: '#8aa8d5' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content card that overlaps hero ── */}
      <div className="relative z-10 px-4 -mt-14 pb-32 lg:pb-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">

          {/* Mobile stats */}
          <div className="lg:hidden grid grid-cols-3 gap-3">
            {profileStats.map(({ label, value, icon, accent }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-4"
                style={{ background: '#fff', border: '1px solid #d4dae5', borderTop: `3px solid ${accent}`, borderRadius: 12 }}>
                <Icon name={icon} fill size="text-xl" style={{ color: accent }} />
                <p className="text-2xl font-bold leading-none" style={{ color: GOV_NAVY }}>{value}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-center" style={{ color: '#8a9aaa' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Menu sections */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-4">
            {PROFILE_MENU_SECTIONS.map((section) => (
              <div key={section.title} style={{ background: '#fff', border: '1px solid #d4dae5', borderRadius: 12, overflow: 'hidden' }}>
                {/* section header */}
                <div className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: GOV_NAVY, borderBottom: `2px solid ${GOV_ORANGE}` }}>
                  <span className="size-1.5 rounded-full shrink-0" style={{ background: GOV_ORANGE }} />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white">{t(`profile.${section.title.toLowerCase()}`, section.title)}</p>
                </div>

                <div className="divide-y" style={{ borderColor: '#edf1f7' }}>
                  {section.items.map(({ icon, label, color, bg, path }) => (
                    <button
                      key={label}
                      onClick={() => path && navigate(path)}
                      className="w-full flex items-center gap-3.5 px-4 py-3 text-left transition-colors"
                      onMouseEnter={e => e.currentTarget.style.background = '#f5f8ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* flat icon box instead of rounded */}
                      <div className="flex size-9 shrink-0 items-center justify-center"
                        style={{ background: '#e8edf8' }}>
                        <Icon name={icon} fill size="text-lg" style={{ color: GOV_NAVY }} />
                      </div>
                      <p className="flex-1 text-sm font-medium" style={{ color: '#1a1a1a' }}>{t(`profile.${({ 'Edit Profile': 'editProfile', 'Change Password': 'changePassword', Notifications: 'notifications', 'Help & FAQ': 'helpFaq', 'Privacy Policy': 'privacyPolicy', 'About Rail Madad': 'about' })[label]}`, label)}</p>
                      <Icon name="chevron_right" size="text-base" style={{ color: '#b0bac8' }} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Activity summary */}
          <div style={{ background: '#fff', border: '1px solid #d4dae5' }}>
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: GOV_NAVY, borderBottom: `2px solid ${GOV_ORANGE}` }}>
              <span className="size-1.5 rounded-full shrink-0" style={{ background: GOV_ORANGE }} />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white">{t('profile.accountActivity')}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: '#edf1f7' }}>
              {[
                { label: t('profile.memberSince'),    value: '12 Jan 2025', icon: 'calendar_today'  },
                { label: t('profile.lastLogin'),      value: t('chat.today'), icon: 'login'         },
                { label: t('profile.accountStatus'),  value: t('profile.verified'),    icon: 'verified_user'  },
                { label: t('profile.helplineCalls'),  value: '2',     icon: 'call'            },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3">
                  <Icon name={icon} size="text-base" style={{ color: GOV_NAVY, flexShrink: 0 }} />
                  <div>
                    <p className="text-[10px]" style={{ color: '#8a9aaa' }}>{label}</p>
                    <p className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sign out — danger but still gov-styled */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
            style={{ background: '#fff0f0', border: '1px solid #e8a0a0', borderLeft: `4px solid #cc2222`, color: '#7a1a1a' }}
            onMouseEnter={e => e.currentTarget.style.background = '#ffe0e0'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff0f0'}
          >
            <Icon name="logout" size="text-base" />
            {t('common.signOut')}
          </button>

          {/* Footer note */}
          <p className="text-center text-[10px]" style={{ color: '#b0bac8' }}>
            Rail Madad v2.0 · Ministry of Railways, Government of India ·{' '}
            <span onClick={() => navigate('/privacy')} style={{ color: GOV_NAVY, cursor: 'pointer', fontWeight: 600 }} className="hover:underline">{t('common.privacyPolicy')}</span>
            <span className="mx-1.5 text-slate-300">|</span>
            <span onClick={() => navigate('/faq')} style={{ color: GOV_NAVY, cursor: 'pointer', fontWeight: 600 }} className="hover:underline">{t('common.faq')}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
