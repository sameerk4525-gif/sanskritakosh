# 🚀 QUICK START GUIDE

Get SanskritKosh running locally in under 5 minutes!

## Prerequisites

- **Node.js**: v16 or higher ([download](https://nodejs.org))
- **npm**: comes with Node.js
- **PostgreSQL**: v12 or higher ([download](https://www.postgresql.org))
- **Git**: for cloning the repository

## Step 1: Clone Repository

```bash
git clone https://github.com/username/sanskritakosh.git
cd sanskritakosh
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs dependencies for all workspaces (frontend, backend, shared).

## Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your settings
```

Key variables to set:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/sanskritakosh
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
```

## Step 4: Set Up Database

```bash
# Navigate to API directory
cd apps/api

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed with sample data
npx prisma db seed

# Return to root
cd ../..
```

## Step 5: Start Development

```bash
npm run dev
```

Open your browser:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000

## 🎉 You're Done!

You should see:
- ✅ Next.js frontend on port 3000
- ✅ Express API on port 4000
- ✅ Database with sample content
- ✅ Admin user ready (use credentials from .env)

## First Steps

1. **Explore the Homepage**
   - Visit http://localhost:3000
   - Click through categories

2. **Test Dictionary**
   - Go to http://localhost:3000/dictionary
   - Search for "आत्मा"

3. **Access Admin**
   - Go to http://localhost:3000/admin
   - Login with admin credentials

4. **Check API**
   - Visit http://localhost:4000/api/v1/health
   - View http://localhost:4000/api/v1/grammar/topics

##  Common Issues

### "Cannot find module" error
```bash
# Ensure all dependencies installed
npm install

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

### Database connection errors
```bash
# Verify PostgreSQL is running
psql --version

# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Port already in use
```bash
# Frontend on different port
PORT=3001 npm run dev

# API on different port
PORT=5000 npm run dev -w apps/api
```

### TypeScript errors after clone
```bash
cd apps/web
npx tsc --noEmit

cd apps/api
npx tsc --noEmit
```

## Project Structure

```
sanskritakosh/
├── apps/
│   ├── web/          # Next.js frontend (http://localhost:3000)
│   └── api/          # Express backend (http://localhost:4000)
├── packages/
│   └── shared/       # Shared types & validation
└── docs/             # Documentation
```

## Useful Commands

```bash
# Development
npm run dev              # Start all services

# Frontend only
npm run dev -w web

# Backend only  
npm run dev -w api

# Build
npm run build            # Build all packages

# Type checking
npm run type-check       # Check TypeScript

# Linting
npm run lint             # Run ESLint

# Database
npm run migrate          # Create new migration
npm run seed             # Re-seed database
```

## Next Steps

1. **Read the full README.md** for architecture details
2. **Check DEVELOPMENT.md** for development workflows
3. **Review CONTRIBUTING.md** if you want to contribute
4. **Explore the codebase** - start with `pages/` and `components/`

## Need Help?

- 📖 **Documentation**: See README.md
- 🐛 **Bug Report**: Create an GitHub issue
- 💬 **Questions**: Discussions in GitHub
- 📧 **Email**: hello@sanskritakosh.com

## Happy Learning! 🕉️

```
संस्कृतं पठाम
(Let us learn Sanskrit)
```

---

**Next**: Start exploring the codebase! Check out `apps/web/app` and `apps/api/src/routes`
