'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Archive,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Filter,
  LayoutDashboard,
  Menu,
  Pencil,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from 'lucide-react'

type Category = 'Work' | 'School' | 'Personal' | 'Other'
type Priority = 'Low' | 'Medium' | 'High'
type View = 'Today' | 'Upcoming' | 'All Tasks' | 'Completed' | 'Overdue'
type Task = {
  id: string
  title: string
  description: string
  category: Category
  priority: Priority
  dueDate: string
  dueTime: string
  completed: boolean
  createdAt: string
  updatedAt: string
  completedAt?: string
}

const seedTasks: Task[] = [
  { id: '1', title: 'Finalize Q3 presentation', description: 'Add the final metrics and polish the narrative before review.', category: 'Work', priority: 'High', dueDate: '2026-09-28', dueTime: '16:30', completed: false, createdAt: '2026-09-26T09:15:00', updatedAt: '2026-09-26T09:15:00' },
  { id: '2', title: 'Complete JavaScript assignment', description: 'Finish the remaining exercises for this week’s module.', category: 'School', priority: 'High', dueDate: '2026-09-28', dueTime: '20:00', completed: false, createdAt: '2026-09-25T14:20:00', updatedAt: '2026-09-25T14:20:00' },
  { id: '3', title: 'Plan weekend hike', description: 'Pick a trail, check the weather, and invite the group.', category: 'Personal', priority: 'Medium', dueDate: '2026-09-30', dueTime: '12:00', completed: false, createdAt: '2026-09-24T18:40:00', updatedAt: '2026-09-24T18:40:00' },
  { id: '4', title: 'Reply to design feedback', description: 'Share the revised direction with the product team.', category: 'Work', priority: 'Low', dueDate: '2026-09-27', dueTime: '17:00', completed: true, createdAt: '2026-09-23T11:00:00', updatedAt: '2026-09-27T16:45:00', completedAt: '2026-09-27T16:45:00' },
]

const views: { label: View; icon: typeof LayoutDashboard }[] = [
  { label: 'Today', icon: CalendarDays },
  { label: 'Upcoming', icon: ChevronRight },
  { label: 'All Tasks', icon: Archive },
  { label: 'Completed', icon: CheckCircle2 },
  { label: 'Overdue', icon: Clock3 },
]

