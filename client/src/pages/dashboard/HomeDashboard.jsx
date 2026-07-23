import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import BottomNav from '../../components/navigation/BottomNav.jsx'
import Icon from '../../components/common/Icon.jsx'
import TopUtilityBar from '../../components/common/TopUtilityBar.jsx'
import { useTranslation } from 'react-i18next'
import api from '../../services/api.js'

export default function HomeDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toggleSidebar } = useOutletContext()
  const [profileData, setProfileData] = useState(null)
  const [stats, setStats] = useState({ active: 0, resolved: 0, total: 0 })
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile')
        if (res.success && res.user) {
          setProfileData(res.user)
        }
      } catch (err) {
        console.error(err)
      }
    }

    const fetchStats = async () => {
      try {
        const res = await api.get('/complaints/my-complaints/stats')
        if (res.success && res.data) {
          const { Pending = 0, InProgress = 0, Resolved = 0, Total = 0 } = res.data
          setStats({
            active: Pending + InProgress,
            resolved: Resolved,
            total: Total
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchProfile()
    fetchStats()
  }, [])

  const displayUser = profileData || user

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans">
      <TopUtilityBar />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-4 px-4 py-3 md:py-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors"
          >
            <Icon name="menu" size="text-[24px]" />
          </button>

          <div className="hidden sm:flex shrink-0 size-12 rounded-full items-center justify-center bg-[#1a3a6b] shadow-sm">
            <Icon name="train" className="text-white" size="text-2xl" fill />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              {t('common.govIndia')}
            </p>
            <h1 className="text-lg md:text-xl font-bold text-[#1a3a6b] tracking-tight mt-0.5">
              {t('common.portalName')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[10px] font-bold text-white px-3 py-1.5 rounded-full bg-[#ff6b00] shadow-sm uppercase tracking-wide">
              Official Portal
            </span>
            <button className="relative flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors">
              <Icon name="notifications" size="text-[22px]" />
              <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Nav Bar */}
        <nav className="hidden md:flex items-center overflow-x-auto bg-[#1a3a6b]">
          {[
            { label: t('common.home'), icon: 'home', active: true },
            { label: t('common.fileComplaint'), icon: 'add_circle', path: '/file-complaint' },
            { label: t('common.trackComplaint'), icon: 'track_changes', path: '/complaints' },
            { label: t('common.pnrEnquiry'), icon: 'confirmation_number' },
            { label: t('common.about'), icon: 'info' },
            { label: t('common.contact'), icon: 'call' },
          ].map(({ label, icon, active, path }) => (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 ${
                active ? 'bg-[#ff6b00] text-white' : 'text-blue-100 hover:bg-[#254d8c] hover:text-white'
              }`}
            >
              <Icon name={icon} size="text-[18px]" />
              {label}
            </button>
          ))}
        </nav>

        {/* Breadcrumb */}
        <div className="px-6 py-2.5 text-xs flex items-center gap-2 bg-slate-50 border-b border-slate-200">
          <span className="font-semibold text-[#1a3a6b] cursor-pointer hover:underline">{t('common.home')}</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-600 font-medium">{t('common.citizenDashboard')}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 lg:p-6 space-y-6 pb-28">
        
        {/* Notice Banner */}
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
          <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Icon name="info" size="text-lg" className="text-amber-600" />
          </div>
          <p className="text-sm text-amber-800 font-medium">
            <strong className="font-bold">Official Notice:</strong> All grievances are acknowledged within 24 hours. Railway Helpline: <strong className="font-bold text-amber-900">139</strong>
          </p>
        </div>

        {/* Hero Dashboard Section */}
        <section className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#1a3a6b] to-[#254d8c] shadow-md border border-[#1a3a6b]/20">
          {/* Subtle background decoration */}
          <Icon name="train" size="text-[180px]" className="absolute -right-8 -bottom-8 text-white opacity-[0.03]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="text-white">
              <p className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-xs font-semibold uppercase tracking-wider text-blue-100 mb-3 border border-white/10">
                <Icon name="verified_user" size="text-sm" />
                {t('nav.citizen')} Account
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {t('dashboard.welcome')}, {displayUser?.firstName || displayUser?.name || 'Traveler'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-blue-200 bg-black/20 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                <Icon name="badge" size="text-sm" />
                <span>RM ID: <strong className="text-white">RM-IND-2025-00421</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              {[
                { icon: 'pending_actions', value: stats.active.toString(), label: t('dashboard.active'), color: 'text-amber-400' },
                { icon: 'task_alt', value: stats.resolved.toString(), label: t('dashboard.resolved'), color: 'text-green-400' },
                { icon: 'assessment', value: stats.total.toString(), label: 'TOTAL', color: 'text-blue-300' },
              ].map(({ icon, value, label, color }) => (
                <div key={label} className="rounded-xl px-4 py-4 min-w-[110px] bg-white/10 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                  <Icon name={icon} size="text-xl" className={`mb-2 ${color}`} />
                  <p className="text-2xl font-bold text-white leading-none mb-1">{value}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-blue-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#1a3a6b]"></span>
              <h3 className="text-slate-800 text-sm font-bold uppercase tracking-wide">{t('dashboard.quickServices')}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              { icon: 'add_a_photo', title: t('dashboard.fileNew'), desc: t('dashboard.fileNewDesc'), btn: t('common.submit'), path: '/file-complaint', iconBg: 'bg-blue-50', iconColor: 'text-[#1a3a6b]' },
              { icon: 'assignment', title: t('dashboard.myComplaints'), desc: t('dashboard.myComplaintsDesc'), btn: t('common.view'), path: '/complaints', iconBg: 'bg-slate-50', iconColor: 'text-slate-600' },
              { icon: 'confirmation_number', title: t('common.pnrEnquiry'), desc: 'Check train status and seat details', btn: t('common.check'), iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
              { icon: 'call', title: t('nav.helpline') + ' 139', desc: t('dashboard.helplineDesc'), btn: t('common.callNow'), isCall: true, iconBg: 'bg-orange-50', iconColor: 'text-[#ff6b00]' },
            ].map((item, index) => (
              <div 
                key={item.title} 
                onClick={() => item.path && navigate(item.path)}
                className={`flex items-center gap-4 p-5 cursor-pointer transition-colors hover:bg-slate-50 ${index > 1 ? 'border-t border-slate-100' : ''}`}
              >
                <div className={`size-14 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <Icon name={item.icon} size="text-2xl" className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-base mb-0.5 truncate">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-500 truncate">{item.desc}</p>
                </div>
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shrink-0 ${
                  item.isCall 
                    ? 'bg-[#ff6b00] text-white hover:bg-[#e66000]' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}>
                  {item.btn}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Complaints */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#ff6b00]"></span>
              <h3 className="text-slate-800 text-sm font-bold uppercase tracking-wide">Recent Activity</h3>
            </div>
            <button onClick={() => navigate('/complaints')} className="text-xs font-semibold text-[#1a3a6b] hover:underline flex items-center gap-1">
              View All <Icon name="arrow_forward" size="text-sm" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Active Card */}
            <div className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">In Progress</span>
                    <span className="text-xs font-medium text-slate-500">24 May 2026</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">Cleanliness Issue · Coach B4</h4>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">ID: RM-2025-48291 · Assigned to DRM Office, Indore</p>
                </div>
                <div className="hidden sm:flex size-10 rounded-full bg-slate-100 items-center justify-center shrink-0">
                  <Icon name="cleaning_services" className="text-slate-500" />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
                  <span>Resolution Progress</span>
                  <span className="text-[#ff6b00]">65%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-slate-200 mb-3">
                  <div className="h-full rounded-full bg-[#ff6b00] w-[65%]"></div>
                </div>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Icon name="schedule" size="text-sm" className="text-slate-400" />
                  Expected resolution by 26 May 2026
                </p>
              </div>
            </div>

            {/* Resolved Card */}
            <div className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 uppercase tracking-wider">Resolved</span>
                    <span className="text-xs font-medium text-slate-500">21 May 2026</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Seat Allocation Issue · Train 12961</h4>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">ID: RM-2025-41183 · Resolved by TTE</p>
                </div>
                <button className="self-start sm:self-auto px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>Content managed by <strong className="text-slate-700">Railway Board</strong> · Hosted by NIC</p>
          <div className="flex items-center gap-4">
            <span>Helpline: <strong className="text-slate-700">139</strong></span>
            <span className="text-slate-300">|</span>
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors">Privacy Policy</span>
            <span className="text-slate-300">|</span>
            <span className="cursor-pointer hover:text-[#1a3a6b] transition-colors">Terms of Use</span>
          </div>
        </footer>
      </main>

      <BottomNav />
    </div>
  )
}