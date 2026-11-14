/**
 * ============================================================================
 * OPENBOX GROWTH PARTNER — COURSE & INTERNSHIP TRACK CONFIGURATION
 * ============================================================================
 * HOW TO ADD A NEW COURSE OR TASK-BASED INTERNSHIP:
 * 1. Copy one complete `{ ... },` object from `OPENBOX_TRACKS` below.
 * 2. Paste it inside the `OPENBOX_TRACKS` array.
 * 3. Edit the fields:
 *    - id: Unique identifier (e.g., "fullstack-sprint-01").
 *    - title: Title of the internship or course.
 *    - category: Must match filter buttons ("Internship", "Development", "Analytics").
 *    - tier: "Free 4-Week Sprint" or "Accelerator Track (₹99)".
 *    - isInternship: `true` enables the Internship Task Submission Box.
 *    - techStack: Array of tags shown on the card.
 *    - lessons: Video modules.
 *        * videoId: YouTube video ID only (e.g., for youtube.com/watch?v=W6NZfCO5SIk -> "W6NZfCO5SIk").
 *        * resourceLink: Optional link to GitHub starter repo, Notion doc, or dataset.
 *    - tasks: Practical internship tasks students submit via GitHub/Drive URL.
 *    - quiz: Multiple-choice verification questions (`answer` is 0-indexed: 0 = 1st option).
 * ============================================================================
 */

const OPENBOX_TRACKS = [
  // --------------------------------------------------------------------------
  // TRACK 1: SOFTWARE ENGINEERING TASK-BASED INTERNSHIP
  // --------------------------------------------------------------------------
  {
    id: "swe-internship-sprint",
    title: "Full-Stack Software Engineering Internship",
    category: "Internship",
    tier: "Free 4-Week Sprint",
    isInternship: true,
    techStack: ["React", "Node.js", "Git", "REST APIs"],
    description: "Ship real production features, pass code reviews, and build verifiable GitHub commits in a 4-week sprint.",

    lessons: [
      {
        id: "swe-1",
        title: "01. Git Workflow & Production Code Standards",
        videoId: "W6NZfCO5SIk", // Replace with your YouTube Video ID
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
        instructions: "Build a responsive task board with filtering and localStorage persistence. Push to a public GitHub repo and submit the link."
      },
      {
        title: "Task 02: REST API Integration & Error Handling",
        deadline: "Week 2 Milestone",
        instructions: "Connect your frontend to a live JSON API with loading skeletons and retry states. Submit both GitHub repo and live Vercel/GitHub Pages URL."
      }
    ],

    quiz: [
      {
        question: "Which Git command creates and switches to a new feature branch immediately?",
        options: ["git branch new-feature", "git checkout -b new-feature", "git merge new-feature"],
        answer: 1
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TRACK 2: BUSINESS ANALYTICS & GROWTH INTERNSHIP
  // --------------------------------------------------------------------------
  {
    id: "business-analytics-internship",
    title: "Business Analytics & Growth Pipeline Internship",
    category: "Internship",
    tier: "Accelerator Track (₹99)",
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
        instructions: "Create a Google Sheet dashboard calculating conversion rates across 4 funnel stages and write 3 actionable recommendations. Submit your Google Sheet link (set to Anyone with link can view)."
      }
    ],

    quiz: [
      {
        question: "What does a high LTV:CAC ratio (e.g., 4:1) indicate for a business?",
        options: [
          "Customer acquisition is unprofitable",
          "Customer lifetime value strongly outweighs acquisition cost",
          "Churn rate is 100%"
        ],
        answer: 1
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TRACK 3: STANDALONE DEVELOPMENT COURSE
  // --------------------------------------------------------------------------
  {
    id: "modern-js-architecture",
    title: "Modern JavaScript & Async Architecture",
    category: "Development",
    tier: "Free Core Module",
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

    tasks: [], // Empty array = standard course without internship submission box
    quiz: []
  }
];
