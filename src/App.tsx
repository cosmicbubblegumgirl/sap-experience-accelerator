import {
  Activity,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Code2,
  FileCheck2,
  Gauge,
  ImagePlus,
  Layers3,
  LayoutDashboard,
  MessageSquare,
  MessageSquarePlus,
  Play,
  RefreshCw,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  Upload,
  UserRound,
  UsersRound,
  Zap,
} from "lucide-react";
import {
  type ChangeEvent,
  type ComponentType,
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

type TabId =
  | "dashboard"
  | "roadmap"
  | "projects"
  | "sandboxes"
  | "community"
  | "toolkit"
  | "study";

type IconType = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type AvatarKind = "preset" | "upload";

type Profile = {
  username: string;
  role: string;
  avatar: string;
  avatarKind: AvatarKind;
  joinedAt: string;
};

type Attachment = {
  name: string;
  type: string;
  dataUrl: string;
};

type Comment = {
  id: string;
  author: string;
  role: string;
  avatar: string;
  avatarKind: AvatarKind;
  message: string;
  createdAt: string;
};

type CommunityPost = {
  id: string;
  author: string;
  role: string;
  avatar: string;
  avatarKind: AvatarKind;
  type: string;
  week: string;
  project: string;
  mood: string;
  confidence: number;
  message: string;
  tags: string;
  link: string;
  attachment?: Attachment;
  createdAt: string;
  comments: Comment[];
};

type WeekPlan = {
  id: string;
  week: string;
  title: string;
  goal: string;
  outputs: string[];
  rhythm: string;
};

type ProjectBrief = {
  id: string;
  title: string;
  level: string;
  time: string;
  outcome: string;
  brief: string;
  sequence: string[];
  acceptance: string[];
  deliverables: string[];
  stretch: string[];
  portfolio: string;
};

type Template = {
  title: string;
  fields: string[];
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  reason: string;
};

type Flashcard = {
  front: string;
  back: string;
};

type OrderResult = {
  accepted: boolean;
  correlationId: string;
  errors: string[];
  canonical?: Record<string, string | number>;
  target?: Record<string, string | number>;
};

type FileRow = {
  row: number;
  po: string;
  supplier: string;
  product: string;
  quantity: number;
  status: "accepted" | "rejected";
  reason: string;
};

type EventItem = {
  id: string;
  product: string;
  stock: number;
  threshold: number;
  status: string;
  createdAt: string;
};

type ProxyResult = {
  status: number;
  title: string;
  detail: string;
  correlationId: string;
};

const baseUrl = import.meta.env.BASE_URL;

const navItems: { id: TabId; label: string; icon: IconType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "roadmap", label: "Roadmap", icon: Gauge },
  { id: "projects", label: "Project Lab", icon: BriefcaseBusiness },
  { id: "sandboxes", label: "Sandboxes", icon: Code2 },
  { id: "community", label: "Community", icon: UsersRound },
  { id: "toolkit", label: "Toolkit", icon: ClipboardList },
  { id: "study", label: "Study Bank", icon: BookOpen },
];

const avatarPresets = [
  {
    id: "orbit",
    label: "Orbit",
    value: "linear-gradient(135deg, #17cfc4, #f56f52 54%, #f7c75e)",
  },
  {
    id: "signal",
    label: "Signal",
    value: "linear-gradient(135deg, #245cdb, #23d1a5 50%, #ffe28a)",
  },
  {
    id: "studio",
    label: "Studio",
    value: "linear-gradient(135deg, #101b1f, #c8ffef 48%, #ff917c)",
  },
  {
    id: "mint",
    label: "Mint",
    value: "linear-gradient(135deg, #d9fff7, #23a7a0 45%, #27313c)",
  },
  {
    id: "coral",
    label: "Coral",
    value: "linear-gradient(135deg, #ff745f, #ffd166 48%, #124a50)",
  },
  {
    id: "graphite",
    label: "Graphite",
    value: "linear-gradient(135deg, #172124, #55636f 52%, #f0b35d)",
  },
];

const roadmap: WeekPlan[] = [
  {
    id: "w1",
    week: "Week 1",
    title: "Orient and diagnose",
    goal: "Understand the programme, team, access model and baseline skills.",
    outputs: [
      "Access checklist completed",
      "Personal evidence folder created",
      "Skills baseline logged",
      "Two discovery questions prepared",
    ],
    rhythm: "Reduce friction, listen carefully and capture every assumption.",
  },
  {
    id: "w2",
    week: "Week 2",
    title: "Discover and design",
    goal: "Turn a client problem into testable scope and architecture.",
    outputs: [
      "Problem statement approved",
      "As-is and to-be process mapped",
      "Interface contract drafted",
      "Decision log opened",
    ],
    rhythm: "Ask outcome, people, process, data, exception and acceptance questions.",
  },
  {
    id: "w3",
    week: "Week 3",
    title: "Build the vertical slice",
    goal: "Prove one end-to-end happy path early.",
    outputs: [
      "Mock data prepared",
      "Core mapping working",
      "First demo script drafted",
      "Configuration values externalised",
    ],
    rhythm: "Build the smallest slice that proves source, transform, target and traceability.",
  },
  {
    id: "w4",
    week: "Week 4",
    title: "Test and integrate",
    goal: "Move beyond the happy path and prove contracts.",
    outputs: [
      "Positive and negative tests run",
      "Duplicate and outage cases covered",
      "Defect report template used",
      "Evidence screenshots sanitised",
    ],
    rhythm: "Trace every requirement to at least one test and one result.",
  },
  {
    id: "w5",
    week: "Week 5",
    title: "Harden and operate",
    goal: "Make the solution supportable and change-ready.",
    outputs: [
      "Monitoring plan written",
      "Runbook drafted",
      "Replay rules documented",
      "Readiness risks updated",
    ],
    rhythm: "Think like the person who gets the alert after the demo is over.",
  },
  {
    id: "w6",
    week: "Week 6",
    title: "Demo and package",
    goal: "Earn acceptance and convert the work into credible evidence.",
    outputs: [
      "Five-minute demo recorded",
      "Portfolio case study drafted",
      "Handover pack completed",
      "Retrospective action chosen",
    ],
    rhythm: "Lead with business outcome, then show the technical proof.",
  },
  {
    id: "w7",
    week: "Week 7",
    title: "Position your value",
    goal: "Create targeted career material from the evidence.",
    outputs: [
      "Role pathway chosen",
      "CV bullets rewritten",
      "LinkedIn headline refined",
      "Portfolio page outline ready",
    ],
    rhythm: "Replace broad claims with artefacts, decisions and measurable proof.",
  },
  {
    id: "w8",
    week: "Week 8",
    title: "Interview and communicate",
    goal: "Explain business and technical decisions naturally.",
    outputs: [
      "Three interview stories recorded",
      "Project walkthrough rehearsed",
      "Troubleshooting answer sharpened",
      "Limitation and next step stated",
    ],
    rhythm: "Practise one clean opening sentence and one concrete evidence point.",
  },
  {
    id: "w9",
    week: "Week 9",
    title: "Network and create opportunity",
    goal: "Use the portfolio to start professional conversations.",
    outputs: [
      "Networking list prepared",
      "Two feedback messages sent",
      "Application tracker updated",
      "Portfolio link reviewed",
    ],
    rhythm: "Ask specific questions that make it easy for professionals to respond.",
  },
  {
    id: "w10",
    week: "Week 10",
    title: "Launch and sustain",
    goal: "Apply strategically and keep momentum after the programme.",
    outputs: [
      "Four-week application cadence set",
      "Final readiness checklist completed",
      "Next project selected",
      "Celebration evidence captured",
    ],
    rhythm: "Keep the system alive after the programme by choosing the next small build.",
  },
];

