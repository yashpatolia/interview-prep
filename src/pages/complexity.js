export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#big-o">Big O Basics</a>
  <a href="#data-structures">Data Structures</a>
  <a href="#sorting">Sorting Algorithms</a>
  <a href="#patterns">Algorithm Patterns</a>
  <a href="#space">Space Complexity</a>
</div>

<article>
  <h1><em>Complexity</em> Cheat Sheet</h1>
  <p class="subtitle">Reference · Big O for every structure, algorithm, and pattern</p>

  <h2 id="big-o"><span class="emoji">📐</span>Big O Basics</h2>

  <p>Big O describes how runtime (or memory) <strong>scales</strong> as input size <em>n</em> grows. We drop constants and lower-order terms — only the dominant factor matters for large inputs.</p>

  <div class="diagram-wrap">
    <div class="diagram-title">Growth rates — best to worst</div>
    <svg width="100%" height="200" viewBox="0 0 640 200">
      <!-- axes -->
      <line x1="50" y1="10" x2="50" y2="170" stroke="#C8C4BC" stroke-width="1.5"/>
      <line x1="50" y1="170" x2="620" y2="170" stroke="#C8C4BC" stroke-width="1.5"/>
      <text x="18" y="95" fill="#8A8F9E" font-size="10" text-anchor="middle" transform="rotate(-90,18,95)">time</text>
      <text x="335" y="192" fill="#8A8F9E" font-size="10" text-anchor="middle">n (input size)</text>

      <!-- O(1) — flat line -->
      <path d="M 55 165 L 610 165" stroke="#2A7A52" stroke-width="2" fill="none"/>
      <text x="615" y="168" fill="#2A7A52" font-size="10">O(1)</text>

      <!-- O(log n) — very gradual curve -->
      <path d="M 55 165 C 100 150, 200 140, 610 125" stroke="#4A9E6A" stroke-width="2" fill="none"/>
      <text x="615" y="128" fill="#4A9E6A" font-size="10">O(log n)</text>

      <!-- O(n) — straight diagonal -->
      <path d="M 55 165 L 610 80" stroke="#E8A42A" stroke-width="2" fill="none"/>
      <text x="615" y="83" fill="#E8A42A" font-size="10">O(n)</text>

      <!-- O(n log n) — slightly above O(n) -->
      <path d="M 55 165 C 200 130, 400 90, 610 55" stroke="#E87A2A" stroke-width="2" fill="none"/>
      <text x="615" y="58" fill="#E87A2A" font-size="10">O(n log n)</text>

      <!-- O(n²) — steep curve -->
      <path d="M 55 165 C 120 160, 300 130, 610 20" stroke="#E8442A" stroke-width="2" fill="none"/>
      <text x="615" y="23" fill="#E8442A" font-size="10">O(n²)</text>
    </svg>
  </div>

  <table>
    <thead><tr><th>Notation</th><th>Name</th><th>Example</th><th>1 000 ops at n=10⁶</th></tr></thead>
    <tbody>
      <tr><td><code>O(1)</code></td><td>Constant</td><td>Array index lookup</td><td>1</td></tr>
      <tr><td><code>O(log n)</code></td><td>Logarithmic</td><td>Binary search</td><td>20</td></tr>
      <tr><td><code>O(n)</code></td><td>Linear</td><td>Single loop</td><td>1 000 000</td></tr>
      <tr><td><code>O(n log n)</code></td><td>Linearithmic</td><td>Merge sort</td><td>20 000 000</td></tr>
      <tr><td><code>O(n²)</code></td><td>Quadratic</td><td>Nested loops</td><td>10¹²</td></tr>
      <tr><td><code>O(2ⁿ)</code></td><td>Exponential</td><td>Subset enumeration</td><td>∞ (infeasible)</td></tr>
      <tr><td><code>O(n!)</code></td><td>Factorial</td><td>Permutations brute force</td><td>∞ (infeasible)</td></tr>
    </tbody>
  </table>

  <div class="callout analogy">
    <div class="callout-title">Rule of Thumb for Interviews</div>
    At n = 10⁸ operations per second: O(n) on n=10⁸ → ~1 second. O(n²) on n=10⁴ → ~1 second. O(n log n) on n=10⁷ → ~1 second. If a constraint says n ≤ 10⁵, an O(n²) solution is almost certainly too slow.
  </div>

  <h2 id="data-structures"><span class="emoji">🗂️</span>Data Structures</h2>

  <p>All complexities are <strong>average case</strong> unless marked with <em>(worst)</em>. Space is auxiliary — i.e., extra memory beyond storing the n elements themselves.</p>

  <h3>Array / List</h3>
  <table>
    <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Access by index</td><td><code>O(1)</code></td><td>Contiguous memory → direct address calculation</td></tr>
      <tr><td>Search (unsorted)</td><td><code>O(n)</code></td><td>Must scan every element</td></tr>
      <tr><td>Search (sorted)</td><td><code>O(log n)</code></td><td>With binary search</td></tr>
      <tr><td>Insert / delete at end</td><td><code>O(1)</code> amortised</td><td>Python list.append / .pop()</td></tr>
      <tr><td>Insert / delete at middle</td><td><code>O(n)</code></td><td>Shifts remaining elements</td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td>One slot per element</td></tr>
    </tbody>
  </table>

  <h3>Hash Map / Hash Set</h3>
  <table>
    <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Insert</td><td><code>O(1)</code> avg · <code>O(n)</code> worst</td><td>Worst case on hash collision</td></tr>
      <tr><td>Lookup</td><td><code>O(1)</code> avg · <code>O(n)</code> worst</td><td>Python dict — avg is practically constant</td></tr>
      <tr><td>Delete</td><td><code>O(1)</code> avg · <code>O(n)</code> worst</td><td></td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td>Stores keys + values</td></tr>
    </tbody>
  </table>

  <h3>Linked List</h3>
  <table>
    <thead><tr><th>Operation</th><th>Singly</th><th>Doubly</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Access by index</td><td><code>O(n)</code></td><td><code>O(n)</code></td><td>No random access — must walk from head</td></tr>
      <tr><td>Search</td><td><code>O(n)</code></td><td><code>O(n)</code></td><td></td></tr>
      <tr><td>Insert / delete at head</td><td><code>O(1)</code></td><td><code>O(1)</code></td><td>Just rewire the pointer</td></tr>
      <tr><td>Insert / delete at tail</td><td><code>O(n)</code></td><td><code>O(1)</code></td><td>Doubly linked list keeps a tail pointer</td></tr>
      <tr><td>Insert / delete at middle (given node)</td><td><code>O(1)</code></td><td><code>O(1)</code></td><td>If you already hold the node reference</td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td><code>O(n)</code></td><td>Each node stores 1–2 pointers extra</td></tr>
    </tbody>
  </table>

  <h3>Stack &amp; Queue</h3>
  <table>
    <thead><tr><th>Operation</th><th>Time</th><th>Typical Implementation</th></tr></thead>
    <tbody>
      <tr><td>Push / Enqueue</td><td><code>O(1)</code></td><td>list.append or deque.appendleft</td></tr>
      <tr><td>Pop / Dequeue</td><td><code>O(1)</code></td><td>list.pop() or deque.popleft()</td></tr>
      <tr><td>Peek (top / front)</td><td><code>O(1)</code></td><td>stack[-1] or queue[0]</td></tr>
      <tr><td>Search</td><td><code>O(n)</code></td><td>Not their designed use</td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td></td></tr>
    </tbody>
  </table>

  <div class="callout info">
    <div class="callout-title">Python Note — list vs deque</div>
    Use <code>list</code> as a stack (append/pop from end — O(1)). Use <code>collections.deque</code> as a queue (appendleft/popleft — O(1)). <code>list.pop(0)</code> is O(n) — don't use it for queues.
  </div>

  <h3>Heap (Min-Heap / Max-Heap)</h3>
  <table>
    <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Get min / max</td><td><code>O(1)</code></td><td>Always at root</td></tr>
      <tr><td>Insert</td><td><code>O(log n)</code></td><td>Bubble up</td></tr>
      <tr><td>Extract min / max</td><td><code>O(log n)</code></td><td>Bubble down</td></tr>
      <tr><td>Build heap from list</td><td><code>O(n)</code></td><td>heapq.heapify() — not O(n log n)!</td></tr>
      <tr><td>Search</td><td><code>O(n)</code></td><td>No ordering guarantee beyond root</td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td></td></tr>
    </tbody>
  </table>

  <h3>Binary Search Tree (BST)</h3>
  <table>
    <thead><tr><th>Operation</th><th>Average</th><th>Worst (skewed)</th></tr></thead>
    <tbody>
      <tr><td>Search</td><td><code>O(log n)</code></td><td><code>O(n)</code></td></tr>
      <tr><td>Insert</td><td><code>O(log n)</code></td><td><code>O(n)</code></td></tr>
      <tr><td>Delete</td><td><code>O(log n)</code></td><td><code>O(n)</code></td></tr>
      <tr><td>Space</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
    </tbody>
  </table>
  <p>A <strong>balanced BST</strong> (e.g. AVL, Red-Black, Python's <code>sortedcontainers.SortedList</code>) guarantees O(log n) in all cases. Python's built-in <code>dict</code> / <code>set</code> (hash) is usually faster in practice.</p>

  <h2 id="sorting"><span class="emoji">🔢</span>Sorting Algorithms</h2>

  <table>
    <thead>
      <tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable?</th></tr>
    </thead>
    <tbody>
      <tr><td>Bubble Sort</td><td><code>O(n)</code></td><td><code>O(n²)</code></td><td><code>O(n²)</code></td><td><code>O(1)</code></td><td>Yes</td></tr>
      <tr><td>Selection Sort</td><td><code>O(n²)</code></td><td><code>O(n²)</code></td><td><code>O(n²)</code></td><td><code>O(1)</code></td><td>No</td></tr>
      <tr><td>Insertion Sort</td><td><code>O(n)</code></td><td><code>O(n²)</code></td><td><code>O(n²)</code></td><td><code>O(1)</code></td><td>Yes</td></tr>
      <tr><td>Merge Sort</td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(n)</code></td><td>Yes</td></tr>
      <tr><td>Quick Sort</td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(n²)</code></td><td><code>O(log n)</code></td><td>No</td></tr>
      <tr><td>Heap Sort</td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(1)</code></td><td>No</td></tr>
      <tr><td>Counting Sort</td><td><code>O(n + k)</code></td><td><code>O(n + k)</code></td><td><code>O(n + k)</code></td><td><code>O(k)</code></td><td>Yes</td></tr>
      <tr><td>Radix Sort</td><td><code>O(nk)</code></td><td><code>O(nk)</code></td><td><code>O(nk)</code></td><td><code>O(n + k)</code></td><td>Yes</td></tr>
      <tr><td>Timsort (Python built-in)</td><td><code>O(n)</code></td><td><code>O(n log n)</code></td><td><code>O(n log n)</code></td><td><code>O(n)</code></td><td>Yes</td></tr>
    </tbody>
  </table>

  <p><em>k</em> = range of values (Counting Sort), number of digits (Radix Sort). <strong>Python's <code>sorted()</code> and <code>.sort()</code> use Timsort</strong> — stable and adaptive (fast on nearly-sorted data).</p>

  <div class="callout analogy">
    <div class="callout-title">Stable vs Unstable Sorting</div>
    A <strong>stable</strong> sort preserves the original order of equal elements. This matters when sorting by one key after already sorting by another (e.g., sort by last name, then by first name — stability keeps last names ordered within the first-name groups).
  </div>

  <h2 id="patterns"><span class="emoji">🧩</span>Algorithm Patterns</h2>

  <table>
    <thead><tr><th>Pattern</th><th>Time</th><th>Space</th><th>Key Indicator</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>Two Pointers</strong></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code></td>
        <td>Sorted array, find pair with property, remove duplicates</td>
      </tr>
      <tr>
        <td><strong>Sliding Window</strong></td>
        <td><code>O(n)</code></td>
        <td><code>O(1)</code> or <code>O(k)</code></td>
        <td>Contiguous subarray / substring of fixed or variable size</td>
      </tr>
      <tr>
        <td><strong>Binary Search</strong></td>
        <td><code>O(log n)</code></td>
        <td><code>O(1)</code></td>
        <td>Sorted array, "find minimum X satisfying condition"</td>
      </tr>
      <tr>
        <td><strong>Hash Map</strong></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td>Count frequency, detect duplicates, two-sum lookups</td>
      </tr>
      <tr>
        <td><strong>DFS (recursive)</strong></td>
        <td><code>O(V + E)</code></td>
        <td><code>O(h)</code> stack depth</td>
        <td>Tree path problems, connected components, backtracking</td>
      </tr>
      <tr>
        <td><strong>BFS (queue)</strong></td>
        <td><code>O(V + E)</code></td>
        <td><code>O(V)</code></td>
        <td>Shortest path (unweighted), level-order traversal</td>
      </tr>
      <tr>
        <td><strong>Dijkstra's</strong></td>
        <td><code>O((V + E) log V)</code></td>
        <td><code>O(V)</code></td>
        <td>Shortest path with positive edge weights</td>
      </tr>
      <tr>
        <td><strong>Union-Find</strong></td>
        <td><code>O(α(n))</code> per op</td>
        <td><code>O(n)</code></td>
        <td>Dynamic connectivity, cycle detection, Kruskal's MST</td>
      </tr>
      <tr>
        <td><strong>Dynamic Programming (bottom-up)</strong></td>
        <td><code>O(n·m)</code> typical</td>
        <td><code>O(n·m)</code> or <code>O(n)</code></td>
        <td>Overlapping subproblems + optimal substructure</td>
      </tr>
      <tr>
        <td><strong>Backtracking</strong></td>
        <td><code>O(b^d)</code> worst</td>
        <td><code>O(d)</code></td>
        <td>Generate all valid combinations / permutations</td>
      </tr>
      <tr>
        <td><strong>Monotonic Stack</strong></td>
        <td><code>O(n)</code></td>
        <td><code>O(n)</code></td>
        <td>Next greater / smaller element, histogram area</td>
      </tr>
      <tr>
        <td><strong>Prefix Sum</strong></td>
        <td><code>O(n)</code> build · <code>O(1)</code> query</td>
        <td><code>O(n)</code></td>
        <td>Range sum queries, subarray sum equals k</td>
      </tr>
    </tbody>
  </table>

  <p><em>V</em> = vertices, <em>E</em> = edges, <em>h</em> = tree height, <em>b</em> = branching factor, <em>d</em> = depth, <em>α</em> = inverse Ackermann (effectively constant).</p>

  <h2 id="space"><span class="emoji">💾</span>Space Complexity Quick Reference</h2>

  <div class="callout info">
    <div class="callout-title">Auxiliary vs Total Space</div>
    <strong>Total space</strong> includes the input itself. <strong>Auxiliary space</strong> (what interviewers usually mean by "space complexity") is the <em>extra</em> memory your algorithm uses beyond the input. A merge sort copies the array → O(n) auxiliary. An in-place sort like heapsort → O(1) auxiliary.
  </div>

  <table>
    <thead><tr><th>Structure / Algorithm</th><th>Auxiliary Space</th></tr></thead>
    <tbody>
      <tr><td>Iterative loop</td><td><code>O(1)</code></td></tr>
      <tr><td>Recursive DFS on tree of height h</td><td><code>O(h)</code> — call stack frames</td></tr>
      <tr><td>BFS queue</td><td><code>O(w)</code> — w = max width of tree / graph level</td></tr>
      <tr><td>Hash map storing n keys</td><td><code>O(n)</code></td></tr>
      <tr><td>Memoisation (top-down DP)</td><td><code>O(n)</code> to <code>O(n·m)</code></td></tr>
      <tr><td>DP table (bottom-up, 1-D)</td><td><code>O(n)</code></td></tr>
      <tr><td>DP table (bottom-up, 2-D)</td><td><code>O(n·m)</code> · often optimisable to <code>O(min(n,m))</code></td></tr>
      <tr><td>Sorting (Timsort / Merge Sort)</td><td><code>O(n)</code></td></tr>
      <tr><td>Sorting (Quick / Heap / Insertion)</td><td><code>O(log n)</code> or <code>O(1)</code></td></tr>
    </tbody>
  </table>

  <div class="callout analogy">
    <div class="callout-title">Optimising DP Space</div>
    A 2-D DP table where dp[i][j] only depends on the previous row can usually be compressed to two 1-D arrays (current and previous row), dropping space from O(n·m) to O(m). This pattern appears in Longest Common Subsequence, Edit Distance, and 0/1 Knapsack.
  </div>

</article>
`
}

export function init() {}
