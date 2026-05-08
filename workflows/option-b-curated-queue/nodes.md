# Option B: Node Reference

Total: **12 nodes**

---

## 1. Schedule Trigger
**Type:** `n8n-nodes-base.scheduleTrigger`
**Position:** [100, 300]
**Purpose:** Fires at 7:00 AM, 12:00 PM, and 6:00 PM daily

### Parameters
```json
{
  "rule": {
    "interval": [
      { "triggerAtHour": 7 },
      { "triggerAtHour": 12 },
      { "triggerAtHour": 18 }
    ]
  }
}
```

---

## 2. Read Content Queue (Google Sheets)
**Type:** `n8n-nodes-base.googleSheets` | v4.4
**Position:** [300, 300]
**Purpose:** Reads all rows from the content queue spreadsheet

### Operation
- **Read:** All rows from Sheet1 (A2:F20)
- **Sheet ID:** Your Google Sheets ID (from URL)
- **Credential:** Google Sheets OAuth2

---

## 3. Get Next Unposted Item (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [500, 300]
**Purpose:** Filters rows to find the first unposted item

### Logic
```javascript
const rows = $('Read Content Queue (Google Sheets)').all();
const nextRow = rows.find(r =>
  r.json.Status !== 'Posted' &&
  r.json.Caption &&
  r.json.ImageUrl
);
if (!nextRow) return []; // No pending posts
return [nextRow];
```

---

## 4. Quality Gate (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [700, 300]
**Purpose:** Validates content meets minimum quality requirements before posting

### Rules
- Caption must be ≥ 10 characters
- ImageUrl must start with `https://`
- Row index captured for updates

### Output
```json
{
  "passed": true/false,
  "issues": "string (semicolon-separated)",
  "caption": "string",
  "imageUrl": "string",
  "rowIndex": number
}
```

---

## 5. IF — Quality Passed?
**Type:** `n8n-nodes-base.if` | v2
**Position:** [900, 300]
**Purpose:** Branches execution based on quality gate result

### Condition
- **Left value:** `={{ $json.passed }}`
- **Operator:** Boolean → Equals
- **Right value:** `true`

### Branches
| Output | Goes To |
|--------|---------|
| **True (pass)** | → Facebook Graph API |
| **False (fail)** | → Telegram — Quality Alert |

---

## 6. Facebook Graph API — Post
**Type:** `n8n-nodes-base.facebookGraphApi` | v1
**Position:** [1100, 180]
**Purpose:** Publishes image + caption to the Facebook Page

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

## 7. Instagram Graph API — Post
**Type:** `n8n-nodes-base.facebookGraphApi` | v1
**Position:** [1100, 420]
**Purpose:** Creates and publishes media to the linked Instagram Business account

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
- Same Facebook Graph API credential (with Instagram permissions)

---

## 8. Aggregate Results (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [1300, 300]
**Purpose:** Compiles outcome from both platforms into one reporting object

### Output
```json
{
  "facebookPosted": true/false,
  "facebookId": "string or null",
  "facebookError": "string or null",
  "instagramPosted": true/false,
  "instagramId": "string or null",
  "instagramError": "string or null",
  "caption": "string (truncated to 100 chars)",
  "rowIndex": number,
  "timestamp": "ISO8601"
}
```

---

## 9. Mark Row as Posted (Google Sheets)
**Type:** `n8n-nodes-base.googleSheets` | v4.4
**Position:** [1500, 300]
**Purpose:** Updates the row's Status column to "Posted"

### Operation
- **Update:** Column A (Status) → "Posted"
- **Target row:** Determined by rowIndex from Quality Gate
- **Options:** Rows below → false

---

## 10. Telegram — Success Report
**Type:** `n8n-nodes-base.telegram` | v1.2
**Position:** [1700, 200]
**Purpose:** Sends a detailed post-publication report to Telegram

### Message
```
📬 *Curated Queue Post Report*

⏰ [timestamp]
✅ *Facebook:* Posted (ID: xxx) | FAILED: error
✅ *Instagram:* Posted (ID: xxx) | FAILED: error

📝 "[caption truncated to 100 chars]..."

✅ Row marked as Posted in Sheets.
```

---

## 11. Telegram — Quality Alert
**Type:** `n8n-nodes-base.telegram` | v1.2
**Position:** [1100, 600]
**Purpose:** Alerts when content fails the quality gate — needs manual review

### Message
```
⚠️ *Quality Gate Failed*

Row [rowIndex]
❌ Issues: [list of failures]
📝 Caption: [full caption]

⏭️ Skipped — needs manual review.
```

---

## 12. Auto-Retry Check (Code)
**Type:** `n8n-nodes-base.code` | v2
**Position:** [1500, 500]
**Purpose:** Detects failures and increments retry count for next run

### Logic
```javascript
const item = $('Quality Gate (Code)').first().json;
const results = $('Aggregate Results (Code)').first().json;
const fbFailed = !results.facebookPosted;
const igFailed = !results.instagramPosted;

if (fbFailed || igFailed) {
  const retryCount = (parseInt(item.row?.RetryCount || '0') || 0) + 1;
  return [{
    json: {
      rowIndex: item.rowIndex,
      retryCount: retryCount,
      message: `Retry ${retryCount}/3`
    }
  }];
}
return []; // No retry needed
```

---

## Connection Map

```
Schedule Trigger
  └─→ Read Content Queue (Google Sheets)
        └─→ Get Next Unposted Item (Code)
              └─→ Quality Gate (Code)
                    └─→ IF — Quality Passed?
                          ├─→ (TRUE) Facebook Graph API ─┐
                          └─→ (TRUE) Instagram Graph API ─→ Aggregate Results (Code)
                                                              ├─→ Mark Row as Posted (Google Sheets)
                                                              │     └─→ Telegram — Success Report
                                                              └─→ Auto-Retry Check (Code)
                                                                    └─→ Telegram — Success Report
                          └─→ (FALSE) Telegram — Quality Alert
```

---

## Google Sheets Queue Template

Column headers required in Sheet1 A1:E1:

| A | B | C | D | E |
|---|---|---|---|---|
| Caption | ImageUrl | Status | PostedDate | RetryCount |

**Example row:**
| Your best productivity tip... | https://images.unsplash.com/... | (empty) | | 0 |