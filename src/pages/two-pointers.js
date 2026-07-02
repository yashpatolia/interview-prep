export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What are Two Pointers?</a>
  <a href="#opposite">Pattern 1: Opposite Ends</a>
  <a href="#same-dir">Pattern 2: Same Direction</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Two</em> Pointers</h1>
  <p class="subtitle">Chapter 2 · Eliminate nested loops by racing two indices</p>

  <h2 id="what"><span class="emoji">👆</span>What are Two Pointers?</h2>

  <p>A huge number of array and string problems have a brute-force solution that checks <strong>every pair of elements</strong> — two nested loops, O(n²) time. Two pointers is the technique that collapses those nested loops into a single O(n) pass.</p>

  <p>Instead of one index crawling through the array, you maintain <strong>two indices</strong> and move them according to the problem's logic. There are two main flavors:</p>

  <ul>
    <li><strong>Opposite ends</strong> — L starts at index 0, R starts at the last index. They march toward each other until they meet.</li>
    <li><strong>Same direction / Fast &amp; Slow</strong> — both pointers start at the left. One races ahead (fast), the other follows conditions (slow).</li>
  </ul>

  <div class="callout tip">
    <div class="callout-title">When to reach for Two Pointers</div>
    If a problem gives you a <strong>sorted array</strong> and asks about pairs or subarrays — two pointers from opposite ends. If it asks you to <strong>remove/rewrite an array in-place</strong> or detect a cycle — fast &amp; slow.
  </div>

  <h2 id="opposite"><span class="emoji">↔️</span>Pattern 1: Opposite Ends</h2>

  <p>Place L at the left edge and R at the right edge of the array. At each step, check the pair <code>arr[L]</code> and <code>arr[R]</code>. Depending on the result, move one of them inward. Repeat until <code>L &gt;= R</code>.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Two People in a Hallway</div>
    Imagine two people standing at opposite ends of a hallway, each holding a sign. They walk toward each other. At each step they compare signs. If the signs match the rule, they swap and keep walking. They stop when they meet in the middle. You've inspected every relevant pair in one walk — O(n).
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Opposite-ends pointers converging on a sorted array</div>
    <svg width="100%" height="120" viewBox="0 0 560 120">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#2A7A52"/>
        </marker>
        <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#E8442A"/>
        </marker>
      </defs>
      <!-- cells -->
      <g>
        <rect x="20"  y="40" width="60" height="44" rx="6" fill="rgba(42,122,82,0.12)"  stroke="#2A7A52" stroke-width="1.8"/>
        <rect x="100" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)"  stroke="#D8D5D0" stroke-width="1.5"/>
        <rect x="180" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)"  stroke="#D8D5D0" stroke-width="1.5"/>
        <rect x="260" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)"  stroke="#D8D5D0" stroke-width="1.5"/>
        <rect x="340" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)"  stroke="#D8D5D0" stroke-width="1.5"/>
        <rect x="420" y="40" width="60" height="44" rx="6" fill="rgba(43,92,230,0.06)"  stroke="#D8D5D0" stroke-width="1.5"/>
        <rect x="500" y="40" width="60" height="44" rx="6" fill="rgba(232,68,42,0.10)"  stroke="#E8442A" stroke-width="1.8"/>
      </g>
      <!-- values -->
      <text x="50"  y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">1</text>
      <text x="130" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">3</text>
      <text x="210" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">5</text>
      <text x="290" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">7</text>
      <text x="370" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">9</text>
      <text x="450" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">11</text>
      <text x="530" y="68" text-anchor="middle" fill="#18192A" font-size="16" font-weight="700">13</text>
      <!-- indices -->
      <text x="50"  y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">0</text>
      <text x="130" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">1</text>
      <text x="210" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">2</text>
      <text x="290" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">3</text>
      <text x="370" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">4</text>
      <text x="450" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">5</text>
      <text x="530" y="95" text-anchor="middle" fill="#8A8F9E" font-size="10">6</text>
      <!-- L label and arrow -->
      <text x="50"  y="28" text-anchor="middle" fill="#2A7A52" font-size="11" font-weight="700">L</text>
      <line x1="50" y1="31" x2="50" y2="38" stroke="#2A7A52" stroke-width="1.5" marker-end="url(#arrow-green)"/>
      <!-- R label and arrow -->
      <text x="530" y="28" text-anchor="middle" fill="#E8442A" font-size="11" font-weight="700">R</text>
      <line x1="530" y1="31" x2="530" y2="38" stroke="#E8442A" stroke-width="1.5" marker-end="url(#arrow-red)"/>
      <!-- converging arrows -->
      <line x1="78"  y1="62" x2="96"  y2="62" stroke="#2A7A52" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow-green)"/>
      <line x1="482" y1="62" x2="464" y2="62" stroke="#E8442A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow-red)"/>
    </svg>
  </div>

  <p>Classic use case: <strong>check if a sorted array contains two numbers that sum to a target</strong>. If the current sum is too large, move R left (smaller value). If too small, move L right (larger value).</p>

