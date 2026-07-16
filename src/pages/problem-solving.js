export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#process">The 6-Step Process</a>
  <a href="#signals">Pattern Signal Words</a>
  <a href="#constraints">Constraint → Complexity</a>
  <a href="#coding">Writing the Code</a>
  <a href="#templates">Code Templates</a>
  <a href="#tricks">Python Quick Tricks</a>
  <a href="#worked">Worked Example</a>
  <a href="#traps">Common Traps</a>
  <a href="#interview">Talking Through It</a>
</div>

<article>
  <h1><em>How to Solve</em> Problems</h1>
  <p class="subtitle">Reference · Recognise the pattern, then translate it into clean code</p>

  <div class="callout tip">
    <div class="callout-title">The Core Insight</div>
    Every LeetCode problem is a disguised version of a pattern you already know. The skill isn't memorising solutions — it's learning to strip away the story and see the underlying structure. A "trip planning" problem and a "course scheduling" problem are both topological sort in disguise.
  </div>

  <div class="callout analogy">
    <div class="callout-title">Two Separate Skills</div>
    Struggling with problems usually comes from blending two different skills into one panicked scramble. Split them apart: <strong>Skill 1 — Recognition</strong> is figuring out <em>which</em> pattern this problem is (the steps below, and the signal-word table). <strong>Skill 2 — Translation</strong> is turning that pattern into working code without fumbling syntax (the templates and quick tricks further down). Practice them separately — recognise-only drills (just name the pattern, don't code it) build Skill 1 fast without the friction of Skill 2 getting in the way.
  </div>

  <h2 id="process"><span class="emoji">🪜</span>The 6-Step Process</h2>

  <p>Work through every problem in this order. Don't skip to coding until step 4 is done.</p>

  <div class="steps">

    <div class="step">
      <div class="step-body">
        <strong>1 · Read &amp; Restate</strong>
        <p>Read the problem once for the big picture, then restate it in your own words in one sentence. If you can't, you don't understand it yet. Read the examples — they often reveal edge cases the description glosses over.</p>
        <div class="callout info" style="margin-top:0.75rem">
          <div class="callout-title">Questions to ask yourself</div>
          What is the input? What is the output? Is the array sorted? Can values be negative? Can there be duplicates? Is the input guaranteed non-empty?
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>2 · Note the Constraints</strong>
        <p>The constraint on <code>n</code> is a direct hint at the required time complexity. Read it before doing anything else.</p>
        <table>
          <thead><tr><th>Constraint on n</th><th>Max complexity you can afford</th></tr></thead>
          <tbody>
            <tr><td>n ≤ 12</td><td><code>O(n!)</code> — generate all permutations, brute force orderings</td></tr>
            <tr><td>n ≤ 25</td><td><code>O(2ⁿ)</code> — enumerate all subsets, bitmask DP</td></tr>
            <tr><td>n ≤ 100</td><td><code>O(n³)</code> — triple nested loops OK</td></tr>
            <tr><td>n ≤ 1 000</td><td><code>O(n²)</code> — DP with a 2D table, nested loops</td></tr>
            <tr><td>n ≤ 10 000</td><td><code>O(n²)</code> — borderline; aim for <code>O(n log n)</code></td></tr>
            <tr><td>n ≤ 100 000</td><td><code>O(n log n)</code> — sort + binary search, heaps</td></tr>
            <tr><td>n ≤ 1 000 000</td><td><code>O(n)</code> — single pass, hash map, two pointers</td></tr>
            <tr><td>n ≤ 10⁹</td><td><code>O(log n)</code> or <code>O(1)</code> — binary search on the answer, math formula</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>3 · Find the Signal Words</strong>
        <p>Specific words in the problem statement almost always map to a specific pattern. See the <a href="#signals">full table below</a>. Once you have a candidate pattern, check it against the constraint from step 2.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>4 · Plan in Plain English</strong>
        <p>Describe your algorithm out loud (or in comments) before touching the keyboard. Walk through the given example by hand. If your plan breaks on the example, fix the plan — not the code.</p>
        <div class="callout analogy" style="margin-top:0.75rem">
          <div class="callout-title">The 5-minute rule</div>
          Spend at least 5 minutes planning. Most wrong submissions come from jumping to code with an incomplete mental model. An extra 5 minutes of planning saves 30 minutes of debugging.
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>5 · Code the Plan</strong>
        <p>Translate your plain-English steps into code one-to-one. Keep variable names meaningful. Write the easy parts first — the loop structure, then the condition logic, then the edge cases.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>6 · Verify &amp; Analyse</strong>
        <p>Trace through the provided examples by hand. Then check edge cases: empty input, single element, all duplicates, negative numbers, already-sorted array. Finally state the time and space complexity and confirm it fits the constraint from step 2.</p>
      </div>
    </div>

  </div>

  <h2 id="signals"><span class="emoji">🔑</span>Pattern Signal Words</h2>

  <p>These aren't magic rules — they're starting hypotheses. One problem can have multiple signals pointing to different patterns; pick the one whose complexity fits <code>n</code>.</p>

  <table>
    <thead>
      <tr><th>You see this in the problem…</th><th>Think this pattern</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>"sorted array" + "find pair / triplet / sum"</td>
        <td><strong><a href="/dsa/two-pointers">Two Pointers</a></strong></td>
        <td>Sorting lets you decide which pointer to move based on whether the sum is too large or too small</td>
      </tr>
      <tr>
        <td>"remove duplicates in-place" / "rewrite array without extra space"</td>
        <td><strong><a href="/dsa/two-pointers">Two Pointers (fast/slow)</a></strong></td>
        <td>Slow pointer marks the next write position; fast pointer scans ahead</td>
      </tr>
      <tr>
        <td>"contiguous subarray" / "substring" + "maximum / minimum / exactly k"</td>
        <td><strong><a href="/dsa/sliding-window">Sliding Window</a></strong></td>
        <td>The answer lives inside a moving range; expand right, shrink left</td>
      </tr>
      <tr>
        <td>"find in sorted array" / "search" / "minimum that satisfies a condition"</td>
        <td><strong><a href="/dsa/binary-search">Binary Search</a></strong></td>
        <td>If you can answer "is mid a valid answer?" in O(1)–O(n), binary search the answer space</td>
      </tr>
      <tr>
        <td>"count frequency" / "seen before" / "two numbers that sum to X"</td>
        <td><strong>Hash Map / Hash Set</strong></td>
        <td>Turn an O(n) search into O(1) lookup by pre-storing values you've seen</td>
      </tr>
      <tr>
        <td>"valid parentheses" / "matching brackets" / "undo last action" / "evaluate expression"</td>
        <td><strong><a href="/dsa/stacks-queues">Stack</a></strong></td>
        <td>Last-in-first-out naturally handles "the most recent unresolved thing"</td>
      </tr>
      <tr>
        <td>"shortest path" / "minimum steps / hops" / "level by level"</td>
        <td><strong><a href="/dsa/trees">BFS</a></strong></td>
        <td>BFS explores by distance from source — the first time you reach a node is the shortest path</td>
      </tr>
      <tr>
        <td>"all possible paths" / "generate all combinations / permutations" / "does a valid solution exist"</td>
        <td><strong><a href="/dsa/trees">DFS / Backtracking</a></strong></td>
        <td>Explore a decision tree: make a choice, recurse, undo it. Use BFS instead if you need the <em>shortest</em> path, not just any path.</td>
      </tr>
      <tr>
        <td>"islands" / "connected components" / "union / merge groups"</td>
        <td><strong><a href="/dsa/graphs">BFS/DFS or Union-Find</a></strong></td>
        <td>Each island is a connected component; BFS/DFS floods it; Union-Find merges sets</td>
      </tr>
      <tr>
        <td>"k largest / k smallest / k most frequent"</td>
        <td><strong>Heap (heapq)</strong></td>
        <td>A min-heap of size k gives you the k largest in O(n log k) — no full sort needed</td>
      </tr>
      <tr>
        <td>"how many ways" / "minimum cost" / "maximum profit" with overlapping choices</td>
        <td><strong><a href="/dsa/dynamic-programming">Dynamic Programming</a></strong></td>
        <td>If brute force recomputes the same subproblem from different paths, memoize it</td>
      </tr>
      <tr>
        <td>"range sum query" / "subarray sum equals k"</td>
        <td><strong>Prefix Sum</strong></td>
        <td>Precompute cumulative sums so any range sum is a single subtraction: <code>prefix[R] - prefix[L-1]</code></td>
      </tr>
      <tr>
        <td>"next greater / smaller" / "largest rectangle" / "daily temperatures"</td>
        <td><strong>Monotonic Stack</strong></td>
        <td>Maintain a stack that's always increasing or decreasing; pop when you find a violation</td>
      </tr>
      <tr>
        <td>"course prerequisites" / "dependency order" / "can you complete all tasks"</td>
        <td><strong><a href="/dsa/graphs">Topological Sort</a></strong></td>
        <td>Directed graph where edges mean "must come before"; cycle = impossible</td>
      </tr>
    </tbody>
  </table>

  <h2 id="constraints"><span class="emoji">📏</span>Constraint → Complexity → Pattern</h2>

  <p>Cross-reference the constraint on <code>n</code> with the pattern you identified from signal words. If the complexities don't match, you need a faster approach.</p>

  <div class="diagram-wrap">
    <div class="diagram-title">Decision flow — from constraint to approach</div>
    <svg width="100%" height="320" viewBox="0 0 640 320">
      <!-- boxes -->
      <!-- n <= 20 -->
      <rect x="20"  y="20"  width="140" height="40" rx="8" fill="var(--surface2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="90"  y="37"  text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">n ≤ 12 / n ≤ 25</text>
      <text x="90"  y="52"  text-anchor="middle" font-size="10" fill="var(--ink)"   font-family="var(--font-display)">O(n!) Perms / O(2ⁿ) Subsets</text>

      <!-- n <= 1000 -->
      <rect x="20"  y="80"  width="140" height="40" rx="8" fill="var(--surface2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="90"  y="97"  text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">n ≤ 1 000</text>
      <text x="90"  y="112" text-anchor="middle" font-size="10" fill="var(--ink)"   font-family="var(--font-display)">O(n²) DP · Nested loops</text>

      <!-- n <= 100000 -->
      <rect x="20"  y="140" width="140" height="40" rx="8" fill="var(--surface2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="90"  y="157" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">n ≤ 100 000</text>
      <text x="90"  y="172" text-anchor="middle" font-size="10" fill="var(--ink)"   font-family="var(--font-display)">O(n log n) · Sort + BS</text>

      <!-- n <= 1000000 -->
      <rect x="20"  y="200" width="140" height="40" rx="8" fill="var(--surface2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="90"  y="217" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">n ≤ 1 000 000</text>
      <text x="90"  y="232" text-anchor="middle" font-size="10" fill="var(--ink)"   font-family="var(--font-display)">O(n) · Hash map · Pointers</text>

      <!-- n <= 1e9 -->
      <rect x="20"  y="260" width="140" height="40" rx="8" fill="var(--surface2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="90"  y="277" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">n ≤ 10⁹</text>
      <text x="90"  y="292" text-anchor="middle" font-size="10" fill="var(--ink)"   font-family="var(--font-display)">O(log n) · Binary search</text>

      <!-- connecting lines -->
      <line x1="90" y1="60"  x2="90" y2="80"  stroke="var(--border)" stroke-width="1.5"/>
      <line x1="90" y1="120" x2="90" y2="140" stroke="var(--border)" stroke-width="1.5"/>
      <line x1="90" y1="180" x2="90" y2="200" stroke="var(--border)" stroke-width="1.5"/>
      <line x1="90" y1="240" x2="90" y2="260" stroke="var(--border)" stroke-width="1.5"/>

      <!-- patterns column -->
      <text x="220" y="16" font-size="9" fill="var(--muted)" font-family="var(--font-display)" text-transform="uppercase" letter-spacing="1">Candidate Patterns</text>

      <!-- backtracking -->
      <rect x="220" y="22" width="390" height="34" rx="6" fill="rgba(232,68,42,0.07)" stroke="rgba(232,68,42,0.25)" stroke-width="1"/>
      <text x="234" y="43" font-size="11" fill="var(--accent)" font-family="var(--font-display)">Backtracking · Bitmask DP · Permutations</text>
      <line x1="160" y1="40" x2="220" y2="39" stroke="rgba(232,68,42,0.3)" stroke-width="1" stroke-dasharray="3,2"/>

      <!-- O(n²) -->
      <rect x="220" y="82" width="390" height="34" rx="6" fill="rgba(196,127,23,0.08)" stroke="rgba(196,127,23,0.25)" stroke-width="1"/>
      <text x="234" y="103" font-size="11" fill="var(--amber)" font-family="var(--font-display)">2D DP · Bubble/Insertion sort · LCS / Edit Distance</text>
      <line x1="160" y1="100" x2="220" y2="99" stroke="rgba(196,127,23,0.3)" stroke-width="1" stroke-dasharray="3,2"/>

      <!-- O(n log n) -->
      <rect x="220" y="142" width="390" height="34" rx="6" fill="rgba(43,92,230,0.07)" stroke="rgba(43,92,230,0.25)" stroke-width="1"/>
      <text x="234" y="163" font-size="11" fill="var(--blue)" font-family="var(--font-display)">Merge sort · Heap · Binary search · Divide &amp; conquer</text>
      <line x1="160" y1="160" x2="220" y2="159" stroke="rgba(43,92,230,0.3)" stroke-width="1" stroke-dasharray="3,2"/>

      <!-- O(n) -->
      <rect x="220" y="202" width="390" height="34" rx="6" fill="rgba(42,122,82,0.08)" stroke="rgba(42,122,82,0.3)" stroke-width="1.5"/>
      <text x="234" y="223" font-size="11" fill="var(--green)" font-family="var(--font-display)" font-weight="600">Two Pointers · Sliding Window · Hash Map · BFS/DFS</text>
      <line x1="160" y1="220" x2="220" y2="219" stroke="rgba(42,122,82,0.4)" stroke-width="1.5" stroke-dasharray="3,2"/>

      <!-- O(log n) -->
      <rect x="220" y="262" width="390" height="34" rx="6" fill="rgba(42,122,82,0.05)" stroke="rgba(42,122,82,0.2)" stroke-width="1"/>
      <text x="234" y="283" font-size="11" fill="var(--green)" font-family="var(--font-display)">Binary search on answer · Math formula · GCD</text>
      <line x1="160" y1="280" x2="220" y2="279" stroke="rgba(42,122,82,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
    </svg>
  </div>

  <h2 id="coding"><span class="emoji">⌨️</span>Writing the Code</h2>

  <p>Recognising the pattern is only half the battle — you still have to turn "this is a sliding window" into working Python under time pressure. Here's how to close that gap.</p>

  <div class="steps">

    <div class="step">
      <div class="step-body">
        <strong>Start from a skeleton, don't invent from scratch</strong>
        <p>The patterns below have a near-fixed shape every time. Memorise the <em>skeleton</em>, not individual solutions — then you only have to fill in the one or two lines that are specific to this problem. See <a href="#templates">Code Templates</a>.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Name variables for their role, not their type</strong>
        <p><code>left</code>/<code>right</code>, <code>slow</code>/<code>fast</code>, <code>window_start</code>, <code>prev</code>/<code>curr</code>/<code>next_node</code> — these names document the algorithm as you read it back. <code>i</code>, <code>j</code>, <code>x</code>, <code>tmp</code> force you to hold the meaning in your head, which is exactly where bugs hide under pressure.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Build outside-in: shape first, logic second</strong>
        <p>Write the loop or recursion structure with a <code>pass</code> or <code>...</code> inside first. Confirm it iterates the way you expect (add a print, trace it mentally). Only then fill in the condition/update logic. This isolates "did I loop wrong" bugs from "did I compute wrong" bugs instead of debugging both at once.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Reach for the Python tricks below instead of hand-rolling</strong>
        <p><code>collections</code>, <code>heapq</code>, and <code>bisect</code> replace 5–10 lines of manual bookkeeping with one import. Fewer lines you wrote yourself is fewer places for a typo to hide. See <a href="#tricks">Python Quick Tricks</a>.</p>
      </div>
    </div>

  </div>

  <h2 id="templates"><span class="emoji">🧩</span>Code Templates</h2>

  <p>These are the shapes behind most of the patterns from the signal-word table. Type them out from memory a few times each — muscle memory here frees up your brain for the actual problem-specific logic during an interview.</p>

  <pre><code><span class="cm"># Two Pointers (opposite ends, sorted array)</span>
<span class="kw">def</span> <span class="fn">two_pointer</span>(nums):
    left, right = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    <span class="kw">while</span> left < right:
        <span class="kw">if</span> <span class="cm"># condition too small</span>:
            left += <span class="num">1</span>
        <span class="kw">elif</span> <span class="cm"># condition too big</span>:
            right -= <span class="num">1</span>
        <span class="kw">else</span>:
            <span class="cm"># found it — record / return</span>
            left += <span class="num">1</span>; right -= <span class="num">1</span></code><span class="code-label">Python</span></pre>

  <pre><code><span class="cm"># Sliding Window (variable size)</span>
<span class="kw">def</span> <span class="fn">sliding_window</span>(s):
    left = <span class="num">0</span>
    best = <span class="num">0</span>
    window = {}  <span class="cm"># or a running sum / set / Counter</span>

    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        <span class="cm"># 1. expand: add s[right] to window</span>

        <span class="kw">while</span> <span class="cm"># window is invalid</span>:
            <span class="cm"># 2. shrink: remove s[left] from window</span>
            left += <span class="num">1</span>

        <span class="cm"># 3. window [left, right] is valid here — update best</span>
        best = <span class="fn">max</span>(best, right - left + <span class="num">1</span>)
    <span class="kw">return</span> best</code><span class="code-label">Python</span></pre>

  <pre><code><span class="cm"># Binary Search (the safe default template)</span>
<span class="kw">def</span> <span class="fn">binary_search</span>(nums, target):
    lo, hi = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    <span class="kw">while</span> lo <= hi:
        mid = (lo + hi) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] == target:
            <span class="kw">return</span> mid
        <span class="kw">elif</span> nums[mid] < target:
            lo = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            hi = mid - <span class="num">1</span>
    <span class="kw">return</span> -<span class="num">1</span>  <span class="cm"># not found; lo is the insertion point</span></code><span class="code-label">Python</span></pre>

  <pre><code><span class="cm"># BFS (shortest path / level order)</span>
