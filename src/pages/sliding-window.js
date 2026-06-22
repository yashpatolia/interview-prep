export function render() {
  return `
<nav>
  <a href="/">Home</a>
  <span class="sep">›</span>
  <span class="current">Sliding Window</span>
</nav>

<div class="toc">
  <h4>On This Page</h4>
  <a href="#idea">The Big Idea</a>
  <a href="#fixed">Fixed-Size Window</a>
  <a href="#variable">Variable-Size Window</a>
  <a href="#template">The Template</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Sliding</em> Window</h1>
  <p class="subtitle">Chapter 3 · Subarray and substring problems in O(n)</p>

  <h2 id="idea"><span class="emoji">🪟</span>The Big Idea</h2>

  <p>Many problems ask about a <strong>contiguous subarray or substring</strong> — the maximum sum of k elements, the longest substring without repeats, the smallest window containing all characters of another string. The naive approach re-computes everything from scratch for each possible window: O(n²) or worse.</p>

  <p>Sliding window fixes this by keeping a window <code>[L, R]</code> and updating it <strong>incrementally</strong> — subtract what fell off the left, add what entered on the right. Each element is visited at most twice (once when R passes it, once when L passes it), so the total cost is O(n).</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Train Window</div>
    Imagine riding a train and looking out the window. The scenery changes continuously as you move, but you always see the same fixed frame. You don't re-describe the entire landscape every second — you just note what entered and what left. The window slides forward; the computation stays cheap.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">A window [L..R] sliding across an array</div>
    <svg width="100%" height="130" viewBox="0 0 580 130">
      <defs>
        <marker id="sw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
      </defs>
      <!-- cells -->
      <rect x="20"  y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)" stroke="#D8D5D0" stroke-width="1.5"/>
      <rect x="100" y="40" width="60" height="44" rx="6" fill="rgba(196,127,23,0.12)" stroke="#C47F17" stroke-width="2"/>
      <rect x="180" y="40" width="60" height="44" rx="6" fill="rgba(196,127,23,0.12)" stroke="#C47F17" stroke-width="2"/>
      <rect x="260" y="40" width="60" height="44" rx="6" fill="rgba(196,127,23,0.12)" stroke="#C47F17" stroke-width="2"/>
      <rect x="340" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)" stroke="#D8D5D0" stroke-width="1.5"/>
      <rect x="420" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)" stroke="#D8D5D0" stroke-width="1.5"/>
      <rect x="500" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)" stroke="#D8D5D0" stroke-width="1.5"/>
      <!-- values -->
      <text x="50"  y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">2</text>
      <text x="130" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">1</text>
      <text x="210" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">5</text>
      <text x="290" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">1</text>
      <text x="370" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">3</text>
      <text x="450" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">2</text>
      <text x="530" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">4</text>
      <!-- indices -->
      <text x="50"  y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">0</text>
      <text x="130" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">1</text>
      <text x="210" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">2</text>
      <text x="290" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">3</text>
      <text x="370" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">4</text>
      <text x="450" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">5</text>
      <text x="530" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">6</text>
      <!-- L and R labels -->
      <text x="130" y="28" text-anchor="middle" fill="#C47F17" font-size="11" font-weight="700">L</text>
      <line x1="130" y1="31" x2="130" y2="38" stroke="#C47F17" stroke-width="1.5" marker-end="url(#sw-arr)"/>
      <text x="290" y="28" text-anchor="middle" fill="#C47F17" font-size="11" font-weight="700">R</text>
      <line x1="290" y1="31" x2="290" y2="38" stroke="#C47F17" stroke-width="1.5" marker-end="url(#sw-arr)"/>
      <!-- window label -->
      <text x="210" y="116" text-anchor="middle" fill="#C47F17" font-size="10" font-weight="600">window [1..3] · sum = 7</text>
      <!-- arrow showing window slides right -->
      <line x1="360" y1="62" x2="400" y2="62" stroke="#8A8F9E" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sw-arr)"/>
      <text x="430" y="58" fill="#8A8F9E" font-size="10">slides →</text>
    </svg>
  </div>

  <h2 id="fixed"><span class="emoji">📏</span>Fixed-Size Window</h2>

  <p>When the window size <code>k</code> is constant, both L and R move in lockstep — R advances one step each iteration, L advances one step to keep the window exactly size k. You maintain a running aggregate (sum, product, character count) and update it by <strong>adding the new right element and removing the old left element</strong>.</p>

<pre><code><span class="kw">def</span> <span class="fn">max_sum_subarray</span>(nums: <span class="fn">list</span>, k: <span class="fn">int</span>) -> <span class="fn">int</span>:
    <span class="cm"># Find the maximum sum of any contiguous subarray of length k.</span>
    <span class="cm"># e.g. nums=[2,1,5,1,3,2], k=3 → 9  (subarray [1,5,3] ... wait: [5,1,3]=9)</span>
    n = <span class="fn">len</span>(nums)
    <span class="kw">if</span> n &lt; k:
        <span class="kw">return</span> -<span class="num">1</span>

    <span class="cm"># Build the first window</span>
    window_sum = <span class="fn">sum</span>(nums[:<span class="num">k</span>])
    best = window_sum

    <span class="cm"># Slide: add nums[R], remove nums[L]</span>
    <span class="kw">for</span> R <span class="kw">in</span> <span class="fn">range</span>(k, n):
        L = R - k
        window_sum += nums[R] - nums[L]   <span class="cm"># O(1) update</span>
        best = <span class="fn">max</span>(best, window_sum)

    <span class="kw">return</span> best

<span class="cm"># Test</span>
<span class="fn">print</span>(<span class="fn">max_sum_subarray</span>([<span class="num">2</span>, <span class="num">1</span>, <span class="num">5</span>, <span class="num">1</span>, <span class="num">3</span>, <span class="num">2</span>], <span class="num">3</span>))  <span class="cm"># 9 → [5, 1, 3]</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Fixed Window: Max Sum Subarray of Size 3</h4>
    <div class="demo-controls">
      <button class="btn" onclick="swStep()" id="sw-btn">Next Step →</button>
      <button class="btn" onclick="swReset()">Reset</button>
    </div>
    <div class="tp-wrap">
      <div class="ptr-label" id="sw-ptr-labels">
        <div class="ptr" style="color:var(--amber)">L</div>
        <div class="ptr" style="color:transparent">·</div>
        <div class="ptr" style="color:var(--amber)">R</div>
        <div class="ptr" style="color:transparent">·</div>
        <div class="ptr" style="color:transparent">·</div>
        <div class="ptr" style="color:transparent">·</div>
      </div>
      <div class="tp-row" id="sw-row">
        <div class="arr-cell arr-swap" id="sw-0"><span class="arr-idx">0</span><span class="arr-v">2</span></div>
        <div class="arr-cell arr-swap" id="sw-1"><span class="arr-idx">1</span><span class="arr-v">1</span></div>
        <div class="arr-cell arr-swap" id="sw-2"><span class="arr-idx">2</span><span class="arr-v">5</span></div>
        <div class="arr-cell" id="sw-3"><span class="arr-idx">3</span><span class="arr-v">1</span></div>
        <div class="arr-cell" id="sw-4"><span class="arr-idx">4</span><span class="arr-v">3</span></div>
        <div class="arr-cell" id="sw-5"><span class="arr-idx">5</span><span class="arr-v">2</span></div>
      </div>
    </div>
    <div class="demo-output" id="sw-output">Array: [2, 1, 5, 1, 3, 2] · k=3 · Initial window [0..2] · sum = 8 · best = 8</div>
  </div>

  <h2 id="variable"><span class="emoji">🔭</span>Variable-Size Window</h2>

  <p>When the window size can change, you <strong>expand R</strong> until the window violates a condition, then <strong>shrink L</strong> until the condition is satisfied again. R never moves backward; L only moves forward. So despite the nested-looking logic, each pointer visits each element at most once — still O(n).</p>

  <p>The classic example: <strong>longest substring without repeating characters</strong>.</p>

<pre><code><span class="kw">def</span> <span class="fn">length_of_longest_substring</span>(s: <span class="fn">str</span>) -> <span class="fn">int</span>:
    <span class="cm"># Expand R; if s[R] already in window, shrink from L.</span>
    window = <span class="fn">set</span>()
    L = <span class="num">0</span>
    best = <span class="num">0</span>

    <span class="kw">for</span> R <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        <span class="kw">while</span> s[R] <span class="kw">in</span> window:       <span class="cm"># duplicate → shrink from left</span>
            window.<span class="fn">discard</span>(s[L])
            L += <span class="num">1</span>
        window.<span class="fn">add</span>(s[R])            <span class="cm"># R is now safe to include</span>
        best = <span class="fn">max</span>(best, R - L + <span class="num">1</span>)

    <span class="kw">return</span> best

<span class="cm"># Tests</span>
<span class="fn">print</span>(<span class="fn">length_of_longest_substring</span>(<span class="st">"abcabcbb"</span>))  <span class="cm"># 3  → "abc"</span>
<span class="fn">print</span>(<span class="fn">length_of_longest_substring</span>(<span class="st">"pwwkew"</span>))    <span class="cm"># 3  → "wke"</span></code><span class="code-label">Python</span></pre>

  <div class="callout warn">
    <div class="callout-title">Common Mistake</div>
    The inner <code>while</code> loop does not make this O(n²). L only ever moves <em>forward</em>. Across the entire outer loop, L moves at most n steps total — so both loops together are O(n).
  </div>

  <h2 id="template"><span class="emoji">📋</span>The Template</h2>

  <p>Almost every sliding window problem fits one of two templates. Memorise these and you can adapt them to any variation.</p>

<pre><code><span class="cm">## Template A — Fixed size k</span>
<span class="kw">def</span> <span class="fn">fixed_window</span>(arr, k):
    <span class="cm"># 1. Build initial window</span>
    state = <span class="fn">init_from</span>(arr[:<span class="num">k</span>])
    best  = <span class="fn">measure</span>(state)

    <span class="cm"># 2. Slide</span>
    <span class="kw">for</span> R <span class="kw">in</span> <span class="fn">range</span>(k, <span class="fn">len</span>(arr)):
        L = R - k
        <span class="fn">add_right</span>(state, arr[R])    <span class="cm"># expand</span>
        <span class="fn">remove_left</span>(state, arr[L])  <span class="cm"># contract</span>
        best = <span class="fn">max</span>(best, <span class="fn">measure</span>(state))

    <span class="kw">return</span> best


<span class="cm">## Template B — Variable size</span>
<span class="kw">def</span> <span class="fn">variable_window</span>(arr):
    L = <span class="num">0</span>
    state = <span class="fn">empty_state</span>()
    best  = <span class="num">0</span>

    <span class="kw">for</span> R <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(arr)):
        <span class="fn">add_right</span>(state, arr[R])          <span class="cm"># always expand</span>

        <span class="kw">while</span> <span class="fn">violates</span>(state):           <span class="cm"># shrink until valid</span>
            <span class="fn">remove_left</span>(state, arr[L])
            L += <span class="num">1</span>

        best = <span class="fn">max</span>(best, R - L + <span class="num">1</span>)    <span class="cm"># record answer</span>

    <span class="kw">return</span> best</code><span class="code-label">Python</span></pre>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity</h2>

  <table>
    <thead>
      <tr><th>Approach</th><th>Time</th><th>Space</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Naive (recompute every subarray)</td><td class="o-n2">O(n·k)</td><td class="o-1">O(1)</td><td>Each window costs O(k) to sum</td></tr>
      <tr><td>Fixed sliding window</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>O(1) update per step; k state variables</td></tr>
      <tr><td>Variable sliding window</td><td class="o-n">O(n)</td><td class="o-n">O(k)</td><td>Each element enters and leaves window once; set/map tracks window</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These four problems span Easy to Hard. The first two are direct template applications; the last two require careful tracking of window state.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#121 · Best Time to Buy and Sell Stock</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given an array <code>prices</code> where <code>prices[i]</code> is the price on day <code>i</code>, return the maximum profit from buying on one day and selling on a later day.
      <br><br>
      <strong>Example:</strong> <code>[7,1,5,3,6,4]</code> → <code>5</code> (buy at 1, sell at 6)
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Think of L as the "buy day". Slide R rightward. If <code>prices[R] &lt; prices[L]</code>, move L to R (found a cheaper buy day). Otherwise compute <code>prices[R] - prices[L]</code> and update max profit. This is a variable window where L only moves when we find a cheaper buy.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">max_profit</span>(prices: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">int</span>:
    left = <span class="num">0</span>                 <span class="cm"># cheapest buy day seen so far</span>
    best = <span class="num">0</span>
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="fn">len</span>(prices)):
        <span class="kw">if</span> prices[right] &lt; prices[left]:
            left = right       <span class="cm"># found a cheaper buy day, reset window start</span>
        <span class="kw">else</span>:
            best = <span class="fn">max</span>(best, prices[right] - prices[left])
    <span class="kw">return</span> best</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — single pass &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#3 · Longest Substring Without Repeating Characters</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given a string <code>s</code>, find the length of the longest substring that contains no repeated characters.
      <br><br>
      <strong>Example:</strong> <code>"abcabcbb"</code> → <code>3</code>  ("abc")
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Variable window + a <code>set</code> tracking the current window's characters. Expand R by adding <code>s[R]</code> to the set. If it's already there, shrink L until the duplicate is gone. The answer is <code>max(R - L + 1)</code> over all valid states.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">length_of_longest_substring</span>(s: <span class="fn">str</span>) -> <span class="fn">int</span>:
    window = <span class="fn">set</span>()
    left = <span class="num">0</span>
    best = <span class="num">0</span>
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        <span class="kw">while</span> s[right] <span class="kw">in</span> window:   <span class="cm"># shrink until duplicate is removed</span>
            window.remove(s[left])
            left += <span class="num">1</span>
        window.add(s[right])
        best = <span class="fn">max</span>(best, right - left + <span class="num">1</span>)
    <span class="kw">return</span> best</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — each pointer traverses s at most once &nbsp;·&nbsp; <strong>Space:</strong> O(min(n, charset)) — window set</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#424 · Longest Repeating Character Replacement</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given a string <code>s</code> and integer <code>k</code>, you can replace any character in the string up to <code>k</code> times. Return the length of the longest substring containing only one distinct character that you can achieve.
      <br><br>
      <strong>Example:</strong> <code>s = "AABABBA"</code>, <code>k = 1</code> → <code>4</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">A window is valid when <code>(window_size - max_count) &lt;= k</code>, where <code>max_count</code> is the count of the most frequent character in the window. Track character frequencies in a dict. Shrink L when the window becomes invalid.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">character_replacement</span>(s: <span class="fn">str</span>, k: <span class="fn">int</span>) -> <span class="fn">int</span>:
    counts = {}
    left = <span class="num">0</span>
    max_count = <span class="num">0</span>            <span class="cm"># highest single-char frequency seen in any window so far</span>
    best = <span class="num">0</span>
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        counts[s[right]] = counts.get(s[right], <span class="num">0</span>) + <span class="num">1</span>
        max_count = <span class="fn">max</span>(max_count, counts[s[right]])
        window_size = right - left + <span class="num">1</span>
        <span class="kw">if</span> window_size - max_count &gt; k:   <span class="cm"># too many chars would need replacing</span>
            counts[s[left]] -= <span class="num">1</span>
            left += <span class="num">1</span>
        <span class="kw">else</span>:
            best = <span class="fn">max</span>(best, window_size)
    <span class="kw">return</span> best</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — right pointer scans once, left only moves forward &nbsp;·&nbsp; <strong>Space:</strong> O(1) — at most 26 letters in counts</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/longest-repeating-character-replacement/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#76 · Minimum Window Substring</span>
      <span class="difficulty diff-medium" style="background:rgba(232,68,42,0.1);color:var(--accent)">Hard</span>
    </div>
    <div class="problem-desc">
      Given strings <code>s</code> and <code>t</code>, return the minimum window substring of <code>s</code> that contains every character of <code>t</code> (including duplicates). Return <code>""</code> if no such window exists.
      <br><br>
      <strong>Example:</strong> <code>s = "ADOBECODEBANC"</code>, <code>t = "ABC"</code> → <code>"BANC"</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Build a frequency map for <code>t</code>. Expand R, decrementing counts in a second map. Track <code>have</code> (how many characters satisfy their required count) vs <code>need</code> (total distinct chars in t). Once <code>have == need</code>, try shrinking L to minimise the window. Update the answer each time the window is valid.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">from</span> collections <span class="kw">import</span> Counter

<span class="kw">def</span> <span class="fn">min_window</span>(s: <span class="fn">str</span>, t: <span class="fn">str</span>) -> <span class="fn">str</span>:
    <span class="kw">if</span> <span class="kw">not</span> t:
        <span class="kw">return</span> <span class="st">""</span>

    need_count = Counter(t)        <span class="cm"># required frequency per character</span>
    need = <span class="fn">len</span>(need_count)        <span class="cm"># number of distinct chars to satisfy</span>
    have = <span class="num">0</span>                     <span class="cm"># distinct chars currently fully satisfied</span>
    window = {}
    res, res_len = [-<span class="num">1</span>, -<span class="num">1</span>], <span class="fn">float</span>(<span class="st">"inf"</span>)
    left = <span class="num">0</span>

    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        ch = s[right]
        window[ch] = window.get(ch, <span class="num">0</span>) + <span class="num">1</span>

        <span class="kw">if</span> ch <span class="kw">in</span> need_count <span class="kw">and</span> window[ch] == need_count[ch]:
            have += <span class="num">1</span>

        <span class="kw">while</span> have == need:           <span class="cm"># window is valid — try to shrink it</span>
            <span class="kw">if</span> (right - left + <span class="num">1</span>) &lt; res_len:
                res = [left, right]
                res_len = right - left + <span class="num">1</span>

            window[s[left]] -= <span class="num">1</span>
            <span class="kw">if</span> s[left] <span class="kw">in</span> need_count <span class="kw">and</span> window[s[left]] &lt; need_count[s[left]]:
                have -= <span class="num">1</span>     <span class="cm"># shrinking broke this character's requirement</span>
            left += <span class="num">1</span>

    left, right = res
    <span class="kw">return</span> s[left:right + <span class="num">1</span>] <span class="kw">if</span> res_len != <span class="fn">float</span>(<span class="st">"inf"</span>) <span class="kw">else</span> <span class="st">""</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n + m) — n = len(s), m = len(t); each pointer moves through s once &nbsp;·&nbsp; <strong>Space:</strong> O(m) — frequency maps bounded by t's distinct chars</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/minimum-window-substring/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#121</strong> — it's a gentle on-ramp. Then tackle <strong>#3</strong>, which uses the variable-window template directly. Share your solutions and I'll review before we move to Chapter 4: Linked Lists.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/two-pointers" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Two Pointers</a>
    <a href="/linked-lists" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Linked Lists →</a>
  </div>
</article>
`
}

