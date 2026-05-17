# 🚀 MANUAL STARTUP GUIDE

## STATUS: ✅ All bugs fixed, dependencies installed, Prisma generated!

Everything is now ready. You just need to start the servers manually.

---

## STEP 1: Start Backend (Open NEW Terminal Window)

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api

# Option A - With tsx watch (Recommended)
npx tsx watch src/index.ts

# Option B - Build and run (If tsx has issues)
npm run build && node dist/index.js

# Option C - Just compile and run
npx tsc && node dist/index.js
```

**Wait for:**
```
🕉️  SanskritKosh API running on port 3001
```

---

## STEP 2: Start Frontend (Open ANOTHER NEW Terminal Window)

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/web
npm run dev
```

**Wait for:**
```
▲ Next.js 14 ready in ...
○ Listening on http://localhost:3000
```

---

## STEP 3: Open in Browser

```
http://localhost:3000
```

You should now see the Sanskrit Learning Website! ✅

---

## 🔧 IF BACKEND WON'T START:

### Try this exact command:
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api

# First, verify the file exists
ls -la src/index.ts

# Create dist folder if missing
mkdir -p dist

# Build TypeScript
./node_modules/.bin/tsc --outDir dist --module commonjs

# Run it
node dist/index.js
```

### If that fails, debug this way:
```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/api

# Check Node.js version
node --version  # Should be 18+

# Check tsx is installed
./node_modules/.bin/tsx --version

# Check TypeScript
./node_modules/.bin/tsc --version

# Try compiling just the main file
./node_modules/.bin/tsc src/index.ts --outDir dist --module commonjs --moduleResolution node

# Try running it
node dist/src/index.js
```

---

## 🔧 IF FRONTEND WON'T START:

```bash
cd /home/sameer-khan/Desktop/sanskrit/apps/web

# Clear Next.js cache
rm -rf .next

# Try again
npm run dev

# If port 3000 is busy, use different port:
npm run dev -- -p 3001
```

---

## ✅ VERIFICATION CHECKLIST

After starting both servers:

```bash
# In a NEW terminal window, test the backend:
curl http://localhost:3001/api/v1/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

---

## 📊 WHAT'S BEEN DONE SO FAR

✅ Dependencies installed (npm install)
✅ Prisma schema created (apps/api/prisma/schema.prisma)
✅ Prisma client generated
✅ Seed file created
✅ All TypeScript errors fixed
✅ All bugs fixed
✅ Environment files created (.env.local and apps/api/.env)

---

## 🎯 READY FOR DEPLOYMENT?

Once both servers are running and working locally:

Follow: `SUPABASE_VERCEL_DEPLOYMENT.md` to deploy to production

---

**Everything is set up! Just open two terminal windows and follow STEP 1 & 2 above!**
