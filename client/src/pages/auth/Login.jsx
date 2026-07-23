import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout'
import { InputField } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../components/common/Icon'

const GOV_NAVY = '#0f2747'
const GOV_ORANGE = '#ff6b00'

const LOGIN_FEATURES = [
  {
    icon: 'shield',
    text: 'Secure citizen authentication',
  },

  {
    icon: 'notifications_active',
    text: 'Real-time complaint updates',
  },

  {
    icon: 'history',
    text: 'Complete grievance history',
  },
]

export default function Login() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)

    setError('')

    const result = await login(formData)

    if (result.success) {
      navigate('/home')
    } else {
      setError(
        result.message ||
          'Invalid credentials'
      )
    }

    setLoading(false)
  }

  return (
    <AuthLayout
      icon="train"
      title="Rail Madad"
      subtitle="Official Railway Grievance Redressal Portal"
      features={LOGIN_FEATURES}
    >
      <div className="relative">
        
        {/* TOP STRIP */}

        <div
          className="mb-6 rounded-2xl px-5 py-3 flex items-center justify-between"
          style={{
            background:
              'linear-gradient(135deg, rgba(15,39,71,0.06), rgba(255,107,0,0.05))',

            border:
              '1px solid rgba(15,39,71,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            
            <div
              className="size-10 rounded-xl flex items-center justify-center"
              style={{
                background: GOV_NAVY,
              }}
            >
              <Icon
                name="verified_user"
                fill
                size="text-xl"
                className="text-white"
              />
            </div>

            <div>
              <p
                className="text-sm font-black"
                style={{
                  color: GOV_NAVY,
                }}
              >
                Citizen Login
              </p>

              <p className="text-[11px] text-slate-500 mt-1">
                Secure access to grievance
                services
              </p>
            </div>
          </div>

          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background:
                'rgba(255,255,255,0.7)',
            }}
          >
            <div
              className="size-2 rounded-full animate-pulse"
              style={{
                background: '#22c55e',
              }}
            />

            <span className="text-[11px] font-semibold text-slate-600">
              Secure Portal
            </span>
          </div>
        </div>

        {/* FORM CARD */}

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* HEADER */}

          <div className="mb-2">
            
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{
                background: '#eef3fb',
              }}
            >
              <div
                className="size-2 rounded-full"
                style={{
                  background: GOV_ORANGE,
                }}
              />

              <span
                className="text-[11px] font-black uppercase tracking-[0.18em]"
                style={{
                  color: GOV_NAVY,
                }}
              >
                Ministry of Railways
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h2>

            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Sign in to access your complaints,
              grievance history, and railway
              assistance services.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3"
              style={{
                background: '#fff1f1',

                borderColor: '#f5c2c2',

                color: '#b42318',
              }}
            >
              <Icon
                name="error"
                fill
                size="text-lg"
              />

              {error}
            </div>
          )}

          {/* EMAIL */}

          <InputField
            label="Email Address / Mobile Number"
            icon="person"
            placeholder="Enter your email or mobile number"
            value={formData.email}
            onChange={e =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
            inputProps={{
              autoComplete: 'username',
            }}
          />

          {/* PASSWORD */}

          <InputField
            label="Password"
            icon="lock"
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            placeholder="Enter your password"
            value={formData.password}
            onChange={e =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
            inputProps={{
              autoComplete:
                'current-password',
            }}
            trailing={
              <button
                type="button"
                onClick={() =>
                  setShowPassword(v => !v)
                }
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <Icon
                  name={
                    showPassword
                      ? 'visibility_off'
                      : 'visibility'
                  }
                  size="text-xl"
                />
              </button>
            }
          />

          {/* FORGOT PASSWORD */}

          <div className="flex justify-between items-center">
            
            <label className="flex items-center gap-2 text-sm text-slate-500">
              <input
                type="checkbox"
                className="rounded border-slate-300"
              />

              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium hover:underline"
              style={{
                color: GOV_NAVY,
              }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col gap-4 pt-2">
            
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] disabled:opacity-70"
              style={{
                background: GOV_NAVY,
              }}
            >
              {loading ? (
                <>
                  <Icon
                    name="progress_activity"
                    size="text-lg"
                    className="animate-spin"
                  />

                  Signing In...
                </>
              ) : (
                <>
                  <Icon
                    name="login"
                    fill
                    size="text-lg"
                  />

                  Sign In
                </>
              )}
            </button>

            {/* DIVIDER */}

            <div className="relative flex items-center">
              
              <div className="flex-grow border-t border-slate-200" />

              <span className="mx-4 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">
                New Citizen
              </span>

              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* REGISTER */}

            <button
              type="button"
              onClick={() =>
                navigate('/register')
              }
              className="w-full h-14 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-slate-50"
              style={{
                background: '#fff',

                border:
                  '1px solid #dbe3ed',

                color: GOV_NAVY,
              }}
            >
              <Icon
                name="person_add"
                size="text-lg"
              />

              Create New Account
            </button>
          </div>

          {/* FOOTER */}

          <div className="pt-6 mt-6 border-t border-slate-100">
            
            <div className="flex flex-col items-center gap-4">
              
              <div className="flex items-center gap-4">
                
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="Government of India"
                  className="h-10 w-auto"
                />

                <div className="h-8 w-[1px] bg-slate-200" />

                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                    Government of India
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.14em]">
                    Ministry of Railways
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Rail Madad — Official Railway
                Grievance Redressal Platform
              </p>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}