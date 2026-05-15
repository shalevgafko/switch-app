# switch — Roadmap & Task Backlog
Last updated: 2026-05-15
Goal: 1,000 active users in 6 months → App Store → Payments → Scale

Legend: 🤖 = I do it | 👤 = you need to act | 🔗 = external dependency/wait time

---

## P0 — עכשיו, לפני כל דבר אחר

These are blockers. Nothing else moves until these are done.

- [ ] 👤 **בדוק שם "switch" ב-App Store**
  Apple App Store + Google Play. אם תפוס — צריך שם חלופי עכשיו לפני שמשקיעים בהכנת חנות.
  → App Store: appstoreconnect.apple.com/apps → search
  → Play Store: play.google.com/console → check availability

- [ ] 🤖 **OG Image — תצוגה מקדימה כשמשתפים לינק**
  עכשיו אם שולחים את הלינק של switch בוואטסאפ — ריק לגמרי. תמונה + כותרת + תיאור.
  שעת עבודה אחת. קריטי לכל שיתוף אורגני.

- [ ] 👤 **הפעל את daily-report Edge Function**
  הקוד כתוב ומוכן. רק צריך לעשות deploy פעם אחת מ-Supabase Dashboard.
  הוראות מלאות: `supabase/functions/daily-report/ENABLE.md`

- [ ] 👤 **פתח Meta Business API — תחילת תהליך אישור**
  לוקח 2–5 ימים. פתח עכשיו כדי שיהיה מוכן כשנרצה להמשיך ל-WhatsApp.
  → business.facebook.com → Settings → WhatsApp

---

## P1 — שבועיים הקרובים (תשתית לצמיחה)

- [ ] 🤖 **Analytics — PostHog**
  בלי מדידה אין צמיחה. PostHog חינמי, privacy-first, מתקין ב-30 שורות קוד.
  ימדוד: הרשמות, onboarding completion, פתיחת צ'אט, יצירת דיל, השלמת דיל.
  בלי זה לא נדע מה עובד.

- [ ] 🤖 **Deep links — שיתוף פרופיל וסרביס**
  "שלח לחבר שלך את הפרופיל שלך" — אין כרגע URL כזה.
  switch.app/u/[username] וswitch.app/s/[service-id] → פותח את האפליקציה במקום הנכון.
  זה המנגנון הויראלי הבסיסי.

- [ ] 🤖 **Rate limiting — נגד ספאם בלאנץ'**
  מגביל הרשמות, הודעות, ויצירת שירותים לפי IP/user. מונע מצב שבוט ממלא את המערכת.

- [ ] 🤖 **Bug audit + בדיקה על מכשירים אמיתיים**
  iPhone (Safari) + Android (Chrome). בדיקת כל הflowים: הרשמה, דיל, צ'אט, קהילה.

- [ ] 👤 **בדוק שאישור אימות אימייל פעיל**
  Supabase → Authentication → Email → Confirm email. אם כבוי — בוטים יוכלו להירשם חופשי.

---

## P2 — חודש ראשון (לפני לאנץ' רשמי)

- [ ] 🤖 **Privacy Policy page**
  חובה לפי Apple, Google, וחוק. גם לGDPR בסיסי. דף בתוך האפליקציה.

- [ ] 🤖 **Terms of Service page**
  חובה לחנויות. גם מגן עליך משפטית.

- [ ] 🤖 **שיפור Onboarding flow**
  כרגע 2 שלבים. להוסיף: בחירת קטגוריות מועדפות, הצעה ל"הוסף שירות ראשון" מיד.
  יגדיל activation rate משמעותית.

- [ ] 👤 **תוכנית בטא — 50 המשתמשים הראשונים**
  מי הם? חברים/משפחה, קבוצות פייסבוק רלוונטיות, מכרים עם מיומנויות שונות?
  צריך תכנון מפורט: ערוץ גיוס + הודעה + מה מציעים לבטא-טסטרים.

- [ ] 🤖 **WhatsApp Phase 1 — שאילות מידע**
  תשאל אותי שאלות על האפליקציה דרך WhatsApp וקבל תשובות חיות מהDB.
  תלוי: אישור Meta (P0) + Claude API key.

- [ ] 👤 **Claude API key**
  נדרש ל-WhatsApp ולצ'אטבוט. → console.anthropic.com → API Keys.

---

## P3 — חודש שני (גדילה + App Store)

- [ ] 🤖 **Writer Agent — צ'אטבוט בתוך האפליקציה**
  שאלות על איך switch עובד, עזרה ב-matching, מגשר בסכסוכי דיל.
  הפרסונה כתובה מלאה ב-`agents/writer-agent.md`.

- [ ] 🤖 **Push notifications — נייטיב אמיתי**
  כרגע הנוטיפיקציות עובדות רק כשהאפליקציה פתוחה. לiOS אמיתי צריך native.
  מגיע עם Capacitor.

- [ ] 🤖 **Smart match suggestions**
  "בהתבסס על השירותים שלך, 3 האנשים האלה צריכים אותך."
  מגביר engagement ב-first session.

- [ ] 🤖 **Deal reminder notifications**
  "נותרו יומיים לדדליין של הדיל עם רון ⏳" — מגדיל completion rate.