export function init() {
  const swArr = [2, 1, 5, 1, 3, 2]
  const swK = 3
  let swR = swK - 1
  let swWindowSum = swArr[0] + swArr[1] + swArr[2]
  let swBest = swWindowSum
  let swDone = false

  function swClearCells() {
    for (let i = 0; i < swArr.length; i++) {
      const el = document.getElementById('sw-' + i)
      if (el) el.className = 'arr-cell'
    }
  }

  function swHighlightWindow(L, R) {
    swClearCells()
    for (let i = L; i <= R; i++) {
      const el = document.getElementById('sw-' + i)
      if (el) el.classList.add('arr-swap')
    }
  }

  function swRenderPointers(L, R) {
    const container = document.getElementById('sw-ptr-labels')
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < swArr.length; i++) {
      const div = document.createElement('div')
      div.className = 'ptr'
      if (i === L && i === R) {
        div.textContent = 'LR'
        div.style.color = 'var(--amber)'
      } else if (i === L) {
        div.textContent = 'L'
        div.style.color = 'var(--amber)'
      } else if (i === R) {
        div.textContent = 'R'
        div.style.color = 'var(--amber)'
      } else {
        div.textContent = '·'
        div.style.color = 'transparent'
      }
      container.appendChild(div)
    }
  }

  window.swStep = function() {
    if (swDone) return

    const nextR = swR + 1
    if (nextR >= swArr.length) {
      const out = document.getElementById('sw-output')
      const btn = document.getElementById('sw-btn')
      if (out) out.textContent = `Done! Maximum sum subarray of size ${swK} has sum = ${swBest}`
      if (btn) btn.textContent = 'Done ✓'
      swDone = true
      return
    }

    const removeIdx = nextR - swK
    const displayL = removeIdx + 1

    swWindowSum += swArr[nextR] - swArr[removeIdx]

    swR = nextR
    swBest = Math.max(swBest, swWindowSum)

    swHighlightWindow(displayL, swR)
    swRenderPointers(displayL, swR)

    const out = document.getElementById('sw-output')
    if (out) {
      out.textContent = `Window [${displayL}..${swR}] = [${swArr.slice(displayL, swR + 1).join(', ')}] · sum = ${swWindowSum} · best so far = ${swBest}`
    }
  }

  window.swReset = function() {
    swR = swK - 1
    swWindowSum = swArr[0] + swArr[1] + swArr[2]
    swBest = swWindowSum
    swDone = false

    swHighlightWindow(0, swK - 1)
    swRenderPointers(0, swK - 1)

    const out = document.getElementById('sw-output')
    const btn = document.getElementById('sw-btn')
    if (out) out.textContent = `Array: [2, 1, 5, 1, 3, 2] · k=3 · Initial window [0..2] · sum = 8 · best = 8`
    if (btn) btn.textContent = 'Next Step →'
  }
}