<span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="kw">def</span> <span class="fn">bfs</span>(start, get_neighbors):
    queue = deque([start])
    visited = {start}
    steps = <span class="num">0</span>

    <span class="kw">while</span> queue:
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(queue)):  <span class="cm"># process one full level</span>
            node = queue.popleft()
            <span class="cm"># check goal condition on node here</span>
            <span class="kw">for</span> nxt <span class="kw">in</span> <span class="fn">get_neighbors</span>(node):
                <span class="kw">if</span> nxt <span class="kw">not in</span> visited:
                    visited.add(nxt)
                    queue.append(nxt)
        steps += <span class="num">1</span></code><span class="code-label">Python</span></pre>

  <pre><code><span class="cm"># DFS / Backtracking (all paths, combinations, permutations)</span>
<span class="kw">def</span> <span class="fn">backtrack</span>(path, choices):
    <span class="kw">if</span> <span class="cm"># path is a complete solution</span>:
        results.append(path[:])  <span class="cm"># copy! path is mutated after this</span>
        <span class="kw">return</span>

    <span class="kw">for</span> choice <span class="kw">in</span> choices:
        <span class="kw">if</span> <span class="cm"># choice is valid given current path</span>:
            path.append(choice)         <span class="cm"># make the choice</span>
            <span class="fn">backtrack</span>(path, next_choices)
            path.pop()                  <span class="cm"># undo it — this line is the one people forget</span></code><span class="code-label">Python</span></pre>

  <pre><code><span class="cm"># DP (bottom-up tabulation)</span>
