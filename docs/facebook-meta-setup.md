# Facebook & Meta Setup Guide

Complete step-by-step for obtaining Facebook Graph API credentials for n8n.

---

## Step 1: Create a Meta App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click **My Apps** → **Create App**
3. Choose **Business** as the app type
4. Fill in:
   - **App name:** `n8n Auto-Poster`
   - **App contact email:** your@email.com
   - **Business portfolio:** select your business or create one
5. Click **Create app**

---

## Step 2: Add Facebook Graph API Product

1. In your new app dashboard, find **Add Product**
2. Click **Set up** on **Facebook Login** (Social Login section)
3. Also add **Graph API Explorer** from the product catalog

---

## Step 3: Configure Facebook Login

1. Go to **Facebook Login** → **Settings**
2. Set **Valid OAuth Redirect URIs** to your n8n URL:
   - For cloud n8n: `https://your-instance.n8n.cloud/oauth2/callback`
   - For self-hosted: `https://your-domain.com/oauth2/callback`
3. Save changes

---

## Step 4: Generate a Page Access Token

### Using Graph API Explorer

1. Go to [graph.facebook.com/tools/explorer/](https://graph.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click **Generate Access Token**
4. Authorize the Facebook Page you want to manage
5. **IMPORTANT:** Copy this token immediately (it's short-lived)

### Permissions to Request

Add these permissions before generating:
```
pages_read_engagement
pages_manage_posts
instagram_basic
instagram_content_publish
instagram_manage_insights
```

---

## Step 5: Exchange for Long-Lived Token

Short-lived tokens expire in ~1 hour. Exchange for long-lived (60 days):

```
GET https://graph.facebook.com/v19.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id=YOUR_APP_ID&
  client_secret=YOUR_APP_SECRET&
  fb_exchange_token=YOUR_SHORT_LIVED_TOKEN
```

**Response:**
```json
{
  "access_token": "long_lived_token_here",
  "token_type": "bearer",
  "expires_in": 5184000
}
```

> ⚠️ Tokens still expire after 60 days. For permanent access, you'll need to implement token refreshing or reauthorize periodically.

---

## Step 6: Get Your Page ID

```
GET https://graph.facebook.com/v19.0/me/accounts?
  access_token=YOUR_LONG_LIVED_TOKEN
```

Response:
```json
{
  "data": [
    {
      "access_token": "page_permanent_token",
      "category": "Business",
      "id": "PAGE_ID_HERE",
      "name": "Your Page Name"
    }
  ]
}
```

Save the **Page ID** and **page_permanent_token** — the page token is what you paste into n8n.

---

## Step 7: Link Instagram to Facebook Page

1. Go to your Facebook Page → **Settings** → **Instagram**
2. Click **Connect existing Instagram account**
3. Select your Instagram Business or Creator account
4. Grant all requested permissions

> **Note:** Your Instagram MUST be a Business or Creator account (not personal) for API posting to work.

---

## Step 8: Add Credential to n8n

1. Open n8n → **Credentials** → **New** → **Facebook Graph API**
2. Paste your **Page Access Token**
3. Click **Save**
4. In your workflow, connect the credential to both the Facebook and Instagram nodes

---

## Testing Your Setup

Test your token in Graph API Explorer:

```
GET https://graph.facebook.com/v19.0/me?access_token=YOUR_TOKEN
```

Should return your Facebook Page info.

Test Instagram:

```
GET https://graph.facebook.com/v19.0/me/accounts?access_token=YOUR_TOKEN
```

Then check Instagram linked:
```
GET https://graph.facebook.com/v19.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_TOKEN
```

---

## Common Errors

| Error | Meaning | Fix |
|-------|---------|-----|
| `(#200) Permissions error` | Token missing required permission | Re-authorize with more scopes |
| `(#100) Invalid parameter` | Image URL not accessible | Use direct image URLs (not CDN redirects) |
| `(#10) Application does not have permission` | App not approved for this operation | Submit for review or use test users |
| `Instagram posting requires...` | Instagram not linked to Facebook Page | Link them in Facebook Page settings |
| Token expired | Long-lived token expired after 60 days | Re-authorize and get new token |

---

## Instagram Media Publishing Note

Instagram's Graph API requires a two-step process for feed posts:
1. **Create Media** (`/me/media`) — uploads the image + caption as a draft
2. **Publish Media** (`/me/media_publish`) — publishes the created media

The n8n `facebookGraphApi` node handles this automatically when you select `Instagram` host and `media` → `publish` operation.

---

## Rate Limits

- Facebook Graph API: ~200 calls/hour per token
- Instagram: ~50 posts/hour per account
- Images must be ≤ 8MB for feed posts