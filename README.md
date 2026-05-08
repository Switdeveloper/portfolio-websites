# n8n-flow

> n8n automation workflows for auto-posting to **Facebook** and **Instagram**

---

## 📁 Workflows

| Workflow | Description | Schedule |
|----------|-------------|----------|
| [Option A: AI-Powered Auto-Post](./workflows/option-a-ai-auto-post/) | Grok AI generates captions + image prompts, posts via Meta Graph API | 2x/day (9AM & 2PM) |
| [Option B: Curated Queue Auto-Post](./workflows/option-b-curated-queue/) | Reads from Google Sheets queue with quality gate, auto-retry | 3x/day (7AM, 12PM, 6PM) |

---

## ⚙️ Prerequisites

### Required Credentials

| Credential | How to Get |
|------------|------------|
| **Facebook Graph API** (Page Access Token) | [developers.facebook.com](https://developers.facebook.com) → Create App → Graph API Explorer → Generate Token |
| **Google Sheets OAuth2** | [console.cloud.google.com](https://console.cloud.google.com) → Enable Sheets API → Create OAuth2 credentials |
| **Telegram Bot** | Chat with [@BotFather](https://t.me/botfather) → `/newbot` → Copy token |

### Required Permissions (Facebook)

```
pages_read_engagement
pages_manage_posts
instagram_basic
instagram_content_publish
```

---

## 🚀 Quick Setup

### 1. Import Workflow
- Open n8n → **Settings** → **Import from JSON**
- Upload the workflow file from the `workflows/` folder

### 2. Add Credentials
- **Facebook Graph API**: Paste your Page Access Token
- **Google Sheets OAuth2**: Sign in with Google
- **Telegram Bot**: Bot token + your Chat ID

### 3. Activate
- Open workflow → Connect credentials to each node → Hit **Activate**

---

## 📊 Nodes Used Per Workflow

### Option A (10 nodes)
```
Schedule Trigger
  └─→ Code (Content Planner)
        ├─→ HTTP Request (Grok — Caption)
        └─→ HTTP Request (Grok — Image Prompt)
              └─→ Code (Assemble Post)
                    ├─→ Facebook Graph API
                    └─→ Instagram Graph API
                          └─→ Code (Aggregate)
                                ├─→ Google Sheets
                                └─→ Telegram Notify
```

### Option B (12 nodes)
```
Schedule Trigger
  └─→ Google Sheets (Read Queue)
        └─→ Code (Get Next Unposted)
              └─→ Code (Quality Gate)
                    └─→ IF (Quality Check)
                          ├─→ Facebook Graph API ─┐
                          └─→ Instagram Graph API ─→ Code (Aggregate)
                                                        ├─→ Google Sheets (Mark Posted)
                                                        ├─→ Telegram (Success)
                                                        └─→ Code (Auto-Retry)
                                                              └─→ Telegram (Alert)
```

---

## 📂 Project Structure

```
n8n-flow/
├── README.md
├── workflows/
│   ├── option-a-ai-auto-post/
│   │   ├── workflow.json
│   │   ├── description.md
│   │   └── nodes.md
│   └── option-b-curated-queue/
│       ├── workflow.json
│       ├── description.md
│       └── nodes.md
├── docs/
│   ├── facebook-meta-setup.md
│   ├── google-sheets-setup.md
│   ├── telegram-setup.md
│   └── troubleshooting.md
└── assets/
```

---

## 🔑 Environment Variables (if needed)

```env
GROK_API_KEY=your_grok_api_key
FACEBOOK_ACCESS_TOKEN=your_page_access_token
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
GOOGLE_SHEETS_ID=your_sheet_id
```

---

## 🤝 Contributing

Open an issue or PR at [github.com/Switdeveloper/n8n-flow](https://github.com/Switdeveloper/n8n-flow)

---

## 📝 License

MIT