<pre><code><span class="kw">def</span> <span class="fn">two_sum_sorted</span>(nums: <span class="fn">list</span>, target: <span class="fn">int</span>) -> <span class="fn">list</span>:
    <span class="cm"># nums is already sorted — e.g. [1, 3, 5, 7, 9, 11]</span>
    left, right = <span class="num">0</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>

    <span class="kw">while</span> left &lt; right:
        total = nums[left] + nums[right]

        <span class="kw">if</span> total == target:
            <span class="kw">return</span> [left, right]      <span class="cm"># found it!</span>
        <span class="kw">elif</span> total &lt; target:
            left += <span class="num">1</span>                 <span class="cm"># need bigger sum → move L right</span>
        <span class="kw">else</span>:
            right -= <span class="num">1</span>                <span class="cm"># need smaller sum → move R left</span>

    <span class="kw">return</span> []                      <span class="cm"># no pair found</span>

<span class="cm"># Test</span>
<span class="fn">print</span>(<span class="fn">two_sum_sorted</span>([<span class="num">1</span>, <span class="num">3</span>, <span class="num">5</span>, <span class="num">7</span>, <span class="num">9</span>, <span class="num">11</span>], <span class="num">16</span>))  <span class="cm"># [2, 5] → 5 + 11 = 16</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Opposite Ends: Two Sum on Sorted Array</h4>
    <div class="demo-controls">
      <button class="btn" onclick="tpSumStep()" id="tpsum-btn">Next Step →</button>
      <button class="btn" onclick="tpSumReset()">Reset</button>
    </div>
    <div class="tp-wrap">
      <div class="ptr-label" id="tpsum-ptr-labels">
        <div class="ptr" id="tpsum-l-ptr" style="color:var(--green)">L</div>
        <div class="ptr" id="tpsum-blank-1" style="color:transparent">·</div>
        <div class="ptr" id="tpsum-blank-2" style="color:transparent">·</div>
        <div class="ptr" id="tpsum-blank-3" style="color:transparent">·</div>
        <div class="ptr" id="tpsum-blank-4" style="color:transparent">·</div>
        <div class="ptr" id="tpsum-r-ptr" style="color:var(--accent)">R</div>
      </div>
      <div class="tp-row" id="tpsum-row">
        <div class="arr-cell arr-hi"  id="tpsum-0"><span class="arr-idx">0</span><span class="arr-v">1</span></div>
        <div class="arr-cell" id="tpsum-1"><span class="arr-idx">1</span><span class="arr-v">3</span></div>
        <div class="arr-cell" id="tpsum-2"><span class="arr-idx">2</span><span class="arr-v">5</span></div>
        <div class="arr-cell" id="tpsum-3"><span class="arr-idx">3</span><span class="arr-v">7</span></div>
        <div class="arr-cell" id="tpsum-4"><span class="arr-idx">4</span><span class="arr-v">9</span></div>
        <div class="arr-cell arr-lo"  id="tpsum-5"><span class="arr-idx">5</span><span class="arr-v">11</span></div>
      </div>
    </div>
    <div class="demo-output" id="tpsum-output">Array: [1, 3, 5, 7, 9, 11] · Target: 16 · Click "Next Step" to begin. L=0, R=5</div>
  </div>

  <h2 id="same-dir"><span class="emoji">🐢</span>Pattern 2: Same Direction / Fast &amp; Slow</h2>

  <p>Both pointers start at (or near) the same end. The <strong>fast pointer</strong> scans ahead, the <strong>slow pointer</strong> only advances when a condition is met. Result: you process the array once while maintaining a "valid" prefix at the slow pointer.</p>

  <p>Use cases include: removing duplicates in-place, partitioning arrays, and detecting cycles in linked lists (Floyd's algorithm).</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Editor &amp; Manuscript</div>
    Imagine proofreading a document. The <strong>editor</strong> (fast pointer) reads every word. The <strong>pen</strong> (slow pointer) only writes down a word if it's not a repeat of the last one written. The pen always trails the editor, and the final manuscript (everything up to the pen's position) contains only the unique words.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">remove_duplicates</span>(nums: <span class="fn">list</span>) -> <span class="fn">int</span>:
    <span class="cm"># nums is sorted: [1, 1, 2, 3, 3, 4]</span>
    <span class="cm"># Returns length of unique prefix; modifies nums in-place.</span>
    <span class="kw">if</span> <span class="kw">not</span> nums:
        <span class="kw">return</span> <span class="num">0</span>

    slow = <span class="num">0</span>                  <span class="cm"># slow = last written unique position</span>

    <span class="kw">for</span> fast <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="fn">len</span>(nums)):
        <span class="kw">if</span> nums[fast] != nums[slow]:  <span class="cm"># new unique value found</span>
            slow += <span class="num">1</span>
            nums[slow] = nums[fast]   <span class="cm"># write it into the unique prefix</span>

    <span class="kw">return</span> slow + <span class="num">1</span>           <span class="cm"># length of unique section</span>

