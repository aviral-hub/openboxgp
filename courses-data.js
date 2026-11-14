/**
 * ============================================================================
 * OPENBOX GROWTH PARTNER — SCALABLE COURSE & INTERNSHIP CATALOG (courses-data.js)
 * ============================================================================
 * HOW TO ADD A NEW COURSE OR INTERNSHIP:
 * 1. Copy one complete `{ ... },` block inside the `OPENBOX_COURSES` array below.
 * 2. Paste it at the bottom of `OPENBOX_COURSES` (before the closing `];`).
 * 3. Edit the fields:
 *    - id: Unique URL-safe slug (e.g., "python-backend-sprint").
 *    - title: Full course or internship title.
 *    - category: "Internship" | "Development" | "Analytics" | "Marketing"
 *    - typeBadge: Label shown on card (e.g., "Task-Based Internship", "MIT OCW Track").
 *    - isInternship: `true` for Internships (issues "CERTIFICATE OF INTERNSHIP"),
 *                    `false` for Courses (issues "CERTIFICATE OF COMPLETION").
 *    - duration: Estimated completion time (e.g., "6 Weeks • Self-Paced").
 *    - level: "Beginner" | "Intermediate" | "Advanced"
 *    - techStack: Array of skills/tools shown as tags & hashtags on certificate.
 *    - description: Concise overview of outcomes and curriculum scope.
 *    - lectures: Array of video modules:
 *        * id: Unique lecture ID (e.g., "py-l1").
 *        * title: Lecture title.
 *        * videoId: Verified YouTube Video ID only (e.g., "nykOeWgQcHM").
 *        * duration: Video length (e.g., "48 mins").
 *        * description: Detailed summary of concepts covered.
 *        * documentUrl: Link to official slides, PDF, GitHub repo, or docs.
 *        * documentLabel: Button text for the document link.
 *    - documents: Array of downloadable study guides, PDFs, or reference sheets:
 *        * title: Document name.
 *        * type: "Syllabus" | "Worksheet" | "Guide" | "Cheat Sheet" | "Template"
 *        * url: Verified direct URL to MIT OCW, GitHub, MDN, or Google Sheets.
 *    - assignments: Array of practical tasks/assignments students submit:
 *        * title: Assignment or task title.
 *        * deadline: Milestone label (e.g., "Week 1 Milestone").
 *        * deliverable: Expected submission format (e.g., "GitHub Repository URL").
 *        * instructions: Clear step-by-step requirements & acceptance criteria.
 *    - quiz: Verification quiz questions (`answer` is 0-indexed, includes `explanation`).
 * ============================================================================
 */

