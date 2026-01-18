# Screenshot Capture Guide

This document describes the screenshots needed for the Todo History User Guide.

## Required Screenshots

### 1. todo-list-main.png
**Description:** Main todo list view with several todo items
- Show at least 3-4 todo items with different priorities
- Include both completed and active items
- Ensure the History, Edit, and Delete buttons are visible
- Capture the full width of the todo list component

### 2. history-button.png  
**Description:** Close-up of a single todo item highlighting the History button
- Focus on one todo item
- The History button should be clearly visible
- Can be cropped from the main view or captured separately

### 3. history-modal.png
**Description:** The history modal open with multiple history entries
- Click History on a todo that has multiple actions (create, update, complete, etc.)
- Show the modal with at least 3-4 history entries
- Entries should show different action types
- Include the modal header with the X close button

### 4. entry-created.png
**Description:** A history entry showing CREATED action
- Can be cropped from the modal screenshot
- Green badge should be visible
- Show timestamp and user info

### 5. entry-updated.png
**Description:** A history entry showing UPDATED action
- Blue badge should be visible
- Show the title change description
- Include timestamp and user

### 6. entry-completed.png
**Description:** A history entry showing COMPLETED action
- Purple badge should be visible
- Show "Todo was marked as completed" text

### 7. entry-uncompleted.png
**Description:** A history entry showing UNCOMPLETED action
- Orange badge should be visible
- Show "Todo was marked as incomplete" text

### 8. entry-deleted.png
**Description:** A history entry showing DELETED action
- Red badge should be visible
- Show "Todo was deleted" text

## Capture Instructions

### Using Browser Developer Tools
1. Open http://localhost:5173 in Chrome/Firefox
2. Press F12 to open Developer Tools
3. Use Ctrl+Shift+P (Cmd+Shift+P on Mac) and type "screenshot"
4. Select "Capture node screenshot" for specific elements
5. Or use "Capture full size screenshot" for the entire page

### Using macOS Screenshot Tool
1. Press Cmd+Shift+4 for selection capture
2. Press Cmd+Shift+4, then Space to capture a window
3. Screenshots save to Desktop by default

### Recommended Settings
- Browser width: 1280px minimum
- Use a clean browser profile without extensions
- Ensure light mode is active
- Create some test data first to have realistic examples

## Creating Test Data for Screenshots

1. Log in to the application
2. Create a few todos with different priorities:
   - "Review quarterly report" (HIGH priority)
   - "Schedule team meeting" (MEDIUM priority, with due date)
   - "Update documentation" (LOW priority)
3. Edit one todo to change its title
4. Complete one todo
5. Uncomplete it again
6. This will generate a variety of history entries for screenshots
