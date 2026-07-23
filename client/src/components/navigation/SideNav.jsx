import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import Icon from '../common/Icon'
import { useAuth } from '../../context/AuthContext.jsx'

export default function SideNav({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen z-[70] flex flex-col bg-white border-r border-slate-200 transition-transform duration-300 w-[260px] ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Official Logo Area */}
        <div className="bg-[#1a3a6b] border-b-[3px] border-[#ff6b00] px-5 pt-5 pb-4">
          <div className="flex items-center gap-3.5">
            {/* Emblem */}
            <div className="flex shrink-0 size-12 rounded-xl bg-white/10 items-center justify-center border border-white/20 shadow-sm backdrop-blur-md">
              <Icon name="train" fill className="text-white" size="text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight tracking-wide">Rail Madad</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200 mt-0.5">
                Official Portal
              </p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden flex size-8 items-center justify-center text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Icon name="close" size="text-xl" />
            </button>
          </div>
          <p className="text-[10px] font-medium text-blue-200/80 mt-3 leading-tight tracking-wide">
            Ministry of Railways | Government of India
          </p>
        </div>

        {/* File Complaint CTA */}
        <div className="p-4 border-b border-slate-100">
          <Link
            to="/file-complaint"
            onClick={onClose}
            className="w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-wider text-white bg-[#ff6b00] hover:bg-[#e66000] shadow-sm transition-colors"
          >
            <Icon name="add_circle" fill size="text-lg" />
            File Complaint
          </Link>
        </div>

        {/* Section Label */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Navigation Menu
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col px-3 overflow-y-auto no-scrollbar pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-[#1a3a6b] font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#1a3a6b]'
                }`}
              >
                <div className={`flex items-center justify-center ${isActive ? 'text-[#ff6b00]' : 'text-slate-400 group-hover:text-[#1a3a6b]'}`}>
                  <Icon
                    name={item.icon}
                    fill={isActive && item.fillOnActive}
                    size="text-[20px]"
                  />
                </div>
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <Icon name="chevron_right" size="text-base" className="text-[#1a3a6b]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Helpline Strip */}
        <div className="mx-4 mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 shadow-sm flex items-start gap-3">
          <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Icon name="call" size="text-lg" className="text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-900 mb-0.5">Railway Helpline</p>
            <p className="text-sm font-black text-amber-700 tracking-wider">139 <span className="text-[10px] font-bold uppercase text-amber-600/80">(24×7)</span></p>
          </div>
        </div>

        {/* User Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1a3a6b] shadow-sm">
              <Icon name="person" fill className="text-white" size="text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1a3a6b] truncate tracking-wide">
                {user?.firstName || 'Citizen'}
              </p>
              <p className="text-xs font-medium text-slate-500 truncate">
                {user?.email || 'Authenticated User'}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}