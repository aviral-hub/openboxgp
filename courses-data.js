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
 *    - category: "Internship" | "Development" | "Analytics"
 *    - typeBadge: Label shown on card (e.g., "Task-Based Internship", "MIT OCW Track").
 *    - isInternship: `true` for Internships (issues "CERTIFICATE OF INTERNSHIP"),
 *                    `false` for Courses (issues "CERTIFICATE OF COMPLETION").
 *    - techStack: Array of skills/tools shown as tags & hashtags on certificate.
 *    - description: 1–2 sentence overview.
 *    - lectures: Array of video modules:
 *        * id: Unique lecture ID (e.g., "py-l1").
 *        * title: Lecture title.
 *        * videoId: YouTube Video ID only (e.g., "ytBb333b114").
 *        * description: Summary of the lecture.
 *        * documentUrl: (Optional) Link to slides, PDF, GitHub repo, or worksheet.
 *        * documentLabel: (Optional) Button text for the document link.
 *    - documents: Array of downloadable study guides, PDFs, or reference sheets:
 *        * title: Document name.
 *        * type: "PDF" | "Slides" | "GitHub Repo" | "Worksheet"
 *        * url: Direct link to Google Drive, GitHub, or MIT OCW resource.
 *    - assignments: Array of practical tasks/assignments students submit:
 *        * title: Assignment or task title.
 *        * deadline: e.g., "Week 1 Milestone" or "Module 2 Assignment".
 *        * instructions: Clear requirements + worksheet link if applicable.
 *    - quiz: (Optional) Verification quiz questions (`answer` is 0-indexed).
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
    techStack: ["Python 3", "Algorithms", "OOP", "Complexity", "Data Structures"],
    description: "Complete MIT OpenCourseWare (Fall 2016) curriculum featuring all 12 video lectures, lecture slides, and official Problem Set assignments.",

    // --- VIDEO LECTURES ---
    lectures: [
      {
        id: "mit-l01",
        title: "Lecture 1: What is Computation?",
        videoId: "ytBb333b114",
        description: "Introduction to computer science, declarative vs imperative knowledge, and Python basics.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-1-what-is-computation/",
        documentLabel: "Lecture 1 Slides & Python Code"
      },
      {
        id: "mit-l02",
        title: "Lecture 2: Branching and Iteration",
        videoId: "0jljZRnHwOI",
        description: "Strings, input/output, comparison operators, branching (if/elif/else), and while/for loops.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-2-branching-and-iteration/",
        documentLabel: "Lecture 2 Slides & Code"
      },
      {
        id: "mit-l03",
        title: "Lecture 3: String Manipulation, Guess & Check, Bisection",
        videoId: "SE4P7IVCunE",
        description: "String slicing, exhaustive enumeration, approximate solutions, and bisection search.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-3-string-manipulation-guess-and-check-approximations-bisection/",
        documentLabel: "Lecture 3 Slides & Code"
      },
      {
        id: "mit-l04",
        title: "Lecture 4: Decomposition, Abstractions, Functions",
        videoId: "MjbuarJ7SE0",
        description: "Structuring programs with functions, variable scope, keyword arguments, and specifications.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-4-decomposition-abstractions-functions/",
        documentLabel: "Lecture 4 Slides & Code"
      },
      {
        id: "mit-l05",
        title: "Lecture 5: Tuples, Lists, Aliasing, Mutability, Cloning",
        videoId: "RvRKT-jQgko",
        description: "Compound data types, list operations, aliasing side-effects, and cloning lists safely.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-cloning/",
        documentLabel: "Lecture 5 Slides & Code"
      },
      {
        id: "mit-l06",
        title: "Lecture 6: Recursion, Dictionaries",
        videoId: "WPSeyjX1-4s",
        description: "Inductive reasoning, recursive algorithms (Towers of Hanoi, Fibonacci), and Python dictionaries.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-6-recursion-dictionaries/",
        documentLabel: "Lecture 6 Slides & Code"
      },
      {
        id: "mit-l07",
        title: "Lecture 7: Testing, Debugging, Exceptions, Assertions",
        videoId: "9H6muyznWU0",
        description: "Black-box and glass-box testing, systematic debugging, try/except blocks, and assertions.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-7-testing-debugging-exceptions-assertions/",
        documentLabel: "Lecture 7 Slides & Code"
      },
      {
        id: "mit-l08",
        title: "Lecture 8: Object Oriented Programming",
        videoId: "-DP1i2ZU9gk",
        description: "Creating custom data types with Python classes, attributes, methods, and dunder operators.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-8-object-oriented-programming/",
        documentLabel: "Lecture 8 Slides & Code"
      },
      {
        id: "mit-l09",
        title: "Lecture 9: Python Classes and Inheritance",
        videoId: "FlGjISF3l78",
        description: "Getters/setters, class variables, subclasses, inheritance hierarchies, and OOP design.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-9-python-classes-and-inheritance/",
        documentLabel: "Lecture 9 Slides & Code"
      },
      {
        id: "mit-l10",
        title: "Lecture 10: Understanding Program Efficiency, Part 1",
        videoId: "o9nW0uBqvEo",
        description: "Measuring algorithmic efficiency, orders of growth, and Big-O asymptotic notation.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-10-understanding-program-efficiency-part-1/",
        documentLabel: "Lecture 10 Slides & Code"
      },
      {
        id: "mit-l11",
        title: "Lecture 11: Understanding Program Efficiency, Part 2",
        videoId: "7lbeVoqPs_E",
        description: "Analyzing logarithmic, polynomial, and exponential complexity classes with worked examples.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-11-understanding-program-efficiency-part-2/",
        documentLabel: "Lecture 11 Slides & Code"
      },
      {
        id: "mit-l12",
        title: "Lecture 12: Searching and Sorting",
        videoId: "6LOwPhPDwcg",
        description: "Linear search, binary search, selection sort, bubble sort, and divide-and-conquer merge sort.",
        documentUrl: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-12-searching-and-sorting/",
        documentLabel: "Lecture 12 Slides & Code"
      }
    ],

    // --- COURSE DOCUMENTS & WORKSHEETS ---
    documents: [
      { title: "MIT 6.0001 Official Syllabus & Reading Guide", type: "Syllabus", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/syllabus/" },
      { title: "Problem Set 0 Worksheet & Starter Files", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps0/" },
      { title: "Problem Set 1 Worksheet (House Hunting & Bisection)", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps1/" },
      { title: "Problem Set 2 Worksheet (Hangman Game)", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps2/" },
      { title: "Problem Set 3 Worksheet (6.0001 Word Game)", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps3/" },
      { title: "Problem Set 4 Worksheet (Recursion & Caesar Cipher)", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/" },
      { title: "Problem Set 5 Worksheet (RSS Feed Filter OOP)", type: "Worksheet", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps5/" }
    ],

    // --- GRADED ASSIGNMENTS / TASKS ---
    assignments: [
      {
        title: "Problem Set 0: Python Setup & Arithmetic Expressions",
        deadline: "Assignment 01",
        instructions: "Write ps0.py computing x**y and log2(x). Push your code to GitHub and submit the repository URL."
      },
      {
        title: "Problem Set 1: House Hunting & Savings Bisection Search",
        deadline: "Assignment 02",
        instructions: "Implement Part A, Part B (semi-annual raise), and Part C (bisection search for optimal savings rate)."
      },
      {
        title: "Problem Set 2: Hangman Game with Wildcard Hints",
        deadline: "Assignment 03",
        instructions: "Build interactive Hangman supporting wildcard pattern matching using words.txt."
      },
      {
        title: "Problem Set 5: RSS Feed Filter & Trigger Engine (OOP)",
        deadline: "Capstone Assignment",
        instructions: "Implement class inheritance for PhraseTrigger, TimeTrigger, and composite AND/OR/NOT news filters."
      }
    ],

    // --- VERIFICATION QUIZ ---
    quiz: [
      {
        question: "Which Python data structure is immutable?",
        options: ["List", "Dictionary", "Tuple"],
        answer: 2
      },
      {
        question: "What is the time complexity of Binary Search on a sorted list of length n?",
        options: ["O(n)", "O(log n)", "O(n^2)"],
        answer: 1
      },
      {
        question: "What is the worst-case time complexity of Merge Sort?",
        options: ["O(n log n)", "O(n)", "O(2^n)"],
        answer: 0
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
    typeBadge: "4-Week Task Internship",
    isInternship: true,
    techStack: ["React", "Node.js", "Git", "REST APIs"],
    description: "Ship real production features, pass mentor code reviews, and build verifiable GitHub commits in a 4-week sprint.",
    lectures: [
      {
        id: "swe-1",
        title: "01. Git Workflow & Production Code Standards",
        videoId: "W6NZfCO5SIk",
        description: "Learn branch naming, atomic commits, pull request hygiene, and how internship tasks are evaluated.",
        documentUrl: "https://github.com/aviral-hub/openboxgrowthpartner",
        documentLabel: "Openbox Starter Repository"
      },
      {
        id: "swe-2",
        title: "02. Building High-Throughput APIs & State",
        videoId: "R8rmfD9Y5-c",
        description: "Structuring clean backend routes, error handling, and asynchronous state management.",
        documentUrl: "",
        documentLabel: ""
      }
    ],
    documents: [
      { title: "Openbox Git & Pull Request Guidelines", type: "Guide", url: "https://github.com/aviral-hub/openboxgrowthpartner" }
    ],
    assignments: [
      {
        title: "Task 01: Distributed Task Manager UI & State",
        deadline: "Week 1 Milestone",
        instructions: "Build a responsive task board with filtering and localStorage persistence. Push to GitHub and submit the link."
      },
      {
        title: "Task 02: REST API Integration & Error Handling",
        deadline: "Week 2 Milestone",
        instructions: "Connect your frontend to a live JSON API with loading skeletons and retry states."
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

  // ==========================================================================
  // 3. BUSINESS ANALYTICS & GROWTH PIPELINE INTERNSHIP
  // ==========================================================================
  {
    id: "business-analytics-internship",
    title: "Business Analytics & Growth Pipeline Internship",
    category: "Internship",
    typeBadge: "4-Week Analytics Internship",
    isInternship: true,
    techStack: ["SQL", "Excel", "Funnel Metrics", "Python"],
    description: "Analyze real startup funnel datasets, build cohort retention dashboards, and deliver executive growth memos.",
    lectures: [
      {
        id: "ba-1",
        title: "01. SaaS Metrics, CAC, LTV & Cohort Retention",
        videoId: "ysz5S6PUM-U",
        description: "How growth partners diagnose conversion bottlenecks using unit economics and cohort tables.",
        documentUrl: "",
        documentLabel: ""
      }
    ],
    documents: [
      { title: "SaaS Funnel & Cohort Analysis Template", type: "Sheet Guide", url: "https://sheets.new" }
    ],
    assignments: [
      {
        title: "Task 01: E-Commerce Funnel Drop-Off Audit",
        deadline: "Week 1 Milestone",
        instructions: "Create a Google Sheet dashboard calculating conversion rates across 4 funnel stages and submit the link."
      }
    ],
    quiz: [
      {
        question: "What does a high LTV:CAC ratio (e.g., 4:1) indicate?",
        options: [
          "Customer acquisition is unprofitable",
          "Customer lifetime value strongly outweighs acquisition cost",
          "Churn rate is 100%"
        ],
        answer: 1
      }
    ]
  }
];
