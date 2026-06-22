export function render() {
  return `
<nav>
  <a href="/">Home</a>
  <span class="sep">›</span>
  <span class="current">Binary Search</span>
</nav>

<div class="toc">
  <h4>On This Page</h4>
  <a href="#idea">The Big Idea</a>
  <a href="#template">Classic Template</a>
  <a href="#boundaries">Finding Boundaries</a>
  <a href="#search-space">Search Space Reduction</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Binary</em> Search</h1>
  <p class="subtitle">Chapter 6 · Halve the search space every step</p>

  <h2 id="idea"><span class="emoji">🔍</span>The Big Idea</h2>

  <p>Binary search only works on a <strong>sorted</strong> collection. The key insight: if you pick the <em>middle</em> element and it isn't your target, the sorted order tells you exactly which half the target must be in — so you can <strong>discard the other half entirely</strong>.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Guess a Number 1 to 100</div>
    I'm thinking of a number between 1 and 100. You guess 50. I say "too low." Now you know it's in 51–100 — you've eliminated <strong>half the possibilities with one guess</strong>. You guess 75. I say "too high." Now 51–74. One more guess and you're down to ~12 numbers. After at most 7 guesses you've found it. That's O(log n) in action.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Binary Search on [1, 3, 5, 7, 9, 11, 13, 15] — searching for 9</div>
    <svg width="100%" height="180" viewBox="0 0 640 180">
      <defs>
        <marker id="bs-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
        <marker id="bs-arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#E8442A"/>
        </marker>
      </defs>

      <!-- Array cells -->
      <g transform="translate(20, 60)">
        <!-- Cell 0: value 1 — eliminated (Lo) -->
        <rect x="0"   y="0" width="70" height="50" rx="6" fill="rgba(232,68,42,0.08)" stroke="#E8442A" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="35"  y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 0</text>
        <text x="35"  y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#E8442A">1</text>

        <!-- Cell 1: value 3 — eliminated -->
        <rect x="74"  y="0" width="70" height="50" rx="6" fill="rgba(232,68,42,0.08)" stroke="#E8442A" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="109" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 1</text>
        <text x="109" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#E8442A">3</text>

        <!-- Cell 2: value 5 — eliminated -->
        <rect x="148" y="0" width="70" height="50" rx="6" fill="rgba(232,68,42,0.08)" stroke="#E8442A" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="183" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 2</text>
        <text x="183" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#E8442A">5</text>

        <!-- Cell 3: value 7 — mid (amber) -->
        <rect x="222" y="0" width="70" height="50" rx="6" fill="rgba(196,127,23,0.12)" stroke="#C47F17" stroke-width="2"/>
        <text x="257" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 3</text>
        <text x="257" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#C47F17">7</text>

        <!-- Cell 4: value 9 — active search space (green) -->
        <rect x="296" y="0" width="70" height="50" rx="6" fill="rgba(42,122,82,0.12)" stroke="#2A7A52" stroke-width="2"/>
        <text x="331" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 4</text>
        <text x="331" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#2A7A52">9</text>

        <!-- Cell 5: value 11 -->
        <rect x="370" y="0" width="70" height="50" rx="6" fill="rgba(43,92,230,0.07)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="405" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 5</text>
        <text x="405" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">11</text>

        <!-- Cell 6: value 13 -->
        <rect x="444" y="0" width="70" height="50" rx="6" fill="rgba(43,92,230,0.07)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="479" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 6</text>
        <text x="479" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">13</text>

        <!-- Cell 7: value 15 -->
        <rect x="518" y="0" width="70" height="50" rx="6" fill="rgba(43,92,230,0.07)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="553" y="20" text-anchor="middle" font-size="10" fill="#8A8F9E">idx 7</text>
        <text x="553" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">15</text>
      </g>

      <!-- Pointer labels -->
      <text x="35"  y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#2A7A52">L</text>
      <text x="277" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#C47F17">mid</text>
      <text x="573" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#E8442A">R</text>

      <!-- Strike-through label for eliminated half -->
      <text x="110" y="150" text-anchor="middle" font-size="11" fill="#E8442A">Left half eliminated</text>
      <text x="110" y="164" text-anchor="middle" font-size="10" fill="#8A8F9E">(a[mid]=7 &lt; target=9, so L = mid+1)</text>

      <!-- Arrow pointing to kept half -->
      <text x="440" y="150" text-anchor="middle" font-size="11" fill="#2A7A52">Search continues here</text>
    </svg>
  </div>

  <h2 id="template"><span class="emoji">📐</span>Classic Template</h2>

  <p>There are a few common binary search templates. The most universal uses <strong>inclusive boundaries</strong> (<code>L</code> and <code>R</code> both point to valid indices). The loop runs while <code>L &lt;= R</code>.</p>

  <pre><code><span class="kw">def</span> <span class="fn">binary_search</span>(nums: <span class="fn">list</span>, target: <span class="fn">int</span>) -&gt; <span class="fn">int</span>:
    L, R = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>

    <span class="kw">while</span> L &lt;= R:                          <span class="cm"># &lt;= because both boundaries are inclusive</span>
        mid = L + (R - L) // <span class="num">2</span>            <span class="cm"># avoids integer overflow vs (L+R)//2</span>

        <span class="kw">if</span> nums[mid] == target:
            <span class="kw">return</span> mid                    <span class="cm"># found it!</span>
        <span class="kw">elif</span> nums[mid] &lt; target:
            L = mid + <span class="num">1</span>                   <span class="cm"># target is in the RIGHT half</span>
        <span class="kw">else</span>:
            R = mid - <span class="num">1</span>                   <span class="cm"># target is in the LEFT half</span>

    <span class="kw">return</span> -<span class="num">1</span>                             <span class="cm"># not found</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">Why mid = L + (R-L)//2?</div>
    In Python, integers have unlimited size so <code>(L+R)//2</code> never overflows. But in C++/Java, <code>L+R</code> can exceed <code>INT_MAX</code>. Using <code>L + (R-L)//2</code> is a safe habit to build — and it's what interviewers expect to see.
  </div>

  <h3>Half-Open Boundary Variant</h3>
  <p>Some templates use <code>R = len(nums)</code> (one past the end) and loop while <code>L &lt; R</code>. This is common in Python's <code>bisect</code> module. Both are correct — pick one and stick with it.</p>

  <pre><code><span class="cm"># Half-open variant: L is inclusive, R is exclusive</span>
<span class="kw">def</span> <span class="fn">binary_search_half_open</span>(nums, target):
    L, R = <span class="num">0</span>, <span class="fn">len</span>(nums)   <span class="cm"># R is one past the end</span>

    <span class="kw">while</span> L &lt; R:            <span class="cm"># strict &lt; because R is exclusive</span>
        mid = L + (R - L) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] == target:
            <span class="kw">return</span> mid
        <span class="kw">elif</span> nums[mid] &lt; target:
            L = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            R = mid          <span class="cm"># not mid-1 because R is already exclusive</span>

    <span class="kw">return</span> -<span class="num">1</span></code><span class="code-label">Python</span></pre>

  <h2 id="boundaries"><span class="emoji">🎯</span>Finding Boundaries</h2>

  <p>Sometimes there are <em>duplicate</em> values and you need the <strong>leftmost</strong> or <strong>rightmost</strong> occurrence. The trick: don't return immediately when you find the target — keep narrowing the search space.</p>

  <pre><code><span class="cm"># Find the LEFTMOST index where nums[i] == target</span>
<span class="kw">def</span> <span class="fn">left_bound</span>(nums, target):
    L, R = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    result = -<span class="num">1</span>

    <span class="kw">while</span> L &lt;= R:
        mid = L + (R - L) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] == target:
            result = mid       <span class="cm"># record this as a candidate...</span>
            R = mid - <span class="num">1</span>      <span class="cm"># ...but keep searching LEFT for an earlier one</span>
        <span class="kw">elif</span> nums[mid] &lt; target:
            L = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            R = mid - <span class="num">1</span>

    <span class="kw">return</span> result

<span class="cm"># Find the RIGHTMOST index where nums[i] == target</span>
<span class="kw">def</span> <span class="fn">right_bound</span>(nums, target):
    L, R = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    result = -<span class="num">1</span>

    <span class="kw">while</span> L &lt;= R:
        mid = L + (R - L) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] == target:
            result = mid       <span class="cm"># record this as a candidate...</span>
            L = mid + <span class="num">1</span>      <span class="cm"># ...but keep searching RIGHT for a later one</span>
        <span class="kw">elif</span> nums[mid] &lt; target:
            L = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            R = mid - <span class="num">1</span>

    <span class="kw">return</span> result

<span class="cm"># Example: [1, 2, 2, 2, 3]</span>
nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>]
<span class="fn">print</span>(<span class="fn">left_bound</span>(nums, <span class="num">2</span>))   <span class="cm"># 1</span>
<span class="fn">print</span>(<span class="fn">right_bound</span>(nums, <span class="num">2</span>))  <span class="cm"># 3</span></code><span class="code-label">Python</span></pre>

  <div class="callout warn">
    <div class="callout-title">Common Mistake</div>
    When searching for the left bound, the urge is to return as soon as you find the target. Resist it — you must set <code>R = mid - 1</code> and keep going. The <code>result</code> variable holds the best answer seen so far.
  </div>

  <h2 id="search-space"><span class="emoji">🧮</span>Search Space Reduction</h2>

  <p>Binary search isn't just for searching sorted arrays. The real power is this: <strong>any problem where the answer space is monotonic can be binary searched.</strong></p>

  <p>Example: <em>Find Minimum in Rotated Sorted Array</em>. The array was sorted, then rotated at some pivot. There's a key observation — if <code>nums[mid] &gt; nums[R]</code>, the minimum must be in the <strong>right half</strong> (the rotation inflection is there). Otherwise it's in the left half.</p>

  <pre><code><span class="cm"># 153. Find Minimum in Rotated Sorted Array</span>
<span class="cm"># e.g. [4, 5, 6, 7, 0, 1, 2] — rotated from [0,1,2,4,5,6,7]</span>
<span class="kw">def</span> <span class="fn">find_min</span>(nums):
    L, R = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>

    <span class="kw">while</span> L &lt; R:
        mid = L + (R - L) // <span class="num">2</span>

        <span class="kw">if</span> nums[mid] &gt; nums[R]:
            <span class="cm"># mid is in the LEFT (larger) part — min is to the right</span>
            L = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            <span class="cm"># mid is in the RIGHT (smaller) part — min is here or to the left</span>
            R = mid      <span class="cm"># don't do mid-1 — mid itself might be the answer</span>

    <span class="kw">return</span> nums[L]   <span class="cm"># L == R, converged to the minimum</span>

<span class="fn">print</span>(<span class="fn">find_min</span>([<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,<span class="num">0</span>,<span class="num">1</span>,<span class="num">2</span>]))  <span class="cm"># 0</span>
<span class="fn">print</span>(<span class="fn">find_min</span>([<span class="num">3</span>,<span class="num">1</span>,<span class="num">2</span>]))            <span class="cm"># 1</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">The Meta-Pattern</div>
    When you see a problem where you can ask a yes/no question about a value and the answers form a pattern like FFFFTTTT or TTTTFFFF, binary search can find the boundary in O(log n). This unlocks problems about capacity, scheduling, and optimization — not just array searching.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity</h2>

  <p>Each iteration <em>halves</em> the remaining search space. Starting from <code>n</code> elements:</p>

  <pre><code><span class="cm"># How many halvings until we reach 1 element?</span>
<span class="cm"># n → n/2 → n/4 → n/8 → ... → 1</span>
<span class="cm"># That's log₂(n) steps.</span>
<span class="cm">#</span>
<span class="cm"># n = 1,000,000 → log₂(1,000,000) ≈ 20 steps</span>
<span class="cm"># n = 1,000,000,000 → log₂(10⁹) ≈ 30 steps</span>
<span class="cm"># Binary search on a BILLION elements takes ~30 comparisons!</span></code><span class="code-label">Python</span></pre>

  <table>
    <thead>
      <tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Linear Search</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>Works on unsorted arrays</td></tr>
      <tr><td>Binary Search</td><td class="o-logn">O(log n)</td><td class="o-1">O(1)</td><td>Requires sorted input</td></tr>
      <tr><td>Binary Search (recursive)</td><td class="o-logn">O(log n)</td><td class="o-logn">O(log n)</td><td>Stack depth = log n</td></tr>
      <tr><td>Sort + Binary Search</td><td class="o-n">O(n log n)</td><td class="o-1">O(1)</td><td>Sort dominates; often worth it</td></tr>
    </tbody>
  </table>

  <h3>Interactive Demo — Binary Search Step-by-Step</h3>

  <div class="demo-box">
    <h4>Array: [1, 3, 5, 7, 9, 11, 13, 15] — Target: 9</h4>
    <div class="demo-controls">
      <button class="btn" onclick="bsStep()" id="bs-btn">Next Step →</button>
      <button class="btn" onclick="bsReset()">Reset</button>
    </div>
    <div class="demo-array" id="bs-arr">
      <div class="arr-cell" id="bs-0"><span class="arr-idx">0</span><span class="arr-v">1</span></div>
      <div class="arr-cell" id="bs-1"><span class="arr-idx">1</span><span class="arr-v">3</span></div>
      <div class="arr-cell" id="bs-2"><span class="arr-idx">2</span><span class="arr-v">5</span></div>
      <div class="arr-cell" id="bs-3"><span class="arr-idx">3</span><span class="arr-v">7</span></div>
      <div class="arr-cell" id="bs-4"><span class="arr-idx">4</span><span class="arr-v">9</span></div>
      <div class="arr-cell" id="bs-5"><span class="arr-idx">5</span><span class="arr-v">11</span></div>
      <div class="arr-cell" id="bs-6"><span class="arr-idx">6</span><span class="arr-v">13</span></div>
      <div class="arr-cell" id="bs-7"><span class="arr-idx">7</span><span class="arr-v">15</span></div>
    </div>
    <div style="margin: 0.4rem 0; font-size: 0.8rem; color: var(--muted); font-family: var(--font-display);">
      <span style="color: var(--green); font-weight: 700;">L</span> = left boundary &nbsp;|&nbsp;
      <span style="color: var(--accent); font-weight: 700;">R</span> = right boundary &nbsp;|&nbsp;
      <span style="color: var(--amber); font-weight: 700;">mid</span> = current check &nbsp;|&nbsp;
      <span style="color: var(--muted); text-decoration: line-through;">──</span> = eliminated
    </div>
    <div class="demo-output" id="bs-output">Click "Next Step" to start. L=0, R=7, searching for 9.</div>
  </div>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>Work through these in order — each one adds a twist on the core template.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#704 · Binary Search</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given a sorted array of distinct integers and a target, return the index of the target or -1 if not found.
      <br><br>
      <strong>Example:</strong> <code>nums = [-1,0,3,5,9,12]</code>, <code>target = 9</code> → <code>4</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Classic template. Use <code>while L &lt;= R</code>, <code>mid = L + (R-L)//2</code>. If <code>nums[mid] == target</code> return mid. If less, move L up. If greater, move R down.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">search</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>], target: <span class="fn">int</span>) -> <span class="fn">int</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    <span class="kw">while</span> left &lt;= right:
        mid = left + (right - left) // <span class="num">2</span>   <span class="cm"># avoids overflow vs (left+right)//2</span>
        <span class="kw">if</span> nums[mid] == target:
            <span class="kw">return</span> mid
        <span class="kw">elif</span> nums[mid] &lt; target:
            left = mid + <span class="num">1</span>      <span class="cm"># target is in the right half</span>
        <span class="kw">else</span>:
            right = mid - <span class="num">1</span>     <span class="cm"># target is in the left half</span>
    <span class="kw">return</span> -<span class="num">1</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(log n) — search space halves each step &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/binary-search/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#74 · Search a 2D Matrix</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Each row of the matrix is sorted, and each row starts with a value greater than the last element of the previous row. Search for a target.
      <br><br>
      <strong>Example:</strong> matrix <code>[[1,3,5],[7,9,11],[13,15,17]]</code>, target <code>9</code> → <code>True</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Treat the whole matrix as a 1D sorted array of <code>m × n</code> elements. For index <code>mid</code>: <code>row = mid // cols</code>, <code>col = mid % cols</code>. Run standard binary search on indices 0 to m*n-1.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">search_matrix</span>(matrix: <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">int</span>]], target: <span class="fn">int</span>) -> <span class="fn">bool</span>:
    rows, cols = <span class="fn">len</span>(matrix), <span class="fn">len</span>(matrix[<span class="num">0</span>])
    left, right = <span class="num">0</span>, rows * cols - <span class="num">1</span>
    <span class="kw">while</span> left &lt;= right:
        mid = left + (right - left) // <span class="num">2</span>
        val = matrix[mid // cols][mid % cols]   <span class="cm"># map 1D index back to (row, col)</span>
        <span class="kw">if</span> val == target:
            <span class="kw">return</span> <span class="kw">True</span>
        <span class="kw">elif</span> val &lt; target:
            left = mid + <span class="num">1</span>
        <span class="kw">else</span>:
            right = mid - <span class="num">1</span>
    <span class="kw">return</span> <span class="kw">False</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(log(m·n)) — single binary search over the flattened matrix &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/search-a-2d-matrix/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#153 · Find Minimum in Rotated Sorted Array</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      An array was sorted then rotated at some pivot. Find the minimum element in O(log n).
      <br><br>
      <strong>Example:</strong> <code>[3,4,5,1,2]</code> → <code>1</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">The minimum is at the inflection point. If <code>nums[mid] &gt; nums[R]</code>, the minimum is in the right half — set <code>L = mid + 1</code>. Otherwise set <code>R = mid</code> (mid might itself be the minimum). Stop when <code>L == R</code>.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">find_min</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">int</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    <span class="kw">while</span> left &lt; right:
        mid = left + (right - left) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] &gt; nums[right]:
            left = mid + <span class="num">1</span>    <span class="cm"># inflection point is to the right of mid</span>
        <span class="kw">else</span>:
            right = mid          <span class="cm"># mid could itself be the minimum, keep it in range</span>
    <span class="kw">return</span> nums[left]            <span class="cm"># loop ends when left == right == min's index</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(log n) &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#33 · Search in Rotated Sorted Array</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Same rotated array — but now search for a specific target. Return the index or -1.
      <br><br>
      <strong>Example:</strong> <code>[4,5,6,7,0,1,2]</code>, target <code>0</code> → <code>4</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">At each step, one half is always sorted. Check if the target falls within the sorted half — if so, search there. Otherwise search the other half. Two if-branches: one for "left half is sorted", one for "right half is sorted".</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">search_rotated</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>], target: <span class="fn">int</span>) -> <span class="fn">int</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
    <span class="kw">while</span> left &lt;= right:
        mid = left + (right - left) // <span class="num">2</span>
        <span class="kw">if</span> nums[mid] == target:
            <span class="kw">return</span> mid
        <span class="kw">if</span> nums[left] &lt;= nums[mid]:        <span class="cm"># left half is sorted</span>
            <span class="kw">if</span> nums[left] &lt;= target &lt; nums[mid]:
                right = mid - <span class="num">1</span>          <span class="cm"># target in sorted left half</span>
            <span class="kw">else</span>:
                left = mid + <span class="num">1</span>           <span class="cm"># target must be in the right half</span>
        <span class="kw">else</span>:                               <span class="cm"># right half is sorted</span>
            <span class="kw">if</span> nums[mid] &lt; target &lt;= nums[right]:
                left = mid + <span class="num">1</span>           <span class="cm"># target in sorted right half</span>
            <span class="kw">else</span>:
                right = mid - <span class="num">1</span>          <span class="cm"># target must be in the left half</span>
    <span class="kw">return</span> -<span class="num">1</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(log n) — halves the search space every iteration &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/search-in-rotated-sorted-array/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to Practice</div>
    Start with <strong>#704</strong> — it's the pure template. Once that feels automatic, tackle <strong>#153</strong> (the inflection-point trick is reused in many problems). <strong>#33</strong> is a classic interview problem — it combines the two ideas.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/stacks-queues" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Stacks &amp; Queues</a>
    <a href="/trees" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Trees &amp; BFS/DFS →</a>
  </div>
</article>
`
}

