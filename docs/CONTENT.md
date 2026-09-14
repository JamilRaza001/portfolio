# CONTENT.md

**Latest alignment supplement (2026-09-14):** See `CONTENT-ALIGNMENT-REVIEW.md` for a fresh page-by-page review of `MJR_CV_9 6 2026.pdf` and `Profile (1).pdf`. The user confirmed AWS and Azure and requested AI/Software/ML, Multi-cloud Data Engineering, and Data Science/Analytics positioning (D30). Named cloud-service deployments and certifications remain unasserted. Existing D9 metric/evaluation corrections still override contradictory PDF text; older audit questions below are historical when resolved by an addendum or decision.

The content model for the portfolio. Built in Phase 1 from the CV (`MJR_CV_9 6 2026.pdf`),
the LinkedIn export (`Profile.pdf`), and README-only reads across 12 candidate GitHub repos.

**Source rule:** everything here traces to one of those three sources. Nothing is inferred.
Anything unverified is tagged. Do not let Phase 2 design around a claim tagged `METRIC MISSING`
or `UNVERIFIED` until the user has answered.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Muhammad Jamil Raza Attari |
| Title | AI Engineer |
| Location | Karachi, Sindh, Pakistan |
| Availability | Open to remote, relocate, hybrid, on-site, travel |
| Email | jamilraza001@gmail.com |
| Phone | +92 310 3118833 |
| GitHub | [JamilRaza001](https://github.com/JamilRaza001) — 55 repos (53 public, 2 private) |
| LinkedIn | [jamilrazaa](https://www.linkedin.com/in/jamilrazaa/) |

**Positioning (his own words, LinkedIn headline):** *"AI Engineer · RAG · Agentic AI · LLM
Integration | LangChain · LangGraph · FastAPI · pgvector | Python · Computer Vision"*

**The through-line:** he does not build models from scratch — he **ships AI systems into
production at an organisation that actually depends on them**. Voice agents taking real calls,
QA analysis on real recordings, RAG over real internal documents, dashboards real stakeholders
read. That is the story, and it is a stronger one than "here are my notebooks."

---

## 2. Experience

### 2.1 AI Engineer — Saylani Welfare International Trust
`Jan 2026 – Present` · Karachi · **Current primary role**

Pakistan's largest welfare organisation. Builds end-to-end AI systems that automate business
workflows and reduce manual overhead.

| # | What he built | Metric |
|---|---|---|
| 1 | **Call QA Analyzer** — evaluates inbound call recordings, scores agent performance, flags quality issues | `METRIC MISSING` — "eliminating manual review effort". How many calls/day? Hours saved/week? |
| 2 | **Voice Agent** — handles inbound calls autonomously, real-time STT + LLM reasoning | `METRIC MISSING` — "reducing dependency on human agents". What % of calls handled without a human? Latency? |
| 3 | **n8n / LangChain / OpenAI + Claude automation workflows** | `METRIC MISSING` — "saving equivalent effort of multiple FTEs". **How many FTEs? This is the single most quotable number he has.** |
| 4 | **Data pipelines & ETL** into SQL databases and external APIs | `METRIC MISSING` — volume? frequency? |

### 2.2 Lead Trainer — AI & Data Science, SMIT (Saylani Mass IT)
`Dec 2025 – Present` · Karachi

Teaches Python → ML → Deep Learning → LLMs → Agentic AI. Project-based curriculum, FastAPI
deployment, full AI lifecycle. Mentors students on portfolio and GitHub.

- **⚠️ CONTRADICTION:** CV says **"30+ students"**; LinkedIn says **"50+ students per batch"**.
  Must be resolved — this number will appear on the site.
- Mission framing (LinkedIn): *"Empowering aspiring AI professionals from underprivileged
  backgrounds."* This is genuinely differentiating and belongs on the site.

### 2.3 AI/ML Engineer — Omdena
`Aug/Sep 2025 – Present` · Remote

**Project: CropLogic — AI-Powered Farming Intelligence for Smallholder and Medium Farms.**
Precision agriculture, global distributed team.

- Preprocessing pipelines fusing **IoT sensor data + satellite multispectral imagery (NDVI/EVI)**
  for crop and irrigation prediction.
- `sklearn` `Pipeline` / `ColumnTransformer`; missing sensor readings handled via interpolation
  and rolling-window imputation.
- Benchmarked **XGBoost + scikit-learn** against **PyTorch / Hugging Face** vision baselines.
- Limited ground-truth labels mitigated via transfer learning, targeted augmentation, stratified
  sampling.
- Lightweight architectures for **low-connectivity rural areas**.
- Async collaboration with a **40+ member global team**.
- ✅ **Verifiable credential:** `confirm.omdena.com/INgxmvg`
- `METRIC MISSING` — model performance? R²/RMSE/accuracy? Farms or hectares covered?
- **⚠️ DUPLICATE ENTRY:** LinkedIn lists Omdena twice — "AI/ML Engineer (Sep 2025, 10 months)"
  and "Artificial Intelligence Engineer (Aug 2025, 11 months)". Likely one role. Needs cleanup.

### 2.4 AI Engineer (Internship) — Saylani Welfare International Trust
`Oct 2025 – Dec 2025` · Karachi · **Sole developer**

End-to-end RAG chatbot automating routine office workflows for **medical staff**, plus an
analytics layer for administrators. Owned the whole pipeline: ingestion → embedding → vector
retrieval → LLM orchestration → deployment.

- Answer relevance improved by tuning chunking and retrieval, **validated on a labeled eval set**
  — this is the most senior-sounding detail in the whole CV.
- `METRIC MISSING` — **by how much did relevance improve?** He ran an eval set; the number exists.
  "Cutting manual lookup time" — by how much?

---

## 3. Projects

Ranked by portfolio strength. ✅ = on GitHub and usable. ⚠️ = on GitHub but damaged.
❌ = claimed on CV, **not found on GitHub**.

### 3.1 ❌ Call Center QA System — *not on GitHub*
**The strongest project on the CV and there is no repo for it.**

Async FastAPI pipeline transcribing **bilingual Urdu/English** audio, evaluating agent compliance
with OpenAI models. Rule-based scoring engine, duplicate detection, Streamlit dashboard, manual
review queue. JSON audit trail + SQLite queryable index. `imageio-ffmpeg`, `httpx`, `uv`.

> Bilingual Urdu/English ASR on real production call data is genuinely distinctive — most
> portfolios in this space are English-only toy pipelines. **This should probably lead the site.**

`METRIC MISSING` — calls processed? accuracy vs human reviewers? review time cut?
**ACTION: does a repo exist (private/org account)? If not, is there a demo, screenshots, or
anything showable?**

### 3.2 ❌ Saylani Qurbani Operations Dashboard — *not on GitHub*
ETL over **3 years of multi-source data**; regex country inference, price→label mapping,
**Hijri↔Gregorian date conversion**; deduplicated merge via atomic file replace. Streamlit +
Plotly, **5 chart modules**, gradient KPI scorecards. Dockerised (Python 3.11-slim), one-click
in-app pipeline rebuild. **80+ commits.**

> The dual-calendar Gregorian↔Hijri like-for-like YoY engine is the single most interesting
> engineering detail in the entire CV — a real business constraint translated into a reusable
> analytics function. Almost nobody else's portfolio has that.

Has numbers already: `3 years`, `5 chart modules`, `80+ commits`.
`METRIC MISSING` — donation volume processed? stakeholders served? time saved vs manual reporting?
**ACTION: 80+ commits means a git repo exists somewhere. Where?**

### 3.3 ⚠️ AlphaLens — `JamilRaza001/alphalens` (public)
`May 2026 – Present`

Serverless RAG agent over SEC 10-K/10-Q filings, cited multi-document synthesis.
**~22K chunks, 200 filings**, top 10 S&P 500 companies, 2022–2026.
5-node LangGraph pipeline: plan → hybrid-retrieve → rerank → evaluate → synthesize.
Hybrid retrieval: **pgvector HNSW (768-d) + Postgres tsvector**, fused via **Reciprocal Rank
Fusion**, then **cross-encoder reranking**. Dual-backend embeddings (Jina v3 + local
nomic-embed fallback) with quota-based automatic failover, both 768-d for zero-migration switching.

Stack: Python 3.12/uv, AWS Lambda, FastAPI, Neon Postgres, Cloudflare R2, Groq LLaMA 3.3 70B,
Jina v3, ms-marco-MiniLM, Next.js 15 on Vercel over SSE.

- **Architecturally the most impressive thing he has.** RRF + cross-encoder reranking + failover
  embeddings is senior work.
- **⚠️ PROBLEM: README badge says "Phase 1 setup in progress".** The `~15 seconds` answer time is
  a *design target*, not a measured result.
- **ACTION: is it actually running? If yes, update the badge and measure real latency. If no, the
  site must present it as in-progress — claiming otherwise is a lie a technical interviewer will
  catch in 30 seconds.**

### 3.4 ⚠️ SecureVision AI — `JamilRaza001/SecureVision-AI` (public)
Multimodal pipeline: monitors Gmail for DVR security events → **Gemini 2.5 Flash** extracts
structured alert data from freeform email → **Gemini Vision** generates scene descriptions from
camera frames → severity classification → enriched **WhatsApp alerts via Twilio**.

- **⚠️ THE README IS 0 BYTES — COMPLETELY EMPTY.** Public repo, linked from the CV, explains
  nothing. This is currently a *negative* signal.
- A 25KB `PROJECT_BRAINSTORM.md` exists in the repo, so the thinking is written down — it is just
  not in the README.
- `METRIC MISSING` — events processed? false-positive rate? alert latency?
- **ACTION: this is the highest-value, lowest-effort fix available. One README.**

### 3.5 ⚠️ Real-Time Voice AI Ordering System — `JamilRaza001/CB_voice-agent` (private)
"CyberBistro" restaurant voice ordering. Full **ASR → LLM → TTS** speech-to-speech over
WebSocket, targeting **sub-second Time-to-First-Chunk**. Barge-in interruption. SILMA Arabic TTS
with zero-shot voice cloning. Per-session isolation via Python **ContextVars**, async
SQLite-backed conversation memory.

Stack: Python 3.10+, FastAPI, OpenAI Agents SDK, Groq Whisper-large-v3-turbo, SILMA TTS,
SQLAlchemy + aiosqlite, OpenRouter (nvidia nemotron free tier), FFmpeg.

- **Best README of the whole set** — an outsider can run it.
- ⚠️ **Repo is private** — decide: make public, or present as a case study with no link.
- ⚠️ **The README's clone URL points at `github.com/Furqan2004/Resturant-Agent.git`** — someone
  else's repo. Must be fixed before anyone sees it; it reads as uncredited copying.
- ⚠️ Branch is `cartesia-stt` but the README documents Groq Whisper — stale.
- `METRIC MISSING` — **he targeted sub-second TTFC. Did he hit it? This is a measurable number he
  almost certainly has.**

### 3.6 ⚠️ Crypto Agent RAG — `JamilRaza001/Crypto_Agent_RAG` (public)
Anti-hallucination crypto assistant. Routes each query to a local vector KB, a live market API,
or both; 5-layer validation chain; every answer cited; refuses out-of-scope and investment-advice
questions.

Stack: Python, Streamlit, Gemini 1.5 Flash, sentence-transformers MiniLM, ChromaDB,
FreeCryptoAPI, SQLite LRU cache, spaCy, pytest/black/flake8/mypy.

- **⚠️ Stated numbers are "Performance Targets", not measurements**: `<2s end-to-end`,
  `>70% cache hit rate`, `<500MB memory`, `<10ms cached`.
- **⚠️ Status says Phases 1–2 of 8 complete**; the "Zero Hallucinations" headline overclaims
  against an unbuilt Phase 5 guard.
- The *refusal design* is a good talking point regardless.

### 3.7 Pizza Chatbot (Broadway Pizza PK) — `Pizza_chatbot_using_RAG_and_KnowalgeBase`
Customer-service chatbot answering menu/deals/locations from SQLite rather than model memory;
interactive cart and order capture. Streamlit + Gemini + SQLite.
- Complete, runnable, **well documented**. Honest read: solid **junior/mid** demo, not senior
  evidence. **Candidate for a secondary grid, not a hero slot.**

### 3.8 Pothole Detection (YOLOv8) — `Pothole-Detection-with-YOLOv8`
Has trained weights (`best.pt`) and a Streamlit app. **No README at all.**
- This is his only real **computer vision** artifact on GitHub, and CV claims CV as a core
  competency. Currently invisible. `METRIC MISSING` — mAP? dataset size?

### 3.9 Not portfolio material
`rag-document-assistant` (all-unchecked to-do list, unbuilt) · `HMS-Data-Analysis` (no README) ·
`Cloud-Data-Engineering---jamil` (class SQL exercises) · `customer-analytics-dashboard` (2 files,
no README) · `Data_Analysis_Streamlit` (unfinished template README, placeholder demo link) ·
`Personal-Branding-Centre-` (21 ADRs, zero implementation) · ~35 bootcamp repos
(GIAIC/millstone/PRODIGY/calculators/to-do lists, 2024).

---

## 4. Technical range

| Area | Evidence strength |
|---|---|
| **GenAI / LLM Engineering** | **Strong.** RAG, agentic workflows, LangChain, LangGraph, OpenAI + Anthropic APIs, tool/function calling, structured outputs (Pydantic), LoRA/QLoRA, MCP, context-window management. |
| **RAG & Retrieval** | **Strongest area.** Chunking strategies, embeddings, semantic + hybrid search (BM25 + dense), cross-encoder reranking, metadata filtering, HNSW/IVF indexing, query expansion, RRF. Demonstrated in AlphaLens, not just listed. |
| **Backend / APIs** | **Strong.** FastAPI, REST design, OAuth/JWT, WebSockets + streaming, rate limiting, retries, microservices, async (`asyncio`, ContextVars). |
| **Voice / Real-time** | **Strong and rare.** ASR→LLM→TTS, WebSocket streaming, barge-in, voice cloning, bilingual Urdu/English. |
| **Data Engineering** | **Good.** ETL/ELT, Pandas, NumPy, feature engineering, Pydantic validation, scraping, Docker. |
| **Databases / Vector** | **Good.** Pinecone, FAISS, Qdrant, ChromaDB, PostgreSQL, pgvector, Redis, schema design. |
| **Computer Vision** | **Claimed, thinly evidenced.** OpenCV, YOLO, segmentation, CNN, OCR, Ultralytics — but the only artifact is an undocumented pothole detector. **Gap between claim and proof.** |
| **Classical ML / DL** | **Adequate.** TensorFlow/Keras, PyTorch, scikit-learn, XGBoost, transformers, hyperparameter tuning. |
| **MLOps** | **Claimed, unevidenced.** CV summary claims CI/CD and **MLflow model versioning**; nothing in any README shows MLflow. `UNVERIFIED`. |

---

## 5. Education & credentials

| Item | Institution | Date | Note |
|---|---|---|---|
| Bachelor of Technology | Virtual University | `Mar ?? – Present` | ⚠️ **No start year on CV.** |
| Intermediate | Government Superior College | Aug 2022 | ⚠️ Spelled "Intermaitade" in both documents. |
| AI & Data Science | SMIT | Sep 2025 | |
| Agentic AI | SMIT | May 2026 | |
| Deloitte Australia — Data Analytics Job Simulation | Forage | — | LinkedIn only |
| AI Innovation Challenge — CropLogic | Omdena | — | ✅ Verifiable: `confirm.omdena.com/INgxmvg` |

⚠️ **LinkedIn education is inconsistent with the CV** — it lists *"Superior Government Collage
Commerce"* (High School Diploma, Business/Commerce) **and** *"Government Medical College"*
(Intermaitade). Two different institutions for what the CV shows as one entry.

---

## 6. Gaps — ranked by damage

### 🔴 Blocking (must resolve before Phase 2 design)

1. **Almost no outcome numbers exist.** The reference site led every project card with a *result*,
   and `PLAN.md` §1.5 keeps that inversion. Right now there are ~4 usable numbers across the whole
   corpus (`22K chunks`, `200 filings`, `3 years`, `80+ commits`, `40+ team`). **A layout built to
   showcase metrics will look broken if the metrics are absent.** Either we get numbers, or Phase 2
   must design a different content hierarchy. This is a genuine fork in the road.
2. **The two best projects are not on GitHub** (Call Center QA, Qurbani Dashboard). Need to know
   whether repos exist elsewhere, or whether these become link-less case studies.
3. **Employer permission.** Both missing projects are internal Saylani systems. Before publishing
   details or screenshots of an employer's internal tooling, confirm he is allowed to.

### 🟠 Damaging but cheap to fix

4. `SecureVision-AI` README is **empty** — public repo linked from the CV.
5. `CB_voice-agent` README clone URL points to **someone else's repository**.
6. `Pothole-Detection-with-YOLOv8` — no README; his only CV artifact.
7. `alphalens` badge says "Phase 1 in progress" while CV presents it as built.
8. LinkedIn **Top Skills are "Irrigation Design, Data Processing, Organizational Capabilities"** —
   actively off-brand for an AI engineer. Costs nothing to change.

### 🟡 Consistency

9. SMIT students: **30+ (CV) vs 50+ (LinkedIn)**.
10. Omdena listed twice on LinkedIn with overlapping dates.
11. Degree start year missing.
12. Education entries differ between CV and LinkedIn.
13. CV typos: "Intermaitade", "Kera" (Keras), "RAN" (RNN?), "Managemen", "Pridection" in repo names.
14. LinkedIn durations are stale ("6 months" for a Jan 2026 start, now Sep 2026).

---

## 7. What this means for Phase 2

**Do not design a metrics-first layout until gap #1 is resolved.** If the numbers arrive, the
reference site's result-first card inversion is the right call and the strongest available
structure. If they do not, the honest alternative is a **systems-and-architecture-first** hierarchy
— lead with the *shape* of what he builds (ASR→LLM→TTS pipelines, hybrid retrieval with RRF,
bilingual ASR, Hijri↔Gregorian analytics) rather than outcomes. That is still distinctive, because
almost nobody else's portfolio shows architecture at that resolution.

**The real story is production systems at a working organisation**, not GitHub stars. The site
should be weighted accordingly: employment work first, public repos second.

---

# ADDENDUM — Metrics supplied by the user (2026-09-11)

Answers to the Phase 1 gate questions. **These replace the `METRIC MISSING` tags above.**

## 8. Confirmed numbers

| # | Claim | Number | Confidence |
|---|---|---|---|
| 1 | n8n / LangChain automation workflows | **~20 hours saved per week** | ✅ Strong. Clean, defensible, his own work. **Best headline number he has.** |
| 2 | Voice Agent | **10% of inbound calls handled autonomously** | ✅ Strong and honest. 10% is modest but real and verifiable. |
| 3 | Voice ordering system TTFC | **1.24 s for English** (working on parity for other languages without losing accuracy/quality) | ✅ Strong. **Note: this is NOT sub-second.** The CV says "targeting sub-second" — that framing is honest; do not upgrade it. |
| 4 | SMIT students | **50+ per batch at intake**, declining through the course | ✅ Resolved. Both CV and LinkedIn were true at different points. Use "50+ per batch". |
| 5 | Donations YoY (org-level) | **+32% vs last year**, via social media + call-centre outbound, noticed by his HOD and a trustee | ⚠️ **Attribution risk — see §9.1** |
| 6 | Qurbani / Ramazan YoY | **Flat** — no lift. Value delivered was *operational visibility*, not revenue | ✅ Honest. Ironically more credible than #5. |
| 7 | Shoe-shop automation seasonal revenue | **+20% in season** (Ramazan, Bakra Eid) | ⚠️ **Attribution risk — see §9.2** |
| 8 | RAG chatbot relevance improvement | **None — no concrete eval exists** | 🔴 **See §9.3. The CV overstates this.** |
| 9 | Pothole detector mAP | Not remembered | Drop the metric; the project stays or goes on other merits. |

## 9. Three claims that need care before they go on a page

### 9.1 The 32% donation figure — do not claim causation
Donations grew 32% YoY through social media and outbound call-centre activity. He built the
dashboard that gave leadership visibility into those operations. **He did not cause the 32%.**

- ❌ Never write: *"Drove a 32% increase in donations."*
- ✅ Defensible: *"Built the live operations dashboard leadership used to track donation and
  call-centre performance through a year in which donations grew 32%."*

An interviewer will ask "what was your contribution to that number?" The honest answer —
visibility and decision support — is still good. The inflated version collapses under one question.

### 9.2 The shoe-shop 20% — weak attribution, better metric available
Shoe retail revenue rises during Ramazan and Bakra Eid regardless of any automation. Attributing
a seasonal +20% to the receipt pipeline is not defensible.

**The real achievement is different and better:** the shop had *no database at all*. He built a
pipeline that reads **physical receipts and bills** and populates the website's product/stock
database. The defensible metrics are data-entry hours eliminated, catalogue accuracy, or
number of receipts processed — **`STILL NEEDED`**.

### 9.3 The CV contains a claim he cannot support 🔴
CV, internship bullet: *"Improved answer relevance by tuning chunking and retrieval, **validated
on a labeled eval set**."* He now states there is no concrete eval.

- This is the most senior-sounding line in the CV and it is the one most likely to be probed.
- **It will not appear on the portfolio.** Recommend he also soften it on the CV, or actually run
  an eval and earn the line back.

## 10. New project — Shoe Shop Receipt Automation (not on the CV)

Physical receipts and bills → extracted → website database updated. Built because the shop had
no database of its own.

**Why this matters more than he seems to think:** the CV claims OCR, OpenCV, and computer vision
as core competencies, and the *only* supporting artifact on GitHub is an undocumented pothole
detector. This project is **real computer vision solving a real business problem** — it closes
the largest claim-vs-proof gap in the whole corpus. **Worth developing into a full case study.**

`STILL NEEDED`: stack used (OCR engine? Gemini Vision? Tesseract? YOLO?), receipt volume,
accuracy, and whether any repo or screenshots exist.

## 11. Repository status — resolved

| Repo | Status |
|---|---|
| Call Center QA System | **In employer (Saylani) repos.** No public link. Case study only. |
| Qurbani Operations Dashboard | **In employer repos.** No public link. Case study only. |
| `CB_voice-agent` | **Stays private. URL cannot be changed.** Case study, no link. |
| `whatsapp-new` | Contributed via branches. **Not on his account; not findable publicly.** Owner/org unknown — `STILL NEEDED` if it is to be referenced at all. |
| Repos with no README | **User's instruction: write the content later from the CV.** Tracked as a Phase 3/4 task, not a blocker. |

**Correction to the Phase 1 finding:** `CB_voice-agent`'s clone URL pointing at
`Furqan2004/Resturant-Agent` is **not plagiarism** — he contributed to that project on a branch.
The earlier flag was wrong and is withdrawn.

## 12. Revised gate status

🟢 **Blocking gap #1 (no outcome numbers) is RESOLVED.** There are now enough defensible figures
to support the result-first card inversion: **20 hrs/week**, **10% of calls**, **1.24 s**,
**50+ students**, **22K chunks / 200 filings**, **40+ engineers**, **3 years of data**.

🟢 **Blocking gap #2 (missing repos) is RESOLVED** — employer-owned, so both become link-less case
studies. That is a normal and respectable pattern for production work.

🟢 **Blocking gap #3 (employer permission) is RESOLVED — see `DECISIONS.md` D7.**
The user answered at the Phase 1 gate: **text, metrics and original architecture diagrams are
permitted; screenshots of internal UI and internal data are not; the employer may be named.**

> *This paragraph previously said the gap was unresolved. It was written before the answer arrived
> and was never updated — a stale line that a Phase 2.6 critique correctly flagged as a blocker.
> `DECISIONS.md` is the authority on decisions; this file defers to it.*
