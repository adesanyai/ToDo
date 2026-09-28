# Agent Instructions

## Project Goal

Build a modern, elegant, responsive, and advanced frontend-only To-Do application. Keep the experience simple, polished, professional, and maintainable.

## Technology Constraints

- Frontend only.
- No backend or database.
- Use browser `localStorage` for task and theme persistence.
- Use a clean component-based structure.
- Every visible feature and action must be fully functional; do not add placeholder buttons.

## Core Features

### Dashboard

Show:

- Total tasks
- Today's tasks
- Completed tasks
- Overdue tasks
- A prominent `+ Add Task` action
- Relevant tasks answering what is due today, what is next, and what has been completed

### Task Creation and Editing

Tasks must support:

- Title
- Description
- Category: Work, School, Personal, or Other
- Priority: Low, Medium, or High
- Due date
- Due time

Editing must prefill the existing values and immediately persist changes. Show toast feedback such as `Task added successfully` and `Task updated successfully`.

### Task Lifecycle

- Allow one-click completion and reverting to incomplete.
- Save `completedAt` when completed and clear it when reverted.
- Require confirmation before deletion with `Cancel` and a destructive red `Delete` action.
- Show subtle toast notifications for add, update, complete, incomplete, and delete actions.

### Organization

Provide navigation for:

- All Tasks
- Today
- Upcoming
- Completed
- Overdue

Automatically calculate task state from due date/time and completion. Sort urgent tasks first: today's tasks by closest due time, followed by future tasks by due date/time. Keep overdue incomplete tasks clearly visible.

### Search and Filters

Provide instant search across title and description. Include simple filters for:

- All
- Completed
- Incomplete
- Overdue
- Category

Avoid complicated filtering interfaces.

### Task Cards and Details

Each task card should show:

- Title
- Short description
- Category badge
- Priority
- Due date/time
- Completion/status indicator
- Complete, Edit, and Delete actions

Clicking a task should open a concise details view or modal showing title, description, category, priority, due date/time, created timestamp, updated timestamp, and completed timestamp when applicable.

### Timestamps and Status

Persist and display:

- `createdAt`
- `updatedAt`
- `completedAt`

Use readable timestamps such as `September 28, 2026 at 6:30 PM`. Statuses are:

- Upcoming
- Due Today
- Overdue
- Completed

Do not rely on color alone. Pair status colors with text or icons. Suggested semantic colors: green for completed, orange/red for overdue or due soon, and blue/neutral for upcoming.

### Persistence

Store tasks with at least:

```ts
{
  id,
  title,
  description,
  category,
  priority,
  dueDate,
  dueTime,
  status,
  createdAt,
  updatedAt,
  completedAt
}
```

On load, read from `localStorage`, derive current statuses, and display tasks in the correct sections. Persist every create, edit, completion, incomplete, delete, and theme change. Never use a backend or database.

### Empty States

Use minimal, professional empty states, for example:

- Today: `You're all caught up!` / `No tasks scheduled for today.`
- Upcoming: `No upcoming tasks` / `You have nothing scheduled for the future.`
- Completed: `No completed tasks yet` / `Completed tasks will appear here.`

### Theme

Include a Light/Dark mode toggle and persist the selected theme in `localStorage`. Both themes must have strong contrast, readable text, and professional colors.

## UI and UX Standards

- Elegant, minimal, spacious, modern, and professional.
- Light neutral background with one strong primary accent.
- Rounded cards, subtle shadows, smooth transitions, clear typography, clean icons, and consistent spacing.
- Use semantic colors appropriately: primary for add, blue for edit, green for complete, red for delete, and orange/red for warnings.
- Use semantic HTML, accessible labels, keyboard-friendly controls, and appropriate ARIA attributes.
- Keep tap targets comfortable on mobile.
- Avoid horizontal scrolling.
- Design mobile layouts intentionally rather than merely shrinking desktop layouts.
- Reuse existing components and icons where possible.
- Do not use emoji icons or unnecessary decorative elements.

## Scope Boundaries

Do not add:

- User accounts
- Backend or database services
- Custom category management
- Complex analytics
- Advanced task history systems
- Team collaboration
- External notification services
- Complicated calendar systems
- Excessive settings

Focus the product experience on: **Create → Organize → Prioritize → Complete → Track**.

## Implementation Quality

- Keep components focused and easy to maintain.
- Keep derived task status and sorting logic deterministic and reusable.
- Validate task input before saving.
- Handle malformed or missing local storage data safely.
- Ensure all actions work after refresh and reopening the browser.
- Test desktop, tablet, and mobile layouts and verify the primary task flows.
- Update page metadata to describe the To-Do application.

## Completion Checklist

Before considering the work complete, verify:

- Tasks can be created, edited, completed, reverted, viewed, searched, filtered, and deleted.
- Delete confirmation works.
- Toast notifications replace browser alerts.
- Dashboard counts are accurate.
- Today, Upcoming, Completed, Overdue, and All Tasks sections are accurate.
- Sorting prioritizes the most urgent tasks.
- Timestamps are saved and displayed correctly.
- Data survives refresh through `localStorage`.
- Light/Dark mode survives refresh.
- Empty states and responsive layouts are polished.
- No visible control is non-functional.

```tsx
// Keep user-facing copy concise and accessible.
```

Avoid unnecessary comments and preserve existing project conventions.
