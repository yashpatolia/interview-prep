export function render() {
  return `
<nav>
  <a href="/">Home</a>
  <span class="sep">›</span>
  <span class="current">Dynamic Programming</span>
</nav>

<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What is DP?</a>
  <a href="#top-down">Top-Down: Memoization</a>
  <a href="#bottom-up">Bottom-Up: Tabulation</a>
  <a href="#framework">The DP Framework</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Dynamic</em> Programming</h1>
  <p class="subtitle">Chapter 8 · Memoize overlapping subproblems</p>

  <h2 id="what"><span class="emoji">🧩</span>What is DP?</h2>

  <p>Dynamic Programming is a technique for solving problems by <strong>breaking them into subproblems</strong>, solving each subproblem once, and <strong>storing the results</strong> to avoid recomputing them. This transforms exponential brute-force solutions into polynomial time.</p>

  <p>Two conditions must hold for DP to apply:</p>
  <ul>
    <li><strong>Optimal substructure</strong> — the optimal solution to the big problem can be built from optimal solutions to subproblems.</li>
    <li><strong>Overlapping subproblems</strong> — the same subproblem appears multiple times during recursion (pure divide-and-conquer like merge sort does not have this).</li>
  </ul>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Filing Your Tax Return</div>
    When filling out your tax return, you compute your total income once and then reuse that figure across multiple deductions and calculations. You don't go back and re-add up every paycheck for every line item. That's exactly what DP does — compute a result once, store it, reuse it freely.
  </div>

  <h2 id="top-down"><span class="emoji">⬇️</span>Top-Down: Memoization</h2>

  <p>The <strong>top-down</strong> approach starts from the big problem and recurses down to smaller subproblems — exactly like naive recursion, but with a <em>cache</em> (memo). Before computing, check if the answer is already cached. If yes, return it immediately instead of recursing.</p>

  <pre><code><span class="cls">Naive Fibonacci — O(2^n)</span>
<span class="kw">def</span> <span class="fn">fib_naive</span>(n):
    <span class="kw">if</span> n &lt;= <span class="num">1</span>:
        <span class="kw">return</span> n
    <span class="kw">return</span> <span class="fn">fib_naive</span>(n - <span class="num">1</span>) + <span class="fn">fib_naive</span>(n - <span class="num">2</span>)
<span class="cm"># fib(5) calls fib(3) TWICE, fib(2) THREE times, etc.</span>
<span class="cm"># The recursion tree doubles at every level → O(2^n)</span>

<span class="cls">Memoized Fibonacci — O(n)</span>
<span class="kw">def</span> <span class="fn">fib_memo</span>(n, memo={}):
    <span class="kw">if</span> n <span class="kw">in</span> memo:
        <span class="kw">return</span> memo[n]        <span class="cm"># cache hit — skip recursion</span>
    <span class="kw">if</span> n &lt;= <span class="num">1</span>:
        <span class="kw">return</span> n
    memo[n] = <span class="fn">fib_memo</span>(n - <span class="num">1</span>, memo) + <span class="fn">fib_memo</span>(n - <span class="num">2</span>, memo)
    <span class="kw">return</span> memo[n]
<span class="cm"># Each unique n is computed exactly once → O(n) time, O(n) space</span>

<span class="cm"># Python shortcut: @functools.lru_cache</span>
<span class="kw">import</span> functools

<span class="fn">@functools</span>.lru_cache(maxsize=<span class="kw">None</span>)
<span class="kw">def</span> <span class="fn">fib</span>(n):
    <span class="kw">if</span> n &lt;= <span class="num">1</span>: <span class="kw">return</span> n
    <span class="kw">return</span> <span class="fn">fib</span>(n - <span class="num">1</span>) + <span class="fn">fib</span>(n - <span class="num">2</span>)</code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">How the cache prunes the recursion tree</div>
    For <code>fib(5)</code> the naive tree has 15 calls. With memoization, once <code>fib(3)</code> is computed and cached, every subsequent call to <code>fib(3)</code> returns instantly. The tree collapses from 15 calls to just 9 (one per unique argument). At n=40 the savings are astronomical.
  </div>

  <h2 id="bottom-up"><span class="emoji">⬆️</span>Bottom-Up: Tabulation</h2>

  <p>The <strong>bottom-up</strong> approach is iterative. Instead of recursing from the top, you fill a table starting from the smallest subproblems and build up to the answer. No recursion stack, no risk of stack overflow, and often slightly faster in practice.</p>

  <pre><code><span class="cls">Bottom-Up Fibonacci — O(n) time, O(n) space</span>
<span class="kw">def</span> <span class="fn">fib_tab</span>(n):
    <span class="kw">if</span> n &lt;= <span class="num">1</span>: <span class="kw">return</span> n
    dp = [<span class="num">0</span>] * (n + <span class="num">1</span>)
    dp[<span class="num">0</span>], dp[<span class="num">1</span>] = <span class="num">0</span>, <span class="num">1</span>           <span class="cm"># base cases</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>, n + <span class="num">1</span>):
        dp[i] = dp[i - <span class="num">1</span>] + dp[i - <span class="num">2</span>]  <span class="cm"># recurrence</span>
    <span class="kw">return</span> dp[n]

<span class="cls">Space-Optimised — O(1) space (only need last two values)</span>
<span class="kw">def</span> <span class="fn">fib_opt</span>(n):
    a, b = <span class="num">0</span>, <span class="num">1</span>
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n):
        a, b = b, a + b
    <span class="kw">return</span> a

<span class="cls">Climbing Stairs (#70) — same recurrence as Fibonacci</span>
<span class="cm"># You can take 1 or 2 steps. How many ways to reach stair n?</span>
<span class="kw">def</span> <span class="fn">climb_stairs</span>(n):
    <span class="kw">if</span> n &lt;= <span class="num">2</span>: <span class="kw">return</span> n
    dp = [<span class="num">0</span>] * (n + <span class="num">1</span>)
    dp[<span class="num">1</span>], dp[<span class="num">2</span>] = <span class="num">1</span>, <span class="num">2</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>, n + <span class="num">1</span>):
        dp[i] = dp[i - <span class="num">1</span>] + dp[i - <span class="num">2</span>]
        <span class="cm"># dp[i-1]: got here by taking 1 step from stair i-1</span>
        <span class="cm"># dp[i-2]: got here by taking 2 steps from stair i-2</span>
    <span class="kw">return</span> dp[n]</code><span class="code-label">Python</span></pre>

  <h3>Interactive Demo — Climbing Stairs: Build the DP Table</h3>
  <div class="demo-box">
    <h4>Climbing Stairs — Build the DP Table (n = 6)</h4>
    <div class="demo-controls">
      <button class="btn" onclick="dpStep()" id="dp-btn">Fill Next →</button>
      <button class="btn" onclick="dpReset()">Reset</button>
    </div>
    <div style="display: flex; gap: 4px; margin: 1rem 0; flex-wrap: wrap;" id="dp-cells">
      <div class="arr-cell arr-hi" id="dp-c0"><span class="arr-idx">dp[0]</span><span class="arr-v">1</span></div>
      <div class="arr-cell arr-hi" id="dp-c1"><span class="arr-idx">dp[1]</span><span class="arr-v">1</span></div>
      <div class="arr-cell" id="dp-c2"><span class="arr-idx">dp[2]</span><span class="arr-v">?</span></div>
      <div class="arr-cell" id="dp-c3"><span class="arr-idx">dp[3]</span><span class="arr-v">?</span></div>
      <div class="arr-cell" id="dp-c4"><span class="arr-idx">dp[4]</span><span class="arr-v">?</span></div>
      <div class="arr-cell" id="dp-c5"><span class="arr-idx">dp[5]</span><span class="arr-v">?</span></div>
      <div class="arr-cell" id="dp-c6"><span class="arr-idx">dp[6]</span><span class="arr-v">?</span></div>
    </div>
    <div class="demo-output" id="dp-output">dp[0]=1 and dp[1]=1 are the base cases. Click "Fill Next" to compute dp[2].</div>
  </div>

  <h2 id="framework"><span class="emoji">🗺️</span>The DP Framework</h2>

  <p>Every DP problem follows the same four-step thinking process. Internalise this and you can tackle any DP problem systematically:</p>

  <div class="steps">
    <div class="step">
      <div class="step-content">
        <p><strong>Define the state.</strong> Ask: "What does <code>dp[i]</code> represent?" This is the hardest part. The state must capture all information needed to make a decision. For Climbing Stairs: <em>dp[i] = number of distinct ways to reach stair i</em>.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-content">
        <p><strong>Find the recurrence.</strong> Ask: "How does <code>dp[i]</code> relate to previous states?" For Climbing Stairs: <em>dp[i] = dp[i-1] + dp[i-2]</em> (come from one step below or two steps below). Write this out mathematically before coding.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-content">
        <p><strong>Identify base cases.</strong> What is <code>dp[0]</code>? <code>dp[1]</code>? What are the smallest inputs you can answer directly without the recurrence? These anchor the table so nothing is undefined.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-content">
        <p><strong>Determine computation order.</strong> For bottom-up, fill the table so that every dependency is computed before it's needed. Usually this is left-to-right (increasing i). For 2D DP, it's often top-left to bottom-right.</p>
      </div>
    </div>
  </div>

  <div class="callout">
    <div class="callout-title">Pattern to Spot</div>
    If a recursive solution has a lot of repeated work (you see the same function call with the same arguments more than once), that's a signal DP will help. Draw the recursion tree for a small input — if branches converge on the same nodes, you have overlapping subproblems.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity Cheat Sheet</h2>

  <table>
    <thead>
      <tr><th>Approach</th><th>Time</th><th>Space</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Naive recursion</td><td class="o-n2">O(2^n)</td><td class="o-n">O(n)</td><td>Call stack depth; exponential work</td></tr>
      <tr><td>Memoization (top-down)</td><td class="o-n">O(n)</td><td class="o-n">O(n)</td><td>Cache dict + call stack</td></tr>
      <tr><td>Tabulation (bottom-up)</td><td class="o-n">O(n)</td><td class="o-n">O(n)</td><td>Full dp array, no call stack</td></tr>
      <tr><td>Space-optimised tabulation</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>Only keep last 1-2 values when recurrence allows</td></tr>
      <tr><td>2D DP (e.g. LCS)</td><td class="o-n">O(m×n)</td><td class="o-n">O(m×n)</td><td>One cell per pair of subproblem indices</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These four problems cover the core DP patterns. Attempt each one yourself — apply the four-step framework before writing a single line of code.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#70 · Climbing Stairs</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?
      <br><br>
      <strong>Example:</strong> <code>n = 4</code> → <code>5</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">State: <code>dp[i]</code> = ways to reach step i. Recurrence: <code>dp[i] = dp[i-1] + dp[i-2]</code>. Base cases: <code>dp[1] = 1</code>, <code>dp[2] = 2</code>. This is Fibonacci in disguise.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">climb_stairs</span>(n: <span class="fn">int</span>) -> <span class="fn">int</span>:
    <span class="kw">if</span> n &lt;= <span class="num">2</span>:
        <span class="kw">return</span> n
    prev2, prev1 = <span class="num">1</span>, <span class="num">2</span>     <span class="cm"># ways(1)=1, ways(2)=2</span>
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>, n + <span class="num">1</span>):
        prev2, prev1 = prev1, prev1 + prev2  <span class="cm"># dp[i] = dp[i-1] + dp[i-2]</span>
    <span class="kw">return</span> prev1</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — one pass to step n &nbsp;·&nbsp; <strong>Space:</strong> O(1) — only last two states kept (rolling DP)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/climbing-stairs/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#198 · House Robber</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      You are a robber planning to rob houses along a street. Adjacent houses have a security system — you cannot rob two adjacent houses. Given <code>nums[i]</code> = money in house i, return the maximum you can rob tonight.
      <br><br>
      <strong>Example:</strong> <code>nums = [2,7,9,3,1]</code> → <code>12</code> (rob houses 0, 2, 4)
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">State: <code>dp[i]</code> = max money robbing from house 0 through i. Recurrence: <code>dp[i] = max(dp[i-1], dp[i-2] + nums[i])</code> — either skip this house or rob it (and skip the previous one).</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">rob</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">int</span>:
    prev2, prev1 = <span class="num">0</span>, <span class="num">0</span>     <span class="cm"># best money robbing up to 2-ago / 1-ago house</span>
    <span class="kw">for</span> num <span class="kw">in</span> nums:
        cur = <span class="fn">max</span>(prev1, prev2 + num)  <span class="cm"># skip this house, or rob it + best 2 houses back</span>
        prev2, prev1 = prev1, cur
    <span class="kw">return</span> prev1</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — single pass &nbsp;·&nbsp; <strong>Space:</strong> O(1) — rolling DP, no full array needed</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/house-robber/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#300 · Longest Increasing Subsequence</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.
      <br><br>
      <strong>Example:</strong> <code>nums = [10,9,2,5,3,7,101,18]</code> → <code>4</code> (the subsequence [2,3,7,101])
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">State: <code>dp[i]</code> = length of the longest increasing subsequence <em>ending at index i</em>. Recurrence: for each <code>j &lt; i</code>, if <code>nums[j] &lt; nums[i]</code> then <code>dp[i] = max(dp[i], dp[j] + 1)</code>. Base case: every element alone is a subsequence of length 1, so initialise all <code>dp[i] = 1</code>.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="cm"># O(n^2) DP — clean and the expected solution at this stage</span>
<span class="kw">def</span> <span class="fn">length_of_lis</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">int</span>:
    dp = [<span class="num">1</span>] * <span class="fn">len</span>(nums)        <span class="cm"># every element alone is a subsequence of length 1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(nums)):
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i):
            <span class="kw">if</span> nums[j] &lt; nums[i]:
                dp[i] = <span class="fn">max</span>(dp[i], dp[j] + <span class="num">1</span>)  <span class="cm"># extend the LIS ending at j</span>
    <span class="kw">return</span> <span class="fn">max</span>(dp) <span class="kw">if</span> dp <span class="kw">else</span> <span class="num">0</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n²) — nested loop over all pairs &nbsp;·&nbsp; <strong>Space:</strong> O(n) — dp array (can be optimized to O(n log n) with binary search, but this is the standard DP solution)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/longest-increasing-subsequence/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#1143 · Longest Common Subsequence</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest common subsequence. A subsequence doesn't have to be contiguous.
      <br><br>
      <strong>Example:</strong> <code>text1 = "abcde"</code>, <code>text2 = "ace"</code> → <code>3</code> (the LCS is "ace")
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use a 2D dp table where <code>dp[i][j]</code> = LCS length of the first i characters of text1 and first j characters of text2. Recurrence: if <code>text1[i-1] == text2[j-1]</code> then <code>dp[i][j] = dp[i-1][j-1] + 1</code>, else <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>. Fill row by row from top-left to bottom-right.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">longest_common_subsequence</span>(text1: <span class="fn">str</span>, text2: <span class="fn">str</span>) -> <span class="fn">int</span>:
    m, n = <span class="fn">len</span>(text1), <span class="fn">len</span>(text2)
    dp = [[<span class="num">0</span>] * (n + <span class="num">1</span>) <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(m + <span class="num">1</span>)]  <span class="cm"># dp[i][j]: LCS of text1[:i], text2[:j]</span>

    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, m + <span class="num">1</span>):
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, n + <span class="num">1</span>):
            <span class="kw">if</span> text1[i - <span class="num">1</span>] == text2[j - <span class="num">1</span>]:
                dp[i][j] = dp[i - <span class="num">1</span>][j - <span class="num">1</span>] + <span class="num">1</span>  <span class="cm"># chars match — extend the LCS</span>
            <span class="kw">else</span>:
                dp[i][j] = <span class="fn">max</span>(dp[i - <span class="num">1</span>][j], dp[i][j - <span class="num">1</span>])  <span class="cm"># drop one char from either string</span>

    <span class="kw">return</span> dp[m][n]</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(m·n) — fills an m×n table &nbsp;·&nbsp; <strong>Space:</strong> O(m·n) — full DP table (can reduce to O(min(m,n)) with row rolling)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/longest-common-subsequence/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#70 Climbing Stairs</strong> — it's the "hello world" of DP and the pattern repeats everywhere. Then do <strong>#198 House Robber</strong>. Write your recurrence on paper before opening your editor. Come back and show me your solution!
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/trees" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Trees &amp; BFS/DFS</a>
    <a href="/graphs" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Graphs →</a>
  </div>
</article>
`
}