const projectBriefs: ProjectBrief[] = [
  {
    id: "P0",
    title: "Tenant-free Integration Discovery Sprint",
    level: "Foundation",
    time: "1-2 days",
    outcome: "Produce a complete integration design with generated data and public tools.",
    brief:
      "A small organisation manually copies online order data into an ERP-like system. Before tenant access arrives, the team must prove the process, risks and contract.",
    sequence: [
      "Interview the fictional process owner and record facts, assumptions and constraints.",
      "Map the manual flow and the automated future flow with control points.",
      "Define canonical order JSON, an API contract and a 15-field mapping.",
      "Choose sync or async processing and capture the trade-off.",
      "Create ten tests that include happy, missing, invalid, duplicate, timeout and recovery cases.",
      "Present a five-minute design review and update from feedback.",
    ],
    acceptance: [
      "Every requirement has an acceptance criterion.",
      "No production or personal data is used.",
      "Architecture shows systems, protocol, trust boundary and monitoring.",
      "Test cases trace to requirements.",
      "Assumptions have owners and dates.",
    ],
    deliverables: [
      "Project charter",
      "As-is and to-be process diagrams",
      "Architecture",
      "Interface specification",
      "Mapping",
      "Test plan",
      "Decision record",
      "Demo pack",
    ],
    stretch: ["Postman mock collection", "OpenAPI draft", "Retry and recovery model"],
    portfolio:
      "I converted an ambiguous manual order process into a testable integration design with contract, mapping, security assumptions and recovery scenarios.",
  },
  {
    id: "P1",
    title: "Product Catalogue API Synchronisation",
    level: "Core",
    time: "3-5 days",
    outcome: "Build or simulate a clean product catalogue response from an OData-style source.",
    brief:
      "An online shop needs approved SAP-like product data exposed as a smaller REST contract with ZAR prices, inactive products removed and traceable errors.",
    sequence: [
      "Define source and target contracts, pagination assumptions and product ownership.",
      "Configure HTTP or OData sender/receiver pattern and externalise endpoints.",
      "Use select and filter options where supported.",
      "Transform to a canonical product and then a consumer response.",
      "Return controlled errors without leaking backend details.",
      "Test empty, inactive, missing price, pagination, special character, unauthorised and rate-limit cases.",
    ],
    acceptance: [
      "Only active products return.",
      "Prices preserve currency and two decimals.",
      "Response contains a correlation ID.",
      "No secrets appear in logs.",
      "Pagination and limits are documented.",
    ],
    deliverables: [
      "Flow export or simulation",
      "Source and target samples",
      "Mapping",
      "API contract",
      "Test evidence",
      "Operations note",
      "Portfolio case study",
    ],
    stretch: ["API proxy", "Read cache design", "p50 and p95 measurement"],
    portfolio:
      "I designed and tested an API-led product synchronisation that transformed product records into a consumer contract and handled authentication, pagination and failure responses.",
  },
  {
    id: "P2",
    title: "Supplier Purchase Order File Intake",
    level: "Core",
    time: "4-6 days",
    outcome: "Create a resilient file integration with validation, transformation and reconciliation.",
    brief:
      "A supplier drops CSV purchase orders on SFTP. The target expects XML and rejected records need safe reasons and control totals.",
    sequence: [
      "Agree filename pattern, schedule, delimiter, encoding and completion rule.",
      "Poll securely and avoid re-reading in-progress files.",
      "Convert CSV to canonical structure and validate mandatory fields.",
      "Choose whole-file or record-level rejection with consequences.",
      "Archive after controlled completion and quarantine failures.",
      "Test quoted commas, embedded newlines, duplicate files, partial invalidity, empty files and outages.",
    ],
    acceptance: [
      "No file is processed twice.",
      "Record counts reconcile input, accepted and rejected rows.",
      "Rejected items contain safe, actionable reasons.",
      "Security choices are documented.",
      "Replay cannot duplicate accepted orders.",
    ],
    deliverables: [
      "Flow or simulation",
      "CSV and XML samples",
      "Mapping",
      "File operating agreement",
      "Test report",
      "Reconciliation template",
      "Runbook",
    ],
    stretch: ["PGP design", "Queue-backed target delivery", "Daily control-total report"],
    portfolio:
      "I built a controlled SFTP-to-XML purchase-order pipeline with duplicate prevention, row validation, reconciliation and safe recovery.",
  },
  {
    id: "P3",
    title: "Secure Order Status API Proxy",
    level: "Intermediate",
    time: "3-5 days",
    outcome: "Protect a backend service with a governed API and clear consumer contract.",
    brief:
      "Partners need order status without direct backend access. The proxy must apply authentication, traffic protection, safe errors and analytics.",
    sequence: [
      "Define resources, methods, response fields and versioning policy.",
      "Create a proxy to a mock or backend service and remove sensitive headers.",
      "Apply authentication, authorisation, quota and threat controls.",
      "Map backend faults to a safe error envelope.",
      "Publish consumer documentation and onboarding steps.",
      "Test allowed, denied, invalid path, backend failure, quota and hostile payload cases.",
    ],
    acceptance: [
      "Backend is not directly exposed.",
      "Unauthorised calls are rejected.",
      "Traffic controls demonstrably apply.",
      "Errors do not reveal secrets or hostnames.",
      "Usage and error analytics are visible.",
    ],
    deliverables: [
      "Proxy or policy design",
      "OpenAPI spec",
      "Consumer guide",
      "Security model",
      "Test report",
      "Analytics evidence",
      "Decision record",
    ],
    stretch: ["Safe response cache", "Developer-product onboarding", "Contract tests"],
    portfolio:
      "I governed an order-status service through API Management with access control, rate protection, error normalisation, documentation and analytics.",
  },
  {
    id: "P4",
    title: "Event-Driven Low-Stock Notification",
    level: "Intermediate",
    time: "4-6 days",
    outcome: "Design or build a pub/sub flow with durable consumption and duplicate control.",
    brief:
      "Inventory drops below a threshold and purchasing plus reporting must react independently without repeated actions.",
    sequence: [
      "Define the event, producer, consumers, topic and minimal schema.",
      "Publish generated low-stock events and route to separate queues.",
      "Implement or simulate notification and audit consumers.",
      "Use event ID plus business key for duplicate handling.",
      "Define acknowledgement, retry, recovery and ownership.",
      "Test duplicate, out-of-order, poison event, outage and burst-volume cases.",
    ],
    acceptance: [
      "Producer is decoupled from consumer endpoints.",
      "Consumers can fail and recover independently.",
      "Duplicate action is prevented.",
      "Event schema and version are documented.",
      "Recovery ownership and alerting are defined.",
    ],
    deliverables: [
      "Event catalogue entry",
      "Topic and queue diagram",
      "Event schema",
      "Producer and consumer flow",
      "Test evidence",
      "Operations runbook",
      "Demo",
    ],
    stretch: ["CloudEvents-style metadata", "Consumer lag measure", "Schema evolution case"],
    portfolio:
      "I designed an event-driven inventory workflow with independently scalable consumers, durable queues, duplicate control and recovery handling.",
  },
  {
    id: "P5",
    title: "New Employee Access Approval Workflow",
    level: "Intermediate",
    time: "4-6 days",
    outcome: "Model an auditable approval workflow with rules, SLA and privacy controls.",
    brief:
      "New employees wait days for access because requests move through email. HR data should trigger governed manager and security approval.",
    sequence: [
      "Map the current email flow and quantify delays.",
      "Define trigger data, roles, approval matrix and segregation checks.",
      "Build a form/workflow or clickable simulation.",
      "Call mock APIs for employee data and approved access requests.",
      "Add reminders, escalation, rejection reasons and audit trail.",
      "Test missing manager, high-risk role, rejection, no response, duplicate hire and withdrawal.",
    ],
    acceptance: [
      "No access is created before required approvals.",
      "High-risk roles take an enhanced path.",
      "Decisions and timestamps are auditable.",
      "Personal data is minimised.",
      "SLA and escalation are visible.",
    ],
    deliverables: [
      "Process diagrams",
      "Decision table",
      "Workflow or simulation",
      "API contract",
      "Test report",
      "Privacy assessment",
      "Value estimate",
    ],
    stretch: ["KPI dashboard", "Leaver revocation model", "BPMN-aligned import"],
    portfolio:
      "I redesigned a manual onboarding approval into an auditable workflow with decision rules, SLA escalation, API integration and privacy controls.",
  },
  {
    id: "P6",
    title: "Quantum Cupcake Creations Order-to-Cash Capstone",
    level: "Capstone",
    time: "1-2 weeks",
    outcome: "Create a portfolio-ready capstone joining process, API, integration, event and testing skills.",
    brief:
      "Quantum Cupcake Creations receives custom and bulk orders through web, chat and events. The capstone captures orders once, validates products and pricing, tracks fulfilment and exposes safe status.",
    sequence: [
      "Define personas and channels, then choose one minimum viable channel.",
      "Model quote-to-order-to-fulfilment-to-invoice status.",
      "Create product, customer and order canonical models with generated South African data.",
      "Build or simulate inbound Order API to validation, mapping and ERP mock.",
      "Publish or simulate order events and expose a safe status endpoint.",
      "Add reconciliation, duplicate control, monitoring, runbook and business-value dashboard.",
      "Package a public case study on the Quantum Cupcake Creations website.",
    ],
    acceptance: [
      "One source order creates one internal order.",
      "Bulk and custom price rules trace to decisions.",
      "Status changes are observable without backend exposure.",
      "Generated data only.",
      "End-to-end, failure and recovery tests pass.",
      "Public case study labels simulation and contribution clearly.",
    ],
    deliverables: [
      "Business case",
      "Process maps",
      "Architecture",
      "API and event contracts",
      "Flow or simulation",
      "Mapping",
      "Test pack",
      "Runbook",
      "Demo video",
      "Case study",
    ],
    stretch: ["Order status mini portal", "Event replay drill", "Portfolio-ready metrics"],
    portfolio:
      "I built a simulated order-to-cash integration concept for Quantum Cupcake Creations with API validation, mapping, duplicate control, event status and portfolio-ready evidence.",
  },
];

