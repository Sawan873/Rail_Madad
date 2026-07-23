import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function TopUtilityBar() {
  const { t } = useTranslation()

  return (
    <div className="px-4 py-2 flex items-center justify-between bg-[#1a3a6b] border-b-2 border-[#ff6b00]">
      <div className="flex items-center gap-3 text-[11px] font-medium text-blue-100">
        <span className="hidden sm:block cursor-pointer hover:text-white transition-colors">{t('common.skipMain', 'Skip to Main Content')}</span>
        <span className="hidden sm:block text-blue-400">|</span>
        <span className="hidden sm:block cursor-pointer hover:text-white transition-colors">{t('common.screenReader', 'Screen Reader Access')}</span>
        <span className="hidden sm:block text-blue-400">|</span>
        <div className="flex gap-1.5 items-center">
          <span className="text-yellow-400 font-bold cursor-pointer hover:text-yellow-300">A-</span>
          <span className="text-yellow-400 font-bold cursor-pointer hover:text-yellow-300">A</span>
          <span className="text-yellow-400 font-bold cursor-pointer hover:text-yellow-300">A+</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-medium text-blue-100">
        <span className="hidden md:block">{t('common.lastUpdated', 'Last Updated: 24 May 2026')}</span>
        <span className="hidden md:block text-blue-400">|</span>
        <LanguageSwitcher />
        <span className="text-blue-400">|</span>
        <span className="cursor-pointer hover:text-white transition-colors">{t('common.helpPhone', 'Help: 139')}</span>
      </div>
    </div>
  )
}
