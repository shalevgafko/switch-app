# switch — Roadmap & Task Backlog

Last updated: 2026-05-15

---

## NOW — This Week

- [ ] **Edge Function: Daily Morning Report**
  Automated email every morning at 08:00 with: new signups, deals created/completed, open reports
  *Owner action needed: none — Supabase + Resend already set up*

- [ ] **Meta Business API — start approval process**
  Goes to WhatsApp integration. Approval takes 2–5 days so start now.
  *Owner action needed: open business.facebook.com and apply*

---

## SOON — Next 2–3 Weeks

- [ ] **WhatsApp Phase 1: Info queries**
  Ask me questions via WhatsApp and get live data from Supabase
  *Needs: Meta API approval + Claude API key*

- [ ] **WhatsApp Phase 2: Code changes**
  Request code changes via WhatsApp → I implement → you approve → goes live
  *Needs: GitHub Personal Access Token*

- [ ] **Writer Agent: Chatbot persona + response library**
  Build the AI persona that will power the in-app chatbot and social content
  *Already defined in agents/writer-agent.md*

---

## MEDIUM TERM — Month 2

### App Store Prep
- [ ] **Privacy Policy page** ← required by Apple & Google
- [ ] **Terms of Service page** ← required by Apple & Google
- [ ] **Push notifications (native)** ← iOS requires native app for this
- [ ] **Onboarding flow improvements** ← higher conversion before store launch
- [ ] **Capacitor setup** ← wraps the app for iOS + Android
- [ ] **App Store assets** ← screenshots, description, icon variants
- [ ] **Submit to Google Play** (faster approval, ~3 days)
- [ ] **Submit to Apple App Store** (stricter review, ~7 days)

  *Owner action needed: Apple Developer Account ($99/yr) + Google Play ($25 one-time)*
  *Optional: Codemagic for building iOS without a Mac (~$20/month)*

---

## QUALITY — Before Any Public Launch

- [ ] Audit all error states (what happens when Supabase is down?)
- [ ] Test on real iOS device (Safari PWA)
- [ ] Test on real Android device (Chrome PWA)
- [ ] Check all notification flows end-to-end
- [ ] Validate deal flow (create → approve → complete → review)
- [ ] Load test: what happens with 100 concurrent users?

---

## FEATURES — Growth Roadmap (by priority)

### Retention & Core Loop
- [ ] **In-app chatbot** — answers questions, helps with deals, mediates disputes
- [ ] **Smart match suggestions** — "based on your skills, these 3 people need you"
- [ ] **Deal reminder notifications** — deadline approaching alerts
- [ ] **Profile completion score** — nudge users to fill out more

### Discovery & Growth
- [ ] **Share profile link** — deep link to any profile from outside the app
- [ ] **Referral system** — invite a friend, both get priority in search results
- [ ] **Category landing pages** — SEO-friendly pages per skill category
- [ ] **Success stories** — showcase completed deals (with permission)

### Trust & Safety
- [ ] **Identity verification** (optional, adds a badge)
- [ ] **Response rate score** on profiles
- [ ] **Dispute resolution flow** — structured process when deals go wrong

### Monetization (Later)
- [ ] **Featured listings** — pay to appear at top of category
- [ ] **Premium profile** — more visibility, analytics, priority support
- [ ] **Escrow for hybrid deals** — optional cash component with protection

### סליקה / Payments Infrastructure
- [ ] **בחירת ספק סליקה** — אפשרויות: Stripe (בינלאומי), Tranzila / Cardcom (ישראל), PayPlus
  *Stripe מומלץ לטווח ארוך — API נוח, תומך בסאבסקריפשן + חד-פעמי + escrow*
- [ ] **Stripe account setup** — חשבון עסקי, KYC, חיבור לחשבון בנק
- [ ] **תשלום על Featured listing** — מוצר ראשון לבדיקה
- [ ] **Subscription: Premium profile** — ₪19–49/חודש, חיוב אוטומטי
- [ ] **Escrow flow** — משתמש A מפקיד כסף → deal מושלם → מועבר ל-B → אם dispute → holds עד להחלטה
- [ ] **Webhook מ-Stripe ל-Supabase** — עדכון סטטוס תשלום בזמן אמת
- [ ] **Invoice / קבלה אוטומטית** — Stripe מייצר, שולחים ב-Resend
- [ ] **Dashboard תשלומים** — אתה רואה revenue, chargebacks, refunds

---

## FUTURE APPS

- [ ] Define second app concept (owner has general direction)
- [ ] Create new project folder + CLAUDE.md from template
- [ ] Evaluate: reuse Supabase project or separate instance?

---

## DONE ✓

- [x] Full English translation of UI
- [x] CLAUDE.md agent framework
- [x] PWA manifest + service worker
- [x] Welcome email via Resend
- [x] Communities feature
- [x] Deals / barter agreement flow
- [x] Reports + moderation system
- [x] Real-time chat

---

*To update this file: tell the CEO agent what's done or what's new*
