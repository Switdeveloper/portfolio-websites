# Option A: Node Reference

Total: **10 nodes**

---

## 1. Schedule Trigger
**Type:** `n8n-nodes-base.scheduleTrigger`
**Position:** [100, 300]
**Purpose:** Fires at 9:00 AM and 2:00 PM daily

### Parameters
```json
{
  "rule": {
    "interval": [
      { "triggerAtHour": 9 },
      { "triggerAtHour": 14 }
    ]
  }
}
```

---

## 2. Content Planner (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [300, 300]
**Purpose:** Randomly selects a topic and image for this post cycle

### What it outputs
```json
{
  "topic": "string",        // e.g. "productivity", "customer-story"
  "aiPrompt": "string",     // The prompt sent to Grok AI
  "imageUrl": "string",     // Unsplash image URL
  "scheduledTime": "ISO8601"
}
```

---

## 3. Grok AI — Caption Generator
**Type:** `n8n-nodes-base.httpRequest` | v4.2
**Position:** [500, 250]
**Purpose:** Uses Grok API (xAI) to generate a full Instagram/Facebook caption

### Configuration
- **Method:** POST
- **URL:** `https://api.grok.x.ai/v1/chat/completions`
- **Auth:** Bearer token (Grok API key)
- **Model:** `grok-2`
- **Max tokens:** 300
- **Temperature:** 0.8

### System Prompt
> "You are a social media copywriter. Given a topic, generate a compelling Instagram/Facebook post caption. Include an opening hook, 2-3 sentences of engaging content, a call-to-action, and 5 relevant hashtags."

---

## 4. Grok AI — Image Prompt Generator
**Type:** `n8n-nodes-base.httpRequest` | v4.2
**Position:** [500, 400]
**Purpose:** Uses Grok API to create an image generation prompt

### Configuration
- **Method:** POST
- **URL:** `https://api.grok.x.ai/v1/chat/completions`
- **Auth:** Bearer token (Grok API key)
- **Model:** `grok-2`
- **Max tokens:** 100

### System Prompt
> "You are an image prompt engineer. Given a topic, write a short, vivid image generation prompt (max 80 words) for an Unsplash-style photo. Describe the scene, mood, lighting, and composition. Output ONLY the prompt, nothing else."

---

## 5. Assemble Post (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [700, 300]
**Purpose:** Combines caption + image into a unified post object

### Output
```json
{
  "caption": "string",      // Full AI-generated caption
  "imageUrl": "string",     // Selected image URL
  "topic": "string",        // Topic category
  "imagePrompt": "string"   // AI image prompt (for reference)
}
```

---

## 6. Facebook Graph API — Create Post
**Type:** `n8n-nodes-base.facebookGraphApi` | v1
**Position:** [900, 200]
**Purpose:** Posts the image + caption to your Facebook Page

### Operation
- **Resource:** `post`
- **Operation:** `create`
- **Node:** `/me/photos`
- **HTTP Method:** POST
- **Caption:** `={{ $json.caption }}`
- **Image URL:** `={{ $json.imageUrl }}`
- **Continue on fail:** `true`

### Credential
- **Facebook Graph API** (Page Access Token)
- Required scopes: `pages_manage_posts`, `pages_read_engagement`

---

## 7. Instagram Graph API — Create Media
**Type:** `n8n-nodes-base.facebookGraphApi` | v1
**Position:** [900, 420]
**Purpose:** Creates and publishes media to linked Instagram Business account

### Operation
- **Resource:** `media`
- **Operation:** `publish`
- **Host:** `instagram`
- **Node:** `/me/media`
- **Caption:** `={{ $json.caption }}`
- **Media Type:** `IMAGE`
- **Image URL:** `={{ $json.imageUrl }}`
- **Continue on fail:** `true`

### Credential
- Same Facebook Graph API credential (Page Access Token with Instagram permissions)

---

## 8. Aggregate Results (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [1100, 300]
**Purpose:** Compiles results from both platforms into one log object

### Output
```json
{
  "facebook": { "posted": true/false, "id": "...", "error": "..." },
  "instagram": { "posted": true/false, "id": "...", "error": "..." },
  "caption": "...",
  "topic": "...",
  "timestamp": "ISO8601"
}
```

---

## 9. Log to Google Sheets
**Type:** `n8n-nodes-base.googleSheets` | v4.4
**Position:** [1300, 300]
**Purpose:** Appends the post record to your logging spreadsheet

### Columns Logged
| Column | Value |
|--------|-------|
| Timestamp | `={{ $json.timestamp }}` |
| Topic | `={{ $json.topic }}` |
| Caption | `={{ $json.caption }}` |
| Facebook Posted | `={{ $json.facebook.posted }}` |
| Facebook ID | `={{ $json.facebook.id }}` |
| Facebook Error | `={{ $json.facebook.error }}` |
| Instagram Posted | `={{ $json.instagram.posted }}` |
| Instagram ID | `={{ $json.instagram.id }}` |
| Instagram Error | `={{ $json.instagram.error }}` |

---

## 10. Telegram Notify
**Type:** `n8n-nodes-base.telegram` | v1.2
**Position:** [1500, 300]
**Purpose:** Sends a post-publication report to your Telegram chat

### Message Format
```
📊 *Auto-Post Report*

⏰ Time: [timestamp]
📌 Topic: [topic]

✅ *Facebook:* Posted (ID: xxx) | FAILED: error
✅ *Instagram:* Posted (ID: xxx) | FAILED: error

📝 *Caption:*
[first 200 chars]...
```

---

## Connection Map

```
Schedule Trigger
  └─→ Content Planner (Code)
        ├─→ Grok AI — Caption Generator ─┐
        └─→ Grok AI — Image Prompt Generator ┘
              └─→ Assemble Post (Code)
                    ├─→ Facebook Graph API ─┐
                    └─→ Instagram Graph API ─┘
                          └─→ Aggregate Results (Code)
                                ├─→ Log to Google Sheets
                                └─→ Telegram Notify
```