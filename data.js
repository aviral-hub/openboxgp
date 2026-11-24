/**
 * ============================================================================
 * OPENBOX GROWTH PARTNER — COURSE & INTERNSHIP TRACK CONFIGURATION
 * ============================================================================
 * GUIDE TO ADDING NEW TRACKS:
 * - requiresAccelerator: Set to `false` for Free ₹0 tracks, `true` for ₹99 Accelerator tracks.
 * - isInternship: Set to `true` to enable Step-by-Step Task Submission & Internship Certificate.
 * - tasks[].steps: Explicit array of interactive milestones learners must check off before submitting.
 * ============================================================================
 */

const OPENBOX_TRACKS = [
  {
    id: "swe-internship-sprint",
    title: "Full-Stack Software Engineering Internship",
    category: "Internship",
    tier: "Free 4-Week Sprint",
    requiresAccelerator: false, // Open to all Free & Accelerator students
    isInternship: true,
    techStack: ["React", "Node.js", "Git", "REST APIs"],
    description: "Ship real production features, pass code reviews, and build verifiable GitHub commits in a 4-week sprint.",
    lessons: [
      {
        id: "swe-1",
        title: "01. Git Workflow & Production Code Standards",
        videoId: "W6NZfCO5SIk",
        description: "Learn branch naming, atomic commits, pull request hygiene, and how your internship tasks are evaluated.",
        resourceLink: "https://github.com/aviral-hub/openboxgrowthpartner"
      },
      {
        id: "swe-2",
        title: "02. Building High-Throughput APIs & State",
        videoId: "R8rmfD9Y5-c",
        description: "Structuring clean backend routes, error handling, and asynchronous state management.",
        resourceLink: ""
      }
    ],
    tasks: [
      {
        title: "Task 01: Distributed Task Manager UI & State",
        deadline: "Week 1 Milestone",
        deliverable: "Public GitHub Repository URL",
        instructions: "Build a responsive task board with filtering and localStorage persistence. Push to a public GitHub repo and submit the link.",
        steps: [
          "Initialize a clean Git repository and create a dedicated feature branch (e.g., feat/task-board).",
          "Build a responsive Kanban/list UI supporting task creation, priority tagging, and status filtering.",
          "Implement state persistence via localStorage so tasks survive full browser reloads without data loss.",
          "Write a concise README.md with setup instructions, push to GitHub, and verify the repository is public."
        ]
      },
      {
        title: "Task 02: REST API Integration & Error Handling",
        deadline: "Week 2 Milestone",
        deliverable: "GitHub Repo + Live Vercel/Netlify URL",
        instructions: "Connect your frontend to a live JSON API with loading skeletons and retry states. Submit both GitHub repo and live URL.",
        steps: [
          "Connect your frontend application to a live REST endpoint using async/await and Fetch or Axios.",
          "Add shimmer loading skeletons during network requests and a user-friendly retry banner for failed calls.",
          "Prevent duplicate submissions by disabling action buttons while POST/PUT mutations are in flight.",
          "Deploy the build to Vercel or Netlify and test the live production URL on mobile and desktop viewports."
        ]
      }
    ],
    quiz: [
      {
        question: "Which Git command creates and switches to a new feature branch immediately?",
        options: [
          "git branch new-feature",
          "git checkout -b new-feature",
          "git merge new-feature",
          "git init new-feature"
        ],
        answer: 1,
        explanation: "git checkout -b <branch> (or git switch -c <branch>) creates the branch and checks it out in a single step."
      },
      {
        question: "Why should frontend mutation buttons be disabled while an API POST request is pending?",
        options: [
          "To reduce CSS bundle size",
          "To prevent duplicate database records from rapid double-clicks",
          "To bypass CORS preflight checks",
          "To clear browser localStorage automatically"
        ],
        answer: 1,
        explanation: "Disabling submit controls during in-flight requests prevents race conditions and duplicate writes."
      },
      {
        question: "What HTTP status code family indicates a client-side validation or authentication error?",
        options: [
          "2xx (e.g., 200, 201)",
          "3xx (e.g., 301, 302)",
          "4xx (e.g., 400, 401, 422)",
          "5xx (e.g., 500, 503)"
        ],
        answer: 2,
        explanation: "4xx responses signal client errors such as malformed payloads (400), unauthorized access (401), or validation failures (422)."
      },
      {
        question: "Which practice best preserves pull request reviewability in a production team?",
        options: [
          "Committing 3,000+ lines across 40 unrelated files in one commit",
          "Making small, atomic commits scoped to a single feature or bug fix",
          "Pushing directly to the main branch without testing",
          "Commenting out failing unit tests before merging"
        ],
        answer: 1,
        explanation: "Atomic, single-purpose commits make diffs easy to audit, revert, and test safely."
      }
    ]
  },

  {
    id: "business-analytics-internship",
    title: "Business Analytics & Growth Pipeline Internship",
    category: "Internship",
    tier: "Accelerator Track (₹99)",
    requiresAccelerator: true, // Locked until student's Tier = "Accelerator (₹99)"
    isInternship: true,
    techStack: ["SQL", "Excel / Sheets", "Funnel Metrics", "Python"],
    description: "Analyze real startup funnel datasets, build cohort retention dashboards, and deliver executive growth memos.",
    lessons: [
      {
        id: "ba-1",
        title: "01. SaaS Metrics, CAC, LTV & Cohort Retention",
        videoId: "ysz5S6PUM-U",
        description: "How growth partners diagnose conversion bottlenecks using unit economics and cohort tables.",
        resourceLink: ""
      }
    ],
    tasks: [
      {
        title: "Task 01: E-Commerce Funnel Drop-Off Audit",
        deadline: "Week 1 Milestone",
        deliverable: "Shared Google Sheet Dashboard Link",
        instructions: "Create a Google Sheet dashboard calculating conversion rates across 4 funnel stages and write 3 actionable recommendations.",
        steps: [
          "Structure raw visitor, product-view, add-to-cart, and checkout data into a clean 4-stage funnel table.",
          "Calculate stage-to-stage conversion rates and overall end-to-end conversion percentage using dynamic formulas.",
          "Identify the single highest-leakage stage and quantify potential revenue lift from a 5% improvement.",
          "Write an executive summary block with 3 prioritized growth experiments and set sharing to 'Anyone with the link can view'."
        ]
      }
    ],
    quiz: [
      {
        question: "What does a high LTV:CAC ratio (e.g., 4:1) indicate for a business?",
        options: [
          "Customer acquisition is unprofitable",
          "Customer lifetime value strongly outweighs acquisition cost",
          "Monthly churn rate is 100%",
          "Gross margin is negative"
        ],
        answer: 1,
        explanation: "A 4:1 LTV:CAC ratio shows that each customer generates four times the gross value spent to acquire them."
      },
      {
        question: "Which metric isolates repeat customer stickiness over time by signup month?",
        options: [
          "Bounce Rate",
          "Cohort Retention Rate",
          "Cost Per Mille (CPM)",
          "Page Load Latency"
        ],
        answer: 1,
        explanation: "Cohort retention tracks the percentage of users from a specific acquisition period who remain active over subsequent intervals."
      },
      {
        question: "If 10,000 users visit a landing page, 2,500 add to cart, and 500 purchase, what is the cart-to-purchase conversion rate?",
        options: [
          "5%",
          "20%",
          "25%",
          "50%"
        ],
        answer: 1,
        explanation: "500 purchases divided by 2,500 add-to-cart users equals 0.20, or 20%."
      },
      {
        question: "Why do analysts calculate Customer Acquisition Cost (CAC) using fully loaded marketing and sales spend?",
        options: [
          "To artificially inflate profit margins",
          "To capture true unit economics rather than understated ad-only spend",
          "Because ad platforms do not report clicks",
          "To eliminate the need for cohort tracking"
        ],
        answer: 1,
        explanation: "Fully loaded CAC includes ad spend, agency/tool costs, and sales salaries so unit economics reflect real cash burn."
      }
    ]
  },

  {
    id: "modern-js-architecture",
    title: "Modern JavaScript & Async Architecture",
    category: "Development",
    tier: "Free Core Module",
    requiresAccelerator: false,
    isInternship: false,
    techStack: ["ES6+", "Promises", "Fetch API", "DOM"],
    description: "Master closures, event loops, promises, and clean modular JavaScript before entering live sprints.",
    lessons: [
      {
        id: "js-1",
        title: "01. Closures, Lexical Scope & Event Loop",
        videoId: "W6NZfCO5SIk",
        description: "Deep dive into how JavaScript executes asynchronous callbacks under the hood.",
        resourceLink: ""
      }
    ],
    tasks: [],
    quiz: [
      {
        question: "In the JavaScript Event Loop, which queue has higher execution priority?",
        options: [
          "Macrotask Queue (setTimeout, setInterval)",
          "Microtask Queue (Promise.then, queueMicrotask)",
          "DOM Rendering Queue",
          "Network I/O Polling Queue"
        ],
        answer: 1,
        explanation: "The JavaScript engine drains all pending Microtasks (such as resolved Promises) before moving to the next Macrotask."
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A syntax error caused by missing curly braces",
          "A function that retains access to variables from its outer lexical scope even after the outer function returns",
          "A method for terminating WebSocket connections",
          "A built-in garbage collection cycle"
        ],
        answer: 1,
        explanation: "Closures allow inner functions to preserve state from their enclosing lexical environment across invocations."
      },
      {
        question: "Which Promise combinator waits for all input promises to settle regardless of fulfillment or rejection?",
        options: [
          "Promise.all()",
          "Promise.race()",
          "Promise.allSettled()",
          "Promise.any()"
        ],
        answer: 2,
        explanation: "Promise.allSettled() resolves once every input promise has either fulfilled or rejected, returning status objects for each."
      },
      {
        question: "What does `fetch()` do when a server responds with HTTP 404 Not Found?",
        options: [
          "It automatically throws a rejected Promise error",
          "It resolves normally with `response.ok === false` and `response.status === 404`",
          "It retries the request three times",
          "It clears all cookies for that domain"
        ],
        answer: 1,
        explanation: "fetch() only rejects on network failures; HTTP 4xx/5xx responses resolve with response.ok set to false."
      }
    ]
  }
];
