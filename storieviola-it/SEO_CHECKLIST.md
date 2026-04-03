# 🚀 SEO Action Checklist for Storie Viola

## Immediate Actions (Do These First!)

### ☐ Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter: `storieviola.it`
4. Verify ownership (follow their instructions)
5. Click "Sitemaps" → "Add/test sitemap"
6. Enter: `https://storieviola.it/sitemap.xml`
7. Click "Submit"

**Why:** Without this, Google doesn't know your site exists. This is the #1 thing to do.

---

### ☐ Submit to Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Click "Add a site"
3. Enter: `storieviola.it`
4. Follow verification steps
5. Submit sitemap in the same way

**Why:** Bing powers Yahoo search. More coverage = more visitors.

---

## Quick Wins (Easy Improvements)

### ☐ Check Current Indexing Status
1. Visit Google and search: `site:storieviola.it`
2. If no results → you're not indexed yet (expected, do step 1 first)
3. If results appear → you're indexed! ✅

---

### ☐ Test Your SEO Setup
1. **Test robots.txt:** https://storieviola.it/robots.txt
2. **Test sitemap:** https://storieviola.it/sitemap.xml
3. **Test schema markup:** 
   - Go to https://schema.org/validator
   - Enter: `https://storieviola.it`
   - Verify the WebSite schema shows up

---

## Ongoing Tasks (Do Monthly)

### ☐ Update Sitemap When Adding Episodes
**Good news! This is now automatic! 🎉**

The sitemap is now **dynamically generated** — you don't need to manually update it:
1. Add a new episode with frontmatter including `slug` and `publishDate`
2. Run `npm run build`
3. The new episode automatically appears in the sitemap

**How it works:**
- Episodes are queried from the content collection
- Only visible episodes (not marked `hidden`) are included
- Episodes are automatically sorted by publish date
- Build time: ~5-10ms (negligible)

**For details:** See `DYNAMIC_SITEMAP.md`

---

### ☐ Monitor Search Performance
1. Check Google Search Console monthly for:
   - Click-through rate (CTR)
   - Average ranking position
   - Impressions
2. Look for low-performing keywords and improve content

---

### ☐ Share on Social Media
When you publish new episodes, share links on:
- Instagram (if you have it)
- TikTok (short clips from stories)
- Facebook
- Twitter/X
- LinkedIn

This generates backlinks which help rankings.

---

## Optional But Recommended

### ☐ Create Breadcrumb Schema
Add breadcrumb markup to episode pages for better SERP appearance:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://storieviola.it/"},
    {"@type": "ListItem", "position": 2, "name": "Episodes", "item": "https://storieviola.it/"},
    {"@type": "ListItem", "position": 3, "name": "Episode Title"}
  ]
}
```

### ☐ Add Podcast to Directories
Submit your podcast to:
- Spotify Podcasts (if not already listed)
- Apple Podcasts
- Google Podcasts
- Italian podcast directories

These are additional backlinks.

---

## What's Already Done ✅

- ✅ `robots.txt` created
- ✅ `sitemap.xml` created (with dynamic generation)
- ✅ Schema.org markup added
- ✅ Meta tags configured
- ✅ Open Graph tags set up
- ✅ Mobile responsive design
- ✅ Proper HTML structure
- ✅ Italian language meta tag added
- ✅ Future-proof: New episodes automatically included in sitemap

---

## Timeline Expectations

| When | What to Expect |
|------|--------|
| **Day 1** | Submit to Search Console |
| **Days 2-7** | Google starts crawling your site |
| **Weeks 2-4** | Site begins appearing in Google results |
| **Months 2-3** | Rankings improve (depends on competition) |
| **Months 3-6** | Steady organic traffic if content is good |

---

## Quick Links

- 🔍 Google Search Console: https://search.google.com/search-console
- 🔗 Bing Webmaster: https://www.bing.com/webmasters
- ✓ Schema Validator: https://schema.org/validator
- 📊 Google Analytics: https://analytics.google.com

---

## Need Help?

If you get stuck:
1. Check `SEO_IMPROVEMENTS.md` for detailed explanation
2. Use the schema validator to test your markup
3. Check Search Console for errors/warnings

Good luck! 🎉
