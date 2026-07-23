import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');

const translations = {
  en: {
    common: {
      skipMain: "Skip to Main Content",
      screenReader: "Screen Reader Access",
      lastUpdated: "Last Updated: 24 May 2026",
      help: "Help",
      helpPhone: "Help: 139",
      govIndia: "Government of India — Ministry of Railways",
      portalName: "Rail Madad Grievance Portal",
      officialPortal: "Official Portal",
      home: "Home",
      fileComplaint: "File Complaint",
      trackComplaint: "Track Complaint",
      pnrEnquiry: "PNR Enquiry",
      about: "About",
      contact: "Contact Us",
      citizenDashboard: "Citizen Dashboard",
      signOut: "Sign Out",
      back: "Back",
      submit: "Submit",
      view: "View",
      check: "Check",
      callNow: "Call Now",
      privacyPolicy: "Privacy Policy",
      faq: "FAQ",
      termsOfUse: "Terms of Use"
    },
    dashboard: {
      welcome: "Welcome",
      rmId: "RM ID",
      active: "Active",
      resolved: "Resolved",
      avgTime: "Avg. Time",
      quickServices: "Quick Services",
      fileNew: "File New Complaint",
      fileNewDesc: "Submit grievance with photo or text",
      myComplaints: "My Complaints",
      myComplaintsDesc: "View history and track grievances",
      helplineDesc: "24×7 railway grievance assistance",
      recentUpdates: "Recent Updates"
    },
    nav: {
      menu: "Navigation Menu",
      helpline: "Railway Helpline",
      citizen: "Citizen"
    },
    faqPage: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about using the Rail Madad platform.",
      contactSupport: "Contact Support",
      infoCenter: "Rail Madad Information Center",
      categories: {
        general: "General",
        filingTracking: "Filing & Tracking",
        securityMedical: "Security & Medical"
      },
      q1: "What is Rail Madad Grievance Portal?",
      a1: "Rail Madad is the official Grievance Redressal Mechanism of the Ministry of Railways, Government of India. It integrates all passenger grievance systems into a single platform for faster resolution.",
      q2: "Who can file a complaint?",
      a2: "Any passenger holding a valid PNR or UTS ticket, or any citizen using railway facilities, can register a grievance through this portal.",
      q3: "How do I file a grievance?",
      a3: "You can file a grievance by clicking on \"File Complaint\", entering your 10-digit PNR, selecting the appropriate category, and providing a description. You can also attach photos or audio clips as evidence.",
      q4: "How can I track the status of my complaint?",
      a4: "You can use the \"Track Complaint\" option on the home page or navigate to the \"My Complaints\" section in your citizen dashboard. You will also receive SMS updates on your registered mobile number.",
      q5: "What should I do if my grievance is not resolved?",
      a5: "If a grievance is closed without satisfactory resolution, you may reopen it within 72 hours through the \"My Complaints\" section or by calling the Railway Helpline at 139.",
      q6: "What is the procedure for medical emergencies?",
      a6: "For immediate medical assistance on trains or at stations, please use the \"Medical Emergency\" option while filing a complaint or directly call the Railway Helpline 139 for expedited support.",
      q7: "How do I report a security threat?",
      a7: "Security threats, theft, or harassment should be reported immediately under the \"Security\" category. The RPF (Railway Protection Force) is immediately notified for such incidents."
    },
    privacyPage: {
      title: "Data Protection & Privacy",
      lastUpdated: "Last Updated: May 2026",
      h1: "1. Information Collection",
      p1: "Rail Madad collects personal information such as Name, PNR number, Mobile Number, and Email Address during the registration and grievance filing process. We also collect media files (photos, audio) that you choose to upload as evidence. This data is strictly used for the purpose of grievance redressal.",
      h2: "2. Use of Information",
      p2: "The information provided is utilized by the Ministry of Railways and relevant Divisional authorities to investigate, track, and resolve your complaints. Anonymized data may be used for statistical analysis to improve railway services and infrastructure.",
      h3: "3. Data Sharing & Security",
      p3: "Your personal data is handled with strict confidentiality. It is only shared with the concerned railway officials required to resolve the issue. We do not sell or distribute citizen data to third-party commercial entities. All data is securely hosted on servers managed by the National Informatics Centre (NIC) and protected by industry-standard encryption.",
      h4: "4. Location Data",
      p4: "If granted permission, Rail Madad may collect your device's geographical location to auto-detect the nearest railway station or to assist emergency response teams (RPF/Medical) in reaching you faster. You may revoke this permission at any time via your device settings.",
      disclaimer: "By using the Rail Madad Grievance Portal, you consent to the collection and use of your information as outlined in this policy under the guidelines of the IT Act, 2000 (Government of India)."
    }
  },
  hi: {
    common: {
      skipMain: "मुख्य सामग्री पर जाएं",
      screenReader: "स्क्रीन रीडर एक्सेस",
      lastUpdated: "अंतिम अद्यतन: 24 मई 2026",
      help: "सहायता",
      helpPhone: "सहायता: 139",
      govIndia: "भारत सरकार — रेल मंत्रालय",
      portalName: "रेल मदद शिकायत पोर्टल",
      officialPortal: "आधिकारिक पोर्टल",
      home: "होम",
      fileComplaint: "शिकायत दर्ज करें",
      trackComplaint: "शिकायत ट्रैक करें",
      pnrEnquiry: "PNR पूछताछ",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      citizenDashboard: "नागरिक डैशबोर्ड",
      signOut: "साइन आउट",
      back: "पीछे",
      submit: "जमा करें",
      view: "देखें",
      check: "चेक करें",
      callNow: "अभी कॉल करें",
      privacyPolicy: "गोपनीयता नीति",
      faq: "सामान्य प्रश्न",
      termsOfUse: "उपयोग की शर्तें"
    },
    dashboard: {
      welcome: "स्वागत है",
      rmId: "आरएम आईडी",
      active: "सक्रिय",
      resolved: "समाधान",
      avgTime: "औसत समय",
      quickServices: "त्वरित सेवाएं",
      fileNew: "नई शिकायत दर्ज करें",
      fileNewDesc: "फोटो या टेक्स्ट के साथ शिकायत सबमिट करें",
      myComplaints: "मेरी शिकायतें",
      myComplaintsDesc: "इतिहास देखें और शिकायतें ट्रैक करें",
      helplineDesc: "24×7 रेलवे शिकायत सहायता",
      recentUpdates: "हाल के अपडेट"
    },
    nav: {
      menu: "नेविगेशन मेनू",
      helpline: "रेलवे हेल्पलाइन",
      citizen: "नागरिक"
    },
    faqPage: {
      title: "सामान्य प्रश्न",
      subtitle: "रेल मदद प्लेटफॉर्म के उपयोग के बारे में सामान्य प्रश्नों के उत्तर खोजें।",
      contactSupport: "सहायता संपर्क करें",
      infoCenter: "रेल मदद सूचना केंद्र",
      categories: {
        general: "सामान्य",
        filingTracking: "फाइलिंग और ट्रैकिंग",
        securityMedical: "सुरक्षा और चिकित्सा"
      },
      q1: "रेल मदद शिकायत पोर्टल क्या है?",
      a1: "रेल मदद रेल मंत्रालय, भारत सरकार का आधिकारिक शिकायत निवारण तंत्र है। यह तेजी से समाधान के लिए सभी यात्री शिकायत प्रणालियों को एक ही प्लेटफॉर्म में एकीकृत करता है।",
      q2: "शिकायत कौन दर्ज कर सकता है?",
      a2: "वैध पीएनआर या यूटीएस टिकट रखने वाला कोई भी यात्री, या रेलवे सुविधाओं का उपयोग करने वाला कोई भी नागरिक, इस पोर्टल के माध्यम से शिकायत दर्ज कर सकता है।",
      q3: "मैं शिकायत कैसे दर्ज करूं?",
      a3: "\"शिकायत दर्ज करें\" पर क्लिक करके, अपना 10-अंकीय पीएनआर दर्ज करके, उचित श्रेणी का चयन करके और विवरण प्रदान करके शिकायत दर्ज कर सकते हैं। आप साक्ष्य के रूप में फोटो या ऑडियो क्लिप भी संलग्न कर सकते हैं।",
      q4: "मैं अपनी शिकायत की स्थिति को कैसे ट्रैक कर सकता हूं?",
      a4: "आप होम पेज पर \"शिकायत ट्रैक करें\" विकल्प का उपयोग कर सकते हैं या अपने नागरिक डैशबोर्ड में \"मेरी शिकायतें\" अनुभाग पर नेविगेट कर सकते हैं। आपको अपने पंजीकृत मोबाइल नंबर पर एसएमएस अपडेट भी प्राप्त होंगे।",
      q5: "यदि मेरी शिकायत का समाधान नहीं होता है तो मुझे क्या करना चाहिए?",
      a5: "यदि कोई शिकायत संतोषजनक समाधान के बिना बंद कर दी जाती है, तो आप इसे \"मेरी शिकायतें\" अनुभाग के माध्यम से या रेलवे हेल्पलाइन 139 पर कॉल करके 72 घंटे के भीतर फिर से खोल सकते हैं।",
      q6: "चिकित्सा आपात स्थिति के लिए प्रक्रिया क्या है?",
      a6: "ट्रेनों या स्टेशनों पर तत्काल चिकित्सा सहायता के लिए, कृपया शिकायत दर्ज करते समय \"चिकित्सा आपातकाल\" विकल्प का उपयोग करें या शीघ्र सहायता के लिए सीधे रेलवे हेल्पलाइन 139 पर कॉल करें।",
      q7: "मैं सुरक्षा खतरे की रिपोर्ट कैसे करूं?",
      a7: "सुरक्षा खतरों, चोरी या उत्पीड़न की तुरंत \"सुरक्षा\" श्रेणी के तहत रिपोर्ट की जानी चाहिए। ऐसी घटनाओं के लिए आरपीएफ (रेलवे सुरक्षा बल) को तुरंत सूचित किया जाता है।"
    },
    privacyPage: {
      title: "डेटा संरक्षण और गोपनीयता",
      lastUpdated: "अंतिम अद्यतन: मई 2026",
      h1: "1. सूचना संग्रह",
      p1: "रेल मदद पंजीकरण और शिकायत दर्ज करने की प्रक्रिया के दौरान नाम, पीएनआर नंबर, मोबाइल नंबर और ईमेल पते जैसी व्यक्तिगत जानकारी एकत्र करता है।",
      h2: "2. सूचना का उपयोग",
      p2: "प्रदान की गई जानकारी का उपयोग रेल मंत्रालय द्वारा आपकी शिकायतों की जांच और समाधान करने के लिए किया जाता है।",
      h3: "3. डेटा साझाकरण और सुरक्षा",
      p3: "आपका व्यक्तिगत डेटा सख्त गोपनीयता के साथ संभाला जाता है। यह केवल संबंधित रेलवे अधिकारियों के साथ साझा किया जाता है।",
      h4: "4. स्थान डेटा",
      p4: "यदि अनुमति दी जाती है, तो रेल मदद आपके डिवाइस के भौगोलिक स्थान को एकत्र कर सकता है।",
      disclaimer: "रेल मदद शिकायत पोर्टल का उपयोग करके, आप आईटी अधिनियम, 2000 (भारत सरकार) के दिशा-निर्देशों के तहत अपनी जानकारी के संग्रह और उपयोग के लिए सहमति देते हैं।"
    }
  },
  ur: {
    common: {
      skipMain: "مرکزی مواد پر جائیں",
      screenReader: "اسکرین ریڈر تک رسائی",
      lastUpdated: "آخری اپ ڈیٹ: 24 مئی 2026",
      help: "مدد",
      helpPhone: "مدد: 139",
      govIndia: "حکومت ہند — وزارت ریلوے",
      portalName: "ریل مدد شکایتی پورٹل",
      officialPortal: "سرکاری پورٹل",
      home: "ہوم",
      fileComplaint: "شکایت درج کریں",
      trackComplaint: "شکایت ٹریک کریں",
      pnrEnquiry: "PNR انکوائری",
      about: "ہمارے بارے میں",
      contact: "رابطہ کریں",
      citizenDashboard: "شہری ڈیش بورڈ",
      signOut: "سائن آؤٹ",
      back: "پیچھے",
      submit: "جمع کریں",
      view: "دیکھیں",
      check: "چیک کریں",
      callNow: "ابھی کال کریں",
      privacyPolicy: "پرائیویسی پالیسی",
      faq: "عمومی سوالات",
      termsOfUse: "استعمال کی شرائط"
    },
    dashboard: {
      welcome: "خوش آمدید",
      rmId: "آر ایم آئی ڈی",
      active: "فعال",
      resolved: "حل شدہ",
      avgTime: "اوسط وقت",
      quickServices: "فوری خدمات",
      fileNew: "نئی شکایت درج کریں",
      fileNewDesc: "تصویر یا متن کے ساتھ شکایت جمع کروائیں",
      myComplaints: "میری شکایتیں",
      myComplaintsDesc: "تاریخ دیکھیں اور شکایتیں ٹریک کریں",
      helplineDesc: "24×7 ریلوے شکایتی امداد",
      recentUpdates: "حالیہ اپڈیٹس"
    },
    nav: {
      menu: "نیویگیشن مینو",
      helpline: "ریلوے ہیلپ لائن",
      citizen: "شہری"
    },
    faqPage: {
      title: "عمومی سوالات",
      subtitle: "ریل مدد پلیٹ فارم کے استعمال کے بارے میں عام سوالات کے جوابات تلاش کریں۔",
      contactSupport: "سپورٹ سے رابطہ کریں",
      infoCenter: "ریل مدد انفارمیشن سینٹر",
      categories: {
        general: "عام",
        filingTracking: "فائلنگ اور ٹریکنگ",
        securityMedical: "سیکورٹی اور طبی"
      },
      q1: "ریل مدد شکایتی پورٹل کیا ہے؟",
      a1: "ریل مدد وزارت ریلوے، حکومت ہند کا سرکاری شکایتی ازالہ کا طریقہ کار ہے۔ یہ تمام مسافروں کی شکایات کے نظام کو ایک پلیٹ فارم میں ضم کرتا ہے۔",
      q2: "شکایت کون درج کر سکتا ہے؟",
      a2: "کوئی بھی مسافر جس کے پاس درست PNR یا UTS ٹکٹ ہو، یا ریلوے کی سہولیات استعمال کرنے والا کوئی شہری، اس پورٹل کے ذریعے شکایت درج کر سکتا ہے۔",
      q3: "میں شکایت کیسے درج کروں؟",
      a3: "آپ \"شکایت درج کریں\" پر کلک کر کے، اپنا 10 ہندسوں والا PNR درج کر کے، مناسب زمرہ منتخب کر کے اور تفصیل فراہم کر کے شکایت درج کر سکتے ہیں۔",
      q4: "میں اپنی شکایت کا اسٹیٹس کیسے ٹریک کر سکتا ہوں؟",
      a4: "آپ ہوم پیج پر \"شکایت ٹریک کریں\" کا آپشن استعمال کر سکتے ہیں یا اپنے شہری ڈیش بورڈ میں \"میری شکایتیں\" سیکشن پر جا سکتے ہیں۔",
      q5: "اگر میری شکایت حل نہ ہو تو میں کیا کروں؟",
      a5: "اگر کوئی شکایت تسلی بخش حل کے بغیر بند کر دی جاتی ہے، تو آپ اسے 72 گھنٹے کے اندر دوبارہ کھول سکتے ہیں۔",
      q6: "طبی ہنگامی صورتحال کا طریقہ کار کیا ہے؟",
      a6: "ٹرینوں یا اسٹیشنوں پر فوری طبی امداد کے لیے، براہ کرم \"میڈیکل ایمرجنسی\" کا آپشن استعمال کریں یا 139 پر کال کریں۔",
      q7: "میں حفاظتی خطرے کی اطلاع کیسے دوں؟",
      a7: "حفاظتی خطرات کی اطلاع فوری طور پر \"سیکیورٹی\" کے زمرے کے تحت دی جانی چاہیے۔ RPF کو فوری طور پر مطلع کیا جاتا ہے۔"
    },
    privacyPage: {
      title: "ڈیٹا پروٹیکشن اور پرائیویسی",
      lastUpdated: "آخری اپ ڈیٹ: مئی 2026",
      h1: "1. معلومات جمع کرنا",
      p1: "ریل مدد رجسٹریشن اور شکایت درج کرنے کے عمل کے دوران نام، پی این آر نمبر جیسی ذاتی معلومات اکٹھا کرتی ہے۔",
      h2: "2. معلومات کا استعمال",
      p2: "فراہم کردہ معلومات کو وزارت ریلوے آپ کی شکایات کی تحقیقات کے لیے استعمال کرتی ہے۔",
      h3: "3. ڈیٹا شیئرنگ اور سیکیورٹی",
      p3: "آپ کے ذاتی ڈیٹا کو انتہائی رازداری کے ساتھ سنبھالا جاتا ہے۔",
      h4: "4. مقام کا ڈیٹا",
      p4: "اگر اجازت دی جائے تو، ریل مدد آپ کے آلے کا جغرافیائی مقام جمع کر سکتی ہے۔",
      disclaimer: "ریل مدد شکایتی پورٹل کا استعمال کرتے ہوئے، آپ آئی ٹی ایکٹ، 2000 (حکومت ہند) کے تحت اپنی معلومات جمع کرنے پر رضامندی دیتے ہیں۔"
    }
  },
  gu: {
    common: {
      skipMain: "મુખ્ય સામગ્રી પર જાઓ",
      screenReader: "સ્ક્રીન રીડર એક્સેસ",
      lastUpdated: "છેલ્લું અપડેટ: 24 મે 2026",
      help: "મદદ",
      helpPhone: "મદદ: 139",
      govIndia: "ભારત સરકાર — રેલવે મંત્રાલય",
      portalName: "રેલ મદદ ફરિયાદ પોર્ટલ",
      officialPortal: "સત્તાવાર પોર્ટલ",
      home: "હોમ",
      fileComplaint: "ફરિયાદ નોંધાવો",
      trackComplaint: "ફરિયાદ ટ્રૅક કરો",
      pnrEnquiry: "PNR પૂછપરછ",
      about: "અમારા વિશે",
      contact: "સંપર્ક કરો",
      citizenDashboard: "નાગરિક ડેશબોર્ડ",
      signOut: "સાઇન આઉટ",
      back: "પાછળ",
      submit: "સબમિટ કરો",
      view: "જુઓ",
      check: "ચેક કરો",
      callNow: "હમણાં કૉલ કરો",
      privacyPolicy: "ગોપનીયતા નીતિ",
      faq: "સામાન્ય પ્રશ્નો",
      termsOfUse: "ઉપયોગની શરતો"
    },
    dashboard: {
      welcome: "સ્વાગત છે",
      rmId: "આરએમ આઈડી",
      active: "સક્રિય",
      resolved: "ઉકેલાયેલ",
      avgTime: "સરેરાશ સમય",
      quickServices: "ઝડપી સેવાઓ",
      fileNew: "નવી ફરિયાદ નોંધાવો",
      fileNewDesc: "ફોટો અથવા ટેક્સ્ટ સાથે ફરિયાદ સબમિટ કરો",
      myComplaints: "મારી ફરિયાદો",
      myComplaintsDesc: "ઇતિહાસ જુઓ અને ફરિયાદો ટ્રૅક કરો",
      helplineDesc: "24×7 રેલવે ફરિયાદ સહાય",
      recentUpdates: "તાજેતરના અપડેટ્સ"
    },
    nav: {
      menu: "નેવિગેશન મેનૂ",
      helpline: "રેલવે હેલ્પલાઇન",
      citizen: "નાગરિક"
    },
    faqPage: {
      title: "સામાન્ય પ્રશ્નો",
      subtitle: "રેલ મદદ પ્લેટફોર્મના ઉપયોગ વિશેના સામાન્ય પ્રશ્નોના જવાબો શોધો.",
      contactSupport: "સપોર્ટનો સંપર્ક કરો",
      infoCenter: "રેલ મદદ માહિતી કેન્દ્ર",
      categories: {
        general: "સામાન્ય",
        filingTracking: "ફાઇલિંગ અને ટ્રેકિંગ",
        securityMedical: "સુરક્ષા અને તબીબી"
      },
      q1: "રેલ મદદ ફરિયાદ પોર્ટલ શું છે?",
      a1: "રેલ મદદ એ રેલવે મંત્રાલય, ભારત સરકારનું સત્તાવાર ફરિયાદ નિવારણ મિકેનિઝમ છે.",
      q2: "ફરિયાદ કોણ નોંધાવી શકે છે?",
      a2: "માન્ય PNR અથવા UTS ટિકિટ ધરાવતો કોઈપણ મુસાફર ફરિયાદ નોંધાવી શકે છે.",
      q3: "હું ફરિયાદ કેવી રીતે નોંધાવી શકું?",
      a3: "\"ફરિયાદ નોંધાવો\" પર ક્લિક કરીને, તમારો 10-અંકનો PNR દાખલ કરીને ફરિયાદ નોંધાવી શકો છો.",
      q4: "હું મારી ફરિયાદનું સ્ટેટસ કેવી રીતે ટ્રૅક કરી શકું?",
      a4: "તમે હોમ પેજ પર \"ફરિયાદ ટ્રૅક કરો\" વિકલ્પનો ઉપયોગ કરી શકો છો.",
      q5: "જો મારી ફરિયાદનો ઉકેલ ન આવે તો મારે શું કરવું જોઈએ?",
      a5: "જો કોઈ ફરિયાદ સંતોષકારક ઠરાવ વિના બંધ થઈ જાય, તો તમે 72 કલાકની અંદર તેને ફરીથી ખોલી શકો છો.",
      q6: "તબીબી કટોકટી માટેની પ્રક્રિયા શું છે?",
      a6: "તાત્કાલિક તબીબી સહાય માટે, કૃપા કરીને 139 પર કૉલ કરો.",
      q7: "હું સુરક્ષાના જોખમની જાણ કેવી રીતે કરી શકું?",
      a7: "સુરક્ષાના જોખમોની જાણ તરત જ \"સુરક્ષા\" શ્રેણી હેઠળ કરવી જોઈએ."
    },
    privacyPage: {
      title: "ડેટા પ્રોટેક્શન અને ગોપનીયતા",
      lastUpdated: "છેલ્લું અપડેટ: મે 2026",
      h1: "1. માહિતી સંગ્રહ",
      p1: "રેલ મદદ નોંધણી દરમિયાન નામ, PNR નંબર જેવી વ્યક્તિગત માહિતી એકત્રિત કરે છે.",
      h2: "2. માહિતીનો ઉપયોગ",
      p2: "આપેલી માહિતીનો ઉપયોગ રેલવે મંત્રાલય દ્વારા તમારી ફરિયાદોની તપાસ કરવા માટે કરવામાં આવે છે.",
      h3: "3. ડેટા શેરિંગ અને સુરક્ષા",
      p3: "તમારો વ્યક્તિગત ડેટા અત્યંત ગુપ્તતા સાથે હેન્ડલ કરવામાં આવે છે.",
      h4: "4. સ્થાન ડેટા",
      p4: "જો પરવાનગી આપવામાં આવે, તો રેલ મદદ તમારા ઉપકરણનું ભૌગોલિક સ્થાન એકત્રિત કરી શકે છે.",
      disclaimer: "રેલ મદદ ફરિયાદ પોર્ટલનો ઉપયોગ કરીને, તમે IT એક્ટ, 2000 (ભારત સરકાર) હેઠળ તમારી માહિતી એકત્ર કરવા માટે સંમતિ આપો છો."
    }
  },
  mr: {
    common: {
      skipMain: "मुख्य सामग्रीवर जा",
      screenReader: "स्क्रीन रीडर ऍक्सेस",
      lastUpdated: "शेवटचे अपडेट: 24 मे 2026",
      help: "मदत",
      helpPhone: "मदत: 139",
      govIndia: "भारत सरकार — रेल्वे मंत्रालय",
      portalName: "रेल मदत तक्रार पोर्टल",
      officialPortal: "अधिकृत पोर्टल",
      home: "होम",
      fileComplaint: "तक्रार नोंदवा",
      trackComplaint: "तक्रार ट्रॅक करा",
      pnrEnquiry: "PNR चौकशी",
      about: "आमच्याबद्दल",
      contact: "संपर्क साधा",
      citizenDashboard: "नागरिक डॅशबोर्ड",
      signOut: "साइन आउट",
      back: "मागे",
      submit: "सबमिट करा",
      view: "पहा",
      check: "तपासा",
      callNow: "आता कॉल करा",
      privacyPolicy: "गोपनीयता धोरण",
      faq: "सामान्य प्रश्न",
      termsOfUse: "वापराच्या अटी"
    },
    dashboard: {
      welcome: "स्वागत आहे",
      rmId: "आरएम आयडी",
      active: "सक्रिय",
      resolved: "सुटलेले",
      avgTime: "सरासरी वेळ",
      quickServices: "जलद सेवा",
      fileNew: "नवीन तक्रार नोंदवा",
      fileNewDesc: "फोटो किंवा मजकुरासह तक्रार सबमिट करा",
      myComplaints: "माझ्या तक्रारी",
      myComplaintsDesc: "इतिहास पहा आणि तक्रारींचा मागोवा घ्या",
      helplineDesc: "24×7 रेल्वे तक्रार मदत",
      recentUpdates: "अलीकडील अद्यतने"
    },
    nav: {
      menu: "नेव्हिगेशन मेनू",
      helpline: "रेल्वे हेल्पलाइन",
      citizen: "नागरिक"
    },
    faqPage: {
      title: "सामान्य प्रश्न",
      subtitle: "रेल मदत प्लॅटफॉर्म वापरण्याबाबत सामान्य प्रश्नांची उत्तरे शोधा.",
      contactSupport: "संपर्क समर्थन",
      infoCenter: "रेल मदत माहिती केंद्र",
      categories: {
        general: "सामान्य",
        filingTracking: "फायलिंग आणि ट्रॅकिंग",
        securityMedical: "सुरक्षा आणि वैद्यकीय"
      },
      q1: "रेल मदत तक्रार पोर्टल म्हणजे काय?",
      a1: "रेल मदत हे रेल्वे मंत्रालय, भारत सरकारचे अधिकृत तक्रार निवारण यंत्रणा आहे.",
      q2: "तक्रार कोण नोंदवू शकतो?",
      a2: "वैध PNR किंवा UTS तिकीट असलेला कोणताही प्रवासी तक्रार नोंदवू शकतो.",
      q3: "मी तक्रार कशी नोंदवू?",
      a3: "\"तक्रार नोंदवा\" वर क्लिक करून, तुमचा 10-अंकी PNR प्रविष्ट करून तक्रार नोंदवू शकता.",
      q4: "मी माझ्या तक्रारीची स्थिती कशी ट्रॅक करू शकतो?",
      a4: "तुम्ही होम पेजवरील \"तक्रार ट्रॅक करा\" पर्यायाचा वापर करू शकता.",
      q5: "माझ्या तक्रारीचे निवारण न झाल्यास मी काय करावे?",
      a5: "जर एखादी तक्रार समाधानकारक ठरावाशिवाय बंद केली गेली असेल, तर तुम्ही ती 72 तासांच्या आत पुन्हा उघडू शकता.",
      q6: "वैद्यकीय आणीबाणीसाठी काय प्रक्रिया आहे?",
      a6: "तातडीच्या वैद्यकीय मदतीसाठी, कृपया 139 वर कॉल करा.",
      q7: "मी सुरक्षिततेच्या धोक्याची तक्रार कशी करू?",
      a7: "सुरक्षेच्या धोक्यांची तक्रार त्वरित \"सुरक्षा\" श्रेणी अंतर्गत नोंदवली जावी."
    },
    privacyPage: {
      title: "डेटा संरक्षण आणि गोपनीयता",
      lastUpdated: "शेवटचे अपडेट: मे 2026",
      h1: "1. माहिती संकलन",
      p1: "नोंदणी प्रक्रियेदरम्यान रेल मदत नाव, PNR क्रमांक यासारखी वैयक्तिक माहिती गोळा करते.",
      h2: "2. माहितीचा वापर",
      p2: "दिलेली माहिती रेल्वे मंत्रालयाद्वारे तुमच्या तक्रारींची चौकशी करण्यासाठी वापरली जाते.",
      h3: "3. डेटा शेअरिंग आणि सुरक्षा",
      p3: "तुमचा वैयक्तिक डेटा अत्यंत गोपनीयतेने हाताळला जातो.",
      h4: "4. स्थान डेटा",
      p4: "परवानगी दिल्यास, रेल मदत तुमच्या उपकरणाचे भौगोलिक स्थान गोळा करू शकते.",
      disclaimer: "रेल मदत तक्रार पोर्टल वापरून, तुम्ही आयटी कायदा, 2000 (भारत सरकार) अंतर्गत तुमची माहिती गोळा करण्यास संमती देता."
    }
  }
};

if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

for (const [lang, data] of Object.entries(translations)) {
  const langDir = path.join(localesDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir);
  }
  fs.writeFileSync(path.join(langDir, 'translation.json'), JSON.stringify(data, null, 2));
}

console.log('Translations generated.');