<span class="cm"># Test</span>
arr = [<span class="num">1</span>, <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">3</span>, <span class="num">4</span>]
k = <span class="fn">remove_duplicates</span>(arr)
<span class="fn">print</span>(arr[:<span class="num">k</span>])  <span class="cm"># [1, 2, 3, 4]</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">Why this works</div>
    Because the array is sorted, duplicates are always adjacent. The slow pointer defines the "clean" boundary. Everything to its left is the de-duplicated output. The fast pointer discovers what comes next; the slow pointer decides whether to accept it.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity</h2>

  <table>
    <thead>
      <tr><th>Approach</th><th>Time</th><th>Space</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Brute force (nested loops)</td><td class="o-n2">O(n²)</td><td class="o-1">O(1)</td><td>Every pair checked twice</td></tr>
      <tr><td>Two pointers (opposite ends)</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>Each pointer moves at most n steps total</td></tr>
      <tr><td>Two pointers (fast &amp; slow)</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>Fast pointer visits each element once</td></tr>
      <tr><td>Hash set approach</td><td class="o-n">O(n)</td><td class="o-n">O(n)</td><td>O(n) but needs extra space for the set</td></tr>
    </tbody>
  </table>

  <p>Two pointers achieves the same O(n) time as a hash set solution but uses <strong>O(1) space</strong> — no extra data structures. That's the real win.</p>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These four problems each reward exactly one of the two patterns above. Solve them in order — each one builds intuition for the next.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#125 · Valid Palindrome</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A phrase is a palindrome if, after lowercasing and removing all non-alphanumeric characters, it reads the same forward and backward.
      <br><br>
      <strong>Example:</strong> <code>"A man, a plan, a canal: Panama"</code> → <code>True</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Place L at index 0 and R at the last index. Skip characters where <code>not ch.isalnum()</code> by advancing the pointer without comparing. When both pointers sit on alphanumeric characters, compare <code>s[L].lower()</code> vs <code>s[R].lower()</code>.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">is_palindrome</span>(s: <span class="fn">str</span>) -> <span class="fn">bool</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(s) - <span class="num">1</span>
    <span class="kw">while</span> left &lt; right:
        <span class="kw">if</span> <span class="kw">not</span> s[left].isalnum():   <span class="cm"># skip non-alphanumeric from the left</span>
            left += <span class="num">1</span>
        <span class="kw">elif</span> <span class="kw">not</span> s[right].isalnum(): <span class="cm"># skip non-alphanumeric from the right</span>
            right -= <span class="num">1</span>
        <span class="kw">elif</span> s[left].lower() != s[right].lower():
            <span class="kw">return</span> <span class="kw">False</span>             <span class="cm"># mismatch → not a palindrome</span>
        <span class="kw">else</span>:
            left += <span class="num">1</span>
            right -= <span class="num">1</span>
    <span class="kw">return</span> <span class="kw">True</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — each pointer moves through the string at most once &nbsp;·&nbsp; <strong>Space:</strong> O(1) — no extra structures</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/valid-palindrome/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#167 · Two Sum II — Input Array Is Sorted</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given a <strong>1-indexed sorted array</strong> of integers, find two numbers that add up to a target. Return their 1-based indices.
      <br><br>
      <strong>Example:</strong> <code>numbers = [2,7,11,15]</code>, <code>target = 9</code> → <code>[1, 2]</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Opposite-ends template. Compute <code>sum = numbers[L] + numbers[R]</code>. If <code>sum &gt; target</code>, move R left. If <code>sum &lt; target</code>, move L right. If equal, return <code>[L+1, R+1]</code> (1-indexed).</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">two_sum_sorted</span>(numbers: <span class="fn">list</span>[<span class="fn">int</span>], target: <span class="fn">int</span>) -> <span class="fn">list</span>[<span class="fn">int</span>]:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(numbers) - <span class="num">1</span>
    <span class="kw">while</span> left &lt; right:
        total = numbers[left] + numbers[right]
        <span class="kw">if</span> total == target:
            <span class="kw">return</span> [left + <span class="num">1</span>, right + <span class="num">1</span>]  <span class="cm"># convert to 1-indexed</span>
        <span class="kw">elif</span> total &lt; target:
            left += <span class="num">1</span>     <span class="cm"># sum too small → need a bigger value</span>
        <span class="kw">else</span>:
            right -= <span class="num">1</span>    <span class="cm"># sum too big → need a smaller value</span>
    <span class="kw">return</span> []</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — pointers close the gap in one pass &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#15 · 3Sum</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an integer array, return all triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j != k</code> and <code>nums[i] + nums[j] + nums[k] == 0</code>. No duplicate triplets.
      <br><br>
      <strong>Example:</strong> <code>[-1,0,1,2,-1,-4]</code> → <code>[[-1,-1,2],[-1,0,1]]</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Sort first. Then fix one number <code>nums[i]</code> with an outer loop, and use two pointers on the remaining subarray to find pairs summing to <code>-nums[i]</code>. After finding a triplet, skip duplicate values of <code>nums[i]</code>, <code>nums[L]</code>, and <code>nums[R]</code> with <code>while</code> loops to avoid repeats.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">three_sum</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">int</span>]]:
    nums.sort()              <span class="cm"># enables two-pointer scan + easy dup skipping</span>
    res = []
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(nums)):
        <span class="kw">if</span> i &gt; <span class="num">0</span> <span class="kw">and</span> nums[i] == nums[i - <span class="num">1</span>]:
            <span class="kw">continue</span>          <span class="cm"># skip duplicate anchor values</span>
        <span class="kw">if</span> nums[i] &gt; <span class="num">0</span>:
            <span class="kw">break</span>             <span class="cm"># sorted + positive anchor → no triplet sums to 0</span>
        left, right = i + <span class="num">1</span>, <span class="fn">len</span>(nums) - <span class="num">1</span>
        <span class="kw">while</span> left &lt; right:
            total = nums[i] + nums[left] + nums[right]
            <span class="kw">if</span> total &lt; <span class="num">0</span>:
                left += <span class="num">1</span>
            <span class="kw">elif</span> total &gt; <span class="num">0</span>:
                right -= <span class="num">1</span>
            <span class="kw">else</span>:
                res.append([nums[i], nums[left], nums[right]])
                left += <span class="num">1</span>
                right -= <span class="num">1</span>
                <span class="kw">while</span> left &lt; right <span class="kw">and</span> nums[left] == nums[left - <span class="num">1</span>]:
                    left += <span class="num">1</span>   <span class="cm"># skip duplicate left values</span>
                <span class="kw">while</span> left &lt; right <span class="kw">and</span> nums[right] == nums[right + <span class="num">1</span>]:
                    right -= <span class="num">1</span>  <span class="cm"># skip duplicate right values</span>
    <span class="kw">return</span> res</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n²) — sort O(n log n) + outer loop × inner two-pointer scan &nbsp;·&nbsp; <strong>Space:</strong> O(1) extra (excluding output / sort space)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/3sum/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#11 · Container With Most Water</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an array <code>height</code> where <code>height[i]</code> is the height of a vertical line at position <code>i</code>, find two lines that together with the x-axis form a container that holds the most water.
      <br><br>
      <strong>Example:</strong> <code>[1,8,6,2,5,4,8,3,7]</code> → <code>49</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Start with L=0, R=last. Area = <code>min(height[L], height[R]) * (R - L)</code>. Always move the pointer pointing to the <em>shorter wall</em> inward — moving the taller wall can only decrease or maintain the minimum height, never help. Keep track of the maximum area seen.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">max_area</span>(height: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">int</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(height) - <span class="num">1</span>
    best = <span class="num">0</span>
    <span class="kw">while</span> left &lt; right:
        area = <span class="fn">min</span>(height[left], height[right]) * (right - left)
        best = <span class="fn">max</span>(best, area)
        <span class="kw">if</span> height[left] &lt; height[right]:
            left += <span class="num">1</span>      <span class="cm"># shorter wall is the bottleneck — move it</span>
        <span class="kw">else</span>:
            right -= <span class="num">1</span>
    <span class="kw">return</span> best</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — pointers move inward, never apart &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/container-with-most-water/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#125</strong> and <strong>#167</strong> — they're direct applications of the templates above. When you're done, share your approach and I'll review it before we unlock Chapter 3: Sliding Window.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/dsa/arrays" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Arrays &amp; Hashing</a>
    <a href="/dsa/sliding-window" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Sliding Window →</a>
  </div>
