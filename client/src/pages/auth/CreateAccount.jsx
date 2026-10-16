import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../components/common/Icon'
import { useTranslation } from 'react-i18next'

const REGISTER_FEATURES = [
  { icon: 'track_changes',  text: 'Track all your complaints live' },
  { icon: 'support_agent',  text: 'Chat directly with support agents' },
  { icon: 'star',           text: 'Rate and review resolutions' },
]

export default function CreateAccount() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await register(formData)
    if (result.success) {
      navigate('/login', { state: { message: 'Registration successful! Please login.' } })
    } else {
      setError(result.message || 'Registration failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <AuthLayout
      icon="person_add"
      title="Create Account"
      subtitle="Join Rail Madad for better railway assistance"
      features={REGISTER_FEATURES}
      panelMinH="min-h-[35vh]"
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="hidden lg:block mb-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{t('auth.Create Account')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('auth.fillDetails')}</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-2">
            <Icon name="error" fill size="text-lg" />
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <InputField
              label={t('auth.firstName')}
              icon="person"
              type="text"
              placeholder={t('auth.firstName')}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              inputProps={{ autoComplete: 'given-name' }}
            />
          </div>
          <div className="flex-1">
            <InputField
              label={t('auth.lastName')}
              icon="person"
              type="text"
              placeholder={t('auth.lastName')}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              inputProps={{ autoComplete: 'family-name' }}
            />
          </div>
        </div>
        <InputField
          label={t('auth.phoneNumber')}
          icon="call"
          type="tel"
          placeholder={t('auth.mobilePlaceholder')}
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          required
          inputProps={{ autoComplete: 'tel' }}
        />
        <InputField
          label={t('auth.emailAddress')}
          icon="mail"
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          inputProps={{ autoComplete: 'email' }}
        />

        <InputField
          label={t('auth.password')}
          icon="lock"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('auth.createPassword')}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          inputProps={{ autoComplete: 'new-password' }}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 hover:text-primary transition-colors"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size="text-xl" />
            </button>
          }
        />

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-glow disabled:opacity-50"
          >
            {loading ? t('auth.registering') : (
              <>
                <Icon name="how_to_reg" fill size="text-xl" />
                {t('auth.register')}
              </>
            )}
          </button>
          <button type="button" onClick={() => navigate('/login')} className="btn-secondary h-14 text-base w-full flex items-center justify-center gap-2">
            <Icon name="arrow_back" size="text-xl" />
            {t('auth.backToLogin')}
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-2">
          Ministry of Railways · Government of India
        </p>
      </form>
    </AuthLayout>
  )
}
