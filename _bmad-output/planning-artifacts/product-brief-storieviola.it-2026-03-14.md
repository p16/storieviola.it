---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: []
date: 2026-03-14
author: Filippo
---

# Product Brief: storieviola.it

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

Storie Viola is a kids' podcast of original stories created by the author for his daughter. The product is a simple, modern website (storieviola.it) that showcases all episodes with links to Spotify, explains the origin and making of the stories, and serves as the single, cost-effective home for the project (e.g. GitHub Pages). Success means the site is live and easy to maintain, the creator has one place for all stories and info, and the stories—as a record of his daughter's childhood—can reach other families and kids.

---

## Core Vision

### Problem Statement

As the creator of Storie Viola, you need a single, clear place to present the podcast and its episodes. Listeners (and you) currently have no dedicated, easy-to-find home for the show: no simple list of episodes, no way to understand where the stories come from or how they're made, and no low-friction way to keep everything in one place without ongoing cost.

### Problem Impact

Without a dedicated site, the podcast has no visible identity beyond Spotify. You can't point people to "storieviola.it" for the full picture. Parents and kids can't discover what Storie Viola is, browse episodes, or read about the stories' origin. For you, there's no central place to manage and share "all stories and info about Storie Viola," which makes sharing and growing the project harder.

### Why Existing Solutions Fall Short

The podcast lives only on Spotify. Spotify is for listening, not for explaining the project, listing episodes in a readable way, or telling the story behind the stories. Social or generic links don't provide a permanent, professional home. A custom site that's cheap to host (e.g. GitHub Pages) fills that gap without ongoing cost.

### Proposed Solution

A simple, modern website (storieviola.it) that:

- Lists all podcast episodes with links to listen on Spotify (the only hosting for now).
- Explains where the stories come from (your daughter's childhood, invented for her) and how they're made (e.g. translating old audio, making it podcast-ready, using AI for episode covers).
- Serves as the single reference for "all stories and info" about Storie Viola.
- Is published in the most cost-effective way possible (e.g. GitHub Pages).

### Key Differentiators

- **Personal and authentic:** Stories are real childhood memories, repurposed for other kids.
- **Minimal and focused:** One clear purpose—showcase episodes and the story behind them—without extra complexity.
- **Cost-effective and maintainable:** Static, simple hosting (e.g. GitHub Pages) so the site can stay online with minimal effort and cost.
- **Creator-first:** Built so you have one place that you (and others) can use to find and understand Storie Viola.

## Target Users

### Primary Users

**Creator (you)**  
You are the main user and the primary design driver. You record a new story every week and need a simple, repeatable way to keep the site in sync: add or update episodes with title, description, and cover image without fighting the tool or the stack. Success means the website exists, stays up with minimal cost (e.g. GitHub Pages), and you can maintain the episode list in a few minutes each week so storieviola.it remains the single place for "all stories and info" about Storie Viola.

### Secondary Users

**Parents**  
Parents who might use the stories for their kids. They need to discover Storie Viola via Google (or other search engines) and, once on the site, understand what it is, see the episode list, and get to Spotify to listen. They don't maintain the site; they discover, browse, and listen. The site should be findable and readable so they can choose an episode and open it on Spotify quickly.

### User Journey

**Creator journey**  
- **Maintenance:** Each week, after publishing a new episode on Spotify, you add or update one entry on the site (title, description, cover image) through an easy, predictable flow (e.g. edit a file or form, then publish).  
- **Success moment:** The new episode appears on storieviola.it with correct info and art, and you can share the link knowing it's up to date.  
- **Ongoing:** The site stays the canonical list; you rarely need to fix mistakes or redo work.

**Parent journey**  
- **Discovery:** They find "Storie Viola" or "storieviola.it" via search (or a link from you).  
- **First visit:** They land on the site, see what the podcast is (kids' stories, your project), and see the episode list.  
- **Core use:** They pick an episode (title/description/cover help), click through to Spotify, and play it for their kids.  
- **Success moment:** They quickly understand what Storie Viola is and can find and play episodes without confusion.

## Success Metrics

### User Success (Creator)

- **Easy content management:** You can add or update episode references (link, description, title, cover image) without friction.
- **Easy editing:** You can edit pages that explain the project (e.g. origin, making-of) without fighting the stack.
- **Easy deployment:** Deployment is straightforward and automated (e.g. push → GitHub Pages).
- **Worth-it moment:** You find it easy to update and maintain; the site doesn't become a chore.
- **Reach:** People visit the website and listen to the stories on Spotify.

### User Success (Parents)

- **Discoverability:** Parents looking for stories for small kids (e.g. 2–6 years) can find the website easily (e.g. via Google or other search engines).
- **Clear path to listening:** Parents can go from the site to Spotify quickly (e.g. one click per episode).

### Business Objectives

- **Cost-effective:** The solution stays cheap to run (e.g. GitHub Pages, no paid hosting).
- **Maintainable:** The site remains easy to update so it can be sustained over time with minimal effort.

### Key Performance Indicators

- **Availability:** Site is up and reachable at storieviola.it.
- **Creator efficiency:** You can add a new episode (title, description, image, link) in a short, repeatable time (e.g. within a few minutes).
- **Parent discovery:** The site is findable via search (e.g. relevant queries for "storie viola" or "storie per bambini" return storieviola.it).
- **Conversion to listen:** Each episode has a direct link to Spotify so parents can open and play with one click.

## MVP Scope

### Core Features

- **Episode list:** A single, clear list of all podcast episodes (title, description, cover image).
- **Spotify links:** Each episode links directly to the episode on Spotify so visitors can play with one click.
- **About page:** One page that explains where the stories come from and how they're made (e.g. origin, translation, podcast-ready production, AI for covers).
- **Easy deployment:** Simple, automated deployment (e.g. push to repo → site updates on GitHub Pages or similar).
- **SEO and analytics:** Basic SEO (meta, structure) so the site can be found for queries like "storie per bambini," plus simple analytics in place to see that the site is reachable and discoverable.

Delivering the above is the smallest set that solves the core problem for you (maintainable, shareable home for Storie Viola) and for parents (find and listen).

### Out of Scope for MVP

- **Comments** (e.g. on episodes or site).
- **Accounts / login** (no user accounts or auth).
- **Multiple languages** (MVP is single language; language not specified yet).
- **Native app** (web only for MVP).
- **Transcriptions** of the stories (audio only for MVP).

These may be revisited after MVP is live and validated.

### MVP Success Criteria

- **Creator:** The five core features above are in place and you find it easy to update episodes and deploy.
- **Parents:** Someone searching for "storie per bambini" (or similar) can find storieviola.it, understand what it is, see the episode list, and open an episode on Spotify in one click.
- **Technical:** Site is live, cost-effective, and stable (e.g. GitHub Pages); analytics confirm the site is being reached.

### Future Vision

- Post-MVP options could include: multiple languages, transcriptions, or other discovery/engagement features. MVP focuses on "list + about + find + listen" and defers the rest.
