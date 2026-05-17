# 🛠️ DEVELOPMENT GUIDE

Complete guide for developing SanskritKosh locally.

## Prerequisites

- Node.js 16+ with npm
- PostgreSQL 12+
- Redis (optional, for caching)
- VS Code (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prisma
  - Thunder Client (API testing)

## Initial Setup

### 1. Clone and Install

```bash
git clone <repo>
cd sanskritakosh
npm install

# This installs dependencies for apps/web, apps/api, and packages/shared
```

### 2. Configure Environment

```bash
cp .env.example .env.local

# Edit .env.local with your local setup:
DATABASE_URL=postgresql://postgres:password@localhost:5432/sanskritakosh
JWT_SECRET=dev-secret-key
NEXTAUTH_SECRET=dev-nextauth-secret
```

### 3. Database Setup

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev

# When prompted, name the migration something like "init"
npx prisma db seed
cd ../..
```

### 4. Start Development

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- API: http://localhost:4000

## Development Workflow

### Adding a New Page

1. **Create the page in the appropriate route group**

```bash
# Create new public page
touch apps/web/app/(public)/new-page/page.tsx

# Or create auth page
touch apps/web/app/(auth)/new-page/page.tsx
```

2. **Implement the page**

```typescript
// apps/web/app/(public)/new-page/page.tsx
"use client";

export default function NewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-sanskrit text-4xl mb-8 text-primary">
        पृष्ठ
      </h1>
      {/* Content */}
    </div>
  );
}
```

3. **Add navigation link**

Edit `Navbar.tsx` and `CategoryGrid.tsx` if needed.

### Adding a New Component

1. **Create component file**

```bash
# For shared components
touch apps/web/components/grammar/NewComponent.tsx
```

2. **Implement with TypeScript**

```typescript
"use client";

interface NewComponentProps {
  title: string;
  content: string;
}

export function NewComponent({ title, content }: NewComponentProps) {
  return (
    <div className="card">
      <h2 className="font-sanskrit text-2xl text-primary">{title}</h2>
      <p className="body-text">{content}</p>
    </div>
  );
}
```

3. **Use in pages**

```typescript
import { NewComponent } from "@/components/grammar/NewComponent";

export default function Page() {
  return <NewComponent title="Title" content="Content" />;
}
```

### Adding a New API Route

1. **Create route file**

```bash
touch apps/api/src/routes/newroute.ts
```

2. **Implement route**

```typescript
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Your logic here
    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "ERROR", message: "Error message" },
    });
  }
});

export default router;
```

3. **Register in index.ts**

```typescript
import newRoutes from "./routes/newroute.js";

app.use("/api/v1/newroute", newRoutes);
```

### Adding to Database

1. **Update Prisma schema**

```prisma
model NewModel {
  id    String @id @default(cuid())
  name  String
  createdAt DateTime @default(now())
}
```

2. **Create migration**

```bash
cd apps/api
npx prisma migrate dev --name add_new_model
```

3. **Update seed script**

```typescript
// apps/api/src/prisma/seed.ts
const newItems = [...]
for (const item of newItems) {
  await prisma.newModel.upsert({...})
}
```

4. **Re-seed**

```bash
npx prisma db seed
```

### Testing an API Endpoint

Use Thunder Client in VS Code or curl:

```bash
# GET request
curl http://localhost:4000/api/v1/grammar/topics

# POST request with body
curl -X POST http://localhost:4000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Test"}'

# With authorization header
curl http://localhost:4000/api/v1/bookmarks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Code Style & Standards

### TypeScript Rules

- ✅ Use strict mode (`"strict": true` in tsconfig.json)
- ✅ Explicitly type function parameters and returns
- ❌ No `any` types (unless absolutely necessary)
- ✅ Use interfaces for object shapes
- ✅ Use enums for fixed sets of values

```typescript
// Good
function processUser(user: User): Promise<Result> {
  // ...
}

// Avoid
function processUser(user: any): any {
  // ...
}
```

### Component Guidelines

- ✅ Use functional components with hooks
- ✅ Type props with interfaces
- ✅ Use `"use client"` for client components
- ✅ Extract styles to Tailwind classes
- ✅ Keep components small and focused

```typescript
// Good
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2 className="font-sanskrit">{title}</h2>
      {children}
    </div>
  );
}
```

### CSS/Tailwind Guidelines

- ✅ Mobile-first approach
- ✅ Use Tailwind for styling
- ✅ Use CSS variables for colors
- ✅ Ensure 4.5:1 contrast ratio
- ✅ Use semantic HTML

```typescript
<div className="text-responsive md:text-2xl lg:text-3xl">
  {/* Text scales with viewport */}
</div>
```

### API Guidelines

- ✅ Use consistent response format
- ✅ Validate inputs with Zod
- ✅ Handle errors gracefully
- ✅ Use appropriate HTTP status codes
- ✅ Document endpoints

```typescript
// 200 OK
// 201 Created
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 500 Internal Server Error
```

## Debugging

### Frontend

```typescript
// React DevTools
import { useEffect } from "react";

useEffect(() => {
  console.log("Component mounted", props);
  return () => console.log("Component unmounted");
}, []);

// Redux DevTools for Zustand stores
```

### Backend

```typescript
// Console logging
console.log("Debug info:", data);
console.error("Error:", error);

// VS Code debugger
// Add breakpoints in code, Debug > Start Debugging
```

### Database

```bash
# Open Prisma Studio
cd apps/api
npx prisma studio

# View logs
npx prisma migrate dev --create-only
```

## Common Tasks

### Run Tests

```bash
npm run test -w web
npm run test -w api
```

### Type Check

```bash
npm run type-check
```

### Lint Code

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

### Format Code

```bash
npm run format  # or use Prettier extension
```

## Browser DevTools

### Chrome/Edge

1. **React DevTools**: Inspect components, props, state
2. **Redux DevTools**: Monitor Zustand stores
3. **Network Tab**: Monitor API calls
4. **Performance Tab**: Measure performance
5. **Lighthouse**: Run audits

## VS Code Extensions (Recommended)

```
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prisma
- Thunder Client (API testing)
- Better Comments
- Code Spell Checker
- GitLens
- TypeScript Vue Plugin (Volar)
```

## Performance Testing

```bash
# Run Lighthouse locally
npm run build
npm run start

# Then use Chrome DevTools Lighthouse tab
```

## Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql "postgresql://user:pass@localhost:5432/sanskritakosh"
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Type check each workspace
cd apps/web && npx tsc --noEmit
cd ../api && npx tsc --noEmit
```

##Tips & Tricks

1. **Use VS Code's Go to Definition** (Ctrl+Click) to jump to code
2. **Use breadcrumb navigation** in VS Code to navigate large files
3. **Set up .vscode/settings.json** for project-specific settings
4. **Use .vscode/launch.json** for debugging configuration
5. **Create code snippets** for common patterns

## Next Steps

1. Implement authentication with NextAuth.js
2. Connect frontend to backend manually
3. Build search functionality with Fuse.js
4. Add audio playback with Howler.js
5. Integrate Cloudinary for media
6. Write unit and integration tests
7. Set up CI/CD pipeline

---

**Happy Developing! 🕉️**

For questions: See README.md or CONTRIBUTING.md
