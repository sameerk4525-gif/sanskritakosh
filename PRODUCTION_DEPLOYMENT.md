# 🚀 COMPLETE DEPLOYMENT GUIDE - STEP BY STEP (PRODUCTION)

## 📋 DEPLOYMENT ROADMAP

```
Step 1: Prepare Development → Production (Local Testing)
Step 2: Database Setup (Supabase PostgreSQL)
Step 3: Backend Deployment (Railway/Render)
Step 4: Frontend Deployment (Vercel)
Step 5: Domain & SSL (Custom Domain)
Step 6: Environment Variables (All Platforms)
Step 7: Testing & Verification
Step 8: Monitoring & Maintenance
```

---

## ✅ STEP 1: LOCAL PRODUCTION TESTING

Before deploying anywhere, test production build locally.

### 1. Change environment to production

**File: `apps/api/.env`**
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=file:./prod.db
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key-$(openssl rand -base64 32)
ADMIN_EMAIL=admin@example.com
ADMIN_INITIAL_PASSWORD=TempPassword123!
```

**File: `apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### 2. Build frontend production bundle

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/web
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Linting
Route (app)                              Size
┌ o  /                                    42 kB
├ ○ /api/trpc/[trpc]                     50 B
├ ○ /admin                               1.2 kB
├ ○ /dictionary                          15 kB
├ ○ /grammar                             18 kB
├ ○ /subhashit                           12 kB
├ ○ /songs                               14 kB ⭐
├ ○ /stories                             16 kB ⭐
└ ○ /daily                               18 kB ⭐
```

### 3. Build backend production

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api
npm run build  # or: npx tsc
```

### 4. Test production build locally

**Terminal 1: Backend**
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api
npm start
```

**Terminal 2: Frontend**
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/web
npm start
```

**Browser: http://localhost:3000**

✅ All pages should work exactly like development!

---

## ✅ STEP 2: DATABASE SETUP (SUPABASE)

### 2.1 Create Supabase Account & Project

1. Go to **https://supabase.com**
2. Sign up (free account)
3. Click **"New Project"**
4. Fill details:
   - **Name**: SanskritKosh-Prod
   - **Database Password**: Use strong password (12+ chars)
   - **Region**: Choose closest to your location
5. Click **Create Project** (wait 2-3 minutes)

### 2.2 Get Database Connection URL

1. Once created, go: **Settings** → **Database**
2. Copy **Connection String** (URI section)
3. Format: `postgresql://postgres:[PASSWORD]@db.[ID].supabase.co:5432/postgres`
4. **Save this URL!** You'll need it multiple times

### 2.3 Setup Local Prisma with Supabase

Update **`apps/api/.env`**:

```env
# Change from SQLite to PostgreSQL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.[YOUR_ID].supabase.co:5432/postgres?schema=public

# Other vars
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-app.vercel.app  # Will update later
JWT_SECRET=$(openssl rand -base64 32)
```

### 2.4 Deploy Database Schema

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api

# Generate Prisma client for PostgreSQL
npx prisma generate

# Deploy migrations to Supabase
npx prisma migrate deploy

# Seed production database
npx prisma db seed
```

✅ Your Supabase database is now ready!

**Verify in Supabase Dashboard:**
Go to **Table Editor** → Should see all 13 tables created

---

## ✅ STEP 3: BACKEND DEPLOYMENT (RAILWAY)

Railway is the easiest backend hosting for Node.js apps.

### 3.1 Create Railway Account

1. Go to **https://railway.app**
2. Sign up (free tier available: 500 hours/month)
3. Click **"Start a New Project"**
4. Select **"Deploy from GitHub"**

### 3.2 Connect GitHub Repository

1. Click **"Deploy from GitHub"**
2. Authorize Railway to access your GitHub
3. Select your Sanskrit repository
4. Select main branch
5. Click **Deploy**

### 3.3 Configure Backend Service

Railway should auto-detect it's a Node.js project.

**Set Environment Variables:**

1. In Railway dashboard, click your project
2. Go to **Variables** tab
3. Add these variables:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.[ID].supabase.co:5432/postgres?schema=public
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<generate: openssl rand -base64 32>
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_INITIAL_PASSWORD=TempPassword123!
```

### 3.4 Configure Build & Start Commands

**Railway Build Command:**
```bash
cd apps/api && npm install && npm run build
```

**Railway Start Command:**
```bash
cd apps/api && npm start
```

### 3.5 Get Backend URL

