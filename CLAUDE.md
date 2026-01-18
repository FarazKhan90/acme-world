# Project Instructions for Claude

## Project Overview

ACME Todo Application - a full-stack app with:
- **Frontend:** React 18 + TypeScript + Vite (port 5173)
- **Backend:** Spring Boot 3.2 + Java 21 + PostgreSQL (port 8080)

---

## Documentation Screenshots

When creating user documentation with screenshots for new features, use the Playwright automation setup.

### Screenshot Script Location

`frontend/e2e/screenshots.spec.ts`

### How to Add Screenshots for a New Feature

1. **Add a new test block** to `frontend/e2e/screenshots.spec.ts`:

```typescript
test('capture [feature-name] screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await login(page);

  // Navigate and capture full page
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/feature-step-1.png`,
  });

  // Capture specific element
  await page.locator('.element-class').screenshot({
    path: `${SCREENSHOT_DIR}/feature-element.png`,
  });
});
```

2. **Run the script:**

```bash
cd frontend
npm run screenshots          # headless
npm run screenshots:headed   # with visible browser
```

3. **Write documentation** in `docs/[feature-name]-guide.md`:

```markdown
# Feature Name - User Guide

## Step 1: [Action]
Description.

![Step 1](screenshots/feature-step-1.png)
*Figure 1: Caption*
```

### Conventions

- **Screenshots directory:** `docs/screenshots/`
- **Documentation directory:** `docs/`
- **Test credentials:** `john.doe` / `password123`
- **Viewport size:** 1280x800
- **File naming:** `feature-name-step.png`, `feature-name-guide.md`

### Useful Playwright Patterns

```typescript
// Wait for element before screenshot
await page.waitForSelector('.modal-content');

// Capture element only
await page.locator('.todo-item').first().screenshot({ path: '...' });

// Capture after action
await page.click('button:has-text("History")');
await page.waitForTimeout(500);
await page.screenshot({ path: '...' });
```

---

## Updating These Instructions

When adding new features or workflows to this project, update this `CLAUDE.md` file:

1. **Add new section** for the feature/workflow
2. **Include:**
   - Purpose and when to use it
   - Step-by-step instructions
   - Code examples if applicable
   - File locations and naming conventions
3. **Keep it concise** - this file is read at the start of every session

### Example: Adding a New Workflow Section

```markdown
---

## [Workflow Name]

Brief description of when this applies.

### Steps

1. First step
2. Second step

### Files

- `path/to/relevant/file`

### Commands

\`\`\`bash
command to run
\`\`\`
```

---

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `docs/` | User documentation |
| `docs/screenshots/` | Documentation screenshots |
| `frontend/e2e/` | Playwright scripts |
| `frontend/src/components/` | React components |
| `backend/src/` | Spring Boot backend |

---

## Common Commands

```bash
# Frontend
cd frontend && npm run dev           # Start dev server
cd frontend && npm run screenshots   # Generate screenshots

# Backend
cd backend && ./mvnw spring-boot:run # Start backend
```
