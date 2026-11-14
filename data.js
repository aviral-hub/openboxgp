/**
 * ============================================================================
 * OPENBOX GROWTH PARTNER — COURSE & INTERNSHIP TRACK CONFIGURATION
 * ============================================================================
 * GUIDE TO ADDING NEW TRACKS:
 * - requiresAccelerator: Set to `false` for Free ₹0 tracks, `true` for ₹99 Accelerator tracks.
 * - isInternship: Set to `true` to enable Task Submission & Internship Certificate.
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
        instructions: "Build a responsive task board with filtering and localStorage persistence. Push to a public GitHub repo and submit the link."
      },
      {
        title: "Task 02: REST API Integration & Error Handling",
        deadline: "Week 2 Milestone",
        instructions: "Connect your frontend to a live JSON API with loading skeletons and retry states. Submit both GitHub repo and live URL."
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
        instructions: "Create a Google Sheet dashboard calculating conversion rates across 4 funnel stages and write 3 actionable recommendations."
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
    quiz: []
  }
];
