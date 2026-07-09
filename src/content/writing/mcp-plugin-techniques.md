---
title: 'MCP Copilot CLI plugins: techniques used'
description: 'A companion doc to my resume. If you saw the MCP plugins bullet and want to see what actually shipped, here is the honest breakdown of the AI techniques used, what is NOT there, and what this signals.'
pubDate: 2026-07-08
tags: ['ai', 'engineering', 'mcp']
featured: false
---

If you found this from my resume: hi. This is the companion writeup to the MCP-based Copilot CLI plugins bullet. My goal is to be specific about what techniques are actually demonstrated in that work, and equally specific about what is NOT there so I do not over-claim.

## What the plugins do

Two production MCP-based plugins deployed to a 200+ person engineering + PM org:

1. **Natural-language data analyst** — translates plain-English questions into precise queries against a multi-terabyte commerce data warehouse. Handles table selection, dimension joins, freshness checks, ambiguity resolution, and result presentation with domain-appropriate commentary.
2. **PM toolkit** — spec authoring, strategy stress-testing, and scoring rubrics for product managers. Adopted across the same 200+ person org, cutting support volume by ~85% and freeing roughly 10 dev hours per week that used to go to answering repeat questions.

Both plugins ship as skills invoked via Copilot CLI. Both connect to real backends via the Model Context Protocol (MCP).

## Techniques and how each is used

| Technique | How it's used in this plugin |
|---|---|
| **MCP (Model Context Protocol)** | Real MCP servers wired via `.mcp.json` at the plugin root. Backend tools (data warehouse query execution, code and documentation search) are exposed to the model as first-class function calls. Uses Azure identity auth, allowed-tools scoping, and per-plugin server configuration. |
| **Tool / function calling** | The agent calls backend tools as part of every workflow: schema discovery, freshness checks, actual query execution, documentation lookups, code search fallbacks. Tool calls are interleaved with reasoning rather than batched. The skill instructions define which tool to call in which situation and what to do with the result. |
| **Retrieval-augmented context** (structured, not vector) | The skill is split into a router file plus seven focused reference files (schemas, dimensions, common query patterns, tribal knowledge, subscription semantics, dashboard generation, pipeline architecture). The agent consults the relevant reference file BEFORE hitting the live schema. Retrieval is over curated markdown, not embeddings. Deliberate choice: domain benefits more from precise human-curated context than lossy semantic search. |
| **Agent workflow / ReAct-style planning loop** | Every user question flows through a defined pipeline: understand → select the right table → write the query → execute → validate → present. Each step gates the next; each involves either tool calls or reasoning. |
| **Guarded tool-calling (ambiguity-first)** | An 11-item ambiguity checklist that the agent applies BEFORE executing any query: time range, product scope, revenue type (gross vs net), identity format, granularity, and more. Wrong assumptions here produce silently-wrong queries → silently-wrong numbers → bad decisions. The model is instructed to refuse ambiguous tool calls and ask a clarifying question instead. Trades a bit of latency for a lot of correctness. |
| **Freshness-verification sub-loop** | Pipelines can fall behind SLA. The agent must run a discovery query first to anchor to the latest actually-available date, and warn the user if it's older than expected. A self-check pattern that prevents a common failure mode (querying for "today" and silently getting zero rows). |
| **Persona conditioning with factuality guardrails** | The system prompt establishes a specific tone (sharp, witty, sparing emoji, nicknames interesting findings) AND explicitly enforces "never sacrifice accuracy for comedy." Reduces daily-use friction; prevents the persona from becoming a hallucination vector. |
| **Multi-source grounding fallback** | When pre-loaded reference docs don't cover a question, the agent falls back to searching internal documentation and pipeline code via a separate tool. Graceful degradation: the plugin can answer questions the skill author didn't anticipate, without pretending to know things it doesn't. |

## What is NOT in this plugin

Being clear so I don't over-claim in interviews:

- **No vector database / vector RAG.** Retrieval is over structured markdown files, not embeddings.
- **No fine-tuning / model training.** The plugin uses off-the-shelf models.
- **No formal LLM evaluation harness.** No offline eval suite, no benchmark scoring, no A/B on prompts. Improvements were made based on user feedback and manual testing.
- **No multi-modality.** Text in, text out.
- **No custom orchestration framework.** Uses MCP + Copilot CLI runtime directly, not LangChain / LangGraph / a custom orchestrator.

## What this signals

For roles that expect production AI experience, this plugin work demonstrates:

- Comfort with the current production AI stack (MCP, tool/function calling).
- Judgment about when structured retrieval beats vector search.
- Attention to failure modes that only matter at scale (freshness lag, ambiguity, silently-wrong queries).
- Ability to ship internal tools that real people adopt (a 200+ person org, ~85% support-volume reduction, ~10 dev hours per week returned).
- Willingness to write dev-facing skill assets, not just user-facing prompts.

It does NOT demonstrate deep ML/eval work, custom model training, or research-level agent frameworks — and I don't claim those.