const templates: Template[] = [
  {
    title: "One-page Project Charter",
    fields: [
      "Project, client and date",
      "Business problem",
      "Outcome and success measures",
      "Primary users and stakeholders",
      "In scope",
      "Out of scope",
      "Systems and business objects",
      "Constraints and sensitive data",
      "Top risks, assumptions and dependencies",
      "Definition of Done",
      "Team roles and decision owner",
    ],
  },
  {
    title: "Requirements Traceability",
    fields: [
      "ID",
      "Requirement",
      "Acceptance criterion",
      "Priority",
      "Design or build reference",
      "Test reference",
      "Status",
    ],
  },
  {
    title: "Interface Specification",
    fields: [
      "Interface ID, version and owner",
      "Business trigger and purpose",
      "Source, target and environments",
      "Pattern and protocol",
      "Authentication and authorisation",
      "Request, response and error contract",
      "Mapping and lookups",
      "Volume, latency and availability",
      "Idempotency and ordering",
      "Retry, recovery and replay",
      "Correlation, monitoring and alerting",
      "Retention, privacy and audit",
    ],
  },
  {
    title: "Test Case Sheet",
    fields: [
      "ID",
      "Requirement reference",
      "Precondition and input",
      "Steps",
      "Expected result",
      "Actual evidence",
      "Result",
    ],
  },
  {
    title: "Defect Report",
    fields: [
      "Defect ID, severity and status",
      "Requirement and test reference",
      "Environment, version and time",
      "Observable symptom",
      "Business impact",
      "Steps and sanitised input",
      "Expected versus actual",
      "Evidence or correlation ID",
      "Root cause",
      "Fix and prevention",
    ],
  },
  {
    title: "Weekly Status Update",
    fields: [
      "Overall status and reason",
      "Outcome completed this week",
      "Evidence links",
      "Next measurable outcome",
      "Decisions needed",
      "Risks, issues and dependencies",
      "Help requested, owner and date",
      "Schedule or scope change",
    ],
  },
  {
    title: "Demo Script",
    fields: [
      "0:00 user, problem and success measure",
      "0:30 architecture and scope",
      "1:00 happy path and business result",
      "2:30 failure or duplicate and monitoring",
      "3:30 tests and controls",
      "4:15 outcome, limitation and next step",
    ],
  },
  {
    title: "Runbook",
    fields: [
      "Purpose and business impact",
      "Owners, support hours and escalation",
      "Normal schedule, volume and latency",
      "Search by business or correlation ID",
      "Dashboards and alert thresholds",
      "Common errors and diagnostics",
      "Retry, replay and duplicate protection",
      "Reconciliation and closure",
      "Credential or certificate expiry owner",
      "Privacy, retention and evidence handling",
    ],
  },
];

const flashcards: Flashcard[] = [
  {
    front: "What are the five questions behind most SAP tasks?",
    back: "Outcome, people/process/systems/data, source of truth, exception behaviour and how the solution is secured, tested, monitored, supported and changed.",
  },
  {
    front: "What makes an integration design credible before tenant access?",
    back: "Discovery notes, process maps, generated data, contracts, mappings, tests, assumptions, diagrams and a clear simulation label.",
  },
  {
    front: "Why use a correlation ID?",
    back: "It connects messages, logs and evidence across source, integration layer and receiver.",
  },
  {
    front: "What should a blocker update contain?",
    back: "Observable error, checks already done, impact, help needed, owner and next update time.",
  },
  {
    front: "What does clean core mean in practice?",
    back: "Keep ERP changes governed and upgrade-friendly, using released interfaces and approved extension patterns where possible.",
  },
  {
    front: "What proves a file interface completed correctly?",
    back: "Input, accepted and rejected counts reconcile, errors are safe and actionable, and replay cannot duplicate accepted work.",
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "A tile is missing in an Integration Suite subaccount. What should be checked first?",
    options: [
      "Laptop screen brightness",
      "Account context, entitlement, quota, provisioning and roles",
      "Portfolio headline",
      "The project logo",
    ],
    answer: 1,
    reason: "Access issues often come from account, service availability and assigned permissions.",
  },
  {
    id: "q2",
    question: "A POST is retried after a timeout. What is the main business risk?",
    options: [
      "A duplicate target record",
      "A smaller payload",
      "A new role collection",
      "A faster demo",
    ],
    answer: 0,
    reason: "The first request may have succeeded even though the response was lost.",
  },
  {
    id: "q3",
    question: "Which pattern best decouples a source from temporary target downtime?",
    options: ["Direct database edit", "Durable queue", "Manual screenshot", "Bigger timeout only"],
    answer: 1,
    reason: "A queue can hold accepted work until the receiver recovers.",
  },
  {
    id: "q4",
    question: "Which test proves repeated processing will not create a second order?",
    options: ["Duplicate/idempotency test", "Font test", "Calendar test", "Portfolio test"],
    answer: 0,
    reason: "Use the same stable business key and verify there is only one business effect.",
  },
  {
    id: "q5",
    question: "What is the safest public portfolio data?",
    options: [
      "Production customer records",
      "Generated and clearly labelled sample data",
      "Access tokens",
      "Private tenant screenshots",
    ],
    answer: 1,
    reason: "Generated or sanitised data protects confidentiality while still showing competence.",
  },
  {
    id: "q6",
    question: "Which is a non-functional requirement?",
    options: [
      "Map customerId",
      "Create order",
      "95% processed within 60 seconds",
      "Add product",
    ],
    answer: 2,
    reason: "Latency is a quality constraint rather than a business function.",
  },
  {
    id: "q7",
    question: "Which error should not normally be blindly retried?",
    options: ["401 invalid credentials", "503 transient outage", "429 with Retry-After", "Gateway timeout"],
    answer: 0,
    reason: "Invalid authentication needs correction, not repeated load.",
  },
  {
    id: "q8",
    question: "Which artefact records why asynchronous processing was chosen?",
    options: ["Invoice", "Architecture decision record", "Avatar", "Calendar reminder"],
    answer: 1,
    reason: "A decision record preserves context, alternatives and consequences.",
  },
  {
    id: "q9",
    question: "Where should a stable source order ID live when the message body is replaced?",
    options: ["Exchange property", "Browser cookie", "Screenshot", "Private key"],
    answer: 0,
    reason: "A property can preserve control data across body transformations.",
  },
  {
    id: "q10",
    question: "What should a runbook include?",
    options: [
      "Only project history",
      "Monitoring, common failures, safe recovery, owners and escalation",
      "Exam questions only",
      "Private credentials",
    ],
    answer: 1,
    reason: "A runbook enables operations to respond safely.",
  },
  {
    id: "q11",
    question: "What does pagination protect against?",
    options: [
      "Unbounded large result retrieval",
      "Certificate rotation",
      "Role assignment",
      "Duplicate POST only",
    ],
    answer: 0,
    reason: "Bounded pages protect services, networks and memory.",
  },
  {
    id: "q12",
    question: "What is the best next action after receiving an ambiguous brief?",
    options: [
      "Build immediately",
      "Clarify outcome, process, systems, data, constraints and acceptance",
      "Guess silently",
      "Promise real-time delivery",
    ],
    answer: 1,
    reason: "Discovery reduces the risk of solving the wrong problem.",
  },
];

