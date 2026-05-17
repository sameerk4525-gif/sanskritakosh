# CONTRIBUTING TO SANSKRITAKOSH

Thank you for your interest in contributing to SanskritKosh! We welcome contributions from the community.

## Code of Conduct

- Be respectful and inclusive
- Focus on what's best for the community
- Respect Sanskrit and Indian cultural heritage
- Be patient and helpful with newcomers

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/sanskritakosh.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Push and create a Pull Request

## Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, no `any` types
- **Formatting**: Use Prettier (automatically formatted)
- **Linting**: Run `npm run lint` before committing
- **Tests**: Add tests for new features

### Commit Messages

Use conventional commits:
```
feat: add Sanskrit number learning module
fix: correct Devanagari font rendering on iOS
docs: update deployment guide
style: format grammar component
test: add dictionary search tests
```

### Git Workflow

1. Create a feature branch from `main`
2. Keep commits focused and atomic
3. Write clear commit messages
4. Rebase before creating PR (if needed)
5. Ensure CI passes

## Frontend Development

### Adding a Component

Create components in `apps/web/components/`:

```typescript
// components/ExampleComponent.tsx
"use client"; // if client-side

interface ExampleComponentProps {
  title: string;
  content: string;
}

export function ExampleComponent({ title, content }: ExampleComponentProps) {
  return (
    <div className="card">
      <h2 className="font-sanskrit text-2xl">{title}</h2>
      <p className="body-text">{content}</p>
    </div>
  );
}
```

### File Organization

```
components/
├── layout/          # Navigation, footer, etc.
├── home/           # Home page sections
├── grammar/        # Grammar-specific
├── dictionary/     # Dictionary components
├── ui/            # Reusable UI primitives
└── admin/         # Admin-only components
```

### Styling Guidelines

- Use Tailwind CSS classes
- Use CSS variables for theme colors
- Follow mobile-first approach
- Ensure 4.5:1 contrast ratio
- Use semantic HTML

## Backend Development

### Adding an API Route

Create routes in `apps/api/src/routes/`:

```typescript
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await prisma.model.findUnique({
      where: { id: req.params.id }
    });
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "ERROR", message: "Error message" }
    });
  }
});

export default router;
```

### Database Changes

1. Update `apps/api/src/prisma/schema.prisma`
2. Create migration: `npm run migrate`
3. Update seed data if needed: `apps/api/src/prisma/seed.ts`

### API Response Format

Always use this format:
```typescript
{
  success: boolean,
  data?: T,
  error?: { code: string, message: string },
  meta?: { page, total, limit }
}
```

## Content Contributions

### Adding Dictionary Words

1. Ensure proper Devanagari text
2. Include IAST transliteration
3. Provide multiple meanings
4. Add Hindi translation
5. Etymology optional but appreciated
6. Usage examples improve learning

### Adding Grammar Topics

1. Structure content as JSON blocks
2. Include examples with translations
3. Use Devanagari font for Sanskrit
4. Add IAST alternate
5. Link to related topics
6. Provide difficulty level

### Adding Subhashits

1. Use authentic Sanskrit text
2. Cite reliable sources
3. Provide English translation
4. Add Hindi translation
5. Include explanation/commentary
6. Connect to related wisdom

## Testing

```bash
# Frontend
npm run test -w web

# Backend
npm run test -w api

# Type checking
npm run type-check
```

## Pull Request Process

1. Update README.md if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update version numbers if applicable
5. Description should reference any related issues

### PR Title Format
```
[AREA] Description (e.g., [Frontend] Add grammar search)
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## How Has This Been Tested?
Describe testing

## Screenshots (if applicable)

## Checklist
- [ ] Tests pass
- [ ] Code follows style guide
- [ ] Documentation updated
```

## Sanskrit Content Guidelines

### Devanagari Text
- Use proper Unicode characters
- Verify with native speakers
- Font: Tiro Devanagari Sanskrit
- Ensure no mojibake (encoding issues)

### Transliteration (IAST)
- Follow IAST standard
- Common mistakes to avoid:
  - ś vs s
  - ṣ vs s
  - ṭ vs t
  - ḍ vs d
  - ṛ vs ri

### Meanings
- Provide multiple meanings where appropriate
- Include both literal and contextual meanings
- Add Hindi equivalents for Indian users
- Cite authoritative sources

## Getting Help

- **Questions?** Open an issue with [QUESTION] label
- **Bug Report?** Use [BUG] label, include reproduction steps
- **Feature Request?** Use [FEATURE] label with description
- **Discord**: Join our community server (link)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Annual contributor list

## License

All contributions are licensed under MIT License. By contributing, you agree to this license.

---

Thank you for making SanskritKosh better! 🙏🕉️
