import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.join(__dirname, '../../docs/screenshots');

// Test credentials
const TEST_USER = {
  username: 'john.doe',
  password: 'password123',
};


async function login(page: Page) {
  await page.goto('/login');
  await page.fill('#username', TEST_USER.username);
  await page.fill('#password', TEST_USER.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/');
}

async function createTodo(page: Page, title: string, description?: string, priority?: string, dueDate?: string) {
  // Click on the input to expand the form
  const input = page.locator('input[placeholder="What needs to be done?"]');
  await input.click();
  await input.fill(title);

  // Fill optional fields if form is expanded
  if (description) {
    await page.fill('textarea[placeholder="Description (optional)"]', description);
  }

  if (priority) {
    await page.selectOption('select', priority);
  }

  if (dueDate) {
    await page.fill('input[type="date"]', dueDate);
  }

  await page.click('button[type="submit"]:has-text("Add")');
  await page.waitForTimeout(500);
}

test.describe('Screenshot Generation for User Manual', () => {
  test('generate all screenshots', async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 800 });

    // Login
    await login(page);

    // Wait for the page to fully load
    await page.waitForSelector('.todo-page', { timeout: 10000 });

    // Clean up any existing todos first (optional - comment out if you want to keep existing data)
    // We'll work with whatever state exists

    // Create sample todos for screenshots
    await createTodo(
      page,
      'Complete project documentation',
      'Write comprehensive docs for the new feature',
      'HIGH',
      '2026-01-25'
    );

    await createTodo(
      page,
      'Review pull requests',
      'Review pending PRs from team members',
      'MEDIUM',
      '2026-01-20'
    );

    await createTodo(
      page,
      'Update dependencies',
      'Check for security updates',
      'LOW',
      '2026-01-30'
    );

    await createTodo(
      page,
      'Schedule team meeting',
      'Discuss Q1 goals and milestones',
      'MEDIUM',
      '2026-01-22'
    );

    // Wait for todos to render
    await page.waitForTimeout(1000);

    // Screenshot 1: Main todo list view
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/todo-list-main.png`,
      fullPage: false,
    });
    console.log('✓ Captured: todo-list-main.png');

    // Screenshot 2: History button highlighted (capture just a todo item)
    const firstTodoItem = page.locator('.todo-item').first();
    await firstTodoItem.screenshot({
      path: `${SCREENSHOT_DIR}/history-button.png`,
    });
    console.log('✓ Captured: history-button.png');

    // Click the History button to open the modal
    const historyButton = firstTodoItem.locator('button:has-text("History")');
    await historyButton.click();

    // Wait for modal to appear
    await page.waitForSelector('.modal-content', { timeout: 5000 });
    await page.waitForTimeout(500);

    // Screenshot 3: History modal
    const modal = page.locator('.modal-content');
    await modal.screenshot({
      path: `${SCREENSHOT_DIR}/history-modal.png`,
    });
    console.log('✓ Captured: history-modal.png');

    // Screenshot 4: CREATED entry (should be in the history)
    const createdEntry = page.locator('.history-entry:has(.action-created)').first();
    if (await createdEntry.count() > 0) {
      await createdEntry.screenshot({
        path: `${SCREENSHOT_DIR}/entry-created.png`,
      });
      console.log('✓ Captured: entry-created.png');
    }

    // Close modal
    await page.locator('.modal-close').click();
    await page.waitForTimeout(300);

    // Update a todo to generate an UPDATED entry
    const todoToUpdate = page.locator('.todo-item').first();
    await todoToUpdate.locator('button:has-text("Edit")').click();
    await page.waitForTimeout(300);

    const editInput = todoToUpdate.locator('input[type="text"]');
    await editInput.clear();
    await editInput.fill('Complete project documentation (Updated)');
    await todoToUpdate.locator('button:has-text("Save")').click();
    await page.waitForTimeout(500);

    // Open history again for UPDATED entry
    await todoToUpdate.locator('button:has-text("History")').click();
    await page.waitForSelector('.modal-content', { timeout: 5000 });
    await page.waitForTimeout(500);

    // Screenshot 5: UPDATED entry
    const updatedEntry = page.locator('.history-entry:has(.action-updated)').first();
    if (await updatedEntry.count() > 0) {
      await updatedEntry.screenshot({
        path: `${SCREENSHOT_DIR}/entry-updated.png`,
      });
      console.log('✓ Captured: entry-updated.png');
    }

    // Close modal
    await page.locator('.modal-close').click();
    await page.waitForTimeout(300);

    // Complete a todo to generate COMPLETED entry
    const todoToComplete = page.locator('.todo-item').nth(1);
    await todoToComplete.locator('input[type="checkbox"]').click();
    await page.waitForTimeout(500);

    // Open history for COMPLETED entry
    await todoToComplete.locator('button:has-text("History")').click();
    await page.waitForSelector('.modal-content', { timeout: 5000 });
    await page.waitForTimeout(500);

    // Screenshot 6: COMPLETED entry
    const completedEntry = page.locator('.history-entry:has(.action-completed)').first();
    if (await completedEntry.count() > 0) {
      await completedEntry.screenshot({
        path: `${SCREENSHOT_DIR}/entry-completed.png`,
      });
      console.log('✓ Captured: entry-completed.png');
    }

    // Close modal
    await page.locator('.modal-close').click();
    await page.waitForTimeout(300);

    // Uncomplete the todo to generate UNCOMPLETED entry
    await todoToComplete.locator('input[type="checkbox"]').click();
    await page.waitForTimeout(500);

    // Open history for UNCOMPLETED entry
    await todoToComplete.locator('button:has-text("History")').click();
    await page.waitForSelector('.modal-content', { timeout: 5000 });
    await page.waitForTimeout(500);

    // Screenshot 7: UNCOMPLETED entry
    const uncompletedEntry = page.locator('.history-entry:has(.action-uncompleted)').first();
    if (await uncompletedEntry.count() > 0) {
      await uncompletedEntry.screenshot({
        path: `${SCREENSHOT_DIR}/entry-uncompleted.png`,
      });
      console.log('✓ Captured: entry-uncompleted.png');
    }

    // Screenshot: Full history with all entry types
    await page.locator('.modal-content').screenshot({
      path: `${SCREENSHOT_DIR}/history-modal-full.png`,
    });
    console.log('✓ Captured: history-modal-full.png');

    // Close modal
    await page.locator('.modal-close').click();
    await page.waitForTimeout(300);

    // For DELETED entry, we need to delete a todo and then we can't easily view its history
    // So we'll skip this one or handle it differently
    // Note: If the app supports viewing deleted todos' history, add that logic here

    console.log('\n✅ Screenshot generation complete!');
    console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
  });

  test('capture login page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/login');
    await page.waitForSelector('.auth-container');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/login-page.png`,
      fullPage: false,
    });
    console.log('✓ Captured: login-page.png');
  });

  test('capture registration page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/register');
    await page.waitForSelector('.auth-container');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/register-page.png`,
      fullPage: false,
    });
    console.log('✓ Captured: register-page.png');
  });

  test('capture filter states', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await login(page);
    await page.waitForSelector('.todo-page', { timeout: 10000 });

    // Active filter
    await page.click('button:has-text("Active")');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/filter-active.png`,
      fullPage: false,
    });
    console.log('✓ Captured: filter-active.png');

    // Completed filter
    await page.click('button:has-text("Completed")');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/filter-completed.png`,
      fullPage: false,
    });
    console.log('✓ Captured: filter-completed.png');

    // All filter
    await page.click('button:has-text("All")');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/filter-all.png`,
      fullPage: false,
    });
    console.log('✓ Captured: filter-all.png');
  });
});