<span class="kw">def</span> <span class="fn">dp_solve</span>(n):
    dp = [<span class="num">0</span>] * (n + <span class="num">1</span>)
    dp[<span class="num">0</span>] = <span class="cm"># base case</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, n + <span class="num">1</span>):
        dp[i] = <span class="cm"># recurrence using dp[i-1], dp[i-2], ...</span>
    <span class="kw">return</span> dp[n]</code><span class="code-label">Python</span></pre>

  <h2 id="tricks"><span class="emoji">⚡</span>Python Quick Tricks</h2>

  <p>Every one of these replaces boilerplate you'd otherwise hand-write (and risk a typo in) during an interview.</p>

  <table>
    <thead><tr><th>Instead of...</th><th>Use this</th><th>Why it wins</th></tr></thead>
    <tbody>
      <tr>
        <td>Manually checking <code>if key in dict</code> before incrementing</td>
        <td><code>from collections import Counter</code><br><code>counts = Counter(nums)</code></td>
        <td>One line builds a full frequency map; <code>counts.most_common(k)</code> gives the top-k for free</td>
      </tr>
      <tr>
        <td><code>if key not in d: d[key] = []</code> then <code>d[key].append(x)</code></td>
        <td><code>from collections import defaultdict</code><br><code>d = defaultdict(list)</code></td>
        <td><code>d[key].append(x)</code> just works even the first time — no existence check</td>
      </tr>
      <tr>
        <td><code>list.pop(0)</code> for a queue</td>
        <td><code>from collections import deque</code><br><code>q.popleft()</code></td>
        <td><code>pop(0)</code> is O(n) (shifts the whole list); <code>deque</code> is O(1) on both ends</td>
      </tr>
      <tr>
        <td>Sorting the whole array to find the k largest</td>
        <td><code>import heapq</code><br><code>heapq.nlargest(k, nums)</code> / <code>heapq.heappush(heap, x)</code></td>
        <td>O(n log k) instead of O(n log n); a heap only tracks the k you care about</td>
      </tr>
      <tr>
        <td>Writing your own binary search for insertion point</td>
        <td><code>import bisect</code><br><code>bisect.bisect_left(nums, target)</code></td>
        <td>Battle-tested, no off-by-one risk — use it whenever you just need the index, not a custom condition</td>
      </tr>
      <tr>
        <td><code>for i in range(len(nums)): x = nums[i]</code></td>
        <td><code>for i, x in enumerate(nums):</code></td>
        <td>Gives you the index and value together, cleaner and less error-prone</td>
      </tr>
      <tr>
        <td>Nested loop to pair up two lists</td>
        <td><code>for a, b in zip(list1, list2):</code></td>
        <td>Walks two (or more) sequences in lockstep in one line</td>
      </tr>
      <tr>
        <td>A manual loop to reverse a string/list</td>
        <td><code>s[::-1]</code></td>
        <td>Slicing with step -1 reverses in one expression</td>
      </tr>
      <tr>
        <td>A hardcoded huge number as a sentinel</td>
        <td><code>float('inf')</code> / <code>float('-inf')</code></td>
        <td>Always bigger/smaller than any real value, so "no valid answer yet" comparisons just work</td>
      </tr>
      <tr>
        <td>Custom comparator functions for sorting</td>
        <td><code>sorted(items, key=lambda x: (x[0], -x[1]))</code></td>
        <td>Sort by multiple fields, mixing ascending/descending, in one line</td>
      </tr>
      <tr>
        <td>Manually generating all subsets / orderings</td>
        <td><code>from itertools import combinations, permutations</code></td>
        <td>When n is small (see the constraint table) these are faster to write than backtracking from scratch</td>
      </tr>
      <tr>
        <td><code>set(a) & set(b)</code> written as a loop with membership checks</td>
        <td><code>set(a) & set(b)</code> (intersection), <code>|</code> (union), <code>-</code> (difference)</td>
        <td>Set algebra operators read exactly like the math — fast and self-documenting</td>
      </tr>
    </tbody>
  </table>

  <div class="callout warn">
    <div class="callout-title">When your code is wrong: debugging under pressure</div>
    <ol style="font-family:var(--font-display); font-size:0.9rem; color:var(--muted); line-height:1.8; margin:0; padding-left:1.25rem">
      <li><strong>Find the smallest failing input</strong> — not the whole test case, the smallest one that still breaks. A 2–3 element example is enough to spot most bugs.</li>
      <li><strong>Print the state inside the loop</strong> — the variables driving your pointers/window/recursion, on every iteration. The exact iteration where the value stops matching your hand trace is where the bug lives.</li>
      <li><strong>Check the boundaries first</strong> — the first and last iteration of a loop, the base case of a recursion, and the moment a pointer crosses another. Most bugs are off-by-one, not logic errors.</li>
      <li><strong>Re-read your own condition out loud</strong> — <code>&lt;</code> vs <code>&lt;=</code>, <code>and</code> vs <code>or</code>. Say it in English ("keep going while left is strictly less than right") and compare to what's on screen.</li>
    </ol>
  </div>

  <h2 id="worked"><span class="emoji">🔬</span>Worked Example</h2>

  <p>Let's apply the 6-step process to a real problem: <strong>LeetCode #3 — Longest Substring Without Repeating Characters</strong>.</p>

  <div class="callout info">
    <div class="callout-title">The Problem</div>
    Given a string <code>s</code>, find the length of the longest substring without repeating characters.<br><br>
    <strong>Example:</strong> <code>s = "abcabcbb"</code> → <code>3</code> (the substring "abc")
  </div>

  <div class="steps">

    <div class="step">
      <div class="step-body">
        <strong>Step 1 · Restate</strong>
        <p>Find the longest contiguous run of characters in <code>s</code> where no character appears twice. Return its length.</p>
        <p>Edge cases from the examples: <code>"bbbbb"</code> → 1 (all same, window is always 1). <code>"pwwkew"</code> → 3 ("wke"). What about empty string? → 0.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Step 2 · Constraints</strong>
        <p>Problem says <code>0 ≤ s.length ≤ 5 × 10⁴</code>. That's n ≤ 50 000, so we need <strong>O(n log n) or better</strong>. O(n²) (checking every substring) would be ~2.5 billion ops — too slow.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Step 3 · Signal Words</strong>
        <p>"Longest <strong>substring</strong>" + "without repeating" → this is a <strong>variable-size sliding window</strong>. The window is valid when it has no duplicates. We want the maximum valid window.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Step 4 · Plan</strong>
        <p>Keep a window <code>[L, R]</code> and a <strong>set</strong> of characters currently in the window. Expand R by adding <code>s[R]</code> to the set. If it's already there (duplicate), shrink from L until the duplicate is gone. Track <code>max(R - L + 1)</code> at every step.</p>
        <p>Complexity check: each character enters and leaves the set at most once → O(n). Space: O(min(n, alphabet_size)) for the set. ✓</p>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Step 5 · Code</strong>