After deployment completes:
1. Go to **Deployments** tab
2. Click **View Logs** to see it's running
3. Copy the public URL (e.g., `https://sanskritapi-prod.railway.app`)
4. **Save this URL!** You need it for frontend

✅ Backend is now live!

**Test it:**
```bash
curl https://sanskritapi-prod.railway.app/api/v1/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

## ✅ STEP 4: FRONTEND DEPLOYMENT (VERCEL)

Vercel is the official Next.js hosting platform.

### 4.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Sign up (free tier available)
3. Click **"Create New Project"**
4. Click **"Import GitHub Project"**

### 4.2 Import Your Repository

1. Authorize Vercel with GitHub
2. Select Sanskrit repository
3. Click **Import**

### 4.3 Configure Project

**Build Command:**
```bash
cd apps/web && npm install && npm run build
```

**Output Directory:**
```
apps/web/.next
```

### 4.4 Add Environment Variables

Before deploying, add these:

1. Go to **Settings** → **Environment Variables**
2. Add:

```env
# Key: NEXT_PUBLIC_API_URL
# Value: https://sanskritapi-prod.railway.app/api/v1

# Key: NEXTAUTH_SECRET
# Value: <generate: openssl rand -base64 32>

# Key: NEXTAUTH_URL
# Value: https://your-app.vercel.app
```

### 4.5 Deploy

Click **Deploy** button

Vercel will:
- Build your Next.js app
- Run tests
- Deploy to CDN
- Give you a URL (e.g., `https://sanskrit-app.vercel.app`)

✅ Frontend is now live!

---

## ✅ STEP 5: CONNECT BACKEND & FRONTEND

Now update all the URLs:

### 5.1 Get Your URLs

- **Backend URL**: From Railway dashboard (e.g., `https://sanskritapi-prod.railway.app`)
- **Frontend URL**: From Vercel dashboard (e.g., `https://sanskrit-app.vercel.app`)

### 5.2 Update Backend Environment Variables

**Go to Railway → Your Project → Variables**

Update:
```env
FRONTEND_URL=https://sanskrit-app.vercel.app
```

### 5.3 Update Frontend Environment Variables

**Go to Vercel → Your Project → Settings → Environment Variables**

Update:
```env
NEXT_PUBLIC_API_URL=https://sanskritapi-prod.railway.app/api/v1
```

### 5.4 Redeploy Both

**Redeploy Backend:**
Railway auto-redeploys when variables change

**Redeploy Frontend:**
Railway auto-redeploys when variables change

⏳ Wait 2-3 minutes for both to deploy

---

## ✅ STEP 6: CUSTOM DOMAIN (OPTIONAL)

### 6.1 Setup Domain with Vercel

1. Go to **Vercel Dashboard** → **Settings** → **Domains**
2. Enter your domain (e.g., `sanskritosh.com`)
3. Verify domain ownership:
   - Add DNS records to your domain registrar (Godaddy, Namecheap, etc.)
   - Vercel will provide exact records to add
4. SSL certificate auto-generates (free with Vercel)

### 6.2 Update Backend CORS

**File: `apps/api/src/index.ts`**

```typescript
app.use(cors({
    origin: [
        "http://localhost:3000",           // Development
        "https://sanskrit-app.vercel.app", // Vercel
        "https://sanskritosh.com",         // Custom domain
    ],
    credentials: true,
}));
```

Then redeploy backend to Railway.

---

## ✅ STEP 7: TESTING & VERIFICATION

### 7.1 Test All Pages

Visit each page and verify data loads:

```
✅ https://sanskrit-app.vercel.app/
✅ https://sanskrit-app.vercel.app/grammar
✅ https://sanskrit-app.vercel.app/dictionary
✅ https://sanskrit-app.vercel.app/subhashit
✅ https://sanskrit-app.vercel.app/songs
✅ https://sanskrit-app.vercel.app/stories
✅ https://sanskrit-app.vercel.app/daily
```

### 7.2 Test API Health

```bash
curl https://sanskritapi-prod.railway.app/api/v1/health
# Response: {"status":"ok","timestamp":"..."}
```

### 7.3 Test Dictionary Search

```bash
curl "https://sanskritapi-prod.railway.app/api/v1/dictionary/search?q=namaste"
# Should return search results
```

### 7.4 Test Each Content Type