const readinessItems = [
  "SAP Universal ID and learning access confirmed",
  "Programme calendar and reminders set",
  "Evidence folder and backup created",
  "Generated data set ready",
  "Portfolio case-study outline opened",
  "Blocker update template saved",
  "Demo script outline prepared",
  "Application tracker started",
];

const defaultCsv = `po,supplier,date,product,qty
PO-1001,Cape Vanilla,2026-07-21,VAN-12,24
PO-1002,Durban Cocoa,2026-07-22,COC-03,18
PO-1002,Durban Cocoa,2026-07-22,COC-03,18
PO-1003,Joburg Citrus,2026-13-01,CIT-07,9
PO-1004,Stellenbosch Berry,2026-07-24,BER-02,0`;

const sandboxTabs = [
  { id: "order", label: "Order API", icon: Play },
  { id: "file", label: "File Intake", icon: FileCheck2 },
  { id: "event", label: "Event Mesh", icon: Layers3 },
  { id: "proxy", label: "API Proxy", icon: ShieldCheck },
] as const;

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function readFile(file: File, onReady: (attachment: Attachment) => void) {
  const reader = new FileReader();
  reader.onload = () => {
    onReady({
      name: file.name,
      type: file.type || "application/octet-stream",
      dataUrl: String(reader.result),
    });
  };
  reader.readAsDataURL(file);
}

function profileFromDraft(username: string, role: string, avatar: string, avatarKind: AvatarKind): Profile {
  return {
    username: username.trim() || "SAP Learner",
    role: role.trim() || "SAP Developer Learner",
    avatar,
    avatarKind,
    joinedAt: new Date().toISOString(),
  };
}

