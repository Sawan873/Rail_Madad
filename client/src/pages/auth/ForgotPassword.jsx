import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import { api } from '../../services/api'
import Icon from '../../components/common/Icon'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your registered email.')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email: email.trim() })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Unable to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      icon="train"
      title="Forgot Password"
      subtitle="Enter your registered email. We'll send you a reset link."
    >
      {!success ? (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="hidden lg:block mb-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Forgot Password</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your registered email to receive a reset link.</p>
          </div>

          <InputField
            label="Email"
            icon="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            inputProps={{ autoComplete: 'email' }}
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary h-14 text-base w-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-glow ${loading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              {loading ? <Icon name="autorenew" className="animate-spin" size="text-xl" /> : <Icon name="send" fill size="text-xl" />}
              Send Reset Link
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-right">
            <Link to="/login" className="font-semibold hover:text-primary transition-colors">← Back to Login</Link>
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
                <h2 className="text-lg font-bold">Reset link sent!</h2>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Reset link sent to <span className="font-semibold">{email.trim()}</span>. Check your inbox.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-right">
            <Link to="/login" className="font-semibold hover:text-primary transition-colors">← Back to Login</Link>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}