const today = () => new Date().toISOString().slice(0, 10)
const formatDue = (task: Task) => new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${task.dueDate}T${task.dueTime}`))
const formatDateTime = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value)) : '—'
const isOverdue = (task: Task) => !task.completed && new Date(`${task.dueDate}T${task.dueTime}`) < new Date()

function TaskForm({ task, onSave, onCancel }: { task?: Task; onSave: (task: Task) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Task>(task ?? { id: crypto.randomUUID(), title: '', description: '', category: 'Personal', priority: 'Medium', dueDate: today(), dueTime: '17:00', completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  const update = (key: keyof Task, value: string) => setForm((current) => ({ ...current, [key]: value, updatedAt: new Date().toISOString() }))
  return <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title"><div className="modal-heading"><div><p className="eyebrow">{task ? 'Edit task' : 'New task'}</p><h2 id="task-form-title">{task ? 'Update your task' : 'Add something to your list'}</h2></div><button className="icon-button" onClick={onCancel} aria-label="Close"><X /></button></div><form onSubmit={(event) => { event.preventDefault(); if (form.title.trim()) onSave({ ...form, title: form.title.trim() }) }}><label>Title<input required autoFocus value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="What needs to get done?" /></label><label>Description<textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Add a little context" rows={3} /></label><div className="form-grid"><label>Category<select value={form.category} onChange={(e) => update('category', e.target.value)}>{(['Work', 'School', 'Personal', 'Other'] as Category[]).map((item) => <option key={item}>{item}</option>)}</select></label><label>Priority<select value={form.priority} onChange={(e) => update('priority', e.target.value)}>{(['Low', 'Medium', 'High'] as Priority[]).map((item) => <option key={item}>{item}</option>)}</select></label><label>Due date<input type="date" value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} /></label><label>Due time<input type="time" value={form.dueTime} onChange={(e) => update('dueTime', e.target.value)} /></label></div><div className="modal-actions"><button type="button" className="button secondary" onClick={onCancel}>Cancel</button><button type="submit" className="button primary">{task ? 'Save changes' : 'Add task'}</button></div></form></section></div>
}

function TaskCard({ task, onToggle, onEdit, onDelete, onDetails }: { task: Task; onToggle: () => void; onEdit: () => void; onDelete: () => void; onDetails: () => void }) {
  const status = task.completed ? 'Completed' : isOverdue(task) ? 'Overdue' : task.dueDate === today() ? 'Due today' : 'Upcoming'
  return <article className={`task-card ${task.completed ? 'completed' : ''}`}><div className="task-main" role="button" tabIndex={0} onClick={onDetails} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onDetails() } }}><span className={`check ${task.completed ? 'checked' : ''}`} role="checkbox" aria-checked={task.completed} tabIndex={0} onClick={(e) => { e.stopPropagation(); onToggle() }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onToggle() } }} aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}>{task.completed && <Check />}</span><div className="task-copy"><div className="task-title-row"><h3>{task.title}</h3><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></div><p>{task.description || 'No description added.'}</p><div className="task-meta"><span><Tag />{task.category}</span><span className={`status ${status.toLowerCase().replace(' ', '-')}`}><Clock3 />{status} · {formatDue(task)}</span></div></div></div><div className="task-actions"><button onClick={onToggle} title={task.completed ? 'Mark incomplete' : 'Complete'}>{task.completed ? <Circle /> : <CheckCircle2 />}</button><button onClick={onEdit} title="Edit"><Pencil /></button><button onClick={onDelete} title="Delete" className="danger"><Trash2 /></button></div></article>
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [view, setView] = useState<View>('Today')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [modal, setModal] = useState<'add' | 'edit' | 'details' | 'delete' | null>(null)
  const [selected, setSelected] = useState<Task | undefined>()
  const [notice, setNotice] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => { try { const saved = localStorage.getItem('minimal-todo-tasks'); const parsed = saved ? JSON.parse(saved) : []; setTasks(Array.isArray(parsed) && parsed.length ? parsed : seedTasks) } catch { setTasks(seedTasks) } }, [])
  useEffect(() => { if (tasks.length) localStorage.setItem('minimal-todo-tasks', JSON.stringify(tasks)) }, [tasks])
  const now = new Date()
  const visible = useMemo(() => tasks.filter((task) => { const matchesView = view === 'All Tasks' || (view === 'Today' && task.dueDate === today() && !task.completed) || (view === 'Upcoming' && task.dueDate > today() && !task.completed) || (view === 'Completed' && task.completed) || (view === 'Overdue' && isOverdue(task)); const matchesQuery = `${task.title} ${task.description}`.toLowerCase().includes(query.toLowerCase()); const matchesFilter = filter === 'All' || (filter === 'Completed' && task.completed) || (filter === 'Incomplete' && !task.completed) || (filter === 'Overdue' && isOverdue(task)) || task.category === filter; return matchesView && matchesQuery && matchesFilter }).sort((a, b) => new Date(`${a.dueDate}T${a.dueTime}`).getTime() - new Date(`${b.dueDate}T${b.dueTime}`).getTime()), [tasks, view, query, filter])
  const saveTask = (task: Task) => { setTasks((current) => current.some((item) => item.id === task.id) ? current.map((item) => item.id === task.id ? task : item) : [task, ...current]); setModal(null); setNotice(task.createdAt === task.updatedAt ? 'Task added successfully.' : 'Changes saved.'); setTimeout(() => setNotice(''), 2800) }
  const toggle = (task: Task) => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : undefined, updatedAt: new Date().toISOString() } : item))
  const counts = { total: tasks.length, today: tasks.filter((t) => t.dueDate === today() && !t.completed).length, completed: tasks.filter((t) => t.completed).length, overdue: tasks.filter(isOverdue).length }
  return <main className="app-shell"><aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}><div className="brand"><div className="brand-mark"><Check /></div><span>My-ToDo</span></div><nav><p className="nav-label">Workspace</p>{views.map(({ label, icon: Icon }) => <button key={label} className={view === label ? 'active' : ''} onClick={() => { setView(label); setSidebarOpen(false) }}><Icon />{label}<span>{label === 'Today' ? counts.today : label === 'Completed' ? counts.completed : label === 'Overdue' ? counts.overdue : label === 'All Tasks' ? counts.total : ''}</span></button>)}</nav><div className="sidebar-footer"><p>Keep your momentum.</p><small>{counts.completed} of {counts.total} tasks completed</small><div className="progress"><i style={{ width: `${counts.total ? (counts.completed / counts.total) * 100 : 0}%` }} /></div></div></aside><section className="content"><header className="topbar"><button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open menu"><Menu /></button><div className="breadcrumb"><LayoutDashboard /> <span>/</span> {view}</div><div className="top-actions"><span className="date-label">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}</span><button className="button primary" onClick={() => { setSelected(undefined); setModal('add') }}><Plus /> Add task</button></div></header><div className="page-heading"><div><p className="eyebrow">{view === 'Today' ? 'Your focus for today' : 'Task overview'}</p><h1>{view === 'Today' ? 'Hi, Welcome' : view}</h1><p className="subheading">A clear space for the work that matters.</p></div></div><section className="stat-grid"><div className="stat-card"><span>Total tasks</span><strong>{counts.total}</strong><small>Across your list</small></div><div className="stat-card accent"><span>Today's tasks</span><strong>{counts.today}</strong><small>Need your attention</small></div><div className="stat-card"><span>Completed</span><strong>{counts.completed}</strong><small>Nice work so far</small></div><div className="stat-card warning"><span>Overdue</span><strong>{counts.overdue}</strong><small>Worth a look today</small></div></section><section className="task-section"><div className="section-header"><div><h2>{view === 'Today' ? 'Today’s focus' : `${view} tasks`}</h2><p>{visible.length} {visible.length === 1 ? 'task' : 'tasks'} in this view</p></div><div className="filters"><div className="search"><Search /><input aria-label="Search tasks" placeholder="Search tasks" value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="filter-wrap"><Filter /><select aria-label="Filter tasks" value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Completed</option><option>Incomplete</option><option>Overdue</option><option>Work</option><option>School</option><option>Personal</option><option>Other</option></select></div></div></div>{visible.length ? <div className="task-list">{visible.map((task) => <TaskCard key={task.id} task={task} onToggle={() => toggle(task)} onEdit={() => { setSelected(task); setModal('edit') }} onDelete={() => { setSelected(task); setModal('delete') }} onDetails={() => { setSelected(task); setModal('details') }} />)}</div> : <div className="empty"><CheckCircle2 /><h3>Nothing here yet</h3><p>Try another view or add a new task to get started.</p><button className="button primary" onClick={() => setModal('add')}><Plus /> Add task</button></div>}</section></section>{notice && <div className="toast"><CheckCircle2 />{notice}</div>}{modal === 'add' && <TaskForm onSave={saveTask} onCancel={() => setModal(null)} />}{modal === 'edit' && selected && <TaskForm task={selected} onSave={saveTask} onCancel={() => setModal(null)} />}{modal === 'delete' && selected && <div className="modal-backdrop"><section className="modal confirm"><div className="confirm-icon"><Trash2 /></div><h2>Delete this task?</h2><p>This action can’t be undone. The task will be removed from your list.</p><div className="modal-actions"><button className="button secondary" onClick={() => setModal(null)}>Cancel</button><button className="button destructive" onClick={() => { setTasks((current) => current.filter((item) => item.id !== selected.id)); setModal(null); setNotice('Task deleted.') }}>Delete</button></div></section></div>}{modal === 'details' && selected && <div className="modal-backdrop"><section className="modal details"><div className="modal-heading"><div><p className="eyebrow">Task details</p><h2>{selected.title}</h2></div><button className="icon-button" onClick={() => setModal(null)} aria-label="Close"><X /></button></div><p className="detail-description">{selected.description || 'No description added.'}</p><div className="detail-grid"><span>Category<strong>{selected.category}</strong></span><span>Priority<strong>{selected.priority}</strong></span><span>Due<strong>{formatDue(selected)} · {selected.dueTime}</strong></span><span>Status<strong>{selected.completed ? 'Completed' : isOverdue(selected) ? 'Overdue' : 'Open'}</strong></span><span>Created<strong>{formatDateTime(selected.createdAt)}</strong></span><span>Updated<strong>{formatDateTime(selected.updatedAt)}</strong></span>{selected.completedAt && <span>Completed<strong>{formatDateTime(selected.completedAt)}</strong></span>}</div></section></div>}</main>
}
