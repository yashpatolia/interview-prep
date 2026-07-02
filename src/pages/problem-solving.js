export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#process">The 6-Step Process</a>
  <a href="#signals">Pattern Signal Words</a>
  <a href="#constraints">Constraint → Complexity</a>
  <a href="#worked">Worked Example</a>
  <a href="#traps">Common Traps</a>
</div>

<article>
  <h1><em>How to Solve</em> Problems</h1>
  <p class="subtitle">Reference · Recognise the pattern before writing a single line of code</p>

  <div class="callout tip">
    <div class="callout-title">The Core Insight</div>
    Every LeetCode problem is a disguised version of a pattern you already know. The skill isn't memorising solutions — it's learning to strip away the story and see the underlying structure. A "trip planning" problem and a "course scheduling" problem are both topological sort in disguise.
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