function parseCsv(input: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function Avatar({
  name,
  avatar,
  avatarKind,
  size = "md",
}: {
  name: string;
  avatar: string;
  avatarKind: AvatarKind;
  size?: "sm" | "md" | "lg";
}) {
  const className = `avatar avatar-${size}`;
  if (avatarKind === "upload") {
    return <img className={className} src={avatar} alt={`${name} profile`} />;
  }

  return (
    <span className={className} style={{ "--avatar-bg": avatar } as CSSProperties}>
      {initials(name) || <UserRound size={18} />}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useStoredState<TabId>("sea-tab", "dashboard");
  const [profile, setProfile] = useStoredState<Profile | null>("sea-profile", null);
  const [progress, setProgress] = useStoredState<Record<string, boolean>>("sea-progress", {});
  const [posts, setPosts] = useStoredState<CommunityPost[]>("sea-posts", []);
  const [quizAnswers, setQuizAnswers] = useStoredState<Record<string, number>>("sea-quiz", {});
  const [selectedProject, setSelectedProject] = useStoredState<string>("sea-project", "P6");
  const [sandbox, setSandbox] = useStoredState<(typeof sandboxTabs)[number]["id"]>("sea-sandbox", "order");
  const [sprint, setSprint] = useStoredState("sea-sprint", {
    active: false,
    startedAt: 0,
    duration: 20 * 60,
    completions: 0,
  });
  const [clock, setClock] = useState(Date.now());
  const [profileDraft, setProfileDraft] = useState({
    username: profile?.username ?? "Simone Govender",
    role: profile?.role ?? "SAP Developer Learner",
    avatar: profile?.avatar ?? avatarPresets[0].value,
    avatarKind: profile?.avatarKind ?? "preset",
  });
  const [postDraft, setPostDraft] = useState({
    type: "Feedback",
    week: "Week 1",
    project: "P6",
    mood: "Focused",
    confidence: 3,
    message: "",
    tags: "",
    link: "",
    attachment: undefined as Attachment | undefined,
  });
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [flashIndex, setFlashIndex] = useStoredState("sea-flash-index", 0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [orderInput, setOrderInput] = useStoredState("sea-order-input", {
    orderId: "QCC-1007",
    customer: "Nandi Mokoena",
    channel: "web",
    item: "Galaxy vanilla dozen",
    quantity: 2,
    price: 420,
    customNote: "Gold shimmer, teal ribbon, delivery before Friday",
    processedIds: [] as string[],
  });
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [csvInput, setCsvInput] = useStoredState("sea-csv", defaultCsv);
  const [fileRows, setFileRows] = useState<FileRow[]>([]);
  const [eventState, setEventState] = useStoredState("sea-event-state", {
    product: "VAN-12",
    stock: 9,
    threshold: 12,
    events: [] as EventItem[],
    purchasingQueue: [] as EventItem[],
    reportingQueue: [] as EventItem[],
    recovery: [] as EventItem[],
  });
  const [proxyState, setProxyState] = useStoredState("sea-proxy-state", {
    client: "partner-a",
    path: "/orders/QCC-1007/status",
    backend: "200",
    counts: {} as Record<string, number>,
  });
  const [proxyResult, setProxyResult] = useState<ProxyResult | null>(null);

  const allProgressIds = useMemo(() => {
    const weekIds = roadmap.flatMap((week) => week.outputs.map((_, index) => `${week.id}-${index}`));
    const projectIds = projectBriefs.flatMap((project) =>
      [...project.deliverables, ...project.acceptance].map((_, index) => `${project.id}-${index}`),
    );
    const readinessIds = readinessItems.map((_, index) => `ready-${index}`);
    return [...weekIds, ...projectIds, ...readinessIds];
  }, []);

  const completedCount = allProgressIds.filter((id) => progress[id]).length;
  const progressPercent = Math.round((completedCount / allProgressIds.length) * 100);
  const chosenProject = projectBriefs.find((project) => project.id === selectedProject) ?? projectBriefs[0];
  const nextOutput = roadmap.flatMap((week) =>
    week.outputs.map((output, index) => ({ id: `${week.id}-${index}`, label: `${week.week}: ${output}` })),
  ).find((item) => !progress[item.id]);
  const quizScore = quizQuestions.filter((question) => quizAnswers[question.id] === question.answer).length;
  const sprintRemaining = sprint.active
    ? Math.max(0, sprint.duration - Math.floor((clock - sprint.startedAt) / 1000))
    : sprint.duration;

  useEffect(() => {
    if (!sprint.active) return;
    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [sprint.active]);

  useEffect(() => {
    if (sprint.active && sprintRemaining === 0) {
      setSprint((current) => ({
        ...current,
        active: false,
        completions: current.completions + 1,
      }));
    }
  }, [setSprint, sprint.active, sprintRemaining]);

  const toggleProgress = (id: string) => {
    setProgress((current) => ({ ...current, [id]: !current[id] }));
  };

  const saveProfile = () => {
    setProfile(
      profileFromDraft(
        profileDraft.username,
        profileDraft.role,
        profileDraft.avatar,
        profileDraft.avatarKind as AvatarKind,
      ),
    );
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFile(file, (attachment) => {
      setProfileDraft((current) => ({
        ...current,
        avatar: attachment.dataUrl,
        avatarKind: "upload",
      }));
    });
  };

  const handlePostAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFile(file, (attachment) => {
      setPostDraft((current) => ({ ...current, attachment }));
    });
  };

  const publishPost = () => {
    if (!profile || !postDraft.message.trim()) return;
    const post: CommunityPost = {
      id: createId("post"),
      author: profile.username,
      role: profile.role,
      avatar: profile.avatar,
      avatarKind: profile.avatarKind,
      type: postDraft.type,
      week: postDraft.week,
      project: postDraft.project,
      mood: postDraft.mood,
      confidence: postDraft.confidence,
      message: postDraft.message.trim(),
      tags: postDraft.tags.trim(),
      link: postDraft.link.trim(),
      attachment: postDraft.attachment,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts((current) => [post, ...current]);
    setPostDraft((current) => ({
      ...current,
      message: "",
      tags: "",
      link: "",
      attachment: undefined,
    }));
  };

  const publishComment = (postId: string) => {
    if (!profile || !commentDrafts[postId]?.trim()) return;
    const comment: Comment = {
      id: createId("comment"),
      author: profile.username,
      role: profile.role,
      avatar: profile.avatar,
      avatarKind: profile.avatarKind,
      message: commentDrafts[postId].trim(),
      createdAt: new Date().toISOString(),
    };
    setPosts((current) =>
      current.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post)),
    );
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const startSprint = () => {
    setSprint((current) => ({
      ...current,
      active: true,
      startedAt: Date.now(),
      duration: 20 * 60,
    }));
    setActiveTab("roadmap");
  };

  const resetWorkspace = () => {
    setOrderResult(null);
    setFileRows([]);
    setProxyResult(null);
  };

  const runOrder = () => {
    const errors: string[] = [];
    if (!orderInput.orderId.trim()) errors.push("Missing order ID.");
    if (!orderInput.customer.trim()) errors.push("Missing customer.");
    if (Number(orderInput.quantity) <= 0) errors.push("Quantity must be greater than zero.");
    if (Number(orderInput.price) <= 0) errors.push("Price must be greater than zero.");
    if (orderInput.processedIds.includes(orderInput.orderId.trim())) errors.push("Duplicate source order ID.");
    const correlationId = `COR-${Date.now().toString(36).toUpperCase()}`;
    const accepted = errors.length === 0;

    if (accepted) {
      setOrderInput((current) => ({
        ...current,
        processedIds: [...current.processedIds, current.orderId.trim()],
      }));
    }

    setOrderResult({
      accepted,
      correlationId,
      errors,
      canonical: {
        sourceOrderId: orderInput.orderId.trim(),
        customerName: orderInput.customer.trim(),
        channel: orderInput.channel,
        item: orderInput.item.trim(),
        quantity: Number(orderInput.quantity),
        currency: "ZAR",
        grossAmount: Number(orderInput.price),
        note: orderInput.customNote.trim(),
      },
      target: accepted
        ? {
            erpOrder: `ERP-${orderInput.orderId.trim().replace(/\D/g, "") || "1000"}`,
            status: "Accepted",
            correlationId,
            fulfilmentLane: Number(orderInput.quantity) > 4 ? "Bulk approval" : "Standard bake",
          }
        : undefined,
    });
  };

  const runFileIntake = () => {
    const parsed = parseCsv(csvInput);
    const body = parsed.slice(1);
    const seen = new Set<string>();
    const rows: FileRow[] = body.map((columns, index) => {
      const [po = "", supplier = "", date = "", product = "", qty = "0"] = columns;
      const errors: string[] = [];
      const quantity = Number(qty);
      if (!po) errors.push("missing PO");
      if (!supplier) errors.push("missing supplier");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("invalid date");
      if (!product) errors.push("missing product");
      if (!Number.isFinite(quantity) || quantity <= 0) errors.push("quantity must be positive");
      if (seen.has(po)) errors.push("duplicate PO");
      seen.add(po);

      return {
        row: index + 2,
        po,
        supplier,
        product,
        quantity: Number.isFinite(quantity) ? quantity : 0,
        status: errors.length ? "rejected" : "accepted",
        reason: errors.join(", ") || "ready for target XML",
      };
    });
    setFileRows(rows);
  };

  const publishEvent = () => {
    const eventId = `Inventory.LevelChanged.${eventState.product}.${eventState.stock}.${eventState.threshold}`;
    const exists = eventState.events.some((event) => event.id === eventId);
    const item: EventItem = {
      id: eventId,
      product: eventState.product,
      stock: Number(eventState.stock),
      threshold: Number(eventState.threshold),
      status: exists ? "Duplicate blocked" : Number(eventState.stock) <= Number(eventState.threshold) ? "Queued" : "Observed",
      createdAt: new Date().toISOString(),
    };
    if (exists) {
      setEventState((current) => ({ ...current, events: [item, ...current.events] }));
      return;
    }
    const below = Number(eventState.stock) <= Number(eventState.threshold);
    setEventState((current) => ({
      ...current,
      events: [item, ...current.events],
      purchasingQueue: below ? [...current.purchasingQueue, item] : current.purchasingQueue,
      reportingQueue: below ? [...current.reportingQueue, item] : current.reportingQueue,
    }));
  };

  const processQueue = (queue: "purchasingQueue" | "reportingQueue") => {
    setEventState((current) => ({
      ...current,
      [queue]: current[queue].slice(1),
    }));
  };

  const recoverEvent = () => {
    setEventState((current) => {
      const item = current.purchasingQueue[0] ?? current.reportingQueue[0];
      if (!item) return current;
      return {
        ...current,
        purchasingQueue: current.purchasingQueue.filter((event) => event.id !== item.id),
        reportingQueue: current.reportingQueue.filter((event) => event.id !== item.id),
        recovery: [{ ...item, status: "Recovery review" }, ...current.recovery],
      };
    });
  };

  const sendProxyRequest = () => {
    const correlationId = `API-${Date.now().toString(36).toUpperCase()}`;
    const key = proxyState.client.trim();
    const count = (proxyState.counts[key] ?? 0) + 1;
    const knownClient = ["partner-a", "partner-b", "internal-demo"].includes(key);
    const hostile = proxyState.path.includes("..") || proxyState.path.includes("<") || proxyState.path.includes(">");

    if (!knownClient) {
      setProxyResult({ status: 401, title: "Unauthorised", detail: "Client key is not recognised.", correlationId });
      return;
    }
    if (hostile) {
      setProxyResult({ status: 400, title: "Rejected", detail: "Threat pattern blocked before backend call.", correlationId });
      return;
    }
    if (count > 3) {
      setProxyResult({ status: 429, title: "Rate limit", detail: "Quota exceeded for this learner client.", correlationId });
      return;
    }

    setProxyState((current) => ({
      ...current,
      counts: { ...current.counts, [key]: count },
    }));

    if (proxyState.backend === "503") {
      setProxyResult({ status: 503, title: "Service unavailable", detail: "Safe receiver outage envelope returned.", correlationId });
      return;
    }
    if (proxyState.backend === "404") {
      setProxyResult({ status: 404, title: "Not found", detail: "No matching order status for the requested ID.", correlationId });
      return;
    }
    setProxyResult({ status: 200, title: "Accepted", detail: "Order status returned with backend headers removed.", correlationId });
  };

  const copyTemplate = async (template: Template) => {
    const text = `${template.title}\n\n${template.fields.map((field) => `${field}:`).join("\n")}`;
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveTab("dashboard")} type="button">
          <img src={`${baseUrl}qcc-quantum-cupcake.png`} alt="Quantum Cupcake Creations mark" />
          <span>
            <strong>SAP Experience Accelerator</strong>
            <small>Umuzi learner hub</small>
          </span>
        </button>
        <nav className="nav-tabs" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeTab === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="profile-pill">
          {profile ? (
            <>
              <Avatar name={profile.username} avatar={profile.avatar} avatarKind={profile.avatarKind} size="sm" />
              <span>{profile.username}</span>
            </>
          ) : (
            <>
              <UserRound size={18} />
              <span>Guest learner</span>
            </>
          )}
        </div>
      </header>

      {!profile && (
        <section className="login-panel">
          <div className="login-copy">
            <p className="eyebrow">Learner profile</p>
            <h1>Build evidence, practise delivery and keep momentum.</h1>
            <p>
              Create a learner profile to save roadmap progress, sandbox runs, community feedback and study scores on this device.
            </p>
          </div>
          <div className="login-form">
            <label>
              Username
              <input
                value={profileDraft.username}
                onChange={(event) => setProfileDraft((current) => ({ ...current, username: event.target.value }))}
              />
            </label>
            <label>
              Role path
              <select
                value={profileDraft.role}
                onChange={(event) => setProfileDraft((current) => ({ ...current, role: event.target.value }))}
              >
                <option>SAP Developer Learner</option>
                <option>Integration Suite Learner</option>
                <option>SAP BTP Associate</option>
                <option>Process Automation Learner</option>
                <option>Portfolio Builder</option>
              </select>
            </label>
            <div className="avatar-grid" aria-label="Profile picture presets">
              {avatarPresets.map((preset) => (
                <button
                  className={profileDraft.avatar === preset.value ? "selected" : ""}
                  key={preset.id}
                  onClick={() =>
                    setProfileDraft((current) => ({ ...current, avatar: preset.value, avatarKind: "preset" }))
                  }
                  style={{ "--swatch": preset.value } as CSSProperties}
                  type="button"
                >
                  <span />
                  {preset.label}
                </button>
              ))}
            </div>
            <label className="file-picker">
              <Upload size={18} />
              Upload profile picture
              <input accept="image/*" onChange={handleAvatarUpload} type="file" />
            </label>
            <button className="primary-action" onClick={saveProfile} type="button">
              <BadgeCheck size={18} />
              Enter accelerator
            </button>
          </div>
        </section>
      )}

      <main>
        {activeTab === "dashboard" && (
          <section className="page-grid dashboard-grid">
            <div className="hero-panel">
              <div className="hero-text">
                <p className="eyebrow">Prepared for Simone Govender</p>
                <h1>SAP certificate to workplace-ready evidence.</h1>
                <p>
                  A ten-week operating room for discovery, integration design, delivery evidence, portfolio packaging and confident learner support.
                </p>
                <div className="hero-actions">
                  <button className="primary-action" onClick={startSprint} type="button">
                    <Zap size={18} />
                    Accelerate sprint
                  </button>
                  <button className="secondary-action" onClick={() => setActiveTab("sandboxes")} type="button">
                    <Code2 size={18} />
                    Open sandboxes
                  </button>
                </div>
              </div>
              <div className="cupcake-stage">
                <img src={`${baseUrl}qcc-quantum-cupcake.png`} alt="Quantum Cupcake Creations visual" />
              </div>
            </div>

            <div className="metric-card">
              <Gauge size={22} />
              <span>Evidence Progress</span>
              <strong>{progressPercent}%</strong>
              <div className="progress-track">
                <span style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <div className="metric-card">
              <TimerReset size={22} />
              <span>Accelerator Timer</span>
              <strong>{formatTimer(sprintRemaining)}</strong>
              <small>{sprint.active ? "Focus sprint active" : `${sprint.completions} sprint completions`}</small>
            </div>
            <div className="metric-card">
              <ClipboardCheck size={22} />
              <span>Knowledge Check</span>
              <strong>
                {quizScore}/{quizQuestions.length}
              </strong>
              <small>Answered correctly</small>
            </div>

            <section className="panel wide">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Next evidence move</p>
                  <h2>{nextOutput?.label ?? "All roadmap outputs checked"}</h2>
                </div>
                <button className="icon-button" onClick={() => setActiveTab("roadmap")} type="button">
                  <Rocket size={18} />
                </button>
              </div>
              <div className="readiness-list">
                {readinessItems.map((item, index) => (
                  <label key={item} className={progress[`ready-${index}`] ? "checked check-row" : "check-row"}>
                    <input
                      checked={Boolean(progress[`ready-${index}`])}
                      onChange={() => toggleProgress(`ready-${index}`)}
                      type="checkbox"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Selected capstone</p>
                  <h2>{chosenProject.title}</h2>
                </div>
                <Star size={20} />
              </div>
              <p>{chosenProject.outcome}</p>
              <button className="secondary-action stretch" onClick={() => setActiveTab("projects")} type="button">
                <BriefcaseBusiness size={18} />
                View brief
              </button>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Blocker rescue</p>
                  <h2>Five-minute recovery protocol</h2>
                </div>
                <Activity size={20} />
              </div>
              <ol className="compact-list">
                <li>State the exact observable problem.</li>
                <li>Choose the smallest test that returns information.</li>
                <li>Log evidence, impact and owner.</li>
                <li>Send a concise update if another person is affected.</li>
                <li>Resume with one short timed sprint.</li>
              </ol>
            </section>
          </section>
        )}

        {activeTab === "roadmap" && (
          <section className="page-grid roadmap-grid">
            <div className="page-title">
              <p className="eyebrow">Ten-week cadence</p>
              <h1>Weekly outcomes that become portfolio proof.</h1>
            </div>
            {roadmap.map((week) => (
              <article className="week-card" key={week.id}>
                <div className="week-marker">{week.week}</div>
                <h2>{week.title}</h2>
                <p>{week.goal}</p>
                <div className="check-stack">
                  {week.outputs.map((output, index) => {
                    const id = `${week.id}-${index}`;
                    return (
                      <label key={output} className={progress[id] ? "checked check-row" : "check-row"}>
                        <input checked={Boolean(progress[id])} onChange={() => toggleProgress(id)} type="checkbox" />
                        <span>{output}</span>
                      </label>
                    );
                  })}
                </div>
                <small>{week.rhythm}</small>
              </article>
            ))}
          </section>
        )}

        {activeTab === "projects" && (
          <section className="project-layout">
            <aside className="project-list">
              <p className="eyebrow">Project pack</p>
              {projectBriefs.map((project) => (
                <button
                  className={selectedProject === project.id ? "selected" : ""}
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  type="button"
                >
                  <span>{project.id}</span>
                  <strong>{project.title}</strong>
                  <small>
                    {project.level} / {project.time}
                  </small>
                </button>
              ))}
            </aside>

            <article className="project-detail">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">
                    {chosenProject.level} / {chosenProject.time}
                  </p>
                  <h1>{chosenProject.title}</h1>
                </div>
                <button className="primary-action" onClick={() => setSelectedProject("P6")} type="button">
                  <Sparkles size={18} />
                  QCC capstone
                </button>
              </div>
              <p className="lead">{chosenProject.brief}</p>
              <div className="detail-grid">
                <section>
                  <h2>Work Sequence</h2>
                  <ol className="numbered-list">
                    {chosenProject.sequence.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section>
                  <h2>Acceptance</h2>
                  <div className="check-stack">
                    {chosenProject.acceptance.map((item, index) => {
                      const id = `${chosenProject.id}-${chosenProject.deliverables.length + index}`;
                      return (
                        <label key={item} className={progress[id] ? "checked check-row" : "check-row"}>
                          <input checked={Boolean(progress[id])} onChange={() => toggleProgress(id)} type="checkbox" />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>
                <section>
                  <h2>Deliverables</h2>
                  <div className="chip-grid">
                    {chosenProject.deliverables.map((item, index) => {
                      const id = `${chosenProject.id}-${index}`;
                      return (
                        <button
                          className={progress[id] ? "done" : ""}
                          key={item}
                          onClick={() => toggleProgress(id)}
                          type="button"
                        >
                          {progress[id] ? <CheckCircle2 size={16} /> : <ClipboardList size={16} />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </section>
                <section>
                  <h2>Stretch Goals</h2>
                  <ul className="compact-list">
                    {chosenProject.stretch.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <div className="portfolio-line">
                <BriefcaseBusiness size={18} />
                <span>{chosenProject.portfolio}</span>
              </div>
            </article>
          </section>
        )}

        {activeTab === "sandboxes" && (
          <section className="sandbox-layout">
            <div className="page-title">
              <p className="eyebrow">Interactive practice</p>
              <h1>Tenant-free simulations for integration thinking.</h1>
            </div>
            <div className="sandbox-tabs">
              {sandboxTabs.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={sandbox === item.id ? "active" : ""}
                    key={item.id}
                    onClick={() => setSandbox(item.id)}
                    type="button"
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button className="ghost-button" onClick={resetWorkspace} type="button">
                <RefreshCw size={18} />
                Clear output
              </button>
            </div>

            {sandbox === "order" && (
              <section className="sandbox-panel">
                <div className="form-grid">
                  <label>
                    Order ID
                    <input
                      value={orderInput.orderId}
                      onChange={(event) => setOrderInput((current) => ({ ...current, orderId: event.target.value }))}
                    />
                  </label>
                  <label>
                    Customer
                    <input
                      value={orderInput.customer}
                      onChange={(event) => setOrderInput((current) => ({ ...current, customer: event.target.value }))}
                    />
                  </label>
                  <label>
                    Channel
                    <select
                      value={orderInput.channel}
                      onChange={(event) => setOrderInput((current) => ({ ...current, channel: event.target.value }))}
                    >
                      <option>web</option>
                      <option>chat</option>
                      <option>event</option>
                      <option>market</option>
                    </select>
                  </label>
                  <label>
                    Item
                    <input
                      value={orderInput.item}
                      onChange={(event) => setOrderInput((current) => ({ ...current, item: event.target.value }))}
                    />
                  </label>
                  <label>
                    Quantity
                    <input
                      min="0"
                      type="number"
                      value={orderInput.quantity}
                      onChange={(event) =>
                        setOrderInput((current) => ({ ...current, quantity: Number(event.target.value) }))
                      }
                    />
                  </label>
                  <label>
                    ZAR amount
                    <input
                      min="0"
                      type="number"
                      value={orderInput.price}
                      onChange={(event) => setOrderInput((current) => ({ ...current, price: Number(event.target.value) }))}
                    />
                  </label>
                </div>
                <label className="full-field">
                  Custom note
                  <textarea
                    value={orderInput.customNote}
                    onChange={(event) => setOrderInput((current) => ({ ...current, customNote: event.target.value }))}
                  />
                </label>
                <button className="primary-action" onClick={runOrder} type="button">
                  <Send size={18} />
                  Submit order
                </button>
                {orderResult && (
                  <div className={orderResult.accepted ? "result-panel accepted" : "result-panel rejected"}>
                    <h2>{orderResult.accepted ? "Order accepted" : "Order rejected"}</h2>
                    <p>Correlation ID: {orderResult.correlationId}</p>
                    {orderResult.errors.length > 0 && (
                      <ul className="compact-list">
                        {orderResult.errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    )}
                    <div className="code-grid">
                      <pre>{JSON.stringify(orderResult.canonical, null, 2)}</pre>
                      <pre>{JSON.stringify(orderResult.target ?? { status: "Not sent" }, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </section>
            )}

            {sandbox === "file" && (
              <section className="sandbox-panel">
                <label className="full-field">
                  CSV intake
                  <textarea value={csvInput} onChange={(event) => setCsvInput(event.target.value)} />
                </label>
                <button className="primary-action" onClick={runFileIntake} type="button">
                  <FileCheck2 size={18} />
                  Run intake
                </button>
                {fileRows.length > 0 && (
                  <div className="result-panel">
                    <div className="recon-grid">
                      <span>
                        Input <strong>{fileRows.length}</strong>
                      </span>
                      <span>
                        Accepted <strong>{fileRows.filter((row) => row.status === "accepted").length}</strong>
                      </span>
                      <span>
                        Rejected <strong>{fileRows.filter((row) => row.status === "rejected").length}</strong>
                      </span>
                    </div>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Row</th>
                            <th>PO</th>
                            <th>Supplier</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fileRows.map((row) => (
                            <tr key={`${row.row}-${row.po}`}>
                              <td>{row.row}</td>
                              <td>{row.po}</td>
                              <td>{row.supplier}</td>
                              <td>{row.product}</td>
                              <td>{row.quantity}</td>
                              <td>{row.status}</td>
                              <td>{row.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <pre>
                      {`<reconciliation accepted="${fileRows.filter((row) => row.status === "accepted").length}" rejected="${fileRows.filter((row) => row.status === "rejected").length}" />`}
                    </pre>
                  </div>
                )}
              </section>
            )}

            {sandbox === "event" && (
              <section className="sandbox-panel">
                <div className="form-grid">
                  <label>
                    Product
                    <input
                      value={eventState.product}
                      onChange={(event) => setEventState((current) => ({ ...current, product: event.target.value }))}
                    />
                  </label>
                  <label>
                    Stock
                    <input
                      type="number"
                      value={eventState.stock}
                      onChange={(event) => setEventState((current) => ({ ...current, stock: Number(event.target.value) }))}
                    />
                  </label>
                  <label>
                    Threshold
                    <input
                      type="number"
                      value={eventState.threshold}
                      onChange={(event) =>
                        setEventState((current) => ({ ...current, threshold: Number(event.target.value) }))
                      }
                    />
                  </label>
                </div>
                <div className="button-row">
                  <button className="primary-action" onClick={publishEvent} type="button">
                    <Layers3 size={18} />
                    Publish event
                  </button>
                  <button className="secondary-action" onClick={() => processQueue("purchasingQueue")} type="button">
                    Purchasing ack
                  </button>
                  <button className="secondary-action" onClick={() => processQueue("reportingQueue")} type="button">
                    Reporting ack
                  </button>
                  <button className="ghost-button" onClick={recoverEvent} type="button">
                    Move to recovery
                  </button>
                </div>
                <div className="queue-grid">
                  <div>
                    <span>Purchasing queue</span>
                    <strong>{eventState.purchasingQueue.length}</strong>
                  </div>
                  <div>
                    <span>Reporting queue</span>
                    <strong>{eventState.reportingQueue.length}</strong>
                  </div>
                  <div>
                    <span>Recovery</span>
                    <strong>{eventState.recovery.length}</strong>
                  </div>
                </div>
                <div className="event-stream">
                  {eventState.events.slice(0, 6).map((event) => (
                    <div key={`${event.id}-${event.createdAt}`}>
                      <strong>{event.id}</strong>
                      <span>
                        {event.status} / stock {event.stock} of threshold {event.threshold}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sandbox === "proxy" && (
              <section className="sandbox-panel">
                <div className="form-grid">
                  <label>
                    Client key
                    <select
                      value={proxyState.client}
                      onChange={(event) => setProxyState((current) => ({ ...current, client: event.target.value }))}
                    >
                      <option>partner-a</option>
                      <option>partner-b</option>
                      <option>internal-demo</option>
                      <option>unknown-client</option>
                    </select>
                  </label>
                  <label>
                    Request path
                    <input
                      value={proxyState.path}
                      onChange={(event) => setProxyState((current) => ({ ...current, path: event.target.value }))}
                    />
                  </label>
                  <label>
                    Backend result
                    <select
                      value={proxyState.backend}
                      onChange={(event) => setProxyState((current) => ({ ...current, backend: event.target.value }))}
                    >
                      <option>200</option>
                      <option>404</option>
                      <option>503</option>
                    </select>
                  </label>
                </div>
                <button className="primary-action" onClick={sendProxyRequest} type="button">
                  <ShieldCheck size={18} />
                  Send request
                </button>
                {proxyResult && (
                  <div className={proxyResult.status === 200 ? "result-panel accepted" : "result-panel rejected"}>
                    <h2>
                      {proxyResult.status} {proxyResult.title}
                    </h2>
                    <p>{proxyResult.detail}</p>
                    <pre>{JSON.stringify(proxyResult, null, 2)}</pre>
                  </div>
                )}
              </section>
            )}
          </section>
        )}

        {activeTab === "community" && (
          <section className="community-layout">
            <div className="page-title">
              <p className="eyebrow">Learner community</p>
              <h1>Feedback wall, comments and cohort reflections.</h1>
            </div>
            <section className="composer">
              <div className="composer-head">
                {profile ? (
                  <Avatar name={profile.username} avatar={profile.avatar} avatarKind={profile.avatarKind} />
                ) : (
                  <span className="avatar avatar-md">
                    <UserRound size={18} />
                  </span>
                )}
                <div>
                  <h2>{profile ? profile.username : "Create a profile first"}</h2>
                  <p>{profile ? profile.role : "Profile required for posting"}</p>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  Feedback type
                  <select
                    value={postDraft.type}
                    onChange={(event) => setPostDraft((current) => ({ ...current, type: event.target.value }))}
                  >
                    <option>Feedback</option>
                    <option>Question</option>
                    <option>Win</option>
                    <option>Blocker</option>
                    <option>Resource</option>
                    <option>Retrospective</option>
                  </select>
                </label>
                <label>
                  Week
                  <select
                    value={postDraft.week}
                    onChange={(event) => setPostDraft((current) => ({ ...current, week: event.target.value }))}
                  >
                    {roadmap.map((week) => (
                      <option key={week.week}>{week.week}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Project
                  <select
                    value={postDraft.project}
                    onChange={(event) => setPostDraft((current) => ({ ...current, project: event.target.value }))}
                  >
                    {projectBriefs.map((project) => (
                      <option key={project.id}>{project.id}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Mood
                  <select
                    value={postDraft.mood}
                    onChange={(event) => setPostDraft((current) => ({ ...current, mood: event.target.value }))}
                  >
                    <option>Focused</option>
                    <option>Curious</option>
                    <option>Blocked</option>
                    <option>Confident</option>
                    <option>Need review</option>
                  </select>
                </label>
              </div>
              <label className="full-field">
                Post
                <textarea
                  placeholder="Share feedback, a question, a blocker, a win, a resource link, a reflection or a project update."
                  value={postDraft.message}
                  onChange={(event) => setPostDraft((current) => ({ ...current, message: event.target.value }))}
                />
              </label>
              <div className="form-grid">
                <label>
                  Tags
                  <input
                    placeholder="mapping, testing, portfolio"
                    value={postDraft.tags}
                    onChange={(event) => setPostDraft((current) => ({ ...current, tags: event.target.value }))}
                  />
                </label>
                <label>
                  Link
                  <input
                    placeholder="https://"
                    value={postDraft.link}
                    onChange={(event) => setPostDraft((current) => ({ ...current, link: event.target.value }))}
                  />
                </label>
                <label>
                  Confidence
                  <input
                    max="5"
                    min="1"
                    type="range"
                    value={postDraft.confidence}
                    onChange={(event) =>
                      setPostDraft((current) => ({ ...current, confidence: Number(event.target.value) }))
                    }
                  />
                </label>
                <label className="file-picker inline-file">
                  <ImagePlus size={18} />
                  Add file
                  <input onChange={handlePostAttachment} type="file" />
                </label>
              </div>
              {postDraft.attachment && <p className="attachment-note">{postDraft.attachment.name}</p>}
              <button className="primary-action" disabled={!profile || !postDraft.message.trim()} onClick={publishPost} type="button">
                <MessageSquarePlus size={18} />
                Publish post
              </button>
            </section>

            <div className="post-feed">
              {posts.length === 0 && (
                <div className="empty-state">
                  <UsersRound size={26} />
                  <h2>Community board ready</h2>
                  <p>Feedback, project wins, blocker notes, resource links and reflections will appear here.</p>
                </div>
              )}
              {posts.map((post) => (
                <article className="post-card" key={post.id}>
                  <div className="post-head">
                    <Avatar name={post.author} avatar={post.avatar} avatarKind={post.avatarKind} />
                    <div>
                      <h2>{post.author}</h2>
                      <p>
                        {post.role} / {formatDate(post.createdAt)}
                      </p>
                    </div>
                    <span className="post-type">{post.type}</span>
                  </div>
                  <div className="post-meta">
                    <span>{post.week}</span>
                    <span>{post.project}</span>
                    <span>{post.mood}</span>
                    <span>Confidence {post.confidence}/5</span>
                  </div>
                  <p className="post-message">{post.message}</p>
                  {post.tags && <p className="tags">{post.tags}</p>}
                  {post.link && (
                    <a className="post-link" href={post.link} rel="noreferrer" target="_blank">
                      {post.link}
                    </a>
                  )}
                  {post.attachment && (
                    <a className="attachment-link" download={post.attachment.name} href={post.attachment.dataUrl}>
                      <ImagePlus size={16} />
                      {post.attachment.name}
                    </a>
                  )}
                  <div className="comments">
                    <h3>
                      <MessageSquare size={16} />
                      Comments
                    </h3>
                    {post.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <Avatar name={comment.author} avatar={comment.avatar} avatarKind={comment.avatarKind} size="sm" />
                        <div>
                          <strong>{comment.author}</strong>
                          <span>{formatDate(comment.createdAt)}</span>
                          <p>{comment.message}</p>
                        </div>
                      </div>
                    ))}
                    <div className="comment-form">
                      <input
                        disabled={!profile}
                        placeholder="Add a comment"
                        value={commentDrafts[post.id] ?? ""}
                        onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))}
                      />
                      <button disabled={!profile || !commentDrafts[post.id]?.trim()} onClick={() => publishComment(post.id)} type="button">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "toolkit" && (
          <section className="toolkit-layout">
            <div className="page-title">
              <p className="eyebrow">Workbook templates</p>
              <h1>Reusable artefacts for delivery evidence.</h1>
            </div>
            <div className="template-grid">
              {templates.map((template) => (
                <article className="template-card" key={template.title}>
                  <div className="section-heading">
                    <h2>{template.title}</h2>
                    <button className="icon-button" onClick={() => copyTemplate(template)} type="button">
                      <ClipboardCheck size={18} />
                    </button>
                  </div>
                  <ul className="compact-list">
                    {template.fields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "study" && (
          <section className="study-layout">
            <div className="page-title">
              <p className="eyebrow">Study bank</p>
              <h1>Flashcards, interview drills and knowledge checks.</h1>
            </div>
            <section className="flashcard">
              <p className="eyebrow">Flashcard {flashIndex + 1} of {flashcards.length}</p>
              <h2>{flashcards[flashIndex].front}</h2>
              {flashOpen && <p>{flashcards[flashIndex].back}</p>}
              <div className="button-row">
                <button className="primary-action" onClick={() => setFlashOpen((current) => !current)} type="button">
                  <BookOpen size={18} />
                  {flashOpen ? "Hide answer" : "Reveal answer"}
                </button>
                <button
                  className="secondary-action"
                  onClick={() => {
                    setFlashOpen(false);
                    setFlashIndex((flashIndex + 1) % flashcards.length);
                  }}
                  type="button"
                >
                  Next card
                </button>
              </div>
            </section>

            <section className="quiz-grid">
              {quizQuestions.map((question, index) => (
                <article className="quiz-card" key={question.id}>
                  <p className="eyebrow">Question {index + 1}</p>
                  <h2>{question.question}</h2>
                  <div className="option-stack">
                    {question.options.map((option, optionIndex) => {
                      const selected = quizAnswers[question.id] === optionIndex;
                      const correct = question.answer === optionIndex;
                      return (
                        <button
                          className={selected ? (correct ? "correct" : "wrong") : ""}
                          key={option}
                          onClick={() => setQuizAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          type="button"
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswers[question.id] !== undefined && <p className="reason">{question.reason}</p>}
                </article>
              ))}
            </section>
          </section>
        )}
      </main>

      <button className="accelerate-button" onClick={startSprint} type="button" aria-label="Accelerate sprint">
        <Zap size={30} fill="currentColor" />
      </button>

      <footer>
        <span>Quantum Cupcake Creations capstone lab</span>
        <a href="https://quantumcupcakecreations.com" rel="noreferrer" target="_blank">
          quantumcupcakecreations.com
        </a>
      </footer>
    </div>
  );
}
