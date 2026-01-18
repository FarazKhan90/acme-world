# Todo History & Audit Trail - User Guide

<div style="text-align: center; padding: 40px 0;">
<h2 style="color: #2563eb;">ACME Todo Application</h2>
<h3>Feature Documentation</h3>
<p><strong>Version:</strong> 1.0</p>
<p><strong>Release Date:</strong> January 2026</p>
<p><strong>Reference:</strong> KAN-28</p>
</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Understanding History Tracking](#understanding-history-tracking)
4. [Viewing Todo History](#viewing-todo-history)
5. [History Entry Types](#history-entry-types)
6. [Frequently Asked Questions](#frequently-asked-questions)

---

## Overview

The **Todo History & Audit Trail** feature provides complete visibility into how your todos have changed over time. Every action you take on a todo—whether creating, editing, completing, or deleting—is automatically recorded and preserved for future reference.

### Key Benefits

- **Full Transparency**: See exactly what changed and when
- **Accountability**: Track all modifications with timestamps and user information  
- **Data Preservation**: Deleted todos are soft-deleted, maintaining complete history
- **Audit Compliance**: Immutable records that cannot be altered or deleted

### What Gets Tracked

| Action | Description |
|--------|-------------|
| **Created** | Initial creation of a todo item |
| **Updated** | Changes to title, description, priority, or due date |
| **Completed** | Todo marked as done |
| **Uncompleted** | Completed todo reverted to active |
| **Deleted** | Todo removed from the active list |

---

## Getting Started

### Prerequisites

1. You must be logged into the ACME Todo Application
2. You need at least one todo item to view history

### Accessing the Todo List

After logging in, you will see your main todo list with all active items:

![Todo List Main View](screenshots/todo-list-main.png)
*Figure 1: Main todo list showing all your tasks with action buttons*

Each todo item displays:
- **Checkbox**: Mark the todo as complete/incomplete
- **Title**: The name of your task
- **Priority Badge**: HIGH (red), MEDIUM (yellow), or LOW (green)
- **Due Date**: Optional deadline for the task
- **Action Buttons**: History, Edit, and Delete controls

---

## Understanding History Tracking

### Automatic Tracking

History tracking is **completely automatic**. You don't need to do anything special—every action you take on a todo is recorded behind the scenes.

### What Information is Saved

Each history entry captures a **complete snapshot** of the todo at that moment in time:

| Field | Description |
|-------|-------------|
| **Action Type** | The type of change (CREATED, UPDATED, etc.) |
| **Timestamp** | Exact date and time of the action |
| **User** | Who made the change |
| **Todo Title** | The title at that moment |
| **Description** | The description at that moment |
| **Priority** | The priority level at that moment |
| **Due Date** | The due date at that moment |
| **Completed Status** | Whether it was completed |

### Immutable Records

History records are **permanent and immutable**:
- ✅ Records cannot be edited
- ✅ Records cannot be deleted
- ✅ Original data is always preserved
- ✅ Full audit trail maintained indefinitely

---

## Viewing Todo History

### Step 1: Locate the History Button

On each todo item in your list, look for the **History** button in the action buttons area:

![History Button Location](screenshots/history-button.png)
*Figure 2: The History button on a todo item*

### Step 2: Click the History Button

Click the **History** button to open the history modal. This will display all recorded changes for that specific todo.

### Step 3: Review the History

The history modal displays entries in **chronological order** (newest first):

![Todo History Modal](screenshots/history-modal.png)
*Figure 3: Todo History modal showing all changes*

### Reading History Entries

Each history entry shows:

1. **Action Badge** - Color-coded indicator of the action type
2. **Timestamp** - When the action occurred (e.g., "Jan 18, 2026, 10:30 AM")
3. **Description** - What happened (e.g., "Todo was created")
4. **User** - Who performed the action (e.g., "by john.smith")

### Step 4: Close the Modal

Click the **X** button or click outside the modal to close it and return to your todo list.

---

## History Entry Types

### CREATED (Green Badge)

Recorded when you add a new todo to your list.

**What's captured:**
- Initial title
- Initial description (if provided)
- Initial priority level
- Initial due date (if set)

![Created Entry](screenshots/entry-created.png)
*Figure 4: A CREATED history entry*

---

### UPDATED (Blue Badge)

Recorded when you modify any field of an existing todo.

**Triggers:**
- Changing the title
- Editing the description
- Modifying the priority
- Updating the due date

![Updated Entry](screenshots/entry-updated.png)
*Figure 5: An UPDATED history entry showing the new title*

---

### COMPLETED (Purple Badge)

Recorded when you check the checkbox to mark a todo as done.

**What happens:**
- Todo moves to completed state
- Checkbox appears checked
- Todo may appear in "Completed" filter

![Completed Entry](screenshots/entry-completed.png)
*Figure 6: A COMPLETED history entry*

---

### UNCOMPLETED (Orange Badge)

Recorded when you uncheck a completed todo to make it active again.

**What happens:**
- Todo returns to active state
- Checkbox is unchecked
- Todo appears in "Active" filter

![Uncompleted Entry](screenshots/entry-uncompleted.png)
*Figure 7: An UNCOMPLETED history entry*

---

### DELETED (Red Badge)

Recorded when you remove a todo from your list.

**Important:** Deleted todos are **soft-deleted**, meaning:
- The todo is removed from your active list
- All history records are preserved
- The data is retained in the system

![Deleted Entry](screenshots/entry-deleted.png)
*Figure 8: A DELETED history entry*

---

## Frequently Asked Questions

### Q: Can I undo changes using the history feature?

**A:** No, the history feature is for **viewing** past changes only. It does not support restoring previous versions. The history serves as an audit trail, not an undo mechanism.

---

### Q: Who can see my todo history?

**A:** Only **you** can see the history of your todos. History entries are private and tied to your user account. Other users cannot access your todo history.

---

### Q: Can I delete history entries?

**A:** No. History entries are **immutable** and cannot be deleted or modified. This ensures the integrity of the audit trail.

---

### Q: How long is history kept?

**A:** History is kept **indefinitely**. There is no automatic cleanup or expiration of history records.

---

### Q: What happens when I delete a todo?

**A:** When you delete a todo:
1. A DELETED history entry is created
2. The todo is removed from your active list
3. All history for that todo is preserved in the system
4. This is called a "soft delete"

---

### Q: Can I search or filter history entries?

**A:** Currently, history entries cannot be filtered or searched. This feature may be added in a future update.

---

### Q: Does history track who made changes?

**A:** Yes! Each history entry includes the username of the person who made the change. This appears as "by [username]" at the bottom of each entry.

---

### Q: What if I make multiple changes quickly?

**A:** Each change is recorded separately. If you change the title and then the priority, you will see two separate UPDATED entries in the history.

---

## Quick Reference Card

| Action | Badge Color | When It Happens |
|--------|-------------|-----------------|
| CREATED | 🟢 Green | New todo added |
| UPDATED | 🔵 Blue | Any field changed |
| COMPLETED | 🟣 Purple | Checkbox checked |
| UNCOMPLETED | 🟠 Orange | Checkbox unchecked |
| DELETED | 🔴 Red | Todo removed |

---

## Support

For questions or issues with the Todo History feature, please contact your system administrator or submit a support ticket through the help desk.

---

<div style="text-align: center; padding: 20px 0; color: #666;">
<p>© 2026 ACME Corporation. All rights reserved.</p>
<p>Document Version 1.0 | KAN-28</p>
</div>
