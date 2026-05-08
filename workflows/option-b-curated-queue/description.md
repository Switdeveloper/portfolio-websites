# Option B: Curated Queue Auto-Post (Facebook & Instagram)

## Description

You control the content, automation handles the rest. Posts are curated in a Google Sheets queue with columns for caption, image URL, and status. On each run, the workflow reads the next unposted row, validates content quality, posts to both platforms, marks the row as Posted, and auto-retries on failure.

**Schedule:** 3x daily — 7:00 AM, 12:00 PM, and 6:00 PM

---

## How It Works

1. **Schedule Trigger** fires at 7AM, 12PM, 6PM daily
2. **Read Content Queue (Google Sheets)** fetches all rows from your curated sheet
3. **Get Next Unposted Item (Code)** finds the first row where Status ≠ "Posted"
4. **Quality Gate (Code)** validates caption length, image URL validity
5. **IF — Quality Passed?** branches: if PASS → post; if FAIL → Telegram alert
6. **Facebook Graph API** posts to Facebook Page
7. **Instagram Graph API** creates and publishes media to Instagram Business
8. **Aggregate Results (Code)** compiles outcomes
9. **Mark Row as Posted (Google Sheets)** updates the row with "Posted" status
10. **Telegram — Success Report** sends a report with post IDs
11. **Auto-Retry Check (Code)** checks if retry is needed and re-queues
12. **Telegram — Quality Alert** notifies when content fails quality gate

---

## Google Sheets Queue Format

Your content sheet should have this structure in **Sheet1**:

| A | B | C | D | E |
|---|---|---|---|---|
| **Caption** | **ImageUrl** | **Status** | **PostedDate** | **RetryCount** |
| Your caption text | https://... | Posted | 2026-05-08 | 0 |

- **Caption:** Full post caption (min 10 chars)
- **ImageUrl:** Valid https:// URL to image
- **Status:** Leave empty or "Posted" after publishing
- **PostedDate:** Auto-filled by workflow
- **RetryCount:** Auto-incremented on failure

---

## Quality Gate Rules

Content is checked before posting:
- ✅ Caption must be ≥ 10 characters
- ✅ ImageUrl must be a valid `https://` URL
- ✅ Status must NOT already be "Posted"

If either check fails → Telegram alert sent, row skipped

---

## Auto-Retry Logic

On post failure (API error, rate limit, etc.):
- Increments `RetryCount` in the row
- Reports retry count via Telegram
- Next scheduled run picks up the same row again
- Stops retrying after 3 attempts (manual review needed)

---

## Best For

- Brands with a content calendar in Google Sheets
- Teams that pre-approve content before publishing
- Accounts that need multiple posts per day with different content
- Quality-conscious social media managers who want human review built-in

---

## Setup Requirements

1. Create a Google Sheet with the structure above (columns A-E)
2. Pre-fill with 5-10 posts to get started
3. Facebook Page + linked Instagram Business account
4. Page Access Token with `pages_manage_posts`, `instagram_content_publish`
5. Telegram Bot token + Chat ID

---

## Failure Handling

| Scenario | Behavior |
|----------|----------|
| No unposted rows | Graceful stop — no error |
| Quality gate fails | Telegram alert → row skipped |
| Facebook fails | Instagram still tries; Telegram shows per-platform status |
| Instagram fails | Telegram shows Instagram error; Facebook post stays |
| API rate limit | Auto-retry on next schedule run |
| Invalid credentials | Both nodes fail → Telegram error report |