- [ ] 🤖 **Profile completion score**
  "הפרופיל שלך 60% מלא — הוסף תמונה לקבל פי 3 פניות."

- [ ] 🤖 **WhatsApp Phase 2 — שינויי קוד**
  "תוסיף כפתור שיתוף לכרטיס" → אני מבצע → שולח לינק לאישור שלך → עולה לפרודקשן.
  תלוי: GitHub Personal Access Token.

- [ ] 👤 **GitHub Personal Access Token**
  Settings → Developer Settings → Personal Access Tokens → repo scope.

- [ ] 👤 **Apple Developer Account**
  $99/שנה → developer.apple.com → אישור לוקח 24–48 שעות.

- [ ] 👤 **Google Play Developer Account**
  $25 חד-פעמי → play.google.com/console → מיידי.

- [ ] 🤖 **Capacitor setup**
  עוטף את index.html לאפליקציה נייטיב iOS + Android.
  אחרי שיש Apple + Google accounts.

- [ ] 🤖 **App Store assets**
  Screenshots (6.7", 6.1"), תיאור, subtitle, keywords, age rating, preview video.

- [ ] 🔗 **Google Play submission** (אחרי Capacitor)
  אישור ~3 ימים. עושים ראשון כי מהיר יותר.

- [ ] 🔗 **Apple App Store submission** (אחרי Google Play עבר)
  אישור ~7 ימים. יותר קשוח — עדיף שיש ניסיון מ-Google.

---

## P4 — חודשים 3–4 (מונטיזציה)

- [ ] 👤 **פתח עוסק מורשה / חברה בע"מ**
  חובה לפני Stripe. Stripe דורשים KYC עסקי.
  עוסק מורשה: אתר מס הכנסה, ~שבוע. חברה: עו"ד/רו"ח, ~חודש.

- [ ] 👤 **Stripe account setup**
  stripe.com → Business → KYC → חיבור חשבון בנק עסקי.
  אחרי שיש גוף משפטי.

- [ ] 🤖 **Featured listings — מוצר ראשון בתשלום**
  משלם → מופיע ראשון בקטגוריה שלו למשך X ימים.
  הכנסה ראשונה. פשוט לבנות.

- [ ] 🤖 **Stripe webhook → Supabase**
  עדכון סטטוס תשלום בזמן אמת + קבלה אוטומטית.

- [ ] 🤖 **Premium profile subscription**
  ₪29–49/חודש: יותר visibility, analytics אישיים, תמיכה מועדפת.

- [ ] 🤖 **Invoice / קבלה אוטומטית**
  Stripe מייצר → שולחים ב-Resend.

- [ ] 🤖 **Payments dashboard**
  Revenue, chargebacks, refunds — dashboard פשוט בסופרבייס.

---

## P5 — חודשים 4–6 (סקייל)

- [ ] 🤖 **Referral system**
  "הזמן חבר → שניכם עולים בחיפוש." מנגנון ויראלי פשוט ויעיל.

- [ ] 🤖 **Category SEO pages**
  switch.app/design, switch.app/music — דפים סטטיים לגוגל. תנועה אורגנית חינמית.

- [ ] 🤖 **Success stories**
  "רון ויעל החליפו גיטרה ב-לוגו — שניהם יצאו מרוצים." עם אישור המשתמשים.
  Social proof = conversion.

- [ ] 🤖 **Content moderation automation**
  Auto-flag שירותים חשודים לפני שמגיעים ל-1,000 משתמש פעיל.
  OpenAI moderation API או חוקים פשוטים על מילות מפתח.

- [ ] 🤖 **Escrow for hybrid deals**
  מנגנון אופציונלי: משתמש A מפקיד כסף → deal מושלם → מועבר ל-B → dispute → hold.
  תלוי: Stripe מוגדר + legal entity.

- [ ] 🤖 **Identity verification badge** (אופציונלי)
  "✓ מאומת" — מגדיל אמון. Stripe Identity או שירות חיצוני.

- [ ] 🤖 **Response rate score**
  "עונה תוך שעה" על הפרופיל. מגדיל פניות.

- [ ] 🤖 **Dispute resolution flow**
  מנגנון מסודר כשדיל הולך רע: timeline, evidence, הכרעה.

---

## P6 — עתיד (אפליקציות נוספות)

- [ ] 👤 **הגדר את הרעיון לאפליקציה השנייה**
  יש כיוון כללי — צריך להפוך לתיאור ברור לפני שמתחילים.

- [ ] 🤖 **צור תיקייה + CLAUDE.md לפרויקט חדש**
  מ-template של switch. כל agent framework + lessons learned מועברים.

- [ ] 🤖 **בדוק: Supabase project נפרד או shared?**
  אפליקציות שונות → בדרך כלל projects נפרדים. תלוי בשיתוף נתונים.

---

## DONE ✓

- [x] Full English translation of UI
- [x] CLAUDE.md — agent framework (8 agents + routing)
- [x] agents/writer-agent.md — full Writer Agent context
- [x] ROADMAP.md — this file
- [x] daily-report Edge Function — כתוב, מחכה ל-deploy + cron
- [x] PWA manifest + service worker
- [x] Welcome email via Resend
- [x] Communities feature
- [x] Deals / barter agreement flow
- [x] Reports + moderation system
- [x] Real-time chat
- [x] Notifications system
