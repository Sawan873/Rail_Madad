import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/common'
import TopUtilityBar from '../../components/common/TopUtilityBar'
import { COMPLAINT_METHODS } from '../../constants/mockData'
import { api } from '../../services/api'

export default function FileComplaint() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
   console.log("check token ",localStorage.getItem('rm_token'))
  const [step, setStep] = useState(1)
  const [chosen, setChosen] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [pnr, setPnr] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleMethodSelect(method) {
    setChosen(method)
    if (method.accept) {
      fileInputRef.current.accept = method.accept
      if (method.capture) fileInputRef.current.setAttribute('capture', method.capture)
      else fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    } else {
      setSelectedFile(null)
      setFileName(null)
      setStep(2)
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
      setStep(2)
    }
    e.target.value = ''
  }

  async function handleSubmit() {
    if (!pnr.trim()) {
      setError('PNR number is required to proceed.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('pnrNumber', pnr)
      formData.append('rawText', desc || (selectedFile ? `Filing with ${selectedFile.type}` : ''))
      if (selectedFile) formData.append('files', selectedFile)
        console.log("this is formdata",formData)

      const response = await api.upload('/complaints/submit', formData)

      if (response.success) {
        navigate('/complaints', { state: { message: 'Complaint filed successfully!' } })
      }
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err.message || 'Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const GovHeader = ({ currentStep }) => (
    <>
      <TopUtilityBar />

      {/* Official Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-4 px-4 py-3 md:py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex shrink-0 size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors"
          >
            <Icon name="arrow_back" size="text-[22px]" />
          </button>

          <div className="hidden sm:flex shrink-0 size-12 rounded-full items-center justify-center bg-[#1a3a6b] shadow-sm">
            <Icon name="train" className="text-white" size="text-2xl" fill />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              Government of India — Ministry of Railways
            </p>
            <h1 className="text-lg md:text-xl font-bold text-[#1a3a6b] tracking-tight mt-0.5">
              Rail Madad Grievance Portal
            </h1>
          </div>

          <span className="hidden md:block text-[10px] font-bold text-white px-3 py-1.5 rounded-full bg-[#ff6b00] shadow-sm uppercase tracking-wide">
            Official Portal
          </span>
        </div>

        {/* Nav Bar */}
        <nav className="hidden md:flex items-center overflow-x-auto bg-[#1a3a6b]">
          {[
            { label: 'Home', icon: 'home', path: '/' },
            { label: 'File Complaint', icon: 'add_circle', active: true },
            { label: 'Track Complaint', icon: 'track_changes', path: '/complaints' },
            { label: 'PNR Enquiry', icon: 'confirmation_number' },
            { label: 'About', icon: 'info' },
            { label: 'Contact Us', icon: 'call' },
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
          <span
            className="font-semibold text-[#1a3a6b] cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-600">File Complaint</span>
          <span className="text-slate-400">›</span>
          <span className="font-medium text-slate-800">Step {currentStep} of 2</span>
        </div>
      </header>
    </>
  )

  // ── Step 1 ──
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-800 font-sans">
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
        <GovHeader currentStep={1} />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-6 pb-28 lg:pb-12">
          {/* Page Title Strip */}
          <div className="mb-6 pb-4 border-b border-slate-200 flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1a3a6b] shadow-sm">
              <Icon name="add_a_photo" className="text-white" size="text-2xl" fill />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a3a6b]">File a New Complaint</h2>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                Step 1 of 2 — Select the mode of grievance submission
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-[#1a3a6b] border border-blue-100">
              <Icon name="lock" size="text-sm" />
              SECURE FORM
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 shadow-sm mb-6">
            <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Icon name="info" size="text-lg" className="text-amber-600" />
            </div>
            <p className="text-sm text-amber-800 font-medium leading-snug pt-1.5">
              Sharing media (photo/audio) helps resolve issues faster. Your location will be automatically tagged to assist the Railway staff.
            </p>
          </div>

          {/* Method Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="px-5 py-3.5 bg-[#1a3a6b] border-b border-slate-200 flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#ff6b00]" />
              <h3 className="text-white text-sm font-bold uppercase tracking-wide">Select Submission Mode</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {COMPLAINT_METHODS.map((method) => (
                <button
                  key={method.label}
                  onClick={() => handleMethodSelect(method)}
                  className="group flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <Icon name={method.icon} fill size="text-[32px]" className="text-[#1a3a6b]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#1a3a6b] mb-1">{method.label}</p>
                    <p className="text-xs font-medium text-slate-500 leading-snug">{method.desc}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide bg-slate-100 text-[#1a3a6b] border border-slate-200 group-hover:bg-[#1a3a6b] group-hover:text-white group-hover:border-[#1a3a6b] transition-colors">
                    Select Mode →
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Help Note */}
          <div className="text-center text-xs font-medium text-slate-500 mt-8">
            Need help? Call Railway Helpline <strong className="text-[#1a3a6b]">139</strong> (24×7 available)
          </div>
        </main>
      </div>
    )
  }

  // ── Step 2 ──
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-800 font-sans">
      <GovHeader currentStep={2} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-6 pb-36 lg:pb-12">
        {/* Page Title Strip */}
        <div className="mb-6 pb-4 border-b border-slate-200 flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1a3a6b] shadow-sm">
            <Icon name="edit_document" className="text-white" size="text-2xl" fill />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1a3a6b]">Grievance Details</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Step 2 of 2 — Enter PNR and describe the issue
            </p>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 shadow-sm">
            <Icon name="error" fill size="text-xl" className="text-red-600 mt-0.5" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Attachment Confirmation */}
        {chosen && selectedFile && (
          <div className="mb-6 flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <Icon name={chosen.icon} fill size="text-2xl" className="text-green-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-green-800">{chosen.label} attached successfully</p>
              <p className="text-xs font-medium text-green-600 truncate mt-0.5">{fileName || 'Ready to submit'}</p>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="check_circle" fill className="text-green-600" size="text-xl" />
              <button
                onClick={() => { setSelectedFile(null); setFileName(null); setStep(1) }}
                className="size-8 flex items-center justify-center rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-100 transition-colors shadow-sm"
              >
                <Icon name="close" size="text-sm" />
              </button>
            </div>
          </div>
        )}

        {/* Form Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-3.5 bg-[#1a3a6b] border-b border-slate-200 flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-[#ff6b00]" />
            <h3 className="text-white text-sm font-bold uppercase tracking-wide">Grievance Information</h3>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* PNR Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                PNR Number <span className="text-red-500">*</span>
                <span className="ml-2 font-medium normal-case tracking-normal text-slate-400">(10-digit passenger name record)</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name="confirmation_number" fill size="text-xl" />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 4521876543"
                  className={`w-full h-14 pl-12 pr-12 text-base font-bold tracking-[0.2em] rounded-xl border-2 outline-none transition-colors ${
                    pnr.length === 10 ? 'border-green-500 bg-green-50/30 text-green-900 focus:border-green-600' : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-[#1a3a6b] focus:bg-white'
                  }`}
                />
                {pnr.length === 10 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                    <Icon name="check_circle" fill size="text-xl" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-xs font-medium text-slate-500">
                  Must be exactly 10 digits
                </p>
                <p className={`text-xs font-bold ${pnr.length === 10 ? 'text-green-600' : 'text-slate-400'}`}>
                  {pnr.length}/10
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Grievance Description
                <span className="ml-2 font-medium normal-case tracking-normal text-slate-400">(Optional but recommended)</span>
              </label>
              <textarea
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe the issue in detail — e.g. coach number, seat, nature of complaint, time of occurrence…"
                className="w-full p-4 text-sm font-medium rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 outline-none resize-none transition-colors focus:border-[#1a3a6b] focus:bg-white leading-relaxed"
              />
              <p className="text-xs font-medium text-slate-500 mt-2 px-1">
                {desc.length} characters · Detailed descriptions help resolve issues faster
              </p>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-600">
          <Icon name="verified_user" size="text-xl" className="text-[#1a3a6b]" />
          <p className="text-xs font-medium leading-relaxed">
            I hereby declare that the information provided is true and correct to the best of my knowledge.
            False grievances may result in account suspension as per <strong className="text-[#1a3a6b]">Railway Act provisions</strong>.
          </p>
        </div>
      </main>

      {/* Submit Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:left-[260px] bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto w-full px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setStep(1)}
            className="w-full sm:w-auto h-12 px-6 rounded-xl text-sm font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="arrow_back" size="text-lg" />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading || !pnr.trim() || pnr.length < 10}
            className="w-full sm:flex-1 h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 uppercase tracking-wide transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed bg-[#1a3a6b] hover:bg-[#15305b]"
          >
            {loading ? (
              <>
                <span className="size-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting Grievance...
              </>
            ) : (
              <>
                <Icon name="send" fill size="text-lg" />
                Submit Grievance
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}