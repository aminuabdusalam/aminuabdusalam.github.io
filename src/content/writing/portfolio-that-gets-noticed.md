---
title: 'Building a portfolio that gets you noticed'
description: 'A 4-question frame for product teardowns, and why PM portfolios fail when they lead with code. Notes from a talk I gave at Intellect Africa Fellowship 2026.'
pubDate: 2026-07-25
tags: ['pm', 'career', 'portfolio']
featured: true
---

I got invited to give a breakout session at Intellect Africa Fellowship 2026 for their Product Track. The brief was straightforward: help Fellows build portfolios that actually get them noticed. I had 30 minutes.

The thing I kept coming back to while prepping is this: most people applying for PM roles show up with the wrong kind of portfolio. They lead with GitHub repos and deployed apps, and then wonder why they aren't getting callbacks. So the talk ended up being one reframe, one frame, and one live teardown. Here's the shape of it.

## Two signals, one required

A PM portfolio is not an engineer's portfolio. Different reader, different signal.

An engineer's portfolio proves you can build. GitHub repos, deployed apps, tech stack, code samples. Nice things to have. But if that's *all* you show for a PM role, you're asking the reader to squint really hard to imagine you as the decision-maker in the room.

A PM portfolio proves you can decide. How you frame problems. How you weigh tradeoffs. How you pick metrics. How you cut scope. That's the required signal.

The mistake isn't shipping code. It's shipping *only* code and calling it a PM portfolio. If you can do both, you jump the queue. That combo is actually pretty rare in the applicant pool.

## The 4-question frame

Every good PM artifact fits into four questions. Doesn't matter if it's a teardown, a PRD, a case study of a decision you made, a feature proposal, or a clickable prototype. Same four questions, every time.

1. **Problem.** What's broken? Who's hurting? Why now?
2. **Decision.** What would you build? What's the move?
3. **Tradeoff.** What breaks? What's the risk? What's the cost?
4. **Outcome.** How will you measure it? What would prove you wrong?

That's the frame. If your artifact doesn't answer all four, it's incomplete. If it answers only the first two, you're a shipper, not a PM. If it skips Tradeoff, you're hiding.

The most common failure I see: people write beautifully about Problem and Decision, then hand-wave the Tradeoff and stick "increase engagement" in the Outcome slot. That's the tell.

## The live teardown: Uber

To make the frame concrete, I did a product teardown live, in front of the room. Product: Uber. Here's the short version.

**Problem.** Every Friday at 7pm I have a standing therapy appointment. Same clinic, across town, every week. Around 6:15 I open Uber, retype the address I've typed fifty times, check surge, pray it's not 1.8x, pick UberX, tap request. About 8 taps. Times 52 weeks. That's over 400 identical taps a year for a workflow that never changes. Meanwhile Instacart lets me subscribe to my groceries and Amazon lets me subscribe to my toothpaste. Uber - a company literally built on trip patterns - has no concept of subscribe-to-a-trip.

**Decision.** Call it Trip Templates. Save a route, a time, a cadence. Auto-book the ride 20 minutes before departure. Forty-five minutes before, push a notification: *Your Friday therapy ride is queued. Skip this week?* One tap out. The skip button is the whole thing - it proves you thought about the case where the appointment gets cancelled.

**Tradeoff.** If a user forgets to hit skip and their session was cancelled, they get charged for a ride they didn't take. That's not a bug - that's a trust-killer. Someone's therapist reschedules, they miss the push, Uber quietly takes their money. Once. And they uninstall. Mitigation: the 45-minute ping is required. No confirm, no book. Ever.

**Outcome.** Percent of weekly same-route rides booked via a template, among users with 4+ identical-pattern rides. Baseline 0%. Six-month target: 40% for that segment. Notice - I'm not saying "engagement goes up." I'm naming a segment, a baseline, and a window. A real team could argue about that number. That's what makes it a good metric.

That's a teardown. About 400 words. You could publish it as a page on your portfolio site tonight.

## The artifact is the point

The artifact I want people to leave with isn't a set of principles. It's a case-study page. A single URL on a portfolio site, formatted as Problem / Decision / Tradeoff / Outcome, on a product they actually use.

Reasons this beats the alternatives:

- It's cheap. GitHub Pages is free. HTML is not scary.
- It's linkable. You can drop the URL in an application, a DM, a resume.
- It's honest. It's not you talking about how you'd be a great PM. It's you doing PM work.
- It's evergreen. Six months from now the artifact still exists. Your GitHub commit graph will not save you.

If you're reading this and you don't have one yet: pick a product you use weekly, pick a real pain, run the four questions, ship it. The frame takes 45 minutes. Publishing takes 5.

## The take-home

I told the Fellows: don't wait. You have the product. You have the pain. The frame takes 45 minutes. Publishing takes 5. Post the link in the cohort channel.

Same offer stands here. If you write one and want a read, send it my way.
