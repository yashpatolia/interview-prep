# Interview Prep — Project Context

## About the User
- Knows Python well, no prior DSA background
- Learning DSA from scratch through this project

## How We Work
1. Claude teaches a DSA topic first (lesson page with diagrams/animations/analogies/code)
2. User attempts the practice problems on LeetCode
3. User shares their solution/approach; Claude reviews and suggests improvements
4. Move to the next topic

## Format for Lessons
- Vite SPA — all pages are JS modules in `src/pages/<name>.js` exporting `render()` + `init()`
- Must include: diagrams or animations, Python demo code, analogies, complexity table, practice problems
- Problems include hints but not full solutions — user solves them first

## Project Structure
```
interview-prep/
├── CLAUDE.md
├── index.html              ← SPA shell (just <div id="app">)
├── vite.config.js
└── src/
    ├── main.js             ← router, all routes registered here
    ├── style.css
    └── pages/
        ├── home.js         ✅ complete
        ├── arrays.js       ✅ complete
        ├── two-pointers.js ✅ complete
        ├── sliding-window.js ✅ complete
        ├── linked-lists.js ✅ complete
        ├── stacks-queues.js ✅ complete
        ├── binary-search.js ✅ complete
        ├── trees.js        ✅ complete
        ├── dynamic-programming.js ✅ complete
        ├── graphs.js       ✅ complete
        └── complexity.js   ✅ complete (Complexity Cheat Sheet)
```

## Topic Curriculum (in order)
1. Arrays & Hashing ✅
2. Two Pointers ✅
3. Sliding Window ✅
4. Linked Lists ✅
5. Stacks & Queues ✅
6. Binary Search ✅
7. Trees & BFS/DFS ✅
8. Dynamic Programming ✅
9. Graphs ✅
+ Complexity Cheat Sheet ✅

## Current Status
- All 9 chapters + complexity cheat sheet built and accessible
- User is working through practice problems for each chapter
