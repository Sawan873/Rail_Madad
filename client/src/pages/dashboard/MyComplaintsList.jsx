import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/layout'
import { Icon, StatusBadge } from '../../components/common'
import { Timeline, ComplaintCard } from '../../components/feedback'
import { COMPLAINT_TABS, COMPLAINT_FILTER_PILLS } from '../../constants/mockData'
import TopUtilityBar from '../../components/common/TopUtilityBar'
import api from '../../services/api'

const GOV_NAVY = '#1a3a6b'
const GOV_ORANGE = '#ff6b00'

export default function MyComplaintsList() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [activeFilter, setActiveFilter] = useState(0)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my-complaints')
        if (res.success && res.data) setComplaints(res.data)
      } catch (err) {
        console.error('Failed to fetch complaints:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  const getIconData = (category) => {
    switch (category) {
      case 'Security':    return { icon: 'security',          iconBg: 'bg-blue-50', iconColor: 'text-[#1a3a6b]' }
      case 'Cleanliness': return { icon: 'cleaning_services', iconBg: 'bg-amber-50', iconColor: 'text-[#9a6200]' }
      default:            return { icon: 'assignment',         iconBg: 'bg-slate-100', iconColor: 'text-slate-600' }
    }
  }

  const getUrgencyStyle = (urgency) => {
    switch (urgency) {
      case 'High':   return { bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', label: 'HIGH PRIORITY' }
      case 'Medium': return { bg: 'bg-orange-50', border: 'border-orange-200', color: 'text-orange-700', label: 'MEDIUM PRIORITY' }
      default:       return { bg: 'bg-green-50', border: 'border-green-200', color: 'text-green-700', label: 'LOW PRIORITY' }
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':    return { bg: 'bg-green-50', border: 'border-green-200', color: 'text-green-700' }
      case 'In Progress': return { bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700' }
      default:            return { bg: 'bg-blue-50', border: 'border-blue-200',   color: 'text-[#1a3a6b]'  }
    }
  }

  const filteredComplaints = complaints.filter(c => {
    const isTabMatch =
      activeTab === 0 ? (c.status === 'Pending' || c.status === 'In Progress') :
      activeTab === 1 ? c.status === 'Resolved' : true
    const isPillMatch =
      activeFilter === 0 ? true :
      (c.category && c.category === COMPLAINT_FILTER_PILLS[activeFilter])
    return isTabMatch && isPillMatch
  })

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans">
      <TopUtilityBar />

      {/* Official Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-4 px-4 py-3 md:py-4">
          <button onClick={() => navigate(-1)} className="flex shrink-0 size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors">
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
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[10px] font-bold text-white px-3 py-1.5 rounded-full bg-[#ff6b00] shadow-sm uppercase tracking-wide">
              Official Portal
            </span>
            <button className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 text-[#1a3a6b] transition-colors">
              <Icon name="search" size="text-[20px]" />
            </button>
          </div>
        </div>

        {/* Nav Bar */}
        <nav className="hidden md:flex items-center overflow-x-auto bg-[#1a3a6b]">
          {[
            { label: 'Home', icon: 'home', path: '/' },
            { label: 'File Complaint', icon: 'add_circle', path: '/file-complaint' },
            { label: 'Track Complaint', icon: 'track_changes', active: true },
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

        {/* Tabs */}
        <div className="flex px-2 md:px-6 bg-white border-b border-slate-200">
          {COMPLAINT_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2 ${
                activeTab === i 
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-slate-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-2.5 text-xs flex items-center gap-2 bg-slate-50 border-b border-slate-200">
          <span className="font-semibold text-[#1a3a6b] cursor-pointer hover:underline" onClick={() => navigate('/')}>Home</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-600">My Complaints</span>
          <span className="text-slate-400">›</span>
          <span className="font-medium text-slate-800">{COMPLAINT_TABS[activeTab]}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto pb-28 lg:pb-12 pt-6 px-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Filter By:</span>
          {COMPLAINT_FILTER_PILLS.map((pill, i) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(i)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border ${
                activeFilter === i 
                  ? 'bg-[#1a3a6b] text-white border-[#1a3a6b] shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="size-8 border-4 border-slate-200 border-t-[#1a3a6b] rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-sm">Retrieving grievance records...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="py-16 px-6 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="assignment" size="text-3xl" className="text-[#1a3a6b]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Grievances Found</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">We couldn't find any complaint records matching your current filter criteria.</p>
            <button
              onClick={() => navigate('/file-complaint')}
              className="px-6 py-2.5 rounded-xl bg-[#1a3a6b] text-white text-sm font-semibold hover:bg-[#15305b] transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Icon name="add_circle" size="text-lg" />
              File New Complaint
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredComplaints.map((complaint, index) => {
              const isExpanded = expandedId === complaint._id || (expandedId === null && index === 0);
              const urg = getUrgencyStyle(complaint.urgency)
              const sts = getStatusStyle(complaint.status)
              const ico = getIconData(complaint.category)

              return (
                <div key={complaint._id} className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-[#1a3a6b] shadow-md ring-1 ring-[#1a3a6b]/10' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
                  {/* Accordion Header */}
                  <div 
                    className={`flex items-start gap-4 p-4 md:p-5 cursor-pointer select-none transition-colors ${isExpanded ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}
                    onClick={() => setExpandedId(isExpanded ? '' : complaint._id)}
                  >
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${ico.iconBg}`}>
                      <Icon name={ico.icon} size="text-2xl" className={ico.iconColor} />
                    </div>
                    
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                         <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wide ${sts.bg} ${sts.color} ${sts.border}`}>
                           {complaint.status}
                         </span>
                         <span className="text-xs font-medium text-slate-500">
                           {new Date(complaint.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                         </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 leading-tight mb-1">
                        {complaint.aiMetadata?.description || complaint.rawText || complaint.category}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-semibold text-slate-600 tracking-wide font-mono bg-slate-100 px-1.5 py-0.5 rounded">ID: {complaint.complaintId}</span>
                        {complaint.pnrNumber && (
                          <>
                            <span>•</span>
                            <span>PNR: {complaint.pnrNumber}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center self-center pl-2">
                      <div className={`flex items-center justify-center size-8 rounded-full transition-colors ${isExpanded ? 'bg-blue-100 text-[#1a3a6b]' : 'text-slate-400 bg-slate-100'}`}>
                        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} size="text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50/50">
                      <div className="p-4 md:p-6 flex flex-col gap-6">
                        
                        {/* Meta Info Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                              <Icon name="support_agent" fill size="text-xl" className="text-[#1a3a6b]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Assigned To</p>
                              <p className="text-sm font-bold text-slate-800">{complaint.department?.name || 'Pending Assignment'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <div className={`size-10 rounded-lg ${urg.bg} flex items-center justify-center shrink-0`}>
                              <Icon name="priority_high" size="text-xl" className={urg.color} />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Priority Level</p>
                              <p className={`text-sm font-bold ${urg.color}`}>{urg.label}</p>
                            </div>
                          </div>
                        </div>

                        {/* Media Section */}
                        {complaint.mediaFiles?.length > 0 && (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
                              <Icon name="attachment" size="text-sm" className="text-slate-500" />
                              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Attached Evidence</span>
                            </div>
                            <img src={complaint.mediaFiles[0].url} alt="Complaint attachment" className="w-full h-48 md:h-64 object-cover" />
                          </div>
                        )}

                        {/* Timeline Section */}
                        {complaint.timeline?.length > 0 && (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div className="px-4 py-2.5 bg-[#1a3a6b] flex items-center gap-2">
                              <Icon name="history" size="text-sm" className="text-blue-200" />
                              <span className="text-xs font-bold text-white uppercase tracking-wide">Resolution Timeline</span>
                            </div>
                            <div className="p-5">
                              <Timeline
                                steps={complaint.timeline.map((step, idx) => ({
                                  label: step.status,
                                  time: new Date(step.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                                  done: idx < complaint.timeline.length - 1,
                                  active: idx === complaint.timeline.length - 1,
                                  note: step.note,
                                }))}
                              />
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={() => navigate('/feedback')}
                            className="flex-1 px-4 py-3 rounded-xl bg-[#1a3a6b] text-white text-sm font-semibold hover:bg-[#15305b] transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <Icon name="rate_review" size="text-lg" />
                            Provide Feedback
                          </button>
                          <button
                            onClick={() => navigate('/chat')}
                            className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#1a3a6b] text-[#1a3a6b] text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <Icon name="support_agent" size="text-lg" />
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}