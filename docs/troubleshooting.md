# Troubleshooting Guide

Common issues and fixes for the n8n auto-post workflows.

---

## Facebook / Instagram Issues

### "Permissions error" or "Token does not have permission"

**Cause:** Page Access Token is missing required scopes.

**Fix:**
1. Go to [graph.facebook.com/tools/explorer/](https://graph.facebook.com/tools/explorer/)
2. Remove all permissions and re-add:
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
3. Generate a new token
4. Update it in n8n credentials

---

### "Instagram account not linked to Facebook Page"

**Cause:** Instagram isn't connected to the Page in Meta business settings.

**Fix:**
1. Facebook Page → **Settings** → **Integrations** → **Instagram**
2. Connect your Instagram Business/Creator account
3. In Meta Business Suite: **Settings → Connected accounts → Instagram**
4. Verify the page has admin access to the Instagram account

---

### "Image URL returns 403 or is not accessible"

**Cause:** The image URL requires authentication or is blocked.

**Fix:**
- Use direct image URLs (Unsplash, Imgur with direct links, Cloudinary, etc.)
- Avoid URLs that redirect (302) — use `-L` flag equivalent or upload the image as binary data instead
- For Unsplash: use `https://images.unsplash.com/photo-XXXX?w=1200` (direct link format)

---

### "Post published on Facebook but not Instagram"

**Cause:** Instagram requires the media to be created first, then published (two-step).

**Fix:** In the n8n node, make sure:
- Resource: `media`
- Operation: `publish`
- The imageUrl is publicly accessible (not behind auth)
- Instagram account is a Business or Creator account

---

## Google Sheets Issues

### "Permission denied" or "Spreadsheet not found"

**Cause:** Google Sheets OAuth2 credential expired or wrong Sheet ID.

**Fix:**
1. Verify Sheet ID from URL: `docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
2. Re-authenticate Google Sheets OAuth2 in n8n credentials
3. Make sure the Google account has Editor access to the sheet

---

### "Row not updating after post"

**Cause:** Sheet ID is correct but row index is off.

**Fix:**
The "Update a row" operation in n8n starts counting from A2 as row 1. If your data starts at row 2, use index 1. Double-check which row the workflow is trying to update.

---

## Grok API Issues

### "401 Unauthorized" from Grok

**Cause:** Invalid or expired Grok API key.

**Fix:**
1. Get a fresh key from [console.x.ai](https://console.x.ai)
2. Update the Authorization header in the HTTP Request nodes
3. Ensure your account has available credits

---

### "Grok returns empty caption"

**Cause:** The `choices[0].message.content` path is empty.

**Fix:**
Add a Code node after the Grok call to validate:
```javascript
const content = $json.choices?.[0]?.message?.content?.trim();
if (!content) {
  throw new Error('Grok returned empty content');
}
return [{ json: { ...$json, caption: content } }];
```

---

## Telegram Issues

### "Bot was blocked by the user"

**Cause:** User hasn't started a chat with the bot.

**Fix:** The user must open a chat with the bot and send `/start` first.

---

### "Chat not found"

**Cause:** Wrong Chat ID format.

**Fix:**
- Personal chat IDs are positive numbers: `5039241656`
- Group chat IDs are negative: `-1001234567890`
- Get the correct ID from @userinfobot or @RawDataBot

---

## Workflow-Specific Issues

### "Workflow runs but nothing happens"

**Troubleshooting order:**
1. Check execution history for red nodes
2. Verify credentials are connected to all nodes
3. Test each node individually (right-click → Execute node)
4. Check n8n execution log for error messages

---

### "Only one platform posts, not both"

**Cause:** One node failed silently (check `continueOnFail: true`).

**Fix:**
- Check the Telegram report for per-platform status
- Look at execution details for the failed node
- Verify the Facebook Page and Instagram are both linked to the same Page

---

### "Quality gate blocks all posts"

**Cause:** Your content queue has issues (too-short captions, missing image URLs).

**Fix:**
- Run with `console.log($json)` in the Code node to see what's failing
- Temporarily bypass the IF node to identify which rows have problems
- Fix captions (≥10 chars) and image URLs (must start with `https://`) in your Google Sheet

---

## n8n General

### "Workflow active but not triggering"

**Fix:**
1. Deactivate and reactivate the workflow
2. Check if the schedule node is configured correctly (hour format is 24h)
3. Verify n8n server time matches your expected timezone
4. Check n8n logs: `Settings → Execution History`

---

### "Memory or token limit errors"

**Cause:** Workflow context is too large for the model context window.

**Fix:**
- Reduce the number of Google Sheets rows read per run
- Simplify the Code nodes
- Increase the model's `max_tokens` setting
- Enable compact/trimming in n8n settings

---

## Emergency Rollback

If a workflow posts unwanted content:
1. **Immediately deactivate** the workflow
2. Delete the post manually from Facebook/Instagram
3. In Facebook: `Page → Posts → Delete`
4. In Instagram: Open post → `•••` → Delete
5. Investigate the trigger (was it a scheduled run or manual test?)