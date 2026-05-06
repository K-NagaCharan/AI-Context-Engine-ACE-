# **AI Context Engine (ACE) — Architecture & Working (Commit-Based Tracking)**

---

## 🧠 High-Level Concept

AI Context Engine (ACE) is a CLI-based developer tool that observes changes in a codebase using Git commits, interprets their meaning using AI, and stores a structured, evolving memory of the project.

> Git tracks *what changed*
> ACE tracks *what those changes mean*

---

# 🏗️ System Architecture

## 🔹 Core Components

```
CLI (commander)
   ↓
Command Handlers
   ↓
Core Modules
   ├── Git Module
   ├── Context Engine
   ├── AI Engine
   ├── Storage Layer
   └── Exporter
```

---

# 🔧 Component Breakdown

## 1. CLI Layer

Commands:

```
ace-track init
ace-track update
ace-track export
ace-track status
```

---

## 2. Git Module (Updated Core Logic)

### 🔥 Key Change:

ACE now tracks **commits**, not raw diffs.

---

### Responsibilities:

* Detect repository state
* Fetch commits since last update
* Handle edge cases
* Provide clean commit data

---

### Core Command Used:

```
git log <last_processed_commit>..HEAD
```

---

## 3. Context Engine

* Cleans commit data
* Merges AI + human input
* Maintains structured history

---

## 4. AI Engine

* Processes commit summaries
* Returns structured JSON

---

## 5. Storage Layer

```
.ace/
  project.ai.json
  config.json
```

---

### 📄 config.json (Updated)

```json
{
  "last_processed_commit": "abc123",
  "max_commits_per_update": 5
}
```

---

## 6. Exporter

* Generates AI-ready prompt
* Outputs to terminal / file / clipboard

---

# 📁 Folder Structure

```
project-root/
│── .ace/
│   ├── project.ai.json
│   └── config.json
│
│── src/
│── package.json
```

---

# 🔄 Working Flow

---

## 🟢 1. `ace-track init`

* Validates Git repo exists
* Creates `.ace/`
* Initializes:

  * `project.ai.json`
  * `config.json`

---

## 🟡 2. `ace-track update` (Commit-Based Workflow)

### Command:

```
ace-track update --note "reason for change"
```

---

## 🔄 Flow:

```
Validate environment
   ↓
Check Git repo exists
Check .ace exists
   ↓
Check commit state
   ↓
Fetch commits
   ↓
Filter commits
   ↓
Send to AI
   ↓
Store structured entries
   ↓
Update last_processed_commit
```

---

# ⚠️ Edge Case Handling (Critical)

---

## 🔴 1. First Run (No last_processed_commit)

### Problem:

No baseline commit exists.

### Solution:

```
Use: git show HEAD
```

* Process only latest commit
* Do NOT process entire history

---

## 🔴 2. No Commits Yet

### Problem:

Repository is empty

### Solution:

* Detect using Git
* Output:

```
"No commits found. Make your first commit, then run ace-track update."
```

---

## 🔴 3. Multiple Commits Since Last Update

### Problem:

Too many commits → large AI input

### Solution:

* Limit commits:

```
max_commits_per_update = 5
```

* If exceeded:

```
"15 commits found, processing last 5"
```

---

## 🔴 4. Merge Commits

### Problem:

Noisy, large, low-signal diffs

### Detection:

* Commit with >1 parent

### Solution:

* Skip merge commits

---

## 🔴 5. Wrong Directory / Missing Setup

### Checks:

* `.git` exists?
* `.ace` exists?

### If not:

```
"Not a valid ACE project. Run ace-track init."
```

---

# 📦 Commit Processing Pipeline

---

## Step 1: Fetch Commits

```
git log <last_commit>..HEAD
```

---

## Step 2: Filter

* Remove merge commits
* Limit to N commits

---

## Step 3: Extract Data

```
{
  commit_hash,
  message,
  files_changed,
  diff (trimmed)
}
```

---

## Step 4: AI Processing

AI returns:

```
{
  "summary": "...",
  "key_changes": [...],
  "impact": "..."
}
```

---

## Step 5: Store Entry

```
{
  "id": "uuid",
  "commit": "abc123",
  "timestamp": "...",
  "summary": "...",
  "key_changes": [...],
  "impact": "...",
  "note": "..."
}
```

---

## Step 6: Update Config

```
last_processed_commit = latest_commit_hash
```

---

# 📊 Data Model

```
{
  "version": "1.0",
  "project": {...},
  "entries": [...]
}
```

---

# 🧠 Design Principles

1. Commit-based tracking (not raw diff)
2. Append-only history
3. AI + human collaboration
4. Lightweight context
5. Safe defaults for edge cases

---

# 🧭 Mental Model

Each entry represents:

> A meaningful step in the evolution of the project

---

# ⚙️ Execution Order

1. CLI
2. Storage
3. Git commit tracking
4. AI summarization
5. Export system

---

# 🚀 Final Understanding

ACE transforms this:

| Without ACE        | With ACE            |
| ------------------ | ------------------- |
| Raw commits        | Meaningful history  |
| Lost intent        | Preserved reasoning |
| Manual explanation | One-command export  |

---

# 🧠 One-Line Summary

> ACE converts Git commit history into structured, AI-understandable project memory.
