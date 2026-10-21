import type { GuidelineDocumentData } from "./GuidelineDocument";

// EDUS Individual Class Student and Parent Guidelines, Version 1.0, issued
// 19 September 2026. Wording copied as issued; replace this file when a new
// version is published. Rendered at /individual-class-guidelines.

export const INDIVIDUAL_CLASS_GUIDELINES: GuidelineDocumentData = {
  title: "EDUS Individual Class Student and Parent Guidelines",
  localTitles: [
    "EDUS தனிநபர் வகுப்பு மாணவர் மற்றும் பெற்றோர் வழிகாட்டுதல்கள்",
    "EDUS තනි පන්ති ශිෂ්‍ය සහ දෙමාපිය මාර්ගෝපදේශ",
  ],
  taglines: [
    "Rules for enrolment, payment, scheduling, learning safety and class continuity",
    "சேர்க்கை கட்டணம் கால அட்டவணை கற்றல் பாதுகாப்பு மற்றும் வகுப்புத் தொடர்ச்சிக்கான விதிமுறைகள்",
    "ලියාපදිංචිය ගෙවීම් කාලසටහන ඉගෙනීම ආරක්ෂාව සහ පන්ති අඛණ්ඩතාව සඳහා නීති",
  ],
  versionLine: "Version 1.0 - Issued 19 September 2026",
  owner: "EDUS Lanka Private Limited",
  languages: [
    {
      code: "en",
      label: "English",
      heading: "English Version",
      introTitle: "Purpose and Scope",
      intro: [
        "EDUS individual classes are arranged for students who require focused guidance, clearer explanations, closer follow-up or a learning plan adapted to their school, syllabus, level and pace. These guidelines explain how an individual class is matched, activated, delivered, monitored, renewed and discontinued.",
        "By paying the first invoice or attending the first scheduled class, the student and parent or guardian confirm that they have reviewed and accepted these guidelines. EDUS manages tutor matching, scheduling, payment, platform access, academic quality assurance and official support. The assigned tutor holds primary responsibility for delivering the agreed academic plan, while the student and parent must support attendance, participation and practice.",
      ],
      stepsTitle: "How the 30-Day Individual-Class Cycle Works",
      steps: [
        { title: "Requirement", text: "Student Consultant records subject, curriculum, medium, level, goals, preferred times and time zone." },
        { title: "Tutor Matching", text: "Academic Coordinator / Head of Academics identifies a suitable tutor; profile or demo video shared." },
        { title: "Commercial Confirmation", text: "EDUS confirms student rate per hour, total scheduled hours, 30-day cycle fee and payment terms." },
        { title: "Timetable Confirmation", text: "EDUS confirms fixed timetable, cycle start and end dates after checking availability." },
        { title: "Activation", text: "After payment is verified, EDUS creates class in LMS, schedules sessions, assigns tutor and issues login details." },
        { title: "Delivery & Renewal", text: "Scheduled hours are completed through LMS. Next invoice must be paid in advance before next cycle is scheduled." },
      ],
      sections: [
        {
          title: "A. Enrolment, Class Cycle and Payment",
          rules: [
            { number: 1, title: "Confirm the learning requirement accurately", paragraphs: ["Provide complete, accurate information regarding grade, subject, curriculum, medium, syllabus, and goals. Covers only agreed scope."] },
            { number: 2, title: "Understand the 30-day class cycle", paragraphs: ["Operates as a 30-calendar-day cycle. Unused hours do not automatically carry forward beyond cycle without written approval."] },
            { number: 3, title: "Pay in advance through the EDUS LMS", paragraphs: ["Full cycle fee must be paid and verified before class activation/renewal. Online card payments confirm immediately; bank transfers take 3-5 business days."] },
            { number: 4, title: "Renew at least three days before the next cycle", paragraphs: ["Pay at least 3 calendar days before the first scheduled class to reserve the tutor's time slot."] },
          ],
        },
        {
          title: "B. Timetable, Attendance and Cancellations",
          rules: [
            { number: 5, title: "Treat confirmed timetable as fixed", paragraphs: ["All times are Sri Lanka Standard Time unless specified otherwise."] },
            { number: 6, title: "Request timetable changes at least 7 days in advance", paragraphs: ["Change requests must be made via EDUS Connect Support / Hotline. Informing only the tutor is not an official request."] },
            { number: 7, title: "Attend punctually and use full booked time", paragraphs: ["Join via EDUS App/web at least 5 minutes before scheduled start."] },
            { number: 8, title: "Student absence or late cancellation counts as used", paragraphs: ["Absenteeism or unapproved cancellations are deducted from prepaid cycle (no automatic refund)."] },
            { number: 9, title: "Tutor or EDUS cancellation will be recovered", paragraphs: ["Undelivered hours caused by tutor/EDUS are rescheduled or granted an approved extension without extra charge."] },
            { number: 10, title: "Complete all scheduled hours within cycle", paragraphs: ["Make genuine effort to complete hours within the 30-day period."] },
          ],
        },
        {
          title: "C. Academic Participation and LMS Responsibilities",
          rules: [
            { number: 11, title: "Participate actively in personalised learning", paragraphs: ["Attend attentively, ask questions, and communicate honestly."] },
            { number: 12, title: "Complete homework assignments and assessments", paragraphs: ["Submit assigned work on time through LMS."] },
            { number: 13, title: "Use all required EDUS LMS features", paragraphs: ["Only official EDUS accounts may be used. Login credentials must not be shared."] },
            { number: 14, title: "Raise academic concerns early", paragraphs: ["Report pacing, syllabus, or tutor conduct issues promptly via EDUS Support."] },
          ],
        },
        {
          title: "D. Parent Support, Communication and Safety",
          rules: [
            { number: 15, title: "Provide a suitable learning environment", paragraphs: ["Quiet study area, stable internet, appropriate device, and parental supervision."] },
            { number: 16, title: "Use only official communication channels", paragraphs: ["Official requests are accepted via EDUS Hotline (**+94 70 707 2072**) or EDUS Connect."] },
            { number: 17, title: "Protect privacy and maintain professional boundaries", paragraphs: ["No private financial arrangements, off-platform payments, or direct deals with EDUS tutors."] },
            { number: 18, title: "Behave respectfully and use platform ethically", paragraphs: ["Zero tolerance for harassment, bullying, or disruption."] },
          ],
        },
        {
          title: "E. Progress, Renewal and Discontinuation",
          rules: [
            { number: 19, title: "Review progress at the end of each cycle", paragraphs: ["Tutors and EDUS review progress reports before planning renewal."] },
            { number: 20, title: "Follow official discontinuation process", paragraphs: ["Unenrol via LMS or submit notice via official hotline/support. Unpaid dues must be settled."] },
          ],
        },
      ],
      quickGuideTitle: "Quick Treatment Guide",
      quickGuide: [
        { situation: "Student attends on schedule", treatment: "Booked time delivered and deducted." },
        { situation: "Student late / leaves early", treatment: "Class ends at scheduled time; full booked time counts." },
        { situation: "Student absent / cancels without approval", treatment: "Counts as used; no automatic refund." },
        { situation: "Change requested 7 or more days earlier", treatment: "EDUS reviews; applies only after written approval." },
        { situation: "Tutor / EDUS cancels", treatment: "Undelivered time rescheduled or extension approved without fee." },
        { situation: "Platform-wide failure", treatment: "EDUS verifies and arranges recovery of undelivered time." },
        { situation: "Next cycle payment late", treatment: "Class scheduling and tutor reservation delayed until payment verified." },
      ],
    },
    {
      code: "ta",
      label: "தமிழ்",
      heading: "தமிழ் வடிவம்",
      introTitle: "நோக்கம் மற்றும் வரம்பு",
      intro: [
        "பாடத்தைப் புரிந்துகொள்வதில் சிரமம், கூடுதல் விளக்கம், தனிப்பட்ட வழிகாட்டல் அல்லது கற்றல் வேகத்திற்கேற்ற திட்டம் தேவைப்படும் மாணவர்களுக்காக EDUS தனிநபர் வகுப்புகள் ஏற்பாடு செய்யப்படுகின்றன. முதல் invoice ஐ செலுத்துவதன் மூலம் அல்லது முதல் வகுப்பில் கலந்துகொள்வதன் மூலம் மாணவரும் பெற்றோரும் இவ்வழிகாட்டுதல்களை ஏற்றுக்கொண்டதாக உறுதிப்படுத்துகின்றனர்.",
      ],
      stepsTitle: "30-day individual-class cycle நடைமுறை",
      steps: [
        { title: "தேவையை பதிவு செய்தல்", text: "Student Consultant பாடம், curriculum, medium, நிலை, விருப்ப நேரம் ஆகியவற்றை பதிவு செய்வார்." },
        { title: "Tutor Matching", text: "Academic Coordinator பொருத்தமான tutor ஐ தெரிவுசெய்வார்; demo video அல்லது profile பகிரப்படலாம்." },
        { title: "கட்டண உறுதிப்படுத்தல்", text: "Rate per hour, மொத்த hours, 30-day cycle fee ஆகியவற்றை EDUS உறுதிப்படுத்தும்." },
        { title: "Timetable உறுதிப்படுத்தல்", text: "Fixed timetable, cycle start & end date ஆகியவற்றை EDUS உறுதிப்படுத்தும்." },
        { title: "Activation", text: "Payment verified ஆன பின் LMS இல் class schedule செய்யப்பட்டு login details வழங்கப்படும்." },
        { title: "Delivery & Renewal", text: "அனைத்து hours உம் LMS ஊடாக நிறைவேற்றப்படும். அடுத்த cycle இற்கு முன்கூட்டியே புதிய invoice செலுத்தப்பட வேண்டும்." },
      ],
      sections: [
        {
          title: "A. சேர்க்கை வகுப்பு Cycle மற்றும் கட்டணம்",
          rules: [
            { number: 1, title: "கற்றல் தேவையை துல்லியமாக உறுதிப்படுத்துங்கள்", paragraphs: ["தரம், பாடம், curriculum, syllabus, examination dates பற்றிய சரியான தகவல்களை வழங்க வேண்டும்."] },
            { number: 2, title: "30-day class cycle ஐப் புரிந்துகொள்ளுங்கள்", paragraphs: ["ஒவ்வொரு cycle உம் 30 calendar days கொண்டது. பயன்படுத்தப்படாத நேரம் அடுத்த cycle இற்கு தானாக மாற்றப்படாது."] },
            { number: 3, title: "EDUS LMS ஊடாக முன்கூட்டியே செலுத்துங்கள்", paragraphs: ["முழு cycle fee உம் செலுத்தப்பட்டு verify செய்யப்பட வேண்டும். Online card payments உடனடியாக confirm ஆகும்; bank transfers 3-5 வணிக நாட்கள் ஆகலாம்."] },
            { number: 4, title: "அடுத்த cycle க்கு 3 நாட்களுக்கு முன் renew செய்யுங்கள்", paragraphs: ["விருப்ப நேரத்தை reserve செய்ய குறைந்தது 3 நாட்களுக்கு முன் invoice செலுத்தப்பட வேண்டும்."] },
          ],
        },
        {
          title: "B. Timetable Attendance மற்றும் Cancellations",
          rules: [
            { number: 5, title: "உறுதிப்படுத்தப்பட்ட timetable ஐ நிலையானதாகக் கருதுங்கள்", paragraphs: ["அனைத்து நேரங்களும் Sri Lanka Standard Time ஆகக் கருதப்படும்."] },
            { number: 6, title: "மாற்றத்தை குறைந்தது 7 நாட்களுக்கு முன் கோருங்கள்", paragraphs: ["Change request EDUS Connect Support அல்லது Hotline ஊடாக 7 நாட்களுக்கு முன் சமர்ப்பிக்கப்பட வேண்டும். Tutor க்கு மட்டும் தெரிவிப்பது செல்லுபடியாகாது."] },
            { number: 7, title: "நேரத்திற்கு வந்து முழு booked time ஐப் பயன்படுத்துங்கள்", paragraphs: ["குறைந்தது 5 நிமிடங்களுக்கு முன் இணைய வேண்டும். தாமதமாக இணைந்தால் நேரம் நீட்டிக்கப்படாது."] },
            { number: 8, title: "மாணவர் absence பயன்படுத்தப்பட்டதாகக் கணக்கிடப்படும்", paragraphs: ["முன்னறிவிப்பின்றி வராமல் இருந்தால் prepaid cycle இலிருந்து நேரம் கழிக்கப்படும் (refund இல்லை)."] },
            { number: 9, title: "Tutor அல்லது EDUS cancellation மீள வழங்கப்படும்", paragraphs: ["Tutor வராத வகுப்புகள் கூடுதல் கட்டணமின்றி cycle இற்குள் மீள நடத்தப்படும்."] },
            { number: 10, title: "அனைத்து hours ஐ cycle க்குள் முடியுங்கள்", paragraphs: ["30 நாட்களுக்குள் அனைத்து scheduled hours ஐயும் முடிக்க வேண்டும்."] },
          ],
        },
        {
          title: "C. Academic Participation மற்றும் LMS பொறுப்புகள்",
          rules: [
            { number: 11, title: "Personalised learning இல் சுறுசுறுப்பாகப் பங்கேற்குங்கள்", paragraphs: ["கவனமாக இருந்து tutor உடன் கலந்துரையாடி சந்தேகங்களைக் கேட்க வேண்டும்."] },
            { number: 12, title: "Homework assignments மற்றும் assessments ஐ முடியுங்கள்", paragraphs: ["குறித்த deadline இற்குள் பணிகளை முடிக்க வேண்டும்."] },
            { number: 13, title: "அனைத்து LMS features ஐப் பயன்படுத்துங்கள்", paragraphs: ["Official EDUS account ஐ மட்டுமே பயன்படுத்த வேண்டும்; credentials பகிரக்கூடாது."] },
            { number: 14, title: "Academic concern ஐ ஆரம்பத்திலேயே தெரிவியுங்கள்", paragraphs: ["கற்பித்தல் வேகம் அல்லது விளக்கம் குறித்து ஏதேனும் பிரச்சனை இருந்தால் உடனடியாக Support ஊடாகத் தெரிவிக்கவும்."] },
          ],
        },
        {
          title: "D. பெற்றோர் ஆதரவு தொடர்பாடல் மற்றும் பாதுகாப்பு",
          rules: [
            { number: 15, title: "பொருத்தமான learning environment ஐ வழங்குங்கள்", paragraphs: ["அமைதியான இடம், நம்பகமான internet, device மற்றும் மேற்பார்வை பெற்றோரால் வழங்கப்பட வேண்டும்."] },
            { number: 16, title: "Official communication channels ஐ மட்டும் பயன்படுத்துங்கள்", paragraphs: ["Hotline: **+94 70 707 2072** அல்லது EDUS Connect Support."] },
            { number: 17, title: "Privacy மற்றும் professional boundaries ஐப் பாதுகாக்குங்கள்", paragraphs: ["Tutor உடன் private payments அல்லது தனிப்பட்ட ஒப்பந்தங்கள் செய்வது முற்றிலும் தடைசெய்யப்பட்டுள்ளது."] },
            { number: 18, title: "மரியாதையாக நடந்து platform ஐ ஒழுக்கமாகப் பயன்படுத்துங்கள்", paragraphs: ["Bullying, harassment அல்லது முறையற்ற நடத்தைக்கு இடமில்லை."] },
          ],
        },
        {
          title: "E. Progress Renewal மற்றும் Discontinuation",
          rules: [
            { number: 19, title: "ஒவ்வொரு cycle முடிவிலும் progress ஐ review செய்யுங்கள்", paragraphs: ["முன்னேற்ற அறிக்கையின் அடிப்படையில் அடுத்த cycle திட்டமிடப்படும்."] },
            { number: 20, title: "Official discontinuation process ஐப் பின்பற்றுங்கள்", paragraphs: ["விலகுவதற்கு LMS ஊடாக unenrol செய்ய வேண்டும் அல்லது Hotline இற்கு உத்தியோகபூர்வமாக அறிவிக்க வேண்டும்."] },
          ],
        },
      ],
    },
    {
      code: "si",
      label: "සිංහල",
      heading: "සිංහල අනුවාදය",
      introTitle: "අරමුණ සහ විෂය පථය",
      intro: [
        "විෂය කරුණු තේරුම් ගැනීමට අපහසුතා ඇති, පුද්ගලික මඟපෙන්වීමක් හෝ ඉගෙනුම් වේගයට ගැළපෙන සැලැස්මක් අවශ්‍ය ශිෂ්‍යයන් සඳහා EDUS තනි පන්ති සංවිධානය කරයි. පළමු invoice එක ගෙවීමෙන් හෝ පන්තියට සහභාගී වීමෙන් මෙම මාර්ගෝපදේශ පිළිගත් බව තහවුරු වේ.",
      ],
      stepsTitle: "30-day individual-class cycle ක්‍රියාවලිය",
      steps: [
        { title: "අවශ්‍යතාව සටහන් කිරීම", text: "Subject, curriculum, medium, level, goals සහ preferred times සටහන් කර ගැනීම." },
        { title: "Tutor Matching", text: "සුදුසු tutor කෙනෙකු තෝරා profile හෝ demo video බෙදා දීම." },
        { title: "ගාස්තු තහවුරු කිරීම", text: "Student rate per hour, scheduled hours සහ 30-day cycle fee තහවුරු කිරීම." },
        { title: "Timetable තහවුරු කිරීම", text: "Fixed timetable, cycle start සහ end dates තහවුරු කිරීම." },
        { title: "Activation", text: "Payment verified වූ පසු LMS තුළ class එක schedule කර login details ලබා දීම." },
        { title: "Delivery & Renewal", text: "Scheduled hours සම්පූර්ණ කිරීම සහ ඊළඟ cycle එකට පෙර invoice එක ගෙවීම." },
      ],
      sections: [
        {
          title: "A. ලියාපදිංචිය Class Cycle සහ ගෙවීම්",
          rules: [
            { number: 1, title: "ඉගෙනුම් අවශ්‍යතාව නිවැරදිව තහවුරු කරන්න", paragraphs: ["Grade, subject, curriculum, syllabus පිළිබඳ නිවැරදි තොරතුරු ලබා දිය යුතුය."] },
            { number: 2, title: "30-day class cycle එක තේරුම් ගන්න", paragraphs: ["සෑම cycle එකක්ම 30 calendar days කින් සමන්විත වේ. භාවිත නොකළ කාලය ස්වයංක්‍රීයව ඉදිරියට මාරු නොවේ."] },
            { number: 3, title: "EDUS LMS හරහා කල්තියා ගෙවන්න", paragraphs: ["සම්පූර්ණ cycle fee ගෙවා verify කළ යුතුය. Online card payment ක්ෂණිකව තහවුරු වේ."] },
            { number: 4, title: "ඊළඟ cycle එකට දින 3කට පෙර renew කරන්න", paragraphs: ["Time slot එක වෙන් කරවා ගැනීමට අවම වශයෙන් දින 3කට පෙර ගෙවිය යුතුය."] },
          ],
        },
        {
          title: "B. Timetable Attendance සහ Cancellations",
          rules: [
            { number: 5, title: "තහවුරු කළ timetable එක ස්ථිර ලෙස සලකන්න", paragraphs: ["සියලු වේලාවන් Sri Lanka Standard Time වේ."] },
            { number: 6, title: "වෙනස්කම් දින 7කට පෙර ඉල්ලන්න", paragraphs: ["Change requests අවම වශයෙන් දින 7කට පෙර EDUS Support හරහා ඉදිරිපත් කළ යුතුය. Tutor ට පමණක් කීම ප්‍රමාණවත් නොවේ."] },
            { number: 7, title: "නියමිත වේලාවට පැමිණෙන්න", paragraphs: ["මිනිත්තු 5කට පෙර සම්බන්ධ විය යුතුය. ප්‍රමාද වී සම්බන්ධ වුවහොත් කාලය දීර්ඝ නොකෙරේ."] },
            { number: 8, title: "නොපැමිණීම භාවිත කළ කාලයක් ලෙස සැලකේ", paragraphs: ["නිසි දැනුම්දීමකින් තොරව නොපැමිණීම prepaid cycle එකෙන් අඩු කරනු ලැබේ (refund නොමැත)."] },
            { number: 9, title: "Tutor හෝ EDUS cancellation නැවත ලබා දේ", paragraphs: ["Tutor නොපැමිණි අවස්ථාවලදී අමතර ගාස්තුවකින් තොරව replacement class එකක් ලබා දේ."] },
            { number: 10, title: "සියලු hours cycle එක තුළ අවසන් කරන්න", paragraphs: ["දින 30 තුළ සියලු scheduled hours සම්පූර්ණ කළ යුතුය."] },
          ],
        },
        {
          title: "C. Academic Participation සහ LMS වගකීම්",
          rules: [
            { number: 11, title: "ක්‍රියාකාරීව සහභාගී වන්න", paragraphs: ["අවධානයෙන් සිට, ප්‍රශ්න අසා, tutor සමඟ ක්‍රියාකාරීව සාකච්ඡා කරන්න."] },
            { number: 12, title: "Homework සහ assessments සම්පූර්ණ කරන්න", paragraphs: ["නියමිත deadline එකට පෙර කාර්යයන් අවසන් කරන්න."] },
            { number: 13, title: "LMS features භාවිත කරන්න", paragraphs: ["Official EDUS account එක පමණක් භාවිත කරන්න."] },
            { number: 14, title: "Academic concern ඉක්මනින් වාර්තා කරන්න", paragraphs: ["ඉගැන්වීම් ගැටලු පිළිබඳව කල්තියා EDUS Support වෙත දන්වන්න."] },
          ],
        },
        {
          title: "D. දෙමාපිය සහාය සන්නිවේදනය සහ ආරක්ෂාව",
          rules: [
            { number: 15, title: "සුදුසු ඉගෙනුම් පරිසරයක් සපයන්න", paragraphs: ["නිහඬ ස්ථානයක්, internet, device සහ දෙමාපිය අධීක්ෂණය සැපයිය යුතුය."] },
            { number: 16, title: "නිල සන්නිවේදන මාර්ග පමණක් භාවිත කරන්න", paragraphs: ["Hotline: **+94 70 707 2072** හෝ EDUS Connect Support."] },
            { number: 17, title: "Professional boundaries ආරක්ෂා කරන්න", paragraphs: ["Tutors සමඟ පුද්ගලික ගනුදෙනු හෝ direct class arrangements තහනම් වේ."] },
            { number: 18, title: "සදාචාරාත්මකව හැසිරෙන්න", paragraphs: ["Bullying, harassment හෝ විනය විරෝධී හැසිරීම් සඳහා ඉඩ නැත."] },
          ],
        },
        {
          title: "E. Progress Renewal සහ Discontinuation",
          rules: [
            { number: 19, title: "Progress review කරන්න", paragraphs: ["සෑම cycle එකක් අවසානයේම ප්‍රගතිය සමාලෝචනය කෙරේ."] },
            { number: 20, title: "නිල Discontinuation ක්‍රියාවලිය අනුගමනය කරන්න", paragraphs: ["ඉවත් වීමට LMS හරහා unenrol විය යුතුය හෝ Hotline හරහා දැනුම් දිය යුතුය."] },
          ],
        },
      ],
    },
  ],
};