export function init() {
  const dpValues = [1, 1, 0, 0, 0, 0, 0]
  let dpNext = 2
  const dpN = 6

  function dpRenderCells() {
    for (let i = 0; i <= dpN; i++) {
      const cell = document.getElementById('dp-c' + i)
      if (!cell) continue
      const vEl = cell.querySelector('.arr-v')
      if (i < dpNext) {
        vEl.textContent = dpValues[i]
        cell.className = 'arr-cell arr-hi'
      } else {
        vEl.textContent = '?'
        cell.className = 'arr-cell'
      }
    }
  }

  window.dpStep = function() {
    if (dpNext > dpN) return
    const i = dpNext
    dpValues[i] = dpValues[i - 1] + dpValues[i - 2]
    dpNext++

    // Clear all highlights first
    for (let k = 0; k <= dpN; k++) {
      const c = document.getElementById('dp-c' + k)
      if (!c) continue
      if (k < dpNext - 1) {
        c.className = 'arr-cell arr-hi'
        c.querySelector('.arr-v').textContent = dpValues[k]
      } else if (k === i - 1 || k === i - 2) {
        c.className = 'arr-cell arr-lo'
        c.querySelector('.arr-v').textContent = dpValues[k]
      } else {
        c.className = 'arr-cell'
        c.querySelector('.arr-v').textContent = '?'
      }
    }

    // Highlight the just-filled cell
    const cur = document.getElementById('dp-c' + i)
    if (cur) {
      cur.className = 'arr-cell arr-hi'
      cur.querySelector('.arr-v').textContent = dpValues[i]
    }

    const out = document.getElementById('dp-output')
    out.textContent = `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dpValues[i - 1]} + ${dpValues[i - 2]} = ${dpValues[i]}`

    if (dpNext > dpN) {
      document.getElementById('dp-btn').textContent = 'Done ✓'
      out.textContent += `  ·  Answer: ${dpValues[dpN]} ways to climb ${dpN} stairs.`
    }
  }

  window.dpReset = function() {
    for (let i = 2; i <= dpN; i++) dpValues[i] = 0
    dpNext = 2
    dpRenderCells()
    // pre-fill base cases as green
    document.getElementById('dp-c0').className = 'arr-cell arr-hi'
    document.getElementById('dp-c1').className = 'arr-cell arr-hi'
    document.getElementById('dp-btn').textContent = 'Fill Next →'
    document.getElementById('dp-output').textContent = 'dp[0]=1 and dp[1]=1 are the base cases. Click "Fill Next" to compute dp[2].'
  }
}
