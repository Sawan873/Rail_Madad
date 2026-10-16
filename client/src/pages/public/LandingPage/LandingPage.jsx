import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Icon from '../../../components/common/Icon'

import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

import { useAuth } from '../../../context/AuthContext'

import TopUtilityBar from '../../../components/common/TopUtilityBar'
import { useTranslation } from 'react-i18next'

const GOV_NAVY = '#0f2747'
const GOV_ORANGE = '#ff6b00'

const navLinks = [
  {
    name: 'Home',
    href: '#home',
  },

  {
    name: 'About',
    href: '#about',
  },

  {
    name: 'Contact',
    href: '#contact',
  },
]

export default function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { user } = useAuth()

  const [isScrolled, setIsScrolled] =
    useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 overflow-x-hidden">
      
      {/* TOP BAR */}

      <TopUtilityBar />

      {/* HEADER */}

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-2xl shadow-lg'
            : ''
        }`}
        style={{
          background: isScrolled
            ? 'rgba(255,255,255,0.88)'
            : 'rgba(255,255,255,0.72)',

          borderBottom:
            '1px solid rgba(15,39,71,0.08)',
        }}
      >
        {/* ORANGE TOP BORDER */}

        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${GOV_ORANGE}, #ffb067, ${GOV_ORANGE})`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          
          {/* NAVBAR */}

          <div className="h-[78px] flex items-center justify-between">
            
            {/* LEFT */}

            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
              
              {/* TRAIN LOGO */}

              <div
                className="size-12 sm:size-14 rounded-2xl flex items-center justify-center shrink-0"
                
              >
                <img
                  src="https://res.cloudinary.com/dwemivxbp/image/upload/v1779737459/download-removebg-preview_igo7by.png"
                  alt="Rail Madad Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

              {/* BRAND */}

              <div className="min-w-0">
                
                <h1
                  className="font-black tracking-tight text-xl sm:text-2xl truncate"
                  style={{
                    color: GOV_NAVY,
                  }}
                >
                  Rail Madad
                </h1>

              </div>

              {/* DIVIDER */}

              <div className="hidden lg:block h-10 w-[1px] bg-slate-200" />

              {/* GOI */}

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Government of India"
                className="hidden lg:block h-12 w-auto"
              />
            </div>

            {/* DESKTOP NAV */}

            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t(`common.${link.name.toLowerCase()}`, link.name)}

                  <span
                    className="absolute -bottom-2 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                    style={{
                      background:
                        GOV_ORANGE,
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* RIGHT */}

            <div className="flex items-center gap-3">
              
              {/* USER BUTTON */}

              {user ? (
                <button
                  onClick={() =>
                    navigate('/home')
                  }
                  className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: '#fff',

                    border:
                      '1px solid #dbe3ed',
                  }}
                >
                  <div
                    className="size-9 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        '#eef3fb',
                    }}
                  >
                    <Icon
                      name="person"
                      fill
                      size="text-lg"
                      style={{
                        color: GOV_NAVY,
                      }}
                    />
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {user.firstName ||
                      user.name ||
                      'Dashboard'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate('/login')
                  }
                  className="hidden sm:flex items-center gap-2 px-6 h-11 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: GOV_NAVY,
                  }}
                >
                  <Icon
                    name="login"
                    fill
                    size="text-lg"
                  />

                  Login
                </button>
              )}

              {/* MOBILE MENU */}

              <button
                onClick={() =>
                  setIsMobileMenuOpen(v => !v)
                }
                className="lg:hidden size-11 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: '#fff',

                  border:
                    '1px solid #dbe3ed',
                }}
              >
                <Icon
                  name={
                    isMobileMenuOpen
                      ? 'close'
                      : 'menu'
                  }
                  size="text-xl"
                  style={{
                    color: GOV_NAVY,
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
          style={{
            background:
              'rgba(255,255,255,0.96)',

            backdropFilter: 'blur(14px)',

            borderTop:
              '1px solid rgba(15,39,71,0.06)',
          }}
        >
          <div className="px-5 py-6">
            
            {/* MOBILE NAV */}

            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="flex items-center justify-between rounded-2xl px-5 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50"
                >
                  <span>{t(`common.${link.name.toLowerCase()}`, link.name)}</span>

                  <Icon
                    name="arrow_forward_ios"
                    size="text-sm"
                    style={{
                      color: GOV_ORANGE,
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* MOBILE ACTION */}

            <div className="mt-6 pt-6 border-t border-slate-100">
              
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)

                    navigate('/home')
                  }}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-semibold"
                  style={{
                    background: GOV_NAVY,

                    color: '#fff',
                  }}
                >
                  <Icon
                    name="dashboard"
                    fill
                    size="text-lg"
                  />

                  Open Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)

                    navigate('/login')
                  }}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-semibold"
                  style={{
                    background: GOV_NAVY,

                    color: '#fff',
                  }}
                >
                  <Icon
                    name="login"
                    fill
                    size="text-lg"
                  />

                  Citizen Login
                </button>
              )}
            </div>

            {/* GOV INFO */}

            <div className="mt-6 flex items-center justify-center gap-4">
              
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="GOI"
                className="h-10 w-auto"
              />

              <div className="h-8 w-[1px] bg-slate-200" />

              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                  Government of India
                </p>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE SECTIONS */}

      <HeroSection />

      <AboutSection />

      <ContactSection />

      <Footer />
    </div>
  )
}
