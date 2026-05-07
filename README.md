# **AI Context Engine (ACE) — Architecture & Working (****Commit Tracking)**

  

---

## 🧠 High-Level Concept

AI Context Engine (ACE) is a CLI-based developer tool that observes changes in a codebase using Git commits, interprets their meaning using AI, and stores a structured, evolving memory of the project.

> Git tracks *what changed*
> ACE tracks *what those changes mean*

---

# 🏗️ System Architecture

## 🔹 Core Components

```id="arch1"
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

```id="arch2"
ace-track init
ace-track init -y
ace-track update
ace-track export
ace-track status
```

---

## 2. Git Module

### 🔥 Core Principle:

ACE tracks **commits**, not raw diffs.

### Responsibilities:

* Detect Git repository
* Fetch commits since last update
* Handle edge cases
* Provide structured commit data

---

## 3. Context Engine

* Cleans commit data
* Merges AI + human input
* Maintains structured history
* Appends new entries

---

## 4. AI Engine

* Triggered only during `update`
* Uses environment variables for API access
* Sends structured prompts
* Returns JSON summaries

---

## 5. Storage Layer

```id="arch3"
.ace/
  project.ai.json
  config.json
```

---

### 📄 project.ai.json

Stores:

* Project metadata
* AI summaries
* Historical entries

---

### 📄 config.json

```json
{
  "last_processed_commit": null,
  "max_commits_per_update": 5
}
```

---

## 6. Exporter

* Generates:

  * AI-ready prompt
  * Markdown output
  * Terminal output

---

# 📁 Folder Structure

```id="arch5"
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

### Modes:

```id="arch6"
ace-track init        # interactive
ace-track init -y     # skip prompts
```

---

### Flow:

```id="arch7"
Validate Git repo
   ↓
Check .ace not exists
   ↓
(Optional) Ask user:
   - project description
   - tech stack
   ↓
Create .ace/
   ↓
Initialize project.ai.json
Initialize config.json
```

---

### Example project.ai.json

```json
{
  "version": "1.0",
  "project": {
    "name": "my-project",
    "description": "JWT auth service",
    "tech_stack": ["Spring Boot", "React"],
    "created_at": "timestamp"
  },
  "entries": []
}
```

---

## 🟡 2. `ace-track update` (Commit-Based Workflow)

---

### Flow:

```id="arch9"
Validate environment
   ↓
Check .git + .ace exist
   ↓
Check commit state
   ↓
Fetch commits:
  git log <last_commit>..HEAD
   ↓
Handle edge cases
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

# ⚠️ Edge Case Handling

---

## 🔴 1. First Run (No last_processed_commit)

```id="arch10"
Use: git show HEAD
```

---

## 🔴 2. No Commits Yet

```id="arch11"
"No commits found. Make your first commit, then run ace-track update."
```

---

## 🔴 3. Too Many Commits

```id="arch12"
Limit to max_commits_per_update (default: 5)
```

---

## 🔴 4. Merge Commits

* Detect commits with multiple parents
* Skip them

---

## 🔴 5. Invalid Directory

```id="arch13"
Ensure:
- .git exists
- .ace exists
```

---

# 📦 Commit Processing Pipeline

---

## Step 1: Fetch Commits

```id="arch14"
git log <last_commit>..HEAD
```

---

## Step 2: Filter

* Remove merge commits
* Limit commit count

---

## Step 3: Extract Data

```id="arch15"
{
  commit_hash,
  message,
  files_changed,
  diff (trimmed)
}
```

---

## Step 4: AI Processing

```json
{
  "summary": "...",
  "key_changes": [...],
  "impact": "..."
}
```

---

## Step 5: Store Entry

```json
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

```id="arch18"
last_processed_commit = latest_commit_hash
```

---

# 📊 Data Model

```json
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
3. Human + AI collaboration
4. Lightweight context
5. Safe defaults and graceful failures

---

# 🧭 Mental Model

Each entry answers:

> “What changed, why it changed, and what it means for the project?”

---

# ⚙️ Execution Order

1. CLI
2. Storage (`init`)
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
