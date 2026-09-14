/** Source: docs/CONTENT.md and its addendum; DECISIONS.md D7, D9, D21, D23. */
export type Project = {
  slug: string;
  title: string;
  category: 'AI, Software & ML' | 'Data Engineering & Analytics';
  kind: 'voice' | 'retrieval' | 'analytics' | 'automation';
  summary: string;
  organization: string;
  status: string;
  visibility: 'private' | 'public';
  repo?: string;
  featured: boolean;
  stack: string[];
  lead: string;
  leadLabel: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  outcomes: string[];
  limitations: string[];
  demo?: 'voice' | 'retrieval';
  related: string[];
};

export const projects: Project[] = [
  {
    slug: 'voice-agent',
    title: 'Inbound Voice Agent',
    category: 'AI, Software & ML',
    kind: 'voice',
    summary: 'A production voice agent handling 10% of inbound calls autonomously at Saylani.',
    organization: 'Saylani Welfare International Trust',
    status: 'Production',
    visibility: 'private',
    featured: true,
    stack: ['Speech-to-text', 'LLM orchestration'],
    lead: '10%',
    leadLabel: 'of inbound calls handled autonomously',
    role: 'AI Engineer — built the employer voice agent for inbound call handling.',
    problem: 'Inbound calls required human agents to carry each conversation. The opportunity was to handle a portion of that workload through a real-time voice system.',
    solution: 'Combined real-time speech recognition with LLM reasoning to handle inbound conversations autonomously. The system operates within Saylani’s call workflow.',
    architecture: ['Inbound call', 'Speech recognition', 'LLM reasoning', 'Voice interaction'],
    decisions: [
      { title: 'Work With Live Speech', body: 'The system processes speech in real time so the model can participate in a call rather than analyze a recording afterward.' },
      { title: 'Measure Autonomous Handling', body: 'The reported outcome is the share of inbound calls handled autonomously: a concrete measure of the workload the system takes on.' },
    ],
    outcomes: ['10% of inbound calls handled autonomously, as reported by the engineer.'],
    limitations: [
      'The measurement window and total call volume are not provided in the source material.',
      'No latency benchmark is published for this employer system. The separate ordering project’s English timing does not apply here.',
      'Employer source code, internal screens and call data remain private. The diagram and walkthrough are original illustrations.',
    ],
    demo: 'voice',
    related: ['call-quality', 'voice-ordering'],
  },
  {
    slug: 'call-quality',
    title: 'Call Quality Analyzer',
    category: 'AI, Software & ML',
    kind: 'voice',
    summary: 'Urdu and English call analysis with rule-based scoring, audit records and a manual review queue.',
    organization: 'Saylani Welfare International Trust',
    status: 'Production',
    visibility: 'private',
    featured: true,
    stack: ['Python', 'FastAPI', 'OpenAI', 'SQLite', 'Streamlit'],
    lead: 'Urdu + English',
    leadLabel: 'bilingual call quality analysis',
    role: 'AI Engineer — built the asynchronous transcription and quality analysis pipeline.',
    problem: 'Reviewing inbound recordings manually makes it difficult to apply consistent quality checks across Urdu and English conversations.',
    solution: 'An asynchronous FastAPI pipeline transcribes recordings, evaluates compliance with OpenAI models and applies rule-based scores. A Streamlit dashboard brings results and a manual review queue together.',
    architecture: ['Call recordings', 'Bilingual transcription', 'Compliance + scoring', 'Audit records', 'Review dashboard'],
    decisions: [
      { title: 'Separate Evaluation and Scoring', body: 'Model-based compliance evaluation sits alongside a rule-based scoring engine, making the scoring rules explicit.' },
      { title: 'Keep a Review Trail', body: 'JSON audit records and a queryable SQLite index retain analysis outputs. Duplicate detection and a manual review queue support the review workflow.' },
    ],
    outcomes: [
      'A working pipeline analyzes real production call recordings in Urdu and English.',
      'Quality results, audit records and a manual review queue are available through the dashboard.',
    ],
    limitations: [
      'Call volume, agreement with human reviewers and review hours saved have not been quantified in the supplied evidence.',
      'Employer source code, recordings and internal dashboard screenshots are not public.',
    ],
    related: ['voice-agent', 'qurbani-analytics'],
  },
  {
    slug: 'alphalens',
    title: 'AlphaLens',
    category: 'AI, Software & ML',
    kind: 'retrieval',
    summary: 'A financial-filings RAG system in progress, combining hybrid retrieval, reranking and cited synthesis.',
    organization: 'Independent project',
    status: 'In progress',
    visibility: 'public',
    repo: 'https://github.com/JamilRaza001/alphalens',
    featured: true,
    stack: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'pgvector', 'Next.js'],
    lead: '~22K',
    leadLabel: 'chunks across 200 filings · corpus size',
    role: 'Project developer — designing and implementing retrieval and synthesis over SEC filings.',
    problem: 'A question about company filings can require evidence spread across several documents. A useful response needs to retrieve that evidence and preserve its citations through synthesis.',
    solution: 'The five-stage LangGraph architecture plans a query, retrieves passages with vector and lexical search, reranks candidates, evaluates the retrieved evidence and synthesizes a cited response. The system is still being built and is not presented as a running service.',
    architecture: ['Plan', 'Hybrid retrieve', 'Rerank', 'Evaluate', 'Synthesize + cite'],
    decisions: [
      { title: 'Combine Two Retrieval Signals', body: 'pgvector HNSW and PostgreSQL tsvector provide semantic and lexical candidates. Reciprocal Rank Fusion combines their rankings before cross-encoder reranking.' },
      { title: 'Design for Embedding Quotas', body: 'The architecture includes Jina v3 and a local nomic embedding fallback. Both use 768 dimensions; retrieval behavior across backends still needs validation.' },
      { title: 'Keep Evidence Visible', body: 'Multi-document synthesis is designed to cite the passages behind the response, with a dedicated evaluation stage before synthesis.' },
    ],
    outcomes: [
      'The documented corpus contains approximately 22,000 chunks from 200 SEC 10-K and 10-Q filings.',
      'Hybrid retrieval, rank fusion, reranking and embedding fallback are documented in the project architecture and implementation.',
    ],
    limitations: [
      'In progress: the engineer confirmed the system is not running. The public README identifies early setup work.',
      'Corpus size is a dataset characteristic, not a retrieval-quality or answer-accuracy result.',
      'The approximately 15-second answer time is a design target, not a measured benchmark. No measured end-to-end performance is claimed.',
      'The portfolio walkthrough uses a deterministic illustrative example, not AlphaLens inference or a live retrieval result.',
    ],
    demo: 'retrieval',
    related: ['call-quality', 'croplogic'],
  },
  {
    slug: 'qurbani-analytics',
    title: 'Qurbani Analytics',
    category: 'Data Engineering & Analytics',
    kind: 'analytics',
    summary: 'Three years of operational data, reconciled for reporting across Hijri and Gregorian calendars.',
    organization: 'Saylani Welfare International Trust',
    status: 'Production',
    visibility: 'private',
    featured: false,
    stack: ['Python', 'Streamlit', 'Plotly', 'Docker'],
    lead: '3 years',
    leadLabel: 'of multi-source operational data',
    role: 'Developer — built the ETL pipeline and operations dashboard.',
    problem: 'Seasonal operations span multiple sources and calendar systems. Comparing the same Gregorian dates alone does not align activity around a Hijri-calendar event.',
    solution: 'An ETL pipeline normalizes and deduplicates three years of source data. Hijri–Gregorian conversion supports seasonal comparisons, while five chart modules and KPI views expose the operational picture.',
    architecture: ['Source records', 'Normalize + deduplicate', 'Align calendars', 'Build reporting data', 'Operational views'],
    decisions: [
      { title: 'Align Seasonal Comparisons', body: 'Hijri–Gregorian date conversion gives year-on-year analysis a calendar basis that reflects the timing of Qurbani operations.' },
      { title: 'Make Data Rebuilding Part of the Tool', body: 'The application supports an in-app pipeline rebuild. Deduplicated merges use atomic file replacement, and Docker packages the dashboard environment.' },
      { title: 'Normalize Source Conventions', body: 'Regex-based country inference and price-to-label mapping reconcile inconsistent source representations before reporting.' },
    ],
    outcomes: [
      'Three years of multi-source records are available through five chart modules and operational KPI views.',
      'The delivered value is operational visibility and reporting; Qurbani and Ramazan year-on-year results were reported as flat.',
    ],
    limitations: [
      'Data volume, stakeholder count and reporting time saved are not quantified in the supplied material.',
      'No donation or revenue increase is attributed to the dashboard.',
      'Employer source code, internal data and dashboard screenshots remain private.',
    ],
    related: ['receipt-automation', 'call-quality'],
  },
  {
    slug: 'receipt-automation',
    title: 'Receipt to Inventory',
    category: 'Data Engineering & Analytics',
    kind: 'automation',
    summary: 'A pipeline that turns physical shoe-shop receipts and bills into website product and stock records.',
    organization: 'Shoe retail project',
    status: 'Built · validation pending',
    visibility: 'private',
    featured: false,
    stack: [],
    lead: 'Paper → data',
    leadLabel: 'receipts and bills into a product database',
    role: 'Developer — built the receipt-to-database pipeline for a shoe shop.',
    problem: 'The shop had physical receipts and bills but no database of its own. Its website needed structured product and stock records.',
    solution: 'Built a pipeline that reads physical receipts and bills, extracts their information and populates the website’s product and stock database.',
    architecture: ['Physical receipts + bills', 'Extract information', 'Product + stock records', 'Website database'],
    decisions: [
      { title: 'Start With the Records the Shop Has', body: 'Physical receipts and bills provide the input for building the digital catalogue and stock database.' },
      { title: 'Connect Extraction to an Operational Use', body: 'The output populates the website database, turning extracted information into product and stock records.' },
    ],
    outcomes: ['Established a receipt-to-database workflow for a shop that previously had no database.'],
    limitations: [
      'The extraction engine, application stack and database technology have not been confirmed.',
      'Receipt volume, extraction accuracy, hours saved and ongoing deployment status are not yet documented.',
      'No public repository or approved screenshots have been supplied. Seasonal revenue changes are not attributed to this work.',
    ],
    related: ['qurbani-analytics', 'croplogic'],
  },
  {
    slug: 'voice-ordering',
    title: 'Voice Ordering',
    category: 'AI, Software & ML',
    kind: 'voice',
    summary: 'A restaurant voice-ordering collaboration with streaming audio, interruption handling and isolated sessions.',
    organization: 'Restaurant ordering collaboration',
    status: 'Built · multilingual tuning',
    visibility: 'private',
    featured: false,
    stack: ['Python', 'FastAPI', 'WebSockets', 'OpenAI Agents SDK', 'SQLite'],
    lead: '1.24 s',
    leadLabel: 'English time to first chunk · engineer-reported',
    role: 'Contributing engineer — contributed through a branch to the restaurant voice-ordering project.',
    problem: 'A voice-ordering conversation needs responsive speech output, support for interruptions and separation between simultaneous customer sessions.',
    solution: 'The project connects speech recognition, LLM reasoning and speech synthesis over WebSockets. It supports barge-in, isolates per-session state with Python ContextVars and persists conversation memory through async SQLite.',
    architecture: ['Customer speech', 'Speech recognition', 'Order conversation', 'Speech synthesis', 'Streamed response'],
    decisions: [
      { title: 'Support Interruption', body: 'Barge-in allows the customer to interrupt the voice response instead of waiting for playback to finish.' },
      { title: 'Separate Session State', body: 'ContextVars isolates per-session context, alongside SQLite-backed conversation memory using asynchronous database access.' },
      { title: 'Track the First Audible Response', body: 'Time to first chunk captures an early part of the interaction delay. The reported English value is 1.24 seconds, while work continues on other languages.' },
    ],
    outcomes: ['The engineer reports English time to first chunk of 1.24 seconds for this project.'],
    limitations: [
      'The measurement setup, sample count and timing distribution are not supplied. This is not an end-to-end latency figure or a sub-second result.',
      'Multilingual parity remains in progress; production deployment is not confirmed.',
      'The README and branch naming disagree on the speech-recognition provider, so the current provider is not asserted here.',
      'This was a collaboration, and the source does not itemize ownership of each component. The repository remains private.',
    ],
    related: ['voice-agent', 'call-quality'],
  },
  {
    slug: 'croplogic',
    title: 'CropLogic',
    category: 'AI, Software & ML',
    kind: 'analytics',
    summary: 'Collaborative agricultural ML work combining sensor records and satellite imagery for crop and irrigation prediction.',
    organization: 'Omdena',
    status: 'Research collaboration',
    visibility: 'private',
    featured: false,
    stack: ['Python', 'scikit-learn', 'XGBoost', 'PyTorch', 'Hugging Face'],
    lead: 'Sensors + imagery',
    leadLabel: 'agricultural data preparation and model comparison',
    role: 'AI/ML Engineer — contributed preprocessing and model comparison work within Omdena’s global CropLogic team.',
    problem: 'Crop and irrigation prediction must account for missing sensor observations, limited ground-truth labels and the constraints of low-connectivity rural environments.',
    solution: 'Contributed pipelines combining IoT sensor data with satellite multispectral imagery, including NDVI and EVI features. Work covered missing-data handling, structured preprocessing and comparisons between classical ML and vision baselines.',
    architecture: ['Sensors + satellite imagery', 'Impute missing observations', 'Preprocess features', 'Compare model baselines', 'Crop + irrigation prediction'],
    decisions: [
      { title: 'Handle Incomplete Sensor Histories', body: 'Interpolation and rolling-window imputation address missing readings within scikit-learn preprocessing workflows.' },
      { title: 'Work With Limited Labels', body: 'Transfer learning, targeted augmentation and stratified sampling were used to address limited ground-truth data.' },
      { title: 'Compare Model Families', body: 'XGBoost and scikit-learn approaches were benchmarked against PyTorch and Hugging Face vision baselines, with lightweight architectures considered for rural connectivity constraints.' },
    ],
    outcomes: [
      'Contributed preprocessing pipelines and model-comparison work to a global agricultural AI collaboration.',
      'Worked asynchronously with a team of more than 40 members; that figure describes the collaboration, not individual project ownership.',
    ],
    limitations: [
      'No model scores, deployment evidence or farm-coverage figures are supplied, so none are claimed.',
      'This case study describes the engineer’s contribution, not sole ownership of CropLogic.',
      'No public source repository has been supplied for this case study.',
    ],
    related: ['alphalens', 'qurbani-analytics'],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
