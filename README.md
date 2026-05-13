# switch — swap skills, not cash

פלטפורמת החלפת שירותים בלי כסף. מצא מה שאתה צריך, הצע מה שאתה יודע.

## מה יש באפליקציה
- גלה — פיד של אנשים עם שירותים להחלפה
- בקשות — שלח/קבל בקשות החלפה
- קהילה — פוסטים, לייקים ותגובות
- צ'אט — שיחה ישירה אחרי match
- פרופיל — ניהול שירותים ועריכת פרטים

## טכנולוגיות
- HTML/CSS/JS — קובץ אחד, ללא build
- [Supabase](https://supabase.com) — DB, Auth, Storage, Realtime

## התקנה

### 1. הרץ SQL ב-Supabase Dashboard
פתח `supabase/migrations/001_posts_likes_comments.sql` והדבק ב-SQL Editor של Supabase.

### 2. פרוס Edge Function (מייל ברוך הבא)
```bash
supabase login
supabase link --project-ref ubrsnymjvgasneeuqewv
supabase secrets set RESEND_API_KEY=your_resend_key
supabase functions deploy welcome-email
```

### 3. פתח את index.html בדפדפן
