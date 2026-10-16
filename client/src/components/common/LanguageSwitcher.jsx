import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: '\u0939\u093f\u0928\u094d\u0926\u0940' },
  { code: 'ur', label: '\u0627\u0631\u062f\u0648' },
  { code: 'gu', label: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0' },
  { code: 'mr', label: '\u092e\u0930\u093e\u0920\u0940' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  const currentLang = LANGUAGES.find(l => l.code === i18n.resolvedLanguage) || LANGUAGES[0]

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
      >
        <Icon name="language" size="text-sm" />
        <span>{currentLang.label}</span>
        <Icon name="expand_more" size="text-xs" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[70]">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  i18n.resolvedLanguage === lang.code
                    ? 'bg-blue-50 text-[#1a3a6b] font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#1a3a6b]'
                }`}
                role="menuitem"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
