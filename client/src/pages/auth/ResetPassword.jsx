import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import { api } from '../../services/api'
import Icon from '../../components/common/Icon'
import { useTranslation } from 'react-i18next'

export default function ResetPassword() {
  const { t } = useTranslation()
  const { token } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' })
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '', server: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { replace: true })
    }
  }, [token, navigate])

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => navigate('/login', { replace: true }), 2000)
    return () => clearTimeout(timer)
  }, [success, navigate])

  const validate = () => {
    const nextErrors = { newPassword: '', confirmPassword: '', server: '' }

    if (!formData.newPassword || formData.newPassword.length < 8) {
      nextErrors.newPassword = t('auth.passwordTooShort', 'Password must be at least 8 characters long.')
    }

    if (formData.confirmPassword !== formData.newPassword) {
      nextErrors.confirmPassword = t('auth.passwordMismatch', 'Passwords do not match.')
    }

    setErrors(nextErrors)
    return !nextErrors.newPassword && !nextErrors.confirmPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors((prev) => ({ ...prev, server: '' }))

    if (!validate()) return

    setLoading(true)
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword: formData.newPassword })
      setSuccess(true)
    } catch (err) {
      if (err.status === 400 || /invalid|expired/i.test(err.message)) {
        setErrors((prev) => ({ ...prev, server: t('auth.invalidResetLink', 'Reset link is invalid or has expired.') }))
      } else {
        setErrors((prev) => ({ ...prev, server: t('auth.tryAgain', 'Something went wrong. Try again.') }))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      icon="train"
      title="Set New Password"
      subtitle="Choose a secure password and confirm it to update your account."
    >
      {!success ? (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="hidden lg:block mb-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{t('auth.Set New Password')}</h2>
            <p className="text-slate-500 text-sm mt-1">{t('auth.Choose a secure password and confirm it to update your account.')}</p>
          </div>

          <InputField
            label={t('auth.newPassword')}
            icon="lock"
            type={showNewPassword ? 'text' : 'password'}
            placeholder={t('auth.newPasswordPlaceholder')}
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowNewPassword((value) => !value)}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <Icon name={showNewPassword ? 'visibility_off' : 'visibility'} size="text-xl" />
              </button>
            }
          />
          {errors.newPassword && <p className="text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>}

          <InputField
            label={t('auth.confirmPassword')}
            icon="lock"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('auth.confirmPasswordPlaceholder')}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <Icon name={showConfirmPassword ? 'visibility_off' : 'visibility'} size="text-xl" />
              </button>
            }
          />
          {errors.confirmPassword && <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}

          {errors.server && (
            <div className="rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-700 dark:text-red-300">
              {errors.server}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-glow ${loading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              {loading ? <Icon name="autorenew" className="animate-spin" size="text-xl" /> : <Icon name="lock_reset" fill size="text-xl" />}
              {t('auth.resetPassword')}
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-right">
            <Link to="/forgot-password" className="font-semibold hover:text-primary transition-colors">{t('auth.requestNew')} →</Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200">
            <div className="flex items-start gap-3">
              <div className="size-12 rounded-3xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 flex items-center justify-center">
                <Icon name="check_circle" size="text-3xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{t('auth.resetPassword')}!</h2>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t('auth.redirectLogin', 'You will be redirected to login shortly.')}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-right">
            <Link to="/login" className="font-semibold hover:text-primary transition-colors">{t('auth.backToLogin')}</Link>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}
