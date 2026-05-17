# 🚀 SanskritKosh - Deployment Roadmap

Your project is working locally. Here's how to deploy everywhere.

## Phase 1: Pre-Deployment Setup (Before Going Live)

### 1. Setup GitHub Repository

```bash
cd /home/sameer-khan/Desktop/sanskrit

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: SanskritKosh full stack"

# Create repository on GitHub: https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/sanskritakosh.git
git branch -M main
git push -u origin main
```

### 2. Generate Secure Secrets

```bash
# Generate JWT_SECRET (use a strong 32+ char string)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Save these somewhere safe (password manager, .env file)
```

### 3. Create Domain Names

- **Frontend Domain**: sanskritakosh.com (or your choice)
- **Backend Domain**: api.sanskritakosh.com (or api-sanskritakosh.com)
- Register on your Domain Provider (GoDaddy, Namecheap, etc.)

---

## Phase 2: Database Setup (PostgreSQL - Not SQLite)

> ⚠️ SQLite is for development only. Production needs PostgreSQL.

### Option A: Railway (Recommended - Easiest)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Add PostgreSQL plugin
5. Get `DATABASE_URL` from Railway dashboard
6. Copy it to your `.env` file

### Option B: Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create PostgreSQL database
4. Get connection string
5. Save as `DATABASE_URL`

### Option C: Traditional VPS (AWS, DigitalOcean, Linode)

1. Create a VPS (2GB RAM minimum)
2. Install PostgreSQL
3. Create database and user
4. Get connection string

---

## Phase 3: Deploy Frontend (Vercel)

### Step 1: Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**OR** use GitHub integration:
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect GitHub account
4. Select your `sanskritakosh` repository
5. Import

### Step 2: Set Environment Variables in Vercel

Go to **Project Settings → Environment Variables**:

```
NEXT_PUBLIC_API_URL = https://api.sanskritakosh.com/api/v1
NEXT_PUBLIC_SITE_URL = https://sanskritakosh.com
NEXTAUTH_URL = https://sanskritakosh.com
NEXTAUTH_SECRET = <your-generated-secret>
```

### Step 3: Configure Domain

1. Go to **Vercel Dashboard → Settings → Domains**
2. Add your domain: `sanskritakosh.com`
3. Follow DNS setup instructions
4. Update DNS records at your registrar

**Frontend URL**: https://sanskritakosh.com ✅

---

## Phase 4: Deploy Backend (Railway or Render)

### Using Railway (Recommended)

#### Step 1: Connect GitHub to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `sanskritakosh` repository

#### Step 2: Configure Build Settings

1. After import, Railway should auto-detect Node.js
2. Add environment variable: `MONOREPO_PATH=apps/api`

#### Step 3: Set Environment Variables

Go to **Variables** tab, add:

```
DATABASE_URL = <from PostgreSQL plugin>
REDIS_URL = redis://... (if using Redis)
JWT_SECRET = <your-generated-secret>
PORT = 3001
NODE_ENV = production
FRONTEND_URL = https://sanskritakosh.com
CLOUDINARY_CLOUD_NAME = (optional, for images)
CLOUDINARY_API_KEY = (optional)
CLOUDINARY_API_SECRET = (optional)
ADMIN_EMAIL = admin@sanskritakosh.com
ADMIN_INITIAL_PASSWORD = <strong-password>
```

#### Step 4: Deploy Database Migrations

Railway will auto-run migrations on deploy. If not, run manually:

```bash
# From your local machine
npm run db:migrate:deploy
```

#### Step 5: Get Backend URL

Railway gives you a generated URL like: `https://your-api-name.railway.app`

**Backend URL**: https://api.sanskritakosh.com ✅ (if using custom domain)

---

## Phase 5: Connect Frontend ↔ Backend

### Update Frontend Environment

In Vercel dashboard, update:

```
NEXT_PUBLIC_API_URL = https://api.sanskritakosh.com/api/v1
```

### Test Connection

```bash
# From frontend, test:
curl https://api.sanskritakosh.com/api/v1/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

## Phase 6: SSL & HTTPS (Automatic)

✅ Vercel: Auto SSL from Let's Encrypt
✅ Railway: Auto SSL from Let's Encrypt
✅ Custom Domain: Setup in domain registrar

---

## Phase 7: Testing Production

### 1. Test Frontend

```bash
# Visit: https://sanskritakosh.com
# Should load without errors
```

### 2. Test API Endpoints

```bash
# Health check
curl https://api.sanskritakosh.com/api/v1/health

# Grammar topics
curl https://api.sanskritakosh.com/api/v1/grammar/topics

# Dictionary
curl https://api.sanskritakosh.com/api/v1/dictionary

# Subhashit
curl https://api.sanskritakosh.com/api/v1/subhashit
```

### 3. Test Full Flow

1. Open https://sanskritakosh.com
2. Try to fetch grammar topics
3. Verify data loads
4. Check browser console for errors

---

## Phase 8: Advanced Deployment Features

### A. Auto-Deployments

Both Vercel and Railway pull from GitHub automatically:
- Push to `main` → Auto-deploys to production ✅

### B. Monitoring & Logs

**Vercel**:
- Dashboard → Logs section

**Railway**:
- Dashboard → Logs section

### C. Database Backups

**Railway**: Auto backups daily
**Render**: Auto backups (check settings)

### D. Custom Domain for Backend

If using custom domain `api.sanskritakosh.com`:

1. Get Railway/Render public URL
2. In your domain registrar:
   - Create CNAME record: `api` → `railway-url.railway.app`
3. Add custom domain in Railway/Render settings

### E. Environment-Specific Configs

Create separate environments:

```
.env.local        # Local development (SQLite)
.env.staging      # Staging (PostgreSQL)
.env.production   # Production (PostgreSQL)
```

---

## Quick Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Secure secrets generated
- [ ] Domain name registered
- [ ] PostgreSQL database setup (Railway/Render)
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Database migrations run
- [ ] NEXT_PUBLIC_API_URL configured
- [ ] API endpoints tested
- [ ] Frontend tested
- [ ] SSL certificate active
- [ ] Domain DNS configured
- [ ] Monitoring enabled
- [ ] Backups configured

---

## Common Issues & Solutions

### Issue: "Cannot reach database"
**Solution**: 
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall rules

### Issue: "CORS errors"
**Solution**: 
- Update FRONTEND_URL in backend .env
- Backend has CORS middleware configured

### Issue: "API returns 404"
**Solution**: 
- Verify API is deployed
- Check NEXT_PUBLIC_API_URL in frontend .env
- Test API directly

### Issue: "Slow API responses"
**Solution**: 
- Check database indexes
- Enable Redis caching
- Horizontal scale with Railway/Render

---

## Estimated Timeline

| Phase | Time | Difficulty |
|-------|------|-----------|
| GitHub Setup | 10 min | Easy |
| Database (Railway) | 15 min | Easy |
| Frontend (Vercel) | 20 min | Easy |
| Backend (Railway) | 20 min | Easy |
| Domain Setup | 15 min | Medium |
| Testing | 15 min | Easy |
| **TOTAL** | **~95 min** | **Medium** |

---

## Next Steps After Deployment

1. **Monitoring**: Setup error tracking (Sentry)
2. **Analytics**: Add Hotjar or Google Analytics
3. **Email**: Setup SendGrid for notifications
4. **Images**: Configure Cloudinary for uploads
5. **Search**: Implement Algolia search
6. **Auth**: Configure NextAuth OAuth providers
7. **CDN**: Add Cloudflare for faster global delivery

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/deployment

Good luck! 🕉️
