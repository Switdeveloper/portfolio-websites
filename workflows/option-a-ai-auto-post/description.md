# Option A: AI-Powered Auto-Post (Facebook & Instagram)

## Description

AI-powered fully automated posting workflow. Every run, Grok AI generates a unique, engaging caption and image prompt — no manual content creation needed. Posts simultaneously to Facebook and Instagram via Meta Graph API.

**Schedule:** 2x daily — 9:00 AM and 2:00 PM

---

## How It Works

1. **Schedule Trigger** fires at 9AM and 2PM daily
2. **Content Planner (Code)** selects a random topic from 8 categories and picks an image from a curated pool
3. **Grok AI — Caption Generator** creates a compelling caption with hook, body, CTA, and hashtags
4. **Grok AI — Image Prompt Generator** creates a matching image generation prompt
5. **Assemble Post (Code)** combines the AI outputs into a clean post object
6. **Facebook Graph API** posts image + caption to the connected Facebook Page
7. **Instagram Graph API** creates media and publishes to the linked Instagram Business account
8. **Aggregate Results (Code)** compiles the outcome of both posts
9. **Google Sheets** logs the full post record (timestamp, topic, caption, post IDs, status)
10. **Telegram Notify** sends a success/failure report to your chat

---

## What It Posts

- Randomly selected from: productivity tips, behind-the-scenes, customer stories, how-tos, industry news, motivation, fun facts, feature spotlights
- Image from curated Unsplash pool
- Unique AI-generated caption every time — never repeats

---

## Best For

- Social media managers who want fresh content without writing it manually
- Multi-account automation (run on multiple n8n instances)
- Brand building with consistent, varied content

---

## Setup Requirements

- Facebook Page with a linked Instagram Business/Creator account
- Meta App with Graph API access (Page Access Token)
- Grok API key (xAI)
- Google Sheets (optional — for logging)
- Telegram Bot (optional — for notifications)

---

## Failure Handling

- Each platform node has `continueOnFail: true` — one failure doesn't block the other
- Telegram report shows per-platform status (posted vs failed with error message)
- Google Sheets logs errors so you can track and retry manually

---

## Account Support

Deploy on multiple n8n instances (switnano, thesixai, etc.) with different Facebook pages for complete account separation.