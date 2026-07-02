export function render() {
  return `
<div class="home-header">
  <h1>Data Structures<br>&amp; Algorithms</h1>
  <p>Algorithms and data structures, studied one chapter at a time.</p>
</div>

<main class="home-main">
  <p class="section-label">Curriculum</p>

  <div class="chapter-list">

    <div class="chapter-item">
      <a class="chapter" href="/dsa/arrays">
        <span class="chapter-num">I</span>
        <div class="chapter-body">
          <h3>Arrays &amp; Hashing</h3>
          <p>Memory layout, Python lists, hash maps — the foundation of everything.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/two-pointers">
        <span class="chapter-num">II</span>
        <div class="chapter-body">
          <h3>Two Pointers</h3>
          <p>Eliminate nested loops by racing two indices toward each other.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/sliding-window">
        <span class="chapter-num">III</span>
        <div class="chapter-body">
          <h3>Sliding Window</h3>
          <p>Subarray and substring problems in O(n) with a dynamic range.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/linked-lists">
        <span class="chapter-num">IV</span>
        <div class="chapter-body">
          <h3>Linked Lists</h3>
          <p>Nodes connected by pointers. Insertion and deletion without shifting.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/stacks-queues">
        <span class="chapter-num">V</span>
        <div class="chapter-body">
          <h3>Stacks &amp; Queues</h3>
          <p>Last-in-first-out vs. first-in-first-out. Monotonic stacks for harder problems.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/binary-search">
        <span class="chapter-num">VI</span>
        <div class="chapter-body">
          <h3>Binary Search</h3>
          <p>Halve the search space every step. Works on sorted arrays and answer spaces.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/trees">
        <span class="chapter-num">VII</span>
        <div class="chapter-body">
          <h3>Trees &amp; BFS / DFS</h3>
          <p>Hierarchical data. Recursive DFS, iterative BFS, and common traversals.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/dynamic-programming">
        <span class="chapter-num">VIII</span>
        <div class="chapter-body">
          <h3>Dynamic Programming</h3>
          <p>Memoize overlapping subproblems. Top-down and bottom-up approaches.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter" href="/dsa/graphs">
        <span class="chapter-num">IX</span>
        <div class="chapter-body">
          <h3>Graphs</h3>
          <p>Networks of nodes and edges. BFS, DFS, Union-Find, shortest paths.</p>
        </div>
      </a>
    </div>

  </div>

  <p class="section-label">Reference</p>

  <div class="chapter-list">
    <div class="chapter-item">
      <a class="chapter" href="/dsa/problem-solving">
        <span class="chapter-num">—</span>
        <div class="chapter-body">
          <h3>How to Solve Problems</h3>
          <p>Recognise patterns, read constraints, and work through any problem systematically.</p>
        </div>
      </a>
    </div>
    <div class="chapter-item">
      <a class="chapter" href="/dsa/complexity">
        <span class="chapter-num">—</span>
        <div class="chapter-body">
          <h3>Complexity Cheat Sheet</h3>
          <p>Big O for every data structure operation and sorting algorithm.</p>
        </div>
      </a>
    </div>
  </div>
</main>

`
}
