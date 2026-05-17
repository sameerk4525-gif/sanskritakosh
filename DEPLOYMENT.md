# 🚀 DEPLOYMENT GUIDE

## Quick Start

Get SanskritKosh running locally in 5 minutes.

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Git

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sanskritakosh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   
   # Edit .env.local and set:
   # - DATABASE_URL (PostgreSQL connection)
   # - REDIS_URL (optional)
   # - JWT_SECRET
   # - CLOUDINARY_* (optional, for media uploads)
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   cd apps/api
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database with sample data
   npx prisma db seed
   cd ../..
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - API: http://localhost:4000

## Production Deployment

### Frontend (Vercel)

1. **Prerequisites**
   - Vercel account
   - GitHub repository connected

2. **Deploy**
   ```bash
   # Connect your repository to Vercel
   # Set environment variables in Vercel dashboard:
   NEXT_PUBLIC_API_URL=https://api.sanskritakosh.com/api/v1
   NEXTAUTH_SECRET=<generate-a-secure-secret>
   NEXTAUTH_URL=https://sanskritakosh.com
   ```

3. **Automatic Deployments**
   - Commits to `main` branch automatically deploy to production

### Backend (Railway or Render)

#### Using Railway

1. **Connect Repository**
   - Connect your GitHub repo to Railway
   - Select the `apps/api` directory

2. **Configure Environment**
   ```
   DATABASE_URL = postgresql://...
   JWT_SECRET = <generate-secure-secret>
   PORT = 4000
   NODE_ENV = production
   FRONTEND_URL = https://sanskritakosh.com
   ```

3. **Database
   - Railway automatically provisions PostgreSQL
   - Run migrations on deploy

#### Using Render

1. **Create Web Service**
   - Build Command: `cd apps/api && npm install && npm run build`
   - Start Command: `cd apps/api && npm start`

2. **Environment Variables**
   ```
   DATABASE_URL = <PostgreSQL URL>
   JWT_SECRET = <generate-secure-secret>
   NODE_ENV = production
   ```

### Database Setup

1. **Create PostgreSQL Database**
   ```bash
   # Local (using createdb)
   createdb sanskritakosh
   
   # Or use Railway/Render PostgreSQL add-on
   ```

2. **Run Migrations**
   ```bash
   npm run db:migrate:deploy
   ```

3. **Seed Production Data** (optional)
   ```bash
   npm run seed
   ```

## Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=https://api.sanskritakosh.com/api/v1
NEXT_PUBLIC_SITE_URL=https://sanskritakosh.com
NEXTAUTH_URL=https://sanskritakosh.com
NEXTAUTH_SECRET=<generate-128-char-secret>
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:pass@host:5432/sanskritakosh
REDIS_URL=redis://host:6379
JWT_SECRET=<generate-128-char-secret>
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL=admin@sanskritakosh.com
ADMIN_INITIAL_PASSWORD=<strong-password>
FRONTEND_URL=https://sanskritakosh.com
PORT=4000
NODE_ENV=production
```

## Deployment Checklist

- [ ] Environment variables configured correctly
- [ ] Database migrations run successfully
- [ ] Admin user created
- [ ] Seed data loaded
- [ ] API health check passes: `GET /api/v1/health`
- [ ] CORS configured for production domain
- [ ] SSL certificate configured
- [ ] Rate limiting active
- [ ] Cloudinary credentials set (for media)
- [ ] Email service configured (for notifications)
- [ ] Monitoring/logging set up
- [ ] Backups configured for database

## Monitoring and Maintenance

### Logs
- **Frontend**: Vercel dashboard
- **Backend**: Railway/Render logs, or use Datadog/New Relic

### Performance
- Monitor API response times
- Check database query performance
- Monitor Redis cache hit rates

### Maintenance
- Regular database backups
- Update dependencies monthly: `npm outdated`
- Monitor SSL certificate expiry

## Scaling Considerations

### Database
- Add read replicas for scale
- Implement database connection pooling
- Regular index optimization

### API
- Use Redis for caching expensive queries
- Implement request queuing for heavy operations
- Horizontal scaling with load balancer

### Frontend
- Use CDN for static assets (Cloudinary)
- Implement image optimization
- Cache long-lived assets

### Search
- Consider Elasticsearch for large dictionary (1M+ words)
- Implement fuzzy matching at scale

## Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

### Migration Fails
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Then re-apply migrations
npm run db:migrate:deploy
```

### API Not Responding
```bash
# Check if running
curl http://localhost:4000/api/v1/health

# Check logs for errors
npm run dev -- --debug
```

## Support

For deployment issues:
1. Check logs in hosting platform dashboard
2. Review environment variables
3. Verify database connectivity
4. Check API status at `/api/v1/health`

---

**Need help?** Email: devops@sanskritakosh.com