```bash
# Grammar
curl https://sanskritapi-prod.railway.app/api/v1/grammar/topics

# Dictionary
curl https://sanskritapi-prod.railway.app/api/v1/dictionary

# Subhashit
curl https://sanskritapi-prod.railway.app/api/v1/subhashit

# Songs
curl https://sanskritapi-prod.railway.app/api/v1/songs

# Stories
curl https://sanskritapi-prod.railway.app/api/v1/stories

# Daily
curl https://sanskritapi-prod.railway.app/api/v1/daily
```

All should return JSON data! ✅

---

## ✅ STEP 8: MONITORING & MAINTENANCE

### 8.1 Setup Error Tracking (Optional but Recommended)

**Add Sentry** to track errors:

1. Go to **https://sentry.io**
2. Create account
3. Create project
4. Add SENTRY_DSN to both backend and frontend env vars
5. Errors will be tracked automatically

### 8.2 Monitor Performance

**Vercel Analytics:**
- Automatically tracks Web Vitals
- View in Vercel Dashboard → Analytics

**Railway Monitoring:**
- View logs in Railway Dashboard
- Set up alerts

### 8.3 Database Backups

**Supabase automatic backups:**
- Enabled by default (every 24 hours)
- Go to **Settings** → **Backups**

**Manual backup:**
```bash
# Export database
pg_dump "postgresql://postgres:PASSWORD@db.ID.supabase.co:5432/postgres" > backup.sql

# Restore from backup
psql "postgresql://postgres:PASSWORD@db.ID.supabase.co:5432/postgres" < backup.sql
```

### 8.4 Update Seed Data

To add more content to production:

```bash
# Update apps/api/prisma/seed.ts with new data

# Run seed on production database
DATABASE_URL=<your-supabase-url> npx prisma db seed
```

---

## 📊 ARCHITECTURE AFTER DEPLOYMENT

```
Users (Browser)
    ↓
Vercel CDN (Frontend - https://sanskrit-app.vercel.app)
    ↓ (HTTPS)
Railway Server (Backend - https://sanskritapi-prod.railway.app)
    ↓
Supabase PostgreSQL (Database)
```

---

## 🔧 TROUBLESHOOTING

### Frontend shows "Backend not responding"

**Check:**
1. Is Railway backend running? View logs in Railway Dashboard
2. Are environment variables correct? Check Vercel env vars
3. Is CORS configured? Check `apps/api/src/index.ts`

**Fix:**
```bash
# Redeploy backend
# Go to Railway → Redeploy

# Or update and push code
git add .
git commit -m "fix: cors configuration"
git push
```

### API returns 404 errors

**Check:**
1. API URLs are correct
2. Routes are registered in `apps/api/src/index.ts`
3. Database has data (check Supabase dashboard)

### Database connection refused

**Check:**
1. CONNECTION_URL is correct
2. Supabase project is running
3. IP whitelist (Supabase allows all IPs by default)

**Reset:**
```bash
# Generate new PostgreSQL password in Supabase
# Update DATABASE_URL everywhere
# Redeploy
```

---

## 📋 DEPLOYMENT CHECKLIST

- [ ] Local production testing completed
- [ ] Supabase account created
- [ ] Database URL copied and saved
- [ ] Migrations deployed to Supabase
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied
- [ ] Environment variables updated everywhere
- [ ] Backend and frontend redeployed
- [ ] All pages tested and working
- [ ] API endpoints verified
- [ ] Custom domain setup (optional)
- [ ] CORS configured for domain
- [ ] Error tracking setup (optional)
- [ ] Database backups verified
- [ ] Monitoring alerts configured

---

## 🎉 DEPLOYMENT COMPLETE! ✅

Your SanskritKosh application is now:
- ✅ Running in production
- ✅ Using PostgreSQL database
- ✅ Accessible worldwide
- ✅ SSL/HTTPS protected
- ✅ Auto-scaling
- ✅ Monitored
- ✅ Backed up

**Your app is live at: https://sanskrit-app.vercel.app** 🕉️

---

## 📞 QUICK COMMAND REFERENCE

```bash
# View backend logs
railway logs

# Redeploy backend
railway redeploy

# Check database locally
DATABASE_URL=<your-supabase-url> npx prisma studio

# Run migrations
DATABASE_URL=<your-supabase-url> npx prisma migrate deploy

# Seed production database
DATABASE_URL=<your-supabase-url> npx prisma db seed
```

---

**Next Steps After Deployment:**
1. Share your app URL with users
2. Monitor logs for errors
3. Add more Sanskrit content to database
4. Gather user feedback
5. Plan features for v2.0

Happy hosting! 🚀
