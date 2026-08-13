Baking Practice Log - Supabase class storage

Files
- index.html: student practice log
- teacher.html: teacher class summary
- api/submit.js: save submission + compare similarity
- api/class-summary.js: teacher summary API

Required Vercel Environment Variables
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SECRET_KEY=sb_secret_xxxxx

Classroom links
Student: https://YOUR-SITE.vercel.app/?class=3A
Teacher: https://YOUR-SITE.vercel.app/teacher.html?class=3A

Important
- Do not put the secret key in index.html or GitHub.
- Supabase table must be named practice_logs with columns already created.
- Student names and photos are not stored in Supabase.
- Similarity is a reference signal, not proof of copying or AI use.
