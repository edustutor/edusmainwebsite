import type { GuidelineDocumentData } from "./GuidelineDocument";

// EDUS Student Success, Safety & Learning Standards (the group class rules),
// Version 1.0, issued September 2026. Wording copied as issued; replace this
// file when a new version is published. Rendered at /group-class-standards.

export const GROUP_CLASS_STANDARDS: GuidelineDocumentData = {
  title: "EDUS Student Success, Safety & Learning Standards",
  localTitles: [
    "EDUS மாணவர் வெற்றி, பாதுகாப்பு மற்றும் கற்றல் தரநிலைகள்",
    "EDUS ශිෂ්‍ය සාර්ථකත්ව, ආරක්ෂාව සහ ඉගෙනුම් ප්‍රමිතීන්",
  ],
  taglines: [
    "Essential Rules for Students and Parents",
    "மாணவர்களுக்கும் பெற்றோர்களுக்கும் அவசியமான விதிமுறைகள்",
    "ශිෂ්‍යයන් සහ දෙමාපියන් සඳහා අත්‍යවශ්‍ය නීති",
  ],
  versionLine: "Version 1.0 - Issued September 2026",
  owner: "EDUS Lanka Private Limited",
  languages: [
    {
      code: "en",
      label: "English",
      heading: "English Version",
      intro: [
        "At EDUS, every class, system and support service is designed around one purpose: **to help each student learn consistently, improve academically and achieve their full potential.**",
        "These standards protect every student's learning continuity, safety and access to effective academic support.",
      ],
      sections: [
        {
          title: "A. Learning and Academic Responsibilities",
          rules: [
            {
              number: 1,
              title: "Attend Every Class Regularly",
              paragraphs: [
                "Students must attend all scheduled classes and join through the official EDUS App or web platform at least five minutes before the scheduled starting time.",
                "Missing three consecutive classes without an accepted reason or proper communication may result in discontinuation from that class, after review and contact by EDUS.",
              ],
            },
            { number: 2, title: "Remain Attentive and Participate", paragraphs: ["Students must remain attentive, follow the tutor's instructions and respond promptly to questions, activities and progress checks. Active participation enables tutors to identify learning gaps and support each student effectively."] },
            { number: 3, title: "Ask, Engage and Clarify Freely", paragraphs: ["Students are encouraged to ask questions, clarify doubts and participate confidently during classes. Academic questions may also be raised through **EDUS Connect** for appropriate support beyond the live class."] },
            { number: 4, title: "Complete Homework and Assignments", paragraphs: ["All homework, assignments, activities and learning tasks must be completed properly and submitted by the instructed deadline. Consistent completion helps EDUS monitor progress and provide timely academic support."] },
            { number: 5, title: "Participate in All Examinations", paragraphs: ["Students must sit all scheduled examinations, assessments and progress tests. These are essential for identifying strengths, addressing learning gaps and ensuring measurable academic improvement."] },
          ],
        },
        {
          title: "B. Platform Use, Conduct and Student Safety",
          rules: [
            {
              number: 6,
              title: "Use the EDUS Platform Responsibly",
              paragraphs: [
                "The EDUS LMS, App, web platform and EDUS Connect must be used only for genuine educational purposes and in accordance with high ethical standards.",
                "**Students must not:**",
              ],
              bullets: [
                "Share login credentials with another person.",
                "Access or attempt to access another user's account.",
                "Copy, distribute or misuse EDUS learning content.",
                "Disrupt classes or online learning spaces.",
                "Impersonate another user.",
                "Use EDUS systems for unrelated or inappropriate purposes.",
              ],
            },
            {
              number: 7,
              title: "Protect Personal Information",
              paragraphs: [
                "Students and parents must not share passwords, private contact details, photographs, addresses or other personal information with tutors, students or unauthorised persons.",
                "EDUS protects student and tutor information according to its privacy and safeguarding standards. Students and parents remain responsible for information they independently disclose outside approved EDUS channels.",
              ],
            },
            {
              number: 8,
              title: "Maintain Safe and Respectful Conduct",
              paragraphs: [
                "Sharing personal information, misleading another student, misusing EDUS Connect, bullying, harassment, inappropriate communication or encouraging conduct that harms another student is a serious violation.",
                "Classes, support chats and shared EDUS learning spaces may be monitored and recorded for academic quality, student safeguarding, investigation and compliance. EDUS may suspend access, discontinue enrolment or take appropriate legal action when unlawful, harmful or unethical conduct is identified.",
              ],
            },
          ],
        },
        {
          title: "C. Payments and Uninterrupted Access",
          rules: [
            { number: 9, title: "Pay Monthly Fees by the Due Date", paragraphs: ["All applicable monthly fees must be paid on or before the **5th of each month**. Timely payment helps maintain uninterrupted access to classes, learning materials, examinations, LMS services and academic support."] },
            {
              number: 10,
              title: "Pay Through the EDUS LMS",
              paragraphs: [
                "Payments must be made through the EDUS LMS against the relevant pending or overdue invoice.",
                "If no invoice is available, students or parents may add funds to the **EDUS Wallet** in advance. When a new invoice is generated, the amount will be automatically deducted if the wallet has sufficient funds. Maintaining an adequate wallet balance helps prevent payment-related access interruptions.",
              ],
            },
            {
              number: 11,
              title: "Use Online Card Payments for Immediate Access",
              paragraphs: ["Students and parents are strongly encouraged to pay online by card through the EDUS LMS."],
              bullets: [
                "**Online card payments:** Confirmed immediately and normally provide uninterrupted access without manual verification.",
                "**Manual payments or bank transfers:** Reviewed only during EDUS office hours and may take approximately three to five business days to verify.",
              ],
            },
          ],
        },
        {
          title: "D. Official Communication and Information",
          rules: [
            {
              number: 12,
              title: "Use Only Official EDUS Support Channels",
              paragraphs: ["All requests, concerns, updates and official communications to EDUS will be accepted only through:"],
              bullets: [
                "**EDUS Hotline:** **+94 70 707 2072** - Monday to Saturday, 9:00 AM to 9:00 PM.",
                "**EDUS Connect Support Chat.**",
              ],
            },
            { number: 13, title: "Check All Official EDUS Communications", paragraphs: ["Students and parents must regularly check the EDUS App and LMS notifications, EDUS Connect messages, EDUS SMS alerts, registered email accounts and official notices about classes, examinations, fees and general operations."] },
          ],
        },
        {
          title: "E. Enrolment and Student Information",
          rules: [
            {
              number: 14,
              title: "Follow the Official Discontinuation Process",
              paragraphs: ["To leave EDUS or discontinue a class or subject, the student or parent must:"],
              bullets: [
                "Unenrol through the EDUS LMS; or",
                "Submit an official request through EDUS Connect Support or the EDUS Hotline.",
              ],
              note: "Absence, non-participation, informing only a tutor or leaving a communication group will not be considered official discontinuation.",
            },
            { number: 15, title: "Provide Complete and Accurate Information", paragraphs: ["Students and parents must provide genuine, complete and current registration, academic, contact and guardian information to the best of their knowledge. Any change must be promptly updated through the LMS or EDUS Support."] },
          ],
        },
        {
          title: "F. Parent and Guardian Responsibilities",
          rules: [
            {
              number: 16,
              title: "Provide a Suitable Learning Environment",
              paragraphs: ["Parents and guardians must provide, as reasonably possible:"],
              bullets: [
                "A quiet and appropriate learning space.",
                "A stable internet connection.",
                "A suitable phone, tablet, computer or laptop.",
                "Required books and learning materials.",
                "Age-appropriate supervision and online safety.",
              ],
            },
          ],
        },
      ],
    },
    {
      code: "ta",
      label: "தமிழ்",
      heading: "தமிழ் வடிவம்",
      intro: [
        "EDUS இல் ஒவ்வொரு வகுப்பும், அமைப்பும், ஆதரவு சேவையும் ஒரே நோக்கத்துடன் வடிவமைக்கப்பட்டுள்ளது: **ஒவ்வொரு மாணவரும் தொடர்ச்சியாகக் கற்று, கல்வியில் முன்னேறி, தமது முழுத் திறனையும் அடைய உதவுவது.**",
        "இந்தத் தரநிலைகள் ஒவ்வொரு மாணவரின் தொடர்ச்சியான கற்றல், பாதுகாப்பு மற்றும் பயனுள்ள கல்வி ஆதரவுக்கான அணுகலை உறுதிப்படுத்துகின்றன.",
      ],
      sections: [
        {
          title: "A. கற்றல் மற்றும் கல்விப் பொறுப்புகள்",
          rules: [
            {
              number: 1,
              title: "ஒவ்வொரு வகுப்பிலும் தவறாமல் கலந்துகொள்ளுங்கள்",
              paragraphs: [
                "மாணவர்கள் திட்டமிடப்பட்ட அனைத்து வகுப்புகளிலும் கலந்துகொண்டு, அதிகாரப்பூர்வ EDUS App அல்லது web platform ஊடாக வகுப்பு தொடங்குவதற்கு குறைந்தது ஐந்து நிமிடங்களுக்கு முன்பாக இணைய வேண்டும்.",
                "ஏற்றுக்கொள்ளத்தக்க காரணமோ முறையான அறிவிப்போ இன்றி தொடர்ச்சியாக மூன்று வகுப்புகளைத் தவறவிட்டால், EDUS மீளாய்வு செய்து தொடர்புகொண்ட பின்னர் அந்த வகுப்பிலிருந்து மாணவர் நீக்கப்படலாம்.",
              ],
            },
            { number: 2, title: "கவனமாக இருந்து சுறுசுறுப்பாகப் பங்கேற்குங்கள்", paragraphs: ["மாணவர்கள் கவனமாக இருந்து, ஆசிரியரின் அறிவுறுத்தல்களைப் பின்பற்றி, கேள்விகள், செயற்பாடுகள் மற்றும் முன்னேற்றச் சோதனைகளுக்கு உடனடியாகப் பதிலளிக்க வேண்டும். சுறுசுறுப்பான பங்கேற்பு, கற்றல் இடைவெளிகளை அறிந்து சரியான ஆதரவு வழங்க ஆசிரியருக்கு உதவும்."] },
            { number: 3, title: "தயக்கமின்றிக் கேளுங்கள், கலந்துரையாடுங்கள், தெளிவுபடுத்துங்கள்", paragraphs: ["வகுப்பில் மாணவர்கள் கேள்விகள் கேட்கவும், சந்தேகங்களைத் தெளிவுபடுத்தவும், நம்பிக்கையுடன் பங்கேற்கவும் ஊக்குவிக்கப்படுகிறார்கள். Live class க்கு வெளியேயும் கல்வி ஆதரவைப் பெற EDUS Connect ஊடாகக் கேள்விகளை அனுப்பலாம்."] },
            { number: 4, title: "வீட்டுப்பாடங்களையும் ஒப்படைகளையும் நிறைவேற்றுங்கள்", paragraphs: ["அனைத்து வீட்டுப்பாடங்கள், ஒப்படைகள், செயற்பாடுகள் மற்றும் கற்றல் பணிகள் முறையாக நிறைவேற்றப்பட்டு, அறிவிக்கப்பட்ட காலக்கெடுவிற்குள் சமர்ப்பிக்கப்பட வேண்டும்."] },
            { number: 5, title: "அனைத்து பரீட்சைகளிலும் பங்கேற்குங்கள்", paragraphs: ["திட்டமிடப்பட்ட அனைத்து பரீட்சைகள், மதிப்பீடுகள் மற்றும் முன்னேற்றச் சோதனைகளிலும் மாணவர்கள் கட்டாயம் பங்கேற்க வேண்டும்."] },
          ],
        },
        {
          title: "B. Platform பயன்பாடு, நடத்தை மற்றும் மாணவர் பாதுகாப்பு",
          rules: [
            { number: 6, title: "EDUS Platform ஐ பொறுப்புடன் பயன்படுத்துங்கள்", paragraphs: ["EDUS LMS, App, web platform மற்றும் EDUS Connect ஆகியவை கல்வி நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்பட வேண்டும். மாணவர்கள் Login விவரங்களை மற்றவருடன் பகிரக்கூடாது, மற்றொரு பயனரின் account ஐ அணுக முயற்சிக்கக்கூடாது, EDUS கற்றல் உள்ளடக்கத்தை நகலெடுத்தல் அல்லது பகிர்தல் கூடாது."] },
            { number: 7, title: "தனிப்பட்ட தகவல்களைப் பாதுகாத்துக்கொள்ளுங்கள்", paragraphs: ["மாணவர்களும் பெற்றோர்களும் passwords, தனிப்பட்ட தொடர்பு விபரங்கள், புகைப்படங்கள், முகவரிகளை ஆசிரியர்கள், மாணவர்கள் அல்லது அனுமதியற்ற நபர்களுடன் பகிரக்கூடாது."] },
            { number: 8, title: "பாதுகாப்பான மற்றும் மரியாதையான நடத்தையைப் பேணுங்கள்", paragraphs: ["தனிப்பட்ட தகவல்களைப் பகிர்தல், மற்றொரு மாணவரைத் தவறாக வழிநடத்தல், EDUS Connect ஐ தவறாகப் பயன்படுத்துதல், bullying, harassment ஆகியவை கடுமையான மீறல்களாகும்."] },
          ],
        },
        {
          title: "C. கட்டணங்கள் மற்றும் தடையற்ற Access",
          rules: [
            { number: 9, title: "மாதாந்தக் கட்டணத்தை உரிய திகதிக்குள் செலுத்துங்கள்", paragraphs: ["பொருந்தக்கூடிய அனைத்து மாதாந்தக் கட்டணங்களும் ஒவ்வொரு மாதமும் **5 ஆம் திகதி** அல்லது அதற்கு முன்னர் செலுத்தப்பட வேண்டும்."] },
            { number: 10, title: "EDUS LMS ஊடாகக் கட்டணம் செலுத்துங்கள்", paragraphs: ["நிலுவையிலுள்ள அல்லது காலாவதியான தொடர்புடைய invoice க்கு எதிராக EDUS LMS ஊடாகவே கட்டணம் செலுத்தப்பட வேண்டும் அல்லது EDUS Wallet இல் முன்சேமிப்பு செய்யலாம்."] },
            { number: 11, title: "உடனடி Access க்கு Online Card Payment ஐப் பயன்படுத்துங்கள்", paragraphs: ["Online card payments உடனடியாக உறுதிப்படுத்தப்பட்டு, manual verification இன்றி தடையற்ற access வழங்கப்படும். Bank transfers சரிபார்க்க 3 முதல் 5 வணிக நாட்கள் ஆகலாம்."] },
          ],
        },
        {
          title: "D. அதிகாரப்பூர்வ தொடர்பாடல் மற்றும் தகவல்கள்",
          rules: [
            {
              number: 12,
              title: "அதிகாரப்பூர்வ EDUS Support Channels ஐ மட்டுமே பயன்படுத்துங்கள்",
              bullets: [
                "**EDUS Hotline:** **+94 70 707 2072** - திங்கள் முதல் சனி வரை, காலை 9:00 முதல் இரவு 9:00 வரை.",
                "**EDUS Connect Support Chat.**",
              ],
            },
            { number: 13, title: "EDUS இன் அனைத்து அதிகாரப்பூர்வ தகவல்களையும் சரிபாருங்கள்", paragraphs: ["EDUS App மற்றும் LMS notifications, EDUS Connect messages, SMS alerts, பதிவு செய்யப்பட்ட email accounts ஆகியவற்றைத் தொடர்ச்சியாகச் சரிபார்க்க வேண்டும்."] },
          ],
        },
        {
          title: "E. Enrolment மற்றும் மாணவர் தகவல்கள்",
          rules: [
            { number: 14, title: "அதிகாரப்பூர்வ Discontinuation நடைமுறையைப் பின்பற்றுங்கள்", paragraphs: ["EDUS இலிருந்து முழுமையாக விலகவோ அல்லது குறிப்பிட்ட வகுப்பை நிறுத்தவோ LMS ஊடாக unenrol செய்ய வேண்டும் அல்லது EDUS Connect Support / Hotline ஊடாகக் கோரிக்கை சமர்ப்பிக்க வேண்டும்."] },
            { number: 15, title: "முழுமையான மற்றும் சரியான தகவல்களை வழங்குங்கள்", paragraphs: ["உண்மையான, முழுமையான மற்றும் தற்போதைய registration, academic, contact தகவல்களை வழங்க வேண்டும்."] },
          ],
        },
        {
          title: "F. பெற்றோர் மற்றும் பாதுகாவலரின் பொறுப்புகள்",
          rules: [
            { number: 16, title: "பொருத்தமான கற்றல் சூழலை வழங்குங்கள்", paragraphs: ["அமைதியான இடம், நம்பகமான internet, பொருத்தமான phone/computer, தேவையான புத்தகங்கள் மற்றும் வயதுக்கேற்ற மேற்பார்வையை பெற்றோர் உறுதிப்படுத்த வேண்டும்."] },
          ],
        },
      ],
    },
    {
      code: "si",
      label: "සිංහල",
      heading: "සිංහල අනුවාදය",
      intro: [
        "EDUS හි සෑම පන්තියක්ම, පද්ධතියක්ම සහ සහාය සේවාවක්ම එක් අරමුණක් වටා සැලසුම් කර ඇත: **සෑම ශිෂ්‍යයෙකුටම අඛණ්ඩව ඉගෙනීමට, අධ්‍යාපනිකව දියුණු වීමට සහ තම උපරිම හැකියාව ළඟා කර ගැනීමට උපකාර කිරීම.**",
        "මෙම ප්‍රමිතීන් සෑම ශිෂ්‍යයෙකුගේම ඉගෙනුම් අඛණ්ඩතාව, ආරක්ෂාව සහ ඵලදායී අධ්‍යාපනික සහාය සඳහා ප්‍රවේශය ආරක්ෂා කරයි.",
      ],
      sections: [
        {
          title: "A. ඉගෙනීම සහ අධ්‍යාපනික වගකීම්",
          rules: [
            {
              number: 1,
              title: "සෑම පන්තියකටම නිතිපතා සහභාගී වන්න",
              paragraphs: [
                "ශිෂ්‍යයන් සැලසුම් කර ඇති සියලුම පන්තිවලට සහභාගී විය යුතු අතර, නිල EDUS App හෝ web platform එක හරහා නියමිත ආරම්භක වේලාවට අවම වශයෙන් මිනිත්තු පහකට පෙර සම්බන්ධ විය යුතුය.",
                "පිළිගත හැකි හේතුවක් හෝ නිසි දැනුම්දීමක් නොමැතිව අඛණ්ඩ පන්ති තුනක් මඟ හැරීම, EDUS විසින් සමාලෝචනය කර සම්බන්ධ වීමෙන් පසු එම පන්තියෙන් ඉවත් කිරීමට හේතු විය හැක.",
              ],
            },
            { number: 2, title: "අවධානයෙන් සිට ක්‍රියාකාරීව සහභාගී වන්න", paragraphs: ["ශිෂ්‍යයන් අවධානයෙන් සිට, ගුරුවරයාගේ උපදෙස් අනුගමනය කර, ප්‍රශ්න, ක්‍රියාකාරකම් සහ ප්‍රගති පරීක්ෂාවන්ට ඉක්මනින් ප්‍රතිචාර දැක්විය යුතුය."] },
            { number: 3, title: "නිදහසේ අසන්න, සම්බන්ධ වන්න සහ පැහැදිලි කරගන්න", paragraphs: ["පන්තියේදී ප්‍රශ්න ඇසීමට, සැක පැහැදිලි කර ගැනීමට සහ විශ්වාසයෙන් සහභාගී වීමට ශිෂ්‍යයන් උනන්දු කරනු ලැබේ. Live class එකෙන් පිටතදීත් EDUS Connect හරහා ප්‍රශ්න යොමු කළ හැක."] },
            { number: 4, title: "ගෙදර වැඩ සහ පැවරුම් සම්පූර්ණ කරන්න", paragraphs: ["සියලුම ගෙදර වැඩ, පැවරුම්, ක්‍රියාකාරකම් සහ ඉගෙනුම් කාර්යයන් නිසි ලෙස සම්පූර්ණ කර දැනුම් දුන් අවසන් දිනයට පෙර ඉදිරිපත් කළ යුතුය."] },
            { number: 5, title: "සියලුම විභාගවලට සහභාගී වන්න", paragraphs: ["ශිෂ්‍යයන් සැලසුම් කර ඇති සියලුම විභාග, ඇගයීම් සහ ප්‍රගති පරීක්ෂණ සඳහා අනිවාර්යයෙන් පෙනී සිටිය යුතුය."] },
          ],
        },
        {
          title: "B. Platform භාවිතය, හැසිරීම සහ ශිෂ්‍ය ආරක්ෂාව",
          rules: [
            { number: 6, title: "EDUS Platform එක වගකීමෙන් භාවිත කරන්න", paragraphs: ["EDUS LMS, App, web platform සහ EDUS Connect සත්‍ය අධ්‍යාපනික අරමුණු සඳහා පමණක් සහ උසස් ආචාරධාර්මික ප්‍රමිතීන්ට අනුකූලව භාවිත කළ යුතුය. Login විස්තර බෙදා ගැනීම හෝ වෙනත් පරිශීලකයෙකුගේ account එකට පිවිසීම තහනම්ය."] },
            { number: 7, title: "පුද්ගලික තොරතුරු ආරක්ෂා කරන්න", paragraphs: ["ශිෂ්‍යයන් සහ දෙමාපියන් passwords, පුද්ගලික සම්බන්ධතා විස්තර, ඡායාරූප, ලිපින ගුරුවරුන් හෝ අනවසර පුද්ගලයන් සමඟ බෙදා නොගත යුතුය."] },
            { number: 8, title: "ආරක්ෂිත සහ ගෞරවාන්විත හැසිරීමක් පවත්වා ගන්න", paragraphs: ["පුද්ගලික තොරතුරු බෙදා ගැනීම, bullying, harassment, නුසුදුසු සන්නිවේදනය බරපතළ උල්ලංඝනයකි."] },
          ],
        },
        {
          title: "C. ගෙවීම් සහ බාධාවකින් තොර Access",
          rules: [
            { number: 9, title: "මාසික ගාස්තු නියමිත දිනට ගෙවන්න", paragraphs: ["අදාළ සියලුම මාසික ගාස්තු සෑම මාසයකම **5 වන දින** හෝ ඊට පෙර ගෙවිය යුතුය."] },
            { number: 10, title: "EDUS LMS හරහා ගෙවන්න", paragraphs: ["අදාළ pending හෝ overdue invoice එකට එරෙහිව EDUS LMS හරහා ගෙවීම් කළ යුතුය හෝ EDUS Wallet එක භාවිතා කළ හැක."] },
            { number: 11, title: "ක්ෂණික Access සඳහා Online Card Payment භාවිත කරන්න", paragraphs: ["Online card payments ක්ෂණිකව තහවුරු වන අතර manual verification නොමැතිව සාමාන්‍යයෙන් බාධාවකින් තොර access ලබා දෙයි. Bank transfers සඳහා දින 3 සිට 5 දක්වා ගත විය හැක."] },
          ],
        },
        {
          title: "D. නිල සන්නිවේදනය සහ තොරතුරු",
          rules: [
            {
              number: 12,
              title: "නිල EDUS Support Channels පමණක් භාවිත කරන්න",
              bullets: [
                "**EDUS Hotline:** **+94 70 707 2072** - සඳුදා සිට සෙනසුරාදා දක්වා, පෙ.ව. 9:00 සිට ප.ව. 9:00 දක්වා.",
                "**EDUS Connect Support Chat.**",
              ],
            },
            { number: 13, title: "සියලුම නිල EDUS සන්නිවේදන පරීක්ෂා කරන්න", paragraphs: ["EDUS App සහ LMS notifications, EDUS Connect messages, SMS alerts නිතිපතා පරීක්ෂා කළ යුතුය."] },
          ],
        },
        {
          title: "E. Enrolment සහ ශිෂ්‍ය තොරතුරු",
          rules: [
            { number: 14, title: "නිල Discontinuation ක්‍රියාවලිය අනුගමනය කරන්න", paragraphs: ["EDUS වෙතින් ඉවත් වීමට හෝ යම් පන්තියක් නතර කිරීමට LMS හරහා unenrol විය යුතුය හෝ EDUS Hotline / Support හරහා නිල ඉල්ලීමක් ඉදිරිපත් කළ යුතුය."] },
            { number: 15, title: "සම්පූර්ණ සහ නිවැරදි තොරතුරු ලබා දෙන්න", paragraphs: ["සත්‍ය, සම්පූර්ණ සහ යාවත්කාලීන registration, academic, contact තොරතුරු ලබා දිය යුතුය."] },
          ],
        },
        {
          title: "F. දෙමාපිය සහ භාරකරු වගකීම්",
          rules: [
            { number: 16, title: "සුදුසු ඉගෙනුම් පරිසරයක් සපයන්න", paragraphs: ["නිහඬ සහ සුදුසු ඉගෙනුම් ස්ථානයක්, ස්ථාවර internet connection එකක්, සුදුසු device එකක් සහ වයසට ගැළපෙන අධීක්ෂණය දෙමාපියා හෝ භාරකරු විසින් සැපයිය යුතුය."] },
          ],
        },
      ],
    },
  ],
};