</article>
`
}

export function init() {
  const tpSumArr = [1, 3, 5, 7, 9, 11]
  const tpSumTarget = 16
  let tpSumL = 0
  let tpSumR = tpSumArr.length - 1
  let tpSumDone = false

  const PTR_COUNT = tpSumArr.length

  function tpSumClearCells() {
    for (let i = 0; i < tpSumArr.length; i++) {
      const el = document.getElementById('tpsum-' + i)
      if (el) el.className = 'arr-cell'
    }
  }

  function tpSumRenderPointers() {
    const labelContainer = document.getElementById('tpsum-ptr-labels')
    if (!labelContainer) return
    labelContainer.innerHTML = ''
    for (let i = 0; i < PTR_COUNT; i++) {
      const div = document.createElement('div')
      div.className = 'ptr'
      if (i === tpSumL && i === tpSumR) {
        div.textContent = 'LR'
        div.style.color = 'var(--green)'
      } else if (i === tpSumL) {
        div.textContent = 'L'
        div.style.color = 'var(--green)'
      } else if (i === tpSumR) {
        div.textContent = 'R'
        div.style.color = 'var(--accent)'
      } else {
        div.textContent = '·'
        div.style.color = 'transparent'
      }
      labelContainer.appendChild(div)
    }
  }

  window.tpSumStep = function() {
    if (tpSumDone) return

    tpSumClearCells()

    const lEl = document.getElementById('tpsum-' + tpSumL)
    const rEl = document.getElementById('tpsum-' + tpSumR)
    if (lEl) lEl.classList.add('arr-hi')
    if (rEl && tpSumL !== tpSumR) rEl.classList.add('arr-lo')

    // render labels aligned with the highlighted cells, before moving pointers
    tpSumRenderPointers()

    const sum = tpSumArr[tpSumL] + tpSumArr[tpSumR]
    const out = document.getElementById('tpsum-output')
    const btn = document.getElementById('tpsum-btn')

    if (tpSumL >= tpSumR) {
      out.textContent = 'L and R have crossed — no valid pair found.'
      tpSumDone = true
      btn.textContent = 'Done ✓'
      return
    }

    if (sum === tpSumTarget) {
      if (lEl) lEl.classList.add('arr-hi')
      if (rEl) { rEl.className = 'arr-cell arr-hi' }
      out.textContent = `L=${tpSumL} (${tpSumArr[tpSumL]}) + R=${tpSumR} (${tpSumArr[tpSumR]}) = ${sum} == ${tpSumTarget} ✓ Found the pair!`
      tpSumDone = true
      btn.textContent = 'Done ✓'
    } else if (sum < tpSumTarget) {
      out.textContent = `L=${tpSumL} (${tpSumArr[tpSumL]}) + R=${tpSumR} (${tpSumArr[tpSumR]}) = ${sum} < ${tpSumTarget} — sum too small, move L right →`
      tpSumL++
    } else {
      out.textContent = `L=${tpSumL} (${tpSumArr[tpSumL]}) + R=${tpSumR} (${tpSumArr[tpSumR]}) = ${sum} > ${tpSumTarget} — sum too large, move R left ←`
      tpSumR--
    }
  }

  window.tpSumReset = function() {
    tpSumL = 0
    tpSumR = tpSumArr.length - 1
    tpSumDone = false
    tpSumClearCells()
    const l0 = document.getElementById('tpsum-0')
    const r5 = document.getElementById('tpsum-5')
    if (l0) l0.classList.add('arr-hi')
    if (r5) r5.classList.add('arr-lo')
    tpSumRenderPointers()
    const out = document.getElementById('tpsum-output')
    const btn = document.getElementById('tpsum-btn')
    if (out) out.textContent = `Array: [1, 3, 5, 7, 9, 11] · Target: 16 · Click "Next Step" to begin. L=0, R=5`
    if (btn) btn.textContent = 'Next Step →'
  }
}