<pre style="margin-top:0.5rem"><code><span class="kw">def</span> <span class="fn">length_of_longest_substring</span>(s: <span class="fn">str</span>) -> <span class="fn">int</span>:
    L = <span class="num">0</span>
    seen = <span class="fn">set</span>()
    best = <span class="num">0</span>

    <span class="kw">for</span> R <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        <span class="kw">while</span> s[R] <span class="kw">in</span> seen:   <span class="cm"># duplicate found — shrink from left</span>
            seen.remove(s[L])
            L += <span class="num">1</span>
        seen.add(s[R])
        best = <span class="fn">max</span>(best, R - L + <span class="num">1</span>)

    <span class="kw">return</span> best</code><span class="code-label">Python</span></pre>
      </div>
    </div>

    <div class="step">
      <div class="step-body">
        <strong>Step 6 · Verify</strong>
        <p>Trace <code>"abcabcbb"</code>:</p>
        <ul style="font-family:var(--font-display); font-size:0.875rem; color:var(--muted); line-height:2">
          <li>R=0 'a': seen={a}, best=1</li>
          <li>R=1 'b': seen={a,b}, best=2</li>
          <li>R=2 'c': seen={a,b,c}, best=3</li>
          <li>R=3 'a': duplicate! remove 'a', L=1. seen={b,c,a}, best=3</li>
          <li>R=4 'b': duplicate! remove 'b', L=2. seen={c,a,b}, best=3</li>
          <li>R=5 'c': duplicate! remove 'c', L=3. seen={a,b,c}, best=3</li>
          <li>R=6 'b': duplicate! remove 'a', L=4. Remove 'b', L=5. seen={c,b}, best=3</li>
          <li>R=7 'b': duplicate! remove 'c', L=6. Remove 'b', L=7. seen={b}, best=3</li>
        </ul>
        <p>Result: 3 ✓. Edge cases: empty string → loop never runs → 0 ✓. All same → window is always 1 ✓.</p>
      </div>
    </div>

  </div>

  <h2 id="traps"><span class="emoji">⚠️</span>Common Traps</h2>

  <table>
    <thead><tr><th>Trap</th><th>What goes wrong</th><th>How to avoid it</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>Assuming the array is sorted</strong></td>
        <td>Two-pointer logic only works when sorted. On an unsorted array it silently gives wrong answers.</td>
        <td>Always check. If not sorted and you need it sorted, add a <code>nums.sort()</code> and note the O(n log n) cost.</td>
      </tr>
      <tr>
        <td><strong>Off-by-one in binary search</strong></td>
        <td><code>while L &lt; R</code> vs <code>while L &lt;= R</code>; <code>mid + 1</code> vs <code>mid</code> for the boundary — each variant means something different.</td>
        <td>Pick one template and stick with it. The most common safe default: <code>while L &lt;= R</code>, <code>L = mid + 1</code>, <code>R = mid - 1</code>.</td>
      </tr>
      <tr>
        <td><strong>Modifying the input</strong></td>
        <td>Some problems say "do not modify the input array." Sorting in-place violates this.</td>
        <td>Note whether in-place modification is allowed. If not, copy the array first.</td>
      </tr>
      <tr>
        <td><strong>Forgetting to handle empty / single-element input</strong></td>
        <td>Code that assumes <code>len(nums) &gt;= 2</code> crashes on edge cases.</td>
        <td>Always trace through the empty and single-element cases after writing the solution.</td>
      </tr>
      <tr>
        <td><strong>Skipping duplicates in two-pointer</strong></td>
        <td>3Sum-style problems require skipping duplicate values of each pointer or you get duplicate triplets in the output.</td>
        <td>After finding a valid result, add <code>while L &lt; R and nums[L] == nums[L-1]: L += 1</code>.</td>
      </tr>
      <tr>
        <td><strong>Using a list as a queue</strong></td>
        <td><code>list.pop(0)</code> is O(n) because it shifts every element. On n=10⁵ this turns O(n) BFS into O(n²).</td>
        <td>Always use <code>from collections import deque</code> for BFS queues.</td>
      </tr>
      <tr>
        <td><strong>Mutating state you need for backtracking</strong></td>
        <td>Forgetting to undo a choice after recursing causes future branches to see corrupted state.</td>
        <td>Every "add" before the recursive call needs a matching "remove" after it returns.</td>
      </tr>
      <tr>
        <td><strong>Confusing O(n) BFS space with O(1)</strong></td>
        <td>BFS queues can hold O(n) nodes at once (think: a complete binary tree's last level). Claiming O(1) space is wrong.</td>
        <td>BFS space = O(max width of the graph). DFS space = O(max depth / height).</td>
      </tr>
    </tbody>
  </table>

  <h2 id="interview"><span class="emoji">🗣️</span>Talking Through It In an Interview</h2>

  <p>An interviewer is grading your process, not just your final answer. Silently typing for 20 minutes reads as worse than narrating a slightly slower solution — they can't award points for reasoning they can't see.</p>

  <table>
    <thead><tr><th>Moment</th><th>Say something like...</th></tr></thead>
    <tbody>
      <tr>
        <td>Right after hearing the problem</td>
        <td>"Let me restate this to make sure I've got it..." then repeat it back. Ask about anything ambiguous: can the array be empty? Are there duplicates? Negative numbers?</td>
      </tr>
      <tr>
        <td>Before jumping to the optimal approach</td>
        <td>"The brute force here is O(n²) — check every pair. Let me think about whether the constraint allows that, or if we need better." Naming the brute force costs you 10 seconds and proves you can always fall back to <em>something</em>.</td>
      </tr>
      <tr>
        <td>Once you spot the pattern</td>
        <td>"This looks like a sliding window, since we want a contiguous max/min substring." Name the pattern out loud — it invites the interviewer to correct you early if you're off track, before you've written any code.</td>
      </tr>
      <tr>
        <td>Right before coding</td>
        <td>"So the plan is: expand right, and whenever the window's invalid, shrink from the left." One sentence. If they nod, code. If they hesitate, that's your cue to re-check the plan.</td>
      </tr>
      <tr>
        <td>While coding</td>
        <td>Narrate what you're writing, not why it's DSA — "setting up left and right pointers at the two ends" — so silence doesn't stretch past ~30 seconds.</td>
      </tr>
      <tr>
        <td>After coding</td>
        <td>"Let me trace through the example." Actually do it, out loud, on the given input — this is where you catch your own bugs before the interviewer does.</td>
      </tr>
      <tr>
        <td>At the end</td>
        <td>State time and space complexity unprompted. It signals you think about it by default, not only when asked.</td>
      </tr>
    </tbody>
  </table>

  <div class="callout tip">
    <div class="callout-title">When you're completely stuck</div>
    <ol style="font-family:var(--font-display); font-size:0.9rem; color:var(--muted); line-height:1.8; margin:0; padding-left:1.25rem">
      <li>Solve the brute-force first — even O(n³). It confirms you understand the problem, and the optimisation often becomes obvious once the brute force is written.</li>
      <li>Draw it. A linked list problem on paper almost always reveals the pointer manipulation.</li>
      <li>Ask: "what information do I wish I had at each step?" — that's usually what you should be storing in your extra data structure.</li>
      <li>Look at the constraints again. n ≤ 20 is screaming "try all subsets." n ≤ 10⁶ is screaming "one pass."</li>
    </ol>
  </div>

</article>
`
}

export function init() {}
