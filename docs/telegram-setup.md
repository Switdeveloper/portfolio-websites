# Telegram Bot Setup Guide

Quick setup for Telegram notifications in n8n workflows.

---

## Step 1: Create a Bot

1. Open Telegram and search for **@BotFather**
2. Send: `/newbot`
3. Give it a name (e.g., "n8n Notifier")
4. Give it a username (must end in `bot`, e.g., `myN8nBot`)
5. BotFather replies with your **Bot Token**:
   ```
   1234567890:ABCdefGHIjklMNOpqrSTUvwxyz...
   ```
   **Copy and save this token immediately.**

---

## Step 2: Get Your Chat ID

### Option A: @userinfobot
1. Search for **@userinfobot** in Telegram
2. Start a chat → it replies with your **numeric user ID**
   ```
   Id: 5039241656
   First: YourName
   ```
   Your Chat ID is the `Id` value.

### Option B: @RawDataBot
1. Search for **@RawDataBot**
2. Start chat → it shows your chat ID in the JSON response

### Option C (for groups):
1. Add the bot to your Telegram group
2. Send a message: `/newbot` in the group
3. Use this URL to get updates:
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
4. Look for `"chat":{"id":-100XXXXXXXXXX...` — this is your group chat ID

---

## Step 3: Add Credential in n8n

1. **n8n → Credentials → New → Telegram API**
2. Fill in:
   - **Bot Token:** `1234567890:ABCdef...`
   - (Chat ID is set per node, not in credential)
3. Save the credential

---

## Step 4: Set Chat ID in Your Workflow Node

In the Telegram node parameters:
- **Chat ID:** `5039241656` (your personal ID) or `-100XXXXXXXXXX` (for groups)

---

## Step 5: Test Your Bot

Send a test message via the Telegram API:

```
GET https://api.telegram.org/botYOUR_TOKEN/sendMessage?
  chat_id=YOUR_CHAT_ID&
  text=Hello from n8n!
```

If you receive the message → setup is correct.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Bot was blocked by user" | User needs to start a chat with the bot first |
| "Chat not found" | Wrong Chat ID — verify with @userinfobot |
| "Bot was restarted" errors | Refresh the bot token with @BotFather: `/token` |
| Messages work for DM but not group | Group ID format is negative: `-100...` not `503...` |

---

## Pro Tips

- **Markdown formatting** in messages: `*bold*`, `_italic_`, `code`, ``` ```code block``` ```, `[link](url)`
- **Disable notification** for less urgent alerts by adding `"disable_notification": true` to the API call
- **Pin important alerts** by adding `"reply_to_message_id"` pointing to the message you want pinned