export function init() {
  const bsArr = [1, 3, 5, 7, 9, 11, 13, 15]
  const bsTarget = 9
  let bsL = 0, bsR = 7, bsDone = false, bsStep_num = 0

  function bsClearCells() {
    for (let i = 0; i < bsArr.length; i++) {
      document.getElementById('bs-' + i).className = 'arr-cell'
    }
  }

  function bsRenderState(L, R, mid) {
    bsClearCells()
    // Eliminated: indices outside [L, R]
    for (let i = 0; i < bsArr.length; i++) {
      if (i < L || i > R) {
        document.getElementById('bs-' + i).classList.add('arr-lo')
      }
    }
    // Active range (L to R excluding mid) — default style is fine (blue tint)
    // mid = amber
    if (mid >= 0) {
      document.getElementById('bs-' + mid).classList.add('arr-hi')
    }
    // Mark L and R boundaries visually (they stay their default color within range)
  }

  window.bsStep = function() {
    if (bsDone) return
    bsStep_num++

    if (bsL > bsR) {
      bsDone = true
      bsClearCells()
      for (let i = 0; i < bsArr.length; i++) {
        document.getElementById('bs-' + i).classList.add('arr-lo')
      }
      document.getElementById('bs-output').textContent = 'Not found. L > R — search exhausted. Return -1.'
      document.getElementById('bs-btn').textContent = 'Done ✓'
      return
    }

    const mid = bsL + Math.floor((bsR - bsL) / 2)
    bsRenderState(bsL, bsR, mid)

    if (bsArr[mid] === bsTarget) {
      document.getElementById('bs-' + mid).className = 'arr-cell arr-swap'
      document.getElementById('bs-output').textContent =
        'Step ' + bsStep_num + ': L=' + bsL + ', R=' + bsR + ', mid=' + mid + '. a[' + mid + ']=' + bsArr[mid] + ' == ' + bsTarget + '. Found at index ' + mid + '!'
      document.getElementById('bs-btn').textContent = 'Done ✓'
      bsDone = true
      return
    }

    let msg = ''
    if (bsArr[mid] < bsTarget) {
      msg = 'Step ' + bsStep_num + ': L=' + bsL + ', R=' + bsR + ', mid=' + mid + '. a[' + mid + ']=' + bsArr[mid] + ' < ' + bsTarget + '. Move L to mid+1=' + (mid + 1) + '.'
      bsL = mid + 1
    } else {
      msg = 'Step ' + bsStep_num + ': L=' + bsL + ', R=' + bsR + ', mid=' + mid + '. a[' + mid + ']=' + bsArr[mid] + ' > ' + bsTarget + '. Move R to mid-1=' + (mid - 1) + '.'
      bsR = mid - 1
    }
    document.getElementById('bs-output').textContent = msg
  }

  window.bsReset = function() {
    bsL = 0; bsR = 7; bsDone = false; bsStep_num = 0
    bsClearCells()
    document.getElementById('bs-output').textContent = 'Click "Next Step" to start. L=0, R=7, searching for 9.'
    document.getElementById('bs-btn').textContent = 'Next Step →'
  }
}