const OPENBOX_COURSES = [
  // ==========================================================================
  // 1. MIT 6.0001: PYTHON & COMPUTER SCIENCE (WITH LECTURES, DOCS & PROBLEM SETS)
  // ==========================================================================
  {
    id: "mit-6-0001-python",
    title: "MIT 6.0001: Introduction to Computer Science & Programming in Python",
    category: "Development",
    typeBadge: "MIT OCW Curriculum • Certificate",
    isInternship: false,
    duration: "6–8 Weeks • 12 Lectures + 6 Problem Sets",
    level: "Beginner to Intermediate",
    techStack: ["Python 3", "Algorithms", "OOP", "Big-O Complexity", "Data Structures", "Recursion"],
    description:
      "Complete MIT OpenCourseWare (Fall 2016) computer science curriculum taught by Dr. Ana Bell and Prof. Eric Grimson. Covers computational thinking, Python 3 fundamentals, recursion, object-oriented design, asymptotic complexity, and classic sorting/searching algorithms with all 12 official lectures, slides, and problem sets.",

    // --- VIDEO LECTURES (ALL 12 YOUTUBE IDs & OCW LINKS VERIFIED) ---
    lectures: [
      {
        id: "mit-l01",
        title: "Lecture 1: What is Computation?",
        videoId: "nykOeWgQcHM",
        duration: "48 mins",
        description:
          "Covers the fundamentals of computation, declarative vs. imperative knowledge, stored-program computer architecture, syntax vs. semantics, scalar objects (int, float, bool), expressions, and variable bindings in Python.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-1-what-is-computation/",
        documentLabel: "Lecture 1 Slides & Python Code"
      },
      {
        id: "mit-l02",
        title: "Lecture 2: Branching and Iteration",
        videoId: "0jljZRnHwOI",
        duration: "44 mins",
        description:
          "Explores string concatenation and type casting, console input/output, comparison and boolean logic operators, indentation-based control flow (if/elif/else), and bounded vs. unbounded iteration using for and while loops.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-2-branching-and-iteration/",
        documentLabel: "Lecture 2 Slides & Code"
      },
      {
        id: "mit-l03",
        title: "Lecture 3: String Manipulation, Guess & Check, Bisection",
        videoId: "SE4P7IVCunE",
        duration: "50 mins",
        description:
          "Deep dive into string indexing, slicing, and immutability, followed by three core numerical problem-solving paradigms: exhaustive enumeration (guess-and-check), epsilon-based approximations, and logarithmic bisection search.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-3-string-manipulation-guess-and-check-approximations-bisection/",
        documentLabel: "Lecture 3 Slides & Code"
      },
      {
        id: "mit-l04",
        title: "Lecture 4: Decomposition, Abstractions, Functions",
        videoId: "MjbuarJ7SE0",
        duration: "53 mins",
        description:
          "Introduces modular program design through decomposition and abstraction, defining functions with formal parameters, docstrings/specifications, return vs. print behavior, call frames, and lexical variable scoping.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-4-decomposition-abstractions-functions/",
        documentLabel: "Lecture 4 Slides & Code"
      },
      {
        id: "mit-l05",
        title: "Lecture 5: Tuples, Lists, Aliasing, Mutability, Cloning",
        videoId: "RvRKT-jQgko",
        duration: "46 mins",
        description:
          "Contrasts immutable tuples against mutable lists in memory. Demonstrates how reference aliasing causes unintended side effects during iteration and how to safely clone sequences.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-cloning/",
        documentLabel: "Lecture 5 Slides & Code"
      },
      {
        id: "mit-l06",
        title: "Lecture 6: Recursion, Dictionaries",
        videoId: "WPSeyjX1-4s",
        duration: "42 mins",
        description:
          "Breaks down divide-and-conquer recursion using base cases and inductive steps (multiplication, factorial, Towers of Hanoi, Fibonacci) and introduces hash-based Python dictionaries for O(1) memoization.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-6-recursion-dictionaries/",
        documentLabel: "Lecture 6 Slides & Code"
      },
      {
        id: "mit-l07",
        title: "Lecture 7: Testing, Debugging, Exceptions, Assertions",
        videoId: "9H6muyznWU0",
        duration: "46 mins",
        description:
          "Covers defensive programming practices: unit/integration testing, black-box boundary conditions vs. glass-box path coverage, binary-search debugging, try/except/else/finally blocks, and precondition assertions.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-7-testing-debugging-exceptions-assertions/",
        documentLabel: "Lecture 7 Slides & Code"
      },
      {
        id: "mit-l08",
        title: "Lecture 8: Object Oriented Programming",
        videoId: "-DP1i2ZU9gk",
        duration: "47 mins",
        description:
          "Introduces data abstraction with custom Python classes, __init__ constructors, instance attributes, methods, self binding, and operator overloading with special dunder methods (__str__, __add__, __eq__).",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-8-object-oriented-programming/",
        documentLabel: "Lecture 8 Slides & Code"
      },
      {
        id: "mit-l09",
        title: "Lecture 9: Python Classes and Inheritance",
        videoId: "FlGjISF3l78",
        duration: "44 mins",
        description:
          "Explores information hiding via getters and setters, class-level shared variables vs. instance variables, parent-child inheritance hierarchies, method overriding, and polymorphic design.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-9-python-classes-and-inheritance/",
        documentLabel: "Lecture 9 Slides & Code"
      },
      {
        id: "mit-l10",
        title: "Lecture 10: Understanding Program Efficiency, Part 1",
        videoId: "o9nW0uBqvEo",
        duration: "49 mins",
        description:
          "Explains why wall-clock timing and operation counting are machine-dependent, introducing worst-case asymptotic analysis and Big-O notation to measure algorithmic scalability.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-10-understanding-program-efficiency-part-1/",
        documentLabel: "Lecture 10 Slides & Code"
      },
      {
        id: "mit-l11",
        title: "Lecture 11: Understanding Program Efficiency, Part 2",
        videoId: "7lbeVoqPs_E",
        duration: "49 mins",
        description:
          "Walks through formal complexity classes—O(1), O(log n), O(n), O(n log n), O(n^c), and O(c^n)—by analyzing iterative loops, bisection search, subset generation, and recursive functions.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-11-understanding-program-efficiency-part-2/",
        documentLabel: "Lecture 11 Slides & Code"
      },
      {
        id: "mit-l12",
        title: "Lecture 12: Searching and Sorting",
        videoId: "6LOwPhPDwcg",
        duration: "51 mins",
        description:
          "Compares linear search on unsorted lists vs. O(log n) binary search on sorted lists, then analyzes monkey sort, O(n^2) bubble/selection sort, and O(n log n) divide-and-conquer merge sort.",
        documentUrl:
          "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-12-searching-and-sorting/",
        documentLabel: "Lecture 12 Slides & Code"
      }
    ],

    // --- COURSE DOCUMENTS & WORKSHEETS ---
    documents: [
      {
        title: "MIT 6.0001 Official Syllabus & Reading Guide",
        type: "Syllabus",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/syllabus/"
      },
      {
        title: "Problem Set 0 Worksheet & Starter Files",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps0/"
      },
      {
        title: "Problem Set 1 Worksheet (House Hunting & Bisection)",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps1/"
      },
      {
        title: "Problem Set 2 Worksheet (Hangman Game)",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps2/"
      },
      {
        title: "Problem Set 3 Worksheet (6.0001 Word Game)",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps3/"
      },
      {
        title: "Problem Set 4 Worksheet (Recursion & Caesar Cipher)",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/"
      },
      {
        title: "Problem Set 5 Worksheet (RSS Feed Filter OOP)",
        type: "Worksheet",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps5/"
      },
      {
        title: "Official Python 3 Standard Library & Language Reference",
        type: "Guide",
        url: "https://docs.python.org/3/tutorial/index.html"
      }
    ],

    // --- GRADED ASSIGNMENTS / TASKS ---
    assignments: [
      {
        title: "Problem Set 0: Python Environment Setup & Arithmetic Expressions",
        deadline: "Module 1 Milestone",
        deliverable: "GitHub Repository URL (ps0.py)",
        instructions:
          "Configure Python 3 locally, prompt the user for integers x and y, compute x**y and math.log2(x), and format clean console output. Commit ps0.py to a public GitHub repository and submit the link."
      },
      {
        title: "Problem Set 1: House Hunting & Savings Bisection Search",
        deadline: "Module 2 Milestone",
        deliverable: "GitHub Repository URL (ps1a.py, ps1b.py, ps1c.py)",
        instructions:
          "Solve three progressive financial modeling tasks: (Part A) calculate months required to save for a down payment with compound returns; (Part B) factor in semi-annual salary raises; (Part C) implement bisection search to find the exact optimal savings rate within $100 accuracy in 36 months."
      },
      {
        title: "Problem Set 2: Interactive Hangman with Wildcard Hints",
        deadline: "Module 3 Milestone",
        deliverable: "GitHub Repository URL (hangman.py)",
        instructions:
          "Build a terminal-based Hangman game loading words.txt. Enforce guess limits, penalize vowel vs. consonant misses accurately, track guessed letters, and implement the '*' wildcard hint command to display all matching candidate words."
      },
      {
        title: "Problem Set 4: Recursive Permutations & Caesar Cipher OOP",
        deadline: "Module 4 Milestone",
        deliverable: "GitHub Repository URL (ps4a.py, ps4b.py, ps4c.py)",
        instructions:
          "Write a recursive function generating all permutations of a string, then design Message, PlaintextMessage, and CiphertextMessage classes to encrypt and automatically decrypt Caesar-shifted text using dictionary validation."
      },
      {
        title: "Problem Set 5: Real-Time RSS Feed Filter & Trigger Engine (OOP)",
        deadline: "Capstone Assignment",
        deliverable: "GitHub Repository URL (ps5.py)",
        instructions:
          "Architect an object-oriented news alert system. Implement abstract Trigger base classes, TitleTrigger/DescriptionTrigger phrase matching, BeforeTrigger/AfterTrigger timestamp comparisons, and composite NotTrigger, AndTrigger, and OrTrigger logic."
      }
    ],

    // --- VERIFICATION QUIZ (8 COMPREHENSIVE QUESTIONS) ---
    quiz: [
      {
        question: "Which Python built-in sequence type is immutable once created?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        answer: 2,
        explanation: "Tuples are immutable sequences in Python; attempting to reassign an element raises a TypeError."
      },
      {
        question: "If `L1 = [1, 2, 3]` and `L2 = L1`, what happens after `L2.append(4)`?",
        options: [
          "Only L2 becomes [1, 2, 3, 4]; L1 remains [1, 2, 3]",
          "Both L1 and L2 evaluate to [1, 2, 3, 4] due to aliasing",
          "Python raises a MemoryAliasError",
          "L1 becomes [4, 1, 2, 3]"
        ],
        answer: 1,
        explanation: "Assigning `L2 = L1` binds both names to the same mutable list object in memory rather than cloning it."
      },
      {
        question: "Why does bisection search fail if applied to an unsorted list?",
        options: [
          "Bisection search requires elements to be integers",
          "It relies on monotonic ordering to safely discard half the search space each step",
          "Python's // operator only works on sorted arrays",
          "Unsorted lists cannot be indexed in O(1) time"
        ],
        answer: 1,
        explanation: "Discarding the left or right half at the midpoint is only valid when all elements on one side are guaranteed to be smaller or larger."
      },
      {
        question: "What are the two essential components of every valid recursive function?",
        options: [
          "A for-loop and a global counter",
          "One or more base cases and a recursive step that moves toward a base case",
          "A try/except block and a class constructor",
          "A dictionary cache and a lambda expression"
        ],
        answer: 1,
        explanation: "Without a reachable base case and a strictly smaller subproblem in the recursive step, recursion triggers a RecursionError."
      },
      {
        question: "In Python OOP, what is the primary purpose of the `__init__` method?",
        options: [
          "To destroy an object when it goes out of scope",
          "To initialize a newly created instance's attributes",
          "To convert an object into a printable string",
          "To import external modules into a class"
        ],
        answer: 1,
        explanation: "`__init__` is Python's instance initializer, automatically invoked when instantiating a class to bind initial state to `self`."
      },
      {
        question: "What is the worst-case asymptotic time complexity of Binary Search on a sorted list of length n?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 1,
        explanation: "Each comparison halves the remaining search interval, taking at most log2(n) steps."
      },
      {
        question: "Which sorting algorithm divides a list recursively into halves and merges them in O(n log n) worst-case time?",
        options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Monkey Sort"],
        answer: 2,
        explanation: "Merge Sort splits the array log2(n) times and performs O(n) linear merges at each level, yielding O(n log n) complexity."
      },
      {
        question: "What distinguishes glass-box testing from black-box testing?",
        options: [
          "Glass-box tests are written without seeing the source code",
          "Glass-box tests are designed using knowledge of internal code paths, branches, and loops",
          "Glass-box testing only checks UI styling",
          "Black-box testing requires modifying production functions"
        ],
        answer: 1,
        explanation: "Glass-box (white-box) test suites inspect the implementation directly to exercise every conditional branch and loop boundary."
      }
    ]
  },

  // ==========================================================================
  // 2. FULL-STACK SOFTWARE ENGINEERING TASK-BASED INTERNSHIP
  // ==========================================================================
  {
    id: "swe-internship-sprint",
    title: "Full-Stack Software Engineering Internship",
    category: "Internship",
    typeBadge: "4-Week Task Internship • Verified GitHub Portfolio",
    isInternship: true,
    duration: "4 Weeks • 4 Production Sprints",
    level: "Intermediate",
    techStack: ["React", "Node.js", "Express", "Git & GitHub", "REST APIs", "JSON"],
    description:
      "Simulate an industry engineering sprint over 4 weeks. Master professional Git workflows, build responsive React interfaces, design resilient Node.js/Express REST APIs, and pass mentor code reviews with verifiable GitHub pull requests.",

    lectures: [
      {
        id: "swe-1",
        title: "01. Git Workflow, Branching & Production Code Standards",
        videoId: "mAFoROnOfHs",
        duration: "1 hr 21 mins",
        description:
          "Master end-to-end Git and GitHub collaboration: staging, atomic commits, feature branching, resolving merge conflicts, stashing, rebasing, and opening clean Pull Requests for code review.",
        documentUrl: "https://github.com/aviral-hub/openboxgrowthpartner",
        documentLabel: "Openbox Starter Repository"
      },
      {
        id: "swe-2",
        title: "02. Building RESTful APIs with Node.js & Express",
        videoId: "pKd0Rpw7O48",
        duration: "56 mins",
        description:
          "Architect production-ready REST endpoints using Express.js. Covers HTTP methods (GET, POST, PUT, DELETE), route parameters, request payload validation, middleware, and proper HTTP status codes.",
        documentUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
        documentLabel: "MDN HTTP Status Codes Reference"
      },
      {
        id: "swe-3",
        title: "03. Modern JavaScript & Asynchronous State Fundamentals",
        videoId: "W6NZfCO5SIk",
        duration: "48 mins",
        description:
          "Solidify core JavaScript patterns required for React and Node.js: closures, objects, array transformations, ES6 modules, and clean state updates.",
        documentUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        documentLabel: "MDN JavaScript Developer Guide"
      }
    ],

    documents: [
      {
        title: "Openbox Official Starter Repository & Contribution Setup",
        type: "GitHub Repo",
        url: "https://github.com/aviral-hub/openboxgrowthpartner"
      },
      {
        title: "GitHub Pull Request & Code Review Best Practices",
        type: "Guide",
        url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"
      },
      {
        title: "MDN Web Docs: HTTP Request Methods & REST Semantics",
        type: "Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods"
      },
      {
        title: "Express.js Official Routing & Error Handling Documentation",
        type: "Guide",
        url: "https://expressjs.com/en/guide/routing.html"
      }
    ],

    assignments: [
      {
        title: "Task 01: Distributed Task Board UI & Local State Persistence",
        deadline: "Week 1 Milestone",
        deliverable: "GitHub PR Link + Live Preview URL",
        instructions:
          "Fork the Openbox repository, create a `feat/task-board` branch, and build a responsive Kanban/task manager supporting status filters (All, Active, Completed), priority badges, and localStorage persistence. Submit a Pull Request with atomic commits."
      },
      {
        title: "Task 02: RESTful Backend API & Schema Validation",
        deadline: "Week 2 Milestone",
        deliverable: "GitHub PR Link (server/ directory)",
        instructions:
          "Build an Express.js REST API supporting CRUD operations (`/api/tasks`), input validation returning 400 Bad Request on malformed payloads, and centralized error-handling middleware."
      },
      {
        title: "Task 03: Full-Stack Integration, Loading Skeletons & Retry States",
        deadline: "Week 3 Milestone",
        deliverable: "GitHub PR Link",
        instructions:
          "Connect your React frontend to your Express backend. Implement optimistic UI updates, shimmer loading skeletons, and graceful error banners with retry actions when network calls fail."
      },
      {
        title: "Task 04: Capstone Feature Delivery & Production README",
        deadline: "Week 4 Final Evaluation",
        deliverable: "Complete Repository + Architecture README.md",
        instructions:
          "Add search/debounce filtering and authentication middleware (JWT or API key), write comprehensive setup and API endpoint documentation in README.md, and pass final mentor code review."
      }
    ],

    quiz: [
      {
        question: "Which Git command creates a new branch and immediately switches your working tree to it?",
        options: [
          "git branch feat/api",
          "git checkout -b feat/api",
          "git merge feat/api",
          "git init feat/api"
        ],
        answer: 1,
        explanation: "`git checkout -b <branch>` (or `git switch -c <branch>`) creates the branch and checks it out in a single step."
      },
      {
        question: "Which HTTP status code should a REST API return when a client submits invalid JSON payload fields?",
        options: ["200 OK", "201 Created", "400 Bad Request", "502 Bad Gateway"],
        answer: 2,
        explanation: "400 Bad Request indicates a client-side validation or syntax error in the request payload."
      },
      {
        question: "What is the key difference between `git fetch` and `git pull`?",
        options: [
          "`git fetch` deletes local branches, while `git pull` creates new ones",
          "`git fetch` downloads remote commits without modifying working files, while `git pull` fetches and merges/rebases immediately",
          "`git pull` only works on private repositories",
          "There is no difference; they are exact aliases"
        ],
        answer: 1,
        explanation: "`git fetch` updates remote-tracking branches safely so you can inspect changes before merging."
      },
      {
        question: "Which HTTP method is idempotent and typically used to completely replace an existing resource?",
        options: ["POST", "PUT", "CONNECT", "TRACE"],
        answer: 1,
        explanation: "PUT replaces the target resource with the request payload and produces the same server state if repeated."
      },
      {
        question: "Why should React state updates never mutate arrays or objects directly (e.g., `items.push(x)`)?",
        options: [
          "JavaScript arrays do not support `.push()` inside functions",
          "React relies on shallow reference comparison to detect state changes and trigger re-renders",
          "Mutating state automatically deletes localStorage",
          "Node.js blocks in-place array mutations"
        ],
        answer: 1,
        explanation: "Because React compares object references (`Object.is`), in-place mutation leaves the reference unchanged and skips re-rendering."
      }
    ]
  },

  // ==========================================================================
  // 3. BUSINESS ANALYTICS & GROWTH PIPELINE INTERNSHIP
  // ==========================================================================
  {
    id: "business-analytics-internship",
    title: "Business Analytics & Growth Pipeline Internship",
    category: "Internship",
    typeBadge: "4-Week Analytics Internship • Executive Case Portfolio",
    isInternship: true,
    duration: "4 Weeks • 4 Case Deliverables",
    level: "Beginner to Intermediate",
    techStack: ["SQL", "Google Sheets / Excel", "SaaS Unit Economics", "Cohort Analysis", "Funnel Attribution"],
    description:
      "Analyze real-world B2B/B2C startup funnel datasets, write analytical SQL queries, build dynamic cohort retention spreadsheets, and deliver executive growth memos backed by unit economics.",

    lectures: [
      {
        id: "ba-1",
        title: "01. SaaS Metrics, CAC, LTV, Churn & Unit Economics",
        videoId: "hyC9WOKzUMc",
        duration: "14 mins",
        description:
          "Understand the core metrics every growth operator and investor tracks: MRR, ARR, gross vs. net logo churn, Customer Acquisition Cost (CAC), Lifetime Value (LTV), and CAC payback period.",
        documentUrl: "https://sheets.new",
        documentLabel: "Launch Blank Google Sheet Workspace"
      },
      {
        id: "ba-2",
        title: "02. SQL for Data Analytics: Aggregations, Joins & CTEs",
        videoId: "7mz73uXD9DA",
        duration: "4 hrs 05 mins",
        description:
          "Hands-on analytical SQL training covering SELECT filtering, GROUP BY/HAVING aggregations, multi-table JOINs, CASE WHEN segmentation, and Common Table Expressions (CTEs) for funnel reporting.",
        documentUrl: "https://www.postgresql.org/docs/current/tutorial-sql.html",
        documentLabel: "PostgreSQL Analytical SQL Reference"
      }
    ],

    documents: [
      {
        title: "Create New Cohort & Funnel Model (Google Sheets)",
        type: "Template",
        url: "https://sheets.new"
      },
      {
        title: "PostgreSQL Official SQL Query & Window Functions Guide",
        type: "Guide",
        url: "https://www.postgresql.org/docs/current/tutorial-window.html"
      },
      {
        title: "Google Sheets QUERY & Pivot Table Function Reference",
        type: "Cheat Sheet",
        url: "https://support.google.com/docs/answer/3093343"
      }
    ],

    assignments: [
      {
        title: "Task 01: 4-Stage E-Commerce Funnel Drop-Off & Channel Audit",
        deadline: "Week 1 Milestone",
        deliverable: "Shared Google Sheet Link (View Access)",
        instructions:
          "Build a dynamic funnel conversion model tracking Visitor -> Signup -> Activation -> Paid Conversion across 4 acquisition channels (Organic, Paid Search, LinkedIn, Referral). Identify the highest-leakage stage and quantify revenue upside from a 5% conversion lift."
      },
      {
        title: "Task 02: SQL Revenue & Customer Segmentation Queries",
        deadline: "Week 2 Milestone",
        deliverable: "SQL Script (.sql) or GitHub Gist URL",
        instructions:
          "Write clean, commented SQL queries using CTEs and JOINs to compute monthly recurring revenue (MRR), top 10% revenue-generating accounts, and 30-day inactive churn risk flags."
      },
      {
        title: "Task 03: Monthly Logo & Net Dollar Retention Cohort Matrix",
        deadline: "Week 3 Milestone",
        deliverable: "Shared Google Sheet Link (Cohort Tab)",
        instructions:
          "Construct a 6-month triangular retention heatmap cohort table using dynamic formulas (`INDEX/MATCH` or `SUMIFS`). Highlight Month-1 vs. Month-3 retention stabilization."
      },
      {
        title: "Task 04: Executive Growth Strategy Memo (LTV:CAC Optimization)",
        deadline: "Week 4 Capstone",
        deliverable: "1-Page Executive Memo + Sensitivity Table",
        instructions:
          "Synthesize your funnel and cohort findings into an executive recommendation memo. Include a sensitivity table modeling how reducing CAC by 15% or cutting monthly churn by 1.5% impacts LTV:CAC and payback months."
      }
    ],

    quiz: [
      {
        question: "What does an LTV:CAC ratio of 4:1 generally indicate for a SaaS business?",
        options: [
          "Customer acquisition is unprofitable and losing cash on every signup",
          "Customer lifetime gross profit strongly outweighs acquisition cost with healthy unit economics",
          "Monthly customer churn is 100%",
          "The company has zero marketing spend"
        ],
        answer: 1,
        explanation: "A benchmark LTV:CAC ratio of 3:1 to 4:1 indicates strong unit economics where generated customer value comfortably exceeds acquisition expense."
      },
      {
        question: "How is Customer Acquisition Cost (CAC) calculated for a given period?",
        options: [
          "Total Revenue / Total Active Users",
          "(Total Sales + Marketing Spend) / Number of New Customers Acquired",
          "Average Order Value × Gross Margin %",
          "Churned Customers / Starting Customers"
        ],
        answer: 1,
        explanation: "CAC divides total go-to-market sales and marketing expenses by the exact count of new paying customers acquired in that timeframe."
      },
      {
        question: "In SQL, what is the difference between `WHERE` and `HAVING`?",
        options: [
          "`WHERE` filters rows before `GROUP BY` aggregation; `HAVING` filters grouped results after aggregation",
          "`HAVING` runs before `FROM`",
          "`WHERE` can only be used with `LEFT JOIN`",
          "They are interchangeable in all SQL dialects"
        ],
        answer: 0,
        explanation: "`WHERE` filters individual raw records prior to grouping, whereas `HAVING` filters aggregated group metrics such as `COUNT(*) > 5`."
      },
      {
        question: "Why is cohort retention analysis superior to looking only at blended total active users?",
        options: [
          "Cohort analysis hides churn in older user groups",
          "Rapid top-of-funnel acquisition can mask severe early churn unless users are tracked by signup month",
          "Blended totals cannot be calculated in SQL or spreadsheets",
          "Cohort tables only measure website pageviews"
        ],
        answer: 1,
        explanation: "High new-user acquisition can make overall user counts grow even while older cohorts churn rapidly; cohort tables isolate true retention."
      },
      {
        question: "If a subscription product has a 5% monthly customer churn rate, what is its implied average customer lifetime?",
        options: ["5 months", "10 months", "20 months", "50 months"],
        answer: 2,
        explanation: "Implied average lifetime equals `1 / Monthly Churn Rate` = `1 / 0.05` = 20 months."
      }
    ]
  },

  // ==========================================================================
  // 4. APPLIED AI ENGINEERING & LLM AUTOMATION SPRINT
  // ==========================================================================
  {
    id: "applied-ai-llm-automation",
    title: "Applied AI Engineering & LLM Workflow Automation",
    category: "Development",
    typeBadge: "AI Engineering Track • Certificate",
    isInternship: false,
    duration: "4 Weeks • 4 Lectures + 4 AI Builds",
    level: "Intermediate",
    techStack: ["LLMs", "Prompt Engineering", "RAG", "Vector Embeddings", "Function Calling", "n8n / APIs"],
    description:
      "Design production-grade AI applications beyond basic chat wrappers. Learn transformer tokenization, structured JSON outputs, Retrieval-Augmented Generation (RAG) with vector embeddings, and automated multi-step AI agent pipelines.",

    lectures: [
      {
        id: "ai-l01",
        title: "01. Intro to Large Language Models: Tokenization, Context & Scaling",
        videoId: "zjkBMFhNj_g",
        duration: "59 mins",
        description:
          "Andrej Karpathy's architectural walkthrough of how LLMs work under the hood: next-token prediction, pre-training vs. supervised fine-tuning (SFT), RLHF, context windows, and LLM security considerations.",
        documentUrl: "https://platform.openai.com/docs/guides/prompt-engineering",
        documentLabel: "Prompt Engineering & LLM Best Practices"
      },
      {
        id: "ai-l02",
        title: "02. Prompt Engineering & Structured JSON Output Design",
        videoId: "_ZvnD73m40o",
        duration: "41 mins",
        description:
          "Master deterministic prompting patterns for production apps: system personas, few-shot examples, chain-of-thought reasoning, delimiter isolation, and strict JSON schema enforcement.",
        documentUrl: "https://platform.openai.com/docs/guides/structured-outputs",
        documentLabel: "Structured JSON Outputs Guide"
      },
      {
        id: "ai-l03",
        title: "03. Retrieval-Augmented Generation (RAG) & Vector Databases",
        videoId: "T-D1OfcDW1M",
        duration: "10 mins",
        description:
          "Understand how RAG grounds LLM responses in proprietary documents without retraining: document chunking strategies, dense vector embeddings, cosine similarity search, and citation synthesis.",
        documentUrl: "https://supabase.com/docs/guides/ai",
        documentLabel: "Supabase pgvector & AI Embeddings Docs"
      },
      {
        id: "ai-l04",
        title: "04. Prompt Evaluation Pipelines & LLM Guardrails",
        videoId: "8hW-OjwpwMk",
        duration: "16 mins",
        description:
          "Design automated evaluation benchmarks, schema validation checks, and input/output guardrails to ship reliable LLM workflows in production.",
        documentUrl: "https://docs.n8n.io/advanced-ai/",
        documentLabel: "n8n LangChain & AI Agent Nodes Docs"
      }
    ],

    documents: [
      {
        title: "OpenAI Official Prompt Engineering & System Design Guide",
        type: "Guide",
        url: "https://platform.openai.com/docs/guides/prompt-engineering"
      },
      {
        title: "Supabase Vector Embeddings & pgvector Architecture Guide",
        type: "Guide",
        url: "https://supabase.com/docs/guides/ai"
      },
      {
        title: "n8n AI Agents, Memory & Tool-Calling Workflow Reference",
        type: "Guide",
        url: "https://docs.n8n.io/advanced-ai/"
      },
      {
        title: "Hugging Face NLP & Transformers Course Handbook",
        type: "Syllabus",
        url: "https://huggingface.co/learn/nlp-course/chapter1/1"
      }
    ],

    assignments: [
      {
        title: "Task 01: Structured Invoice & Resume Parser (JSON Schema)",
        deadline: "Week 1 Milestone",
        deliverable: "GitHub Repository URL (Python/JS Script)",
        instructions:
          "Build an LLM extraction pipeline that ingests unstructured PDF/text resumes or invoices and returns strictly validated JSON containing candidate skills, experience years, or line-item totals with zero conversational filler."
      },
      {
        title: "Task 02: Document Q&A Knowledge Assistant with Citations (RAG)",
        deadline: "Week 2 Milestone",
        deliverable: "GitHub Repository URL + Demo Screenshot",
        instructions:
          "Chunk a multi-page company handbook or syllabus, generate embeddings, store them in a vector index (e.g., Supabase pgvector or FAISS), and build a Q&A endpoint that cites exact source sections and refuses unsupported answers."
      },
      {
        title: "Task 03: Automated Lead-Triage & Email Drafting Pipeline",
        deadline: "Week 3 Milestone",
        deliverable: "n8n Workflow JSON Export or Webhook Script",
        instructions:
          "Create an automated workflow triggered by incoming form submissions that classifies user intent, scores urgency (High/Medium/Low), logs structured fields to Google Sheets, and drafts a tailored reply."
      },
      {
        title: "Task 04: Capstone Multi-Tool AI Research & Briefing Agent",
        deadline: "Week 4 Capstone",
        deliverable: "GitHub Repository + Evaluation Test Log",
        instructions:
          "Combine RAG retrieval and function calling into a unified assistant that queries internal data and formats an executive summary. Include a 10-prompt evaluation test suite measuring accuracy and hallucination rate."
      }
    ],

    quiz: [
      {
        question: "What is the primary purpose of Retrieval-Augmented Generation (RAG) in production AI systems?",
        options: [
          "To permanently modify the neural network weights of an LLM",
          "To inject relevant external documents into the prompt context so responses are grounded in up-to-date, verifiable facts",
          "To compress video files into plain text",
          "To eliminate the need for tokenization"
        ],
        answer: 1,
        explanation: "RAG retrieves top-matching knowledge chunks at query time and supplies them in context, reducing hallucinations without expensive model retraining."
      },
      {
        question: "How do vector embeddings enable semantic search over text chunks?",
        options: [
          "By matching exact alphabetical spelling only",
          "By mapping text into high-dimensional numerical vectors where semantically similar concepts sit close together in vector space",
          "By sorting strings by character length",
          "By converting text into SQL primary keys"
        ],
        answer: 1,
        explanation: "Dense embeddings capture semantic meaning so queries like 'refund policy' match passages discussing 'money-back guarantee' via cosine similarity."
      },
      {
        question: "What effect does lowering the `temperature` parameter (e.g., from 0.9 to 0.0) have on LLM generation?",
        options: [
          "It increases randomness and creative word diversity",
          "It makes token selection more deterministic by favoring the highest-probability next tokens",
          "It doubles the maximum context window size",
          "It disables system prompt instructions"
        ],
        answer: 1,
        explanation: "Low temperature sharpens the probability distribution over candidate tokens, making outputs consistent and ideal for extraction or classification."
      },
      {
        question: "Why is document chunk size and overlap critical when indexing knowledge for RAG?",
        options: [
          "Chunks larger than 10 words cannot be embedded",
          "Poorly sized chunks either split key context across boundaries or dilute retrieval precision with unrelated noise",
          "Overlap deletes duplicate vectors automatically",
          "Chunking is only required for image files"
        ],
        answer: 1,
        explanation: "Balanced chunk sizes with 10–20% overlap preserve cross-boundary sentence context while keeping retrieved passages focused."
      },
      {
        question: "In LLM tool/function calling, what actually executes the external API or database query?",
        options: [
          "The LLM weights execute HTTP requests directly inside the GPU",
          "The LLM outputs a structured JSON function name and arguments, and your application backend executes the code and returns the result",
          "The browser CSS engine runs the function",
          "No code is executed; the LLM guesses the database output"
        ],
        answer: 1,
        explanation: "LLMs only emit structured tool-call intents; the host application orchestrator runs the actual function and feeds the output back into the conversation loop."
      },
      {
        question: "Which defensive practice best prevents prompt injection when processing untrusted user text?",
        options: [
          "Concatenating raw user input directly into system-level instructions without delimiters",
          "Separating system instructions from delimited user data and validating structured output schemas before triggering downstream actions",
          "Setting temperature to 2.0",
          "Removing all system prompts"
        ],
        answer: 1,
        explanation: "Clear instruction/data boundaries, strict schema validation, and least-privilege tool permissions prevent untrusted input from hijacking agent actions."
      }
    ]
  },

  // ==========================================================================
  // 5. PERFORMANCE MARKETING, SEO & GROWTH ACQUISITION SPRINT
  // ==========================================================================
  {
    id: "performance-marketing-growth-sprint",
    title: "Performance Marketing, Technical SEO & Growth Acquisition",
    category: "Marketing",
    typeBadge: "Growth Marketing Track • Certificate",
    isInternship: false,
    duration: "4 Weeks • 4 Lectures + 4 Campaign Builds",
    level: "Beginner to Intermediate",
    techStack: ["Technical SEO", "Google Ads", "Meta Ads", "GA4 Attribution", "CRO", "Email Funnels"],
    description:
      "Master full-funnel digital customer acquisition from search intent to paid conversion. Learn keyword clustering and technical SEO, structure high-ROAS Google and Meta ad campaigns, configure GA4 event tracking, and optimize landing pages for conversion rate lift.",

    // --- VERIFIED VIDEO LECTURES ---
    lectures: [
      {
        id: "mkt-l01",
        title: "01. Search Engine Optimization (SEO): Keyword Research, On-Page & Backlinks",
        videoId: "xsVTqzratPs",
        duration: "32 mins",
        description:
          "Ahrefs complete SEO framework covering search intent classification, long-tail keyword discovery, on-page heading/meta optimization, internal linking architecture, and high-authority link building.",
        documentUrl: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        documentLabel: "Google Search Central SEO Starter Guide"
      },
      {
        id: "mkt-l02",
        title: "02. Google Ads & Paid Search Campaign Architecture",
        videoId: "16X5a0Ii7kg",
        duration: "1 hr 12 mins",
        description:
          "Step-by-step paid search setup: campaign bidding strategies (Target CPA & Maximize Conversions), ad group structuring, match types, negative keyword pruning, and Quality Score optimization.",
        documentUrl: "https://support.google.com/google-ads/answer/6146252",
        documentLabel: "Google Ads Campaign Structure Documentation"
      },
      {
        id: "mkt-l03",
        title: "03. Meta Ads (Facebook & Instagram) Creative Testing & Retargeting",
        videoId: "dAJyqo6wnq4",
        duration: "52 mins",
        description:
          "Build full-funnel social acquisition campaigns using Advantage+ audiences, hook-body-CTA ad creative frameworks, custom retargeting windows, and pixel/CAPI conversion event verification.",
        documentUrl: "https://www.facebook.com/business/help/112061095610075",
        documentLabel: "Meta Business Ads Manager Blueprint Guide"
      },
      {
        id: "mkt-l04",
        title: "04. Google Analytics 4 (GA4), UTM Tracking & Conversion Rate Optimization",
        videoId: "pRKpaZJJRxk",
        duration: "46 mins",
        description:
          "Configure custom conversion events in GA4, enforce strict UTM taxonomy across paid and organic links, diagnose landing page drop-offs, and design A/B split tests to maximize checkout/lead conversion rates.",
        documentUrl: "https://support.google.com/analytics/answer/9304153",
        documentLabel: "GA4 Setup & Conversion Event Reference"
      }
    ],

    // --- OFFICIAL GUIDES & TEMPLATES ---
    documents: [
      {
        title: "Google Search Central: Official SEO Starter & Indexing Guide",
        type: "Guide",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
      },
      {
        title: "Google Campaign URL Builder (UTM Parameter Generator)",
        type: "Template",
        url: "https://ga-dev-tools.google/campaign-url-builder/"
      },
      {
        title: "GA4 Custom Events & Conversion Tracking Documentation",
        type: "Guide",
        url: "https://support.google.com/analytics/answer/9304153"
      },
      {
        title: "Media Buying & ROAS / CPA Budget Planner (Google Sheets)",
        type: "Template",
        url: "https://sheets.new"
      }
    ],

    // --- GRADED CAMPAIGN ASSIGNMENTS ---
    assignments: [
      {
        title: "Task 01: SEO Keyword Cluster & Technical Page Audit",
        deadline: "Week 1 Milestone",
        deliverable: "Shared Google Sheet + Audit Doc Link",
        instructions:
          "Select a target product or SaaS landing page. Map 20 commercial/informational keywords grouped into 4 topic clusters, rewrite the Title Tag, Meta Description, and H1–H3 hierarchy, and document 5 technical SEO fixes (Core Web Vitals, schema markup, canonicals)."
      },
      {
        title: "Task 02: High-Intent Google Search Campaign Blueprint",
        deadline: "Week 2 Milestone",
        deliverable: "Shared Google Sheet (Campaign Structure)",
        instructions:
          "Design a complete Google Search campaign containing 3 tightly themed ad groups, 15 exact/phrase match keywords, 10 negative keywords, 3 Responsive Search Ad (RSA) headline/description variations, and a 30-day daily budget/CPA forecast."
      },
      {
        title: "Task 03: Meta Ads Creative Matrix & Retargeting Funnel",
        deadline: "Week 3 Milestone",
        deliverable: "Notion/Google Doc Brief + UTM Sheet",
        instructions:
          "Draft 3 distinct ad angles (Pain-Point Hook, Social Proof/Case Study, Direct Offer) with primary text, visual storyboard, and CTA. Pair each ad with standardized UTM parameters generated via Google's Campaign URL Builder."
      },
      {
        title: "Task 04: Capstone CRO Landing Page Tear-Down & A/B Test Plan",
        deadline: "Week 4 Capstone",
        deliverable: "1-Page CRO Proposal + Wireframe/Checklist",
        instructions:
          "Audit a live signup or checkout funnel across hero clarity, trust signals, form friction, and mobile speed. Propose 3 prioritized A/B experiments ranked by ICE score (Impact, Confidence, Ease) with clear primary conversion metrics."
      }
    ],

    // --- VERIFICATION QUIZ (6 QUESTIONS) ---
    quiz: [
      {
        question: "What is the primary goal of classifying keywords by 'Search Intent' before creating SEO content?",
        options: [
          "To stuff as many exact-match keywords into the footer as possible",
          "To match page format and depth to what the searcher actually wants (informational guide vs. commercial product page)",
          "To block search engine crawlers from indexing blog posts",
          "To increase bounce rate on landing pages"
        ],
        answer: 1,
        explanation: "Search engines rank pages that satisfy user intent; an informational query requires a tutorial, whereas a transactional query requires a product or pricing page."
      },
      {
        question: "Why are Negative Keywords critical in a Google Search Ads campaign?",
        options: [
          "They automatically double your daily ad budget",
          "They prevent your ads from triggering on irrelevant search queries, eliminating wasted ad spend and improving CTR",
          "They lower your landing page load speed",
          "They force ads to show only on mobile devices"
        ],
        answer: 1,
        explanation: "Adding negative keywords (e.g., 'free', 'jobs', 'torrent') blocks unqualified clicks and raises overall campaign conversion rate."
      },
      {
        question: "If an ad campaign spends ₹20,000 and generates ₹80,000 in attributed revenue, what is its ROAS?",
        options: ["0.25x", "2.0x", "4.0x", "60.0x"],
        answer: 2,
        explanation: "Return on Ad Spend (ROAS) = Attributed Revenue / Ad Spend = ₹80,000 / ₹20,000 = 4.0x (400%)."
      },
      {
        question: "Which three UTM parameters are required to accurately attribute traffic source, channel medium, and specific ad campaign in GA4?",
        options: [
          "utm_author, utm_date, utm_color",
          "utm_source, utm_medium, utm_campaign",
          "utm_host, utm_port, utm_protocol",
          "utm_pixel, utm_cookie, utm_session"
        ],
        answer: 1,
        explanation: "`utm_source` (e.g., linkedin), `utm_medium` (e.g., cpc or email), and `utm_campaign` (e.g., spring_launch) form the standard GA4 acquisition attribution trio."
      },
      {
        question: "In Conversion Rate Optimization (CRO), what does 'ad-to-page message match' refer to?",
        options: [
          "Using the exact same font file on every website on the internet",
          "Ensuring the landing page headline, offer, and visuals directly mirror the promise made in the ad the user clicked",
          "Sending all paid traffic to the company's Privacy Policy page",
          "Running the same ad copy for 5 years without changes"
        ],
        answer: 1,
        explanation: "Strong message match reassures visitors they landed in the right place, preventing immediate bounce and lifting form/checkout completion."
      },
      {
        question: "What does a canonical tag (`rel=\"canonical\"`) communicate to search engine crawlers?",
        options: [
          "That the page should be deleted from the server",
          "Which URL represents the master/preferred version when duplicate or parameterized URLs exist",
          "That all external links on the page are paid advertisements",
          "The exact pixel dimensions of hero images"
        ],
        answer: 1,
        explanation: "Canonical tags consolidate ranking signals onto a single authoritative URL so duplicate query-string URLs don't dilute SEO equity."
      }
    ]
  },

  // ==========================================================================
  // 6. DIGITAL MARKETING & CLIENT GROWTH TASK-BASED INTERNSHIP
  // ==========================================================================
  {
    id: "digital-marketing-growth-internship",
    title: "Digital Marketing & Client Growth Internship",
    category: "Marketing",
    typeBadge: "4-Week Marketing Internship • Verified Campaign Portfolio",
    isInternship: true,
    duration: "4 Weeks • 4 Client Growth Sprints",
    level: "Beginner to Intermediate",
    techStack: ["SEO Audits", "Google Ads", "Meta Ads", "GA4 & UTMs", "Copywriting", "Email Automation"],
    description:
      "Execute real-world client acquisition sprints over 4 weeks. Conduct live technical SEO & competitor audits, build high-intent search and social ad campaigns, configure GA4 attribution, and deliver a complete 30-day growth playbook.",

    // --- VERIFIED VIDEO LECTURES ---
    lectures: [
      {
        id: "mkt-int-01",
        title: "01. Client Acquisition Strategy, ICP Positioning & Offer Design",
        videoId: "xsVTqzratPs",
        duration: "32 mins",
        description:
          "Define Ideal Customer Profiles (ICPs), map search and social demand capture channels, and structure high-converting agency/startup acquisition offers.",
        documentUrl: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        documentLabel: "Google Search Central SEO Starter Guide"
      },
      {
        id: "mkt-int-02",
        title: "02. Search Campaign Execution, Keyword Bidding & Negative Pruning",
        videoId: "16X5a0Ii7kg",
        duration: "1 hr 12 mins",
        description:
          "Launch and optimize Google Search campaigns for real client budgets: match-type control, Responsive Search Ad copy testing, search term reports, and CPA reduction.",
        documentUrl: "https://support.google.com/google-ads/answer/6146252",
        documentLabel: "Google Ads Campaign Architecture Docs"
      },
      {
        id: "mkt-int-03",
        title: "03. Paid Social Creative Testing & Retargeting Pipelines",
        videoId: "dAJyqo6wnq4",
        duration: "52 mins",
        description:
          "Design thumb-stopping Meta ad creatives, structure cold prospecting vs. warm retargeting ad sets, and diagnose CTR, CPM, and hook-rate bottlenecks.",
        documentUrl: "https://www.facebook.com/business/help/112061095610075",
        documentLabel: "Meta Business Ads Manager Guide"
      },
      {
        id: "mkt-int-04",
        title: "04. GA4 Attribution, UTM Governance & Client Reporting",
        videoId: "pRKpaZJJRxk",
        duration: "46 mins",
        description:
          "Track end-to-end lead and revenue attribution in Google Analytics 4, enforce clean UTM naming conventions, and build weekly executive ROAS/CAC scorecards.",
        documentUrl: "https://support.google.com/analytics/answer/9304153",
        documentLabel: "GA4 Conversion Tracking Reference"
      }
    ],

    // --- OFFICIAL GUIDES & TEMPLATES ---
    documents: [
      {
        title: "Google Campaign URL Builder (UTM Governance Tool)",
        type: "Template",
        url: "https://ga-dev-tools.google/campaign-url-builder/"
      },
      {
        title: "Google Search Central: Technical SEO & Indexing Checklist",
        type: "Guide",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
      },
      {
        title: "GA4 Events & Conversion Attribution Setup Guide",
        type: "Guide",
        url: "https://support.google.com/analytics/answer/9304153"
      },
      {
        title: "Client ROAS, CPA & Funnel Pacing Tracker (Google Sheets)",
        type: "Template",
        url: "https://sheets.new"
      }
    ],

    // --- GRADED INTERNSHIP SPRINT DELIVERABLES ---
    assignments: [
      {
        title: "Sprint 01: Competitor Teardown & 30-Point SEO Audit",
        deadline: "Week 1 Milestone",
        deliverable: "Shared Google Doc + Keyword Sheet",
        instructions:
          "Audit an active business website against 2 direct competitors. Deliver a 30-point on-page/technical SEO checklist, 15 high-intent target keywords, and rewritten H1/meta tags."
      },
      {
        title: "Sprint 02: Full-Funnel Google & Meta Ad Launch Pack",
        deadline: "Week 2 Milestone",
        deliverable: "Shared Google Sheet (Ad Copy + UTMs)",
        instructions:
          "Build a ready-to-upload campaign sheet containing 2 Google Search ad groups (6 headlines, 4 descriptions each), 3 Meta ad creative scripts, and standardized UTM tracking links for every ad."
      },
      {
        title: "Sprint 03: 5-Email Lead Nurture & Conversion Sequence",
        deadline: "Week 3 Milestone",
        deliverable: "Shared Google Doc (Email Copy Deck)",
        instructions:
          "Write a 5-part automated follow-up sequence (Welcome/Lead Magnet, Pain-Point Story, Case Study Proof, Objection Handling, Urgency CTA) with 2 subject-line A/B variants per email."
      },
      {
        title: "Sprint 04: Capstone 30-Day Client Growth & ROAS Playbook",
        deadline: "Week 4 Final Evaluation",
        deliverable: "Executive Slide Deck / Google Sheet Model",
        instructions:
          "Present a unified ₹50,000/month media allocation plan across Search, Meta, and CRO experiments, projecting clicks, leads, CAC, and 90-day ROAS targets for mentor sign-off."
      }
    ],

    // --- VERIFICATION QUIZ (6 QUESTIONS) ---
    quiz: [
      {
        question: "In a paid social campaign, what does a high click-through rate (CTR) paired with a very low landing page conversion rate usually indicate?",
        options: [
          "The ad creative is compelling, but there is friction, slow load speed, or poor message match on the landing page",
          "The daily budget is too high",
          "UTM parameters are slowing down the checkout server",
          "The target audience has never seen the ad"
        ],
        answer: 0,
        explanation: "High CTR proves the ad hook works; low post-click conversion points directly to landing page offer mismatch, UX friction, or slow mobile speed."
      },
      {
        question: "Why should agencies enforce a strict lowercase UTM naming convention (e.g., `utm_source=meta` instead of `Meta` or `META`)?",
        options: [
          "Uppercase letters break SSL certificates",
          "GA4 treats `meta`, `Meta`, and `META` as separate traffic sources, fragmenting campaign attribution reports",
          "Google Ads rejects URLs with lowercase letters",
          "UTMs only work on desktop browsers"
        ],
        answer: 1,
        explanation: "GA4 is case-sensitive for UTM parameters; inconsistent casing splits identical channel traffic across multiple rows."
      },
      {
        question: "If a campaign generates 50 leads from ₹25,000 in ad spend and 10 of those leads become paying customers, what is the Customer Acquisition Cost (CAC)?",
        options: ["₹500", "₹1,250", "₹2,500", "₹5,000"],
        answer: 2,
        explanation: "CAC = Total Ad Spend / Paying Customers Acquired = ₹25,000 / 10 = ₹2,500 (whereas Cost Per Lead is ₹500)."
      },
      {
        question: "What is the primary purpose of a retargeting ad set in a full-funnel growth strategy?",
        options: [
          "To reach cold audiences who have never heard of the brand",
          "To re-engage high-intent visitors (pricing page viewers, cart abandoners) with social proof or objection-handling offers",
          "To block existing customers from seeing any ads",
          "To replace technical SEO completely"
        ],
        answer: 1,
        explanation: "Retargeting warms up users who already showed intent, typically delivering higher conversion rates and lower CPA than cold prospecting."
      },
      {
        question: "Which metric best measures the top-of-funnel stopping power of a short-form video ad on Meta?",
        options: [
          "3-Second Video Plays / Impressions (Hook Rate)",
          "Domain Authority",
          "Database Query Latency",
          "Unsubscribe Rate"
        ],
        answer: 0,
        explanation: "Hook Rate (3-second video views divided by total impressions) isolates whether your opening visual/headline captures attention before users scroll past."
      },
      {
        question: "When running an A/B test on a client landing page, why should you test one major hypothesis at a time?",
        options: [
          "Browsers cannot load two CSS files simultaneously",
          "Changing multiple unrelated elements at once makes it impossible to attribute which change caused the conversion lift or drop",
          "Google Search penalizes pages with two buttons",
          "A/B tests only run for 10 minutes"
        ],
        answer: 1,
        explanation: "Isolating variables ensures clean causal learning so winning patterns can be reliably scaled across future campaigns."
      }
    ]
  }
];
