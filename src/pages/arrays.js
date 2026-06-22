export function render() {
  return `
<nav>
  <a href="/">Home</a>
  <span class="sep">›</span>
  <span class="current">Arrays &amp; Hashing</span>
</nav>

<div class="toc">
  <h4>On This Page</h4>
  <a href="#what-is-array">What is an Array?</a>
  <a href="#memory">Memory Layout</a>
  <a href="#python-lists">Python Lists</a>
  <a href="#complexity">Complexity</a>
  <a href="#hashing">Hash Maps</a>
  <a href="#patterns">Patterns</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Arrays</em> &amp; Hashing</h1>
  <p class="subtitle">Chapter 1 · The foundation of every DSA topic</p>

  <h2 id="what-is-array"><span class="emoji">📦</span>What is an Array?</h2>

  <p>An array is a <strong>fixed-size, contiguous block of memory</strong> that holds elements of the same type, each accessible in <strong>O(1)</strong> time using an index.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Train Cars</div>
    Think of an array like a train. Each <strong>car</strong> is a memory slot, numbered 0, 1, 2… The train is parked at a known station (the base address). To reach car #5, you just count five cars from the front — instant access. You don't have to search; you go directly.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Array of 7 integers in memory</div>
    <div style="position: relative; padding-top: 28px;">
      <div class="memory-grid" id="mem-grid">
        <div class="mem-cell used"><span class="mem-idx">0</span><span class="mem-addr">0x100</span><span class="mem-val">42</span></div>
        <div class="mem-cell used"><span class="mem-idx">1</span><span class="mem-addr">0x104</span><span class="mem-val">17</span></div>
        <div class="mem-cell used"><span class="mem-idx">2</span><span class="mem-addr">0x108</span><span class="mem-val">93</span></div>
        <div class="mem-cell used"><span class="mem-idx">3</span><span class="mem-addr">0x10C</span><span class="mem-val">5</span></div>
        <div class="mem-cell used"><span class="mem-idx">4</span><span class="mem-addr">0x110</span><span class="mem-val">78</span></div>
        <div class="mem-cell used"><span class="mem-idx">5</span><span class="mem-addr">0x114</span><span class="mem-val">31</span></div>
        <div class="mem-cell used"><span class="mem-idx">6</span><span class="mem-addr">0x118</span><span class="mem-val">60</span></div>
        <div class="mem-cell"><span class="mem-addr">0x11C</span><span class="mem-val" style="color:var(--muted)">—</span></div>
        <div class="mem-cell"><span class="mem-addr">0x120</span><span class="mem-val" style="color:var(--muted)">—</span></div>
      </div>
    </div>
    <p style="font-size:0.8rem; color:var(--muted); margin-top:0.5rem;">
      Each integer is 4 bytes. Address of element <code>i</code> = base_address + i × 4.
      That formula is why access is O(1) — no searching needed.
    </p>
  </div>

  <h2 id="python-lists"><span class="emoji">🐍</span>Python Lists — Arrays in Disguise</h2>

  <p>Python's <code>list</code> is a <strong>dynamic array</strong>. Under the hood it's still a contiguous block of memory, but Python automatically <em>resizes it</em> when you append beyond its capacity (doubling strategy, amortized O(1) append).</p>

  <pre><code><span class="cls">Python list creation</span>
<span class="cm"># Creating arrays</span>
nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]      <span class="cm"># literal</span>
zeros = [<span class="num">0</span>] * <span class="num">10</span>               <span class="cm"># [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]</span>
matrix = [[<span class="num">0</span>]*<span class="num">3</span> <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>)]  <span class="cm"># 3x3 grid</span>

<span class="cm"># Access &amp; update — O(1)</span>
<span class="fn">print</span>(nums[<span class="num">0</span>])    <span class="cm"># 1  — first element</span>
<span class="fn">print</span>(nums[-<span class="num">1</span>])   <span class="cm"># 5  — last element (Python negative indexing!)</span>
nums[<span class="num">2</span>] = <span class="num">99</span>      <span class="cm"># update in-place</span>

<span class="cm"># Slicing — O(k) where k = slice length</span>
<span class="fn">print</span>(nums[<span class="num">1</span>:<span class="num">4</span>])  <span class="cm"># [2, 99, 4] — index 1 up to (not including) 4</span>
<span class="fn">print</span>(nums[:<span class="num">3</span>])   <span class="cm"># [1, 2, 99]</span>
<span class="fn">print</span>(nums[::-<span class="num">1</span>]) <span class="cm"># [5, 4, 99, 2, 1] — reversed!</span>

<span class="cm"># Growing &amp; shrinking</span>
nums.append(<span class="num">6</span>)       <span class="cm"># O(1) amortized — adds to end</span>
nums.pop()            <span class="cm"># O(1) — removes from end</span>
nums.insert(<span class="num">0</span>, <span class="num">99</span>)   <span class="cm"># O(n) — shifts all elements right!</span>
nums.pop(<span class="num">0</span>)          <span class="cm"># O(n) — shifts all elements left!</span></code><span class="code-label">Python</span></pre>

  <div class="callout warn">
    <div class="callout-title">Watch Out</div>
    <code>insert(0, x)</code> and <code>pop(0)</code> are <strong>O(n)</strong> because every element after index 0 must shift. This is a very common source of accidental slowness in solutions. Always add/remove from the <em>end</em> for O(1).
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity Cheat Sheet</h2>

  <table>
    <thead>
      <tr><th>Operation</th><th>Python Code</th><th>Time</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Read by index</td><td><code>a[i]</code></td><td class="o-1">O(1)</td><td>Direct address calculation</td></tr>
      <tr><td>Write by index</td><td><code>a[i] = x</code></td><td class="o-1">O(1)</td><td>Direct address calculation</td></tr>
      <tr><td>Append to end</td><td><code>a.append(x)</code></td><td class="o-1">O(1)*</td><td>Amortized; rare resizes</td></tr>
      <tr><td>Pop from end</td><td><code>a.pop()</code></td><td class="o-1">O(1)</td><td>Just decrement length</td></tr>
      <tr><td>Insert at middle/front</td><td><code>a.insert(i, x)</code></td><td class="o-n">O(n)</td><td>Must shift elements</td></tr>
      <tr><td>Delete at middle/front</td><td><code>a.pop(i) / del a[i]</code></td><td class="o-n">O(n)</td><td>Must shift elements</td></tr>
      <tr><td>Search (unsorted)</td><td><code>x in a</code></td><td class="o-n">O(n)</td><td>Must check each element</td></tr>
      <tr><td>Search (sorted)</td><td>Binary Search</td><td class="o-logn">O(log n)</td><td>Halve search space each step</td></tr>
      <tr><td>Sort</td><td><code>sorted(a) / a.sort()</code></td><td class="o-n">O(n log n)</td><td>Tim Sort</td></tr>
      <tr><td>Slice</td><td><code>a[i:j]</code></td><td class="o-n">O(k)</td><td>Copies k = j-i elements</td></tr>
    </tbody>
  </table>

  <h2 id="hashing"><span class="emoji">🗂️</span>Hash Maps — Instant Lookup</h2>

  <p>A <strong>hash map</strong> (Python <code>dict</code>) maps keys to values in <strong>O(1) average</strong> for reads and writes. It's the most powerful tool in your DSA toolkit.</p>

  <h3>How does it work?</h3>
  <p>A <em>hash function</em> converts any key into an integer (the "hash"). That integer is used as an index into a fixed-size array of "buckets". So looking up a key is: compute hash → index → done.</p>

  <div class="diagram-wrap">
    <div class="diagram-title">Hash Map — key "apple" → bucket</div>
    <svg width="100%" height="160" viewBox="0 0 600 160">
      <rect x="20" y="55" width="100" height="50" rx="8" fill="#F3F2EF" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="70" y="85" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">"apple"</text>
      <line x1="120" y1="80" x2="195" y2="80" stroke="#8A8F9E" stroke-width="1.5" marker-end="url(#arr)"/>
      <rect x="195" y="50" width="110" height="60" rx="8" fill="#FFFFFF" stroke="#D8D5D0" stroke-width="1.5"/>
      <text x="250" y="77" text-anchor="middle" fill="#8A8F9E" font-size="11">hash()</text>
      <text x="250" y="95" text-anchor="middle" fill="#7C3AED" font-size="12">→ 5239183</text>
      <line x1="305" y1="80" x2="360" y2="80" stroke="#8A8F9E" stroke-width="1.5" marker-end="url(#arr)"/>
      <text x="333" y="73" text-anchor="middle" fill="#8A8F9E" font-size="10">% 8</text>
      <g transform="translate(360, 10)">
        <rect x="0" y="0" width="200" height="140" rx="8" fill="#F3F2EF" stroke="#D8D5D0"/>
        <text x="100" y="-5" text-anchor="middle" fill="#8A8F9E" font-size="10">Buckets array (size 8)</text>
        <rect x="5" y="10" width="190" height="20" rx="3" fill="#FFFFFF"/>
        <text x="15" y="24" fill="#8A8F9E" font-size="10">0</text>
        <rect x="5" y="32" width="190" height="20" rx="3" fill="#FFFFFF"/>
        <text x="15" y="46" fill="#8A8F9E" font-size="10">1</text>
        <rect x="5" y="54" width="190" height="20" rx="3" fill="#FFFFFF"/>
        <text x="15" y="68" fill="#8A8F9E" font-size="10">2</text>
        <rect x="5" y="76" width="190" height="20" rx="3" fill="#F0FDF4" stroke="#2A7A52" stroke-width="1"/>
        <text x="15" y="90" fill="#8A8F9E" font-size="10">3</text>
        <text x="35" y="90" fill="#2A7A52" font-size="10">"apple" → 5</text>
        <rect x="5" y="98" width="190" height="20" rx="3" fill="#FFFFFF"/>
        <text x="15" y="112" fill="#8A8F9E" font-size="10">4</text>
        <rect x="5" y="120" width="190" height="14" rx="3" fill="#FFFFFF"/>
        <text x="15" y="131" fill="#8A8F9E" font-size="10">…</text>
      </g>
      <text x="410" y="157" text-anchor="middle" fill="#8A8F9E" font-size="10">5239183 % 8 = 3 ✓</text>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
      </defs>
    </svg>
  </div>

  <pre><code><span class="cm"># Python dict = hash map</span>
freq = {}

<span class="cm"># Count frequency of each character</span>
word = <span class="st">"leetcode"</span>
<span class="kw">for</span> ch <span class="kw">in</span> word:
    freq[ch] = freq.<span class="fn">get</span>(ch, <span class="num">0</span>) + <span class="num">1</span>
<span class="cm"># {'l': 1, 'e': 3, 't': 1, 'c': 1, 'o': 1, 'd': 1}</span>

<span class="cm"># Or cleaner with Counter</span>
<span class="kw">from</span> collections <span class="kw">import</span> Counter
freq = Counter(word)   <span class="cm"># same result, one line</span>

<span class="cm"># Check membership — O(1)!</span>
<span class="st">'e'</span> <span class="kw">in</span> freq      <span class="cm"># True  — O(1), not O(n) like a list</span>
freq[<span class="st">'e'</span>]        <span class="cm"># 3</span>
freq[<span class="st">'z'</span>]        <span class="cm"># KeyError! use .get()</span>
freq.<span class="fn">get</span>(<span class="st">'z'</span>, <span class="num">0</span>) <span class="cm"># 0  — safe with default</span>

<span class="cm"># Sets — hash map with no values, just keys</span>
seen = <span class="fn">set</span>()
seen.<span class="fn">add</span>(<span class="num">5</span>)
<span class="num">5</span> <span class="kw">in</span> seen   <span class="cm"># True — O(1)!!</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">Key Insight</div>
    Whenever you need to <strong>check if something exists</strong> or <strong>count occurrences</strong>, your first thought should be "can I use a hash map / set?" It turns O(n) searches into O(1) lookups. This pattern solves dozens of LeetCode problems.
  </div>

  <h3>Interactive Hash Map Demo</h3>
  <div class="demo-box">
    <h4>Build a Frequency Map</h4>
    <div class="demo-controls">
      <button class="btn" onclick="addLetter('a')">Add 'a'</button>
      <button class="btn" onclick="addLetter('b')">Add 'b'</button>
      <button class="btn" onclick="addLetter('c')">Add 'c'</button>
      <button class="btn" onclick="resetHM()">Reset</button>
    </div>
    <div class="hashmap-visual" id="hm-visual">
      <div class="hm-bucket" id="hm-a"><span class="hm-key">'a'</span><span class="hm-arrow">→</span><span class="hm-val">0</span></div>
      <div class="hm-bucket" id="hm-b"><span class="hm-key">'b'</span><span class="hm-arrow">→</span><span class="hm-val">0</span></div>
      <div class="hm-bucket" id="hm-c"><span class="hm-key">'c'</span><span class="hm-arrow">→</span><span class="hm-val">0</span></div>
    </div>
    <div class="demo-output" id="hm-output">freq = {}</div>
  </div>

  <h2 id="patterns"><span class="emoji">🎯</span>Core Patterns</h2>

  <h3>Pattern 1 — Two Pointers</h3>
  <p>Use two indices that <em>move toward each other</em> (or chase each other) to avoid nested loops. Turns many O(n²) brute forces into O(n).</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Squeezing a Tube of Toothpaste</div>
    You push from both ends toward the middle. Both hands are working at the same time, and you stop when they meet. That's the two-pointer technique.
  </div>

  <div class="demo-box">
    <h4>Two Pointers: Check if Array is a Palindrome</h4>
    <div class="demo-controls">
      <button class="btn" onclick="tpStep()" id="tp-btn">Next Step →</button>
      <button class="btn" onclick="tpReset()">Reset</button>
    </div>
    <div class="tp-wrap">
      <div class="ptr-label" id="tp-ptrs">
        <div class="ptr left" id="tp-l-label" style="color:var(--accent)">L</div>
      </div>
      <div class="tp-row">
        <div class="arr-cell" id="tp-0"><span class="arr-idx">0</span><span class="arr-v">r</span></div>
        <div class="arr-cell" id="tp-1"><span class="arr-idx">1</span><span class="arr-v">a</span></div>
        <div class="arr-cell" id="tp-2"><span class="arr-idx">2</span><span class="arr-v">c</span></div>
        <div class="arr-cell" id="tp-3"><span class="arr-idx">3</span><span class="arr-v">e</span></div>
        <div class="arr-cell" id="tp-4"><span class="arr-idx">4</span><span class="arr-v">c</span></div>
        <div class="arr-cell" id="tp-5"><span class="arr-idx">5</span><span class="arr-v">a</span></div>
        <div class="arr-cell" id="tp-6"><span class="arr-idx">6</span><span class="arr-v">r</span></div>
      </div>
    </div>
    <div class="demo-output" id="tp-output">Click "Next Step" to start. L=0, R=6</div>
  </div>

<pre><code><span class="kw">def</span> <span class="fn">is_palindrome</span>(s: <span class="fn">str</span>) -> <span class="fn">bool</span>:
    left, right = <span class="num">0</span>, <span class="fn">len</span>(s) - <span class="num">1</span>

    <span class="kw">while</span> left &lt; right:
        <span class="kw">if</span> s[left] != s[right]:
            <span class="kw">return</span> <span class="kw">False</span>   <span class="cm"># mismatch found</span>
        left += <span class="num">1</span>
        right -= <span class="num">1</span>

    <span class="kw">return</span> <span class="kw">True</span>

<span class="cm"># Test</span>
<span class="fn">print</span>(<span class="fn">is_palindrome</span>(<span class="st">"racecar"</span>))  <span class="cm"># True</span>
<span class="fn">print</span>(<span class="fn">is_palindrome</span>(<span class="st">"hello"</span>))    <span class="cm"># False</span></code><span class="code-label">Python</span></pre>

  <h3>Pattern 2 — Frequency Count with Hash Map</h3>
  <p>Whenever a problem asks about <em>duplicates</em>, <em>counts</em>, or <em>"has this appeared before?"</em>, your first move is a hash map/set.</p>

  <div class="demo-box">
    <h4>Demo: Contains Duplicate — Array vs Set lookup</h4>
    <div class="demo-controls">
      <button class="btn" onclick="dupStep()" id="dup-btn">Next Step →</button>
      <button class="btn" onclick="dupReset()">Reset</button>
    </div>
    <div class="demo-array" id="dup-arr">
      <div class="arr-cell" id="dup-0"><span class="arr-idx">0</span><span class="arr-v">1</span></div>
      <div class="arr-cell" id="dup-1"><span class="arr-idx">1</span><span class="arr-v">2</span></div>
      <div class="arr-cell" id="dup-2"><span class="arr-idx">2</span><span class="arr-v">3</span></div>
      <div class="arr-cell" id="dup-3"><span class="arr-idx">3</span><span class="arr-v">1</span></div>
      <div class="arr-cell" id="dup-4"><span class="arr-idx">4</span><span class="arr-v">4</span></div>
    </div>
    <div style="margin: 0.5rem 0; font-size: 0.8rem; color: var(--muted)">seen set: <span id="dup-seen">{}</span></div>
    <div class="demo-output" id="dup-output">Array: [1,2,3,1,4] — Does it contain a duplicate?</div>
  </div>

<pre><code><span class="cm"># Brute force — O(n²): check all pairs</span>
<span class="kw">def</span> <span class="fn">contains_dup_slow</span>(nums):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(nums)):
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i + <span class="num">1</span>, <span class="fn">len</span>(nums)):
            <span class="kw">if</span> nums[i] == nums[j]:
                <span class="kw">return</span> <span class="kw">True</span>
    <span class="kw">return</span> <span class="kw">False</span>

<span class="cm"># Hash set — O(n): one pass, O(1) lookup</span>
<span class="kw">def</span> <span class="fn">contains_duplicate</span>(nums):
    seen = <span class="fn">set</span>()
    <span class="kw">for</span> num <span class="kw">in</span> nums:
        <span class="kw">if</span> num <span class="kw">in</span> seen:   <span class="cm"># O(1) set lookup</span>
            <span class="kw">return</span> <span class="kw">True</span>
        seen.<span class="fn">add</span>(num)
    <span class="kw">return</span> <span class="kw">False</span>

<span class="cm"># Even shorter in Python</span>
<span class="kw">def</span> <span class="fn">contains_duplicate_v2</span>(nums):
    <span class="kw">return</span> <span class="fn">len</span>(nums) != <span class="fn">len</span>(<span class="fn">set</span>(nums))</code><span class="code-label">Python</span></pre>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These problems directly apply what you just learned. Attempt them yourself first — then check the hints.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#217 · Contains Duplicate</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given an integer array <code>nums</code>, return <code>True</code> if any value appears <strong>at least twice</strong>, and <code>False</code> if every element is distinct.
      <br><br>
      <strong>Example:</strong> <code>nums = [1,2,3,1]</code> → <code>True</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use a set. As you visit each number, check if it's already in your set. If yes, duplicate found!</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">contains_duplicate</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>]) -> <span class="fn">bool</span>:
    seen = <span class="fn">set</span>()                <span class="cm"># O(1) lookup/insert</span>
    <span class="kw">for</span> num <span class="kw">in</span> nums:
        <span class="kw">if</span> num <span class="kw">in</span> seen:       <span class="cm"># already saw this number → duplicate</span>
            <span class="kw">return</span> <span class="kw">True</span>
        seen.<span class="fn">add</span>(num)         <span class="cm"># remember it for future iterations</span>
    <span class="kw">return</span> <span class="kw">False</span>            <span class="cm"># finished with no repeats</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — single pass &nbsp;·&nbsp; <strong>Space:</strong> O(n) — set can hold up to n elements</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/contains-duplicate/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#242 · Valid Anagram</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given two strings <code>s</code> and <code>t</code>, return <code>True</code> if <code>t</code> is an anagram of <code>s</code>.
      An anagram uses the same characters in any order.
      <br><br>
      <strong>Example:</strong> <code>s = "anagram"</code>, <code>t = "nagaram"</code> → <code>True</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Count character frequencies in both strings (use <code>Counter</code> or a dict). If the frequency maps are equal, they're anagrams.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">from</span> collections <span class="kw">import</span> Counter

<span class="kw">def</span> <span class="fn">is_anagram</span>(s: <span class="fn">str</span>, t: <span class="fn">str</span>) -> <span class="fn">bool</span>:
    <span class="kw">if</span> <span class="fn">len</span>(s) != <span class="fn">len</span>(t):     <span class="cm"># different lengths can't be anagrams</span>
        <span class="kw">return</span> <span class="kw">False</span>
    <span class="kw">return</span> Counter(s) == Counter(t)  <span class="cm"># compare letter-frequency maps</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — building each Counter is O(n) &nbsp;·&nbsp; <strong>Space:</strong> O(n) — two frequency maps</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/valid-anagram/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#1 · Two Sum</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of two numbers that add up to <code>target</code>.
      <br><br>
      <strong>Example:</strong> <code>nums = [2,7,11,15]</code>, <code>target = 9</code> → <code>[0, 1]</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">As you iterate, for each number <code>x</code>, check if <code>target - x</code> is already in a hash map. If yes, you found the pair!</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">two_sum</span>(nums: <span class="fn">list</span>[<span class="fn">int</span>], target: <span class="fn">int</span>) -> <span class="fn">list</span>[<span class="fn">int</span>]:
    seen = {}                    <span class="cm"># value → index, O(1) lookup</span>
    <span class="kw">for</span> i, x <span class="kw">in</span> <span class="fn">enumerate</span>(nums):
        complement = target - x
        <span class="kw">if</span> complement <span class="kw">in</span> seen:   <span class="cm"># partner already seen → found the pair</span>
            <span class="kw">return</span> [seen[complement], i]
        seen[x] = i               <span class="cm"># remember this number's index</span>
    <span class="kw">return</span> []                  <span class="cm"># no pair found (won't happen per constraints)</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — single pass, O(1) hash lookups &nbsp;·&nbsp; <strong>Space:</strong> O(n) — hash map of seen values</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/two-sum/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#49 · Group Anagrams</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an array of strings, group all anagrams together.
      <br><br>
      <strong>Example:</strong> <code>["eat","tea","tan","ate","nat","bat"]</code> → <code>[["bat"],["nat","tan"],["ate","eat","tea"]]</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">The <em>sorted version</em> of a string is the same for all anagrams — use <code>tuple(sorted(s))</code> as your hash map key.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">from</span> collections <span class="kw">import</span> defaultdict

<span class="kw">def</span> <span class="fn">group_anagrams</span>(strs: <span class="fn">list</span>[<span class="fn">str</span>]) -> <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">str</span>]]:
    groups = defaultdict(<span class="fn">list</span>)
    <span class="kw">for</span> s <span class="kw">in</span> strs:
        key = <span class="fn">tuple</span>(<span class="fn">sorted</span>(s))   <span class="cm"># anagrams share the same sorted key</span>
        groups[key].append(s)
    <span class="kw">return</span> <span class="fn">list</span>(groups.values())</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n·k log k) — n strings, each sorted in O(k log k) for length k &nbsp;·&nbsp; <strong>Space:</strong> O(n·k) — storing all strings in groups</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/group-anagrams/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#217</strong> and <strong>#242</strong>. Write your solution in Python, test it, then come back and tell me your approach. I'll review it, point out improvements, and unlock the next topic.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Back to Home</a>
    <a href="/two-pointers" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Two Pointers →</a>
  </div>
</article>
`
}

export function init() {
  const hmCounts = { a: 0, b: 0, c: 0 }

  window.addLetter = function(l) {
    hmCounts[l]++
    const cell = document.getElementById('hm-' + l)
    cell.classList.add('active')
    cell.querySelector('.hm-val').textContent = hmCounts[l]
    setTimeout(() => cell.classList.remove('active'), 600)
    const active = Object.fromEntries(Object.entries(hmCounts).filter(([, v]) => v > 0))
    document.getElementById('hm-output').textContent = 'freq = ' + JSON.stringify(active)
  }

  window.resetHM = function() {
    Object.keys(hmCounts).forEach(k => hmCounts[k] = 0);
    ['a', 'b', 'c'].forEach(l => {
      document.getElementById('hm-' + l).querySelector('.hm-val').textContent = '0'
    })
    document.getElementById('hm-output').textContent = 'freq = {}'
  }

  const tpArr = ['r', 'a', 'c', 'e', 'c', 'a', 'r']
  let tpL = 0, tpR = 6, tpDone = false

  function tpClear() {
    for (let i = 0; i < tpArr.length; i++) {
      document.getElementById('tp-' + i).className = 'arr-cell'
    }
  }

  function tpRender() {
    tpClear()
    const lc = document.getElementById('tp-' + tpL)
    const rc = document.getElementById('tp-' + tpR)
    if (lc) lc.classList.add('arr-hi')
    if (rc && tpL !== tpR) rc.classList.add('arr-lo')
  }

  window.tpStep = function() {
    if (tpDone) return
    tpRender()
    const match = tpArr[tpL] === tpArr[tpR]
    const msg = `L=${tpL} ("${tpArr[tpL]}") vs R=${tpR} ("${tpArr[tpR]}") — ${match ? '✓ Match' : '✗ Mismatch'}`
    if (tpL >= tpR) {
      tpDone = true
      document.getElementById('tp-output').textContent = '✅ Palindrome confirmed! L and R met in the middle.'
      document.getElementById('tp-btn').textContent = 'Done ✓'
      return
    }
    document.getElementById('tp-output').textContent = msg
    tpL++; tpR--
  }

  window.tpReset = function() {
    tpL = 0; tpR = 6; tpDone = false
    tpClear()
    document.getElementById('tp-output').textContent = 'Click "Next Step" to start. L=0, R=6'
    document.getElementById('tp-btn').textContent = 'Next Step →'
  }

  const dupArr = [1, 2, 3, 1, 4]
  let dupIdx = 0, dupSeen = new Set(), dupDone = false

  window.dupStep = function() {
    if (dupDone) return
    for (let i = 0; i < dupArr.length; i++) {
      document.getElementById('dup-' + i).className = 'arr-cell'
    }
    const cell = document.getElementById('dup-' + dupIdx)
    const val = dupArr[dupIdx]
    if (dupSeen.has(val)) {
      cell.classList.add('arr-swap')
      document.getElementById('dup-output').textContent = `✅ Found duplicate: ${val} at index ${dupIdx}! Return True.`
      document.getElementById('dup-btn').textContent = 'Done ✓'
      dupDone = true
    } else {
      cell.classList.add('arr-hi')
      dupSeen.add(val)
      document.getElementById('dup-seen').textContent = '{' + [...dupSeen].join(', ') + '}'
      document.getElementById('dup-output').textContent = `Checking index ${dupIdx}: value ${val} — not in seen. Adding to set.`
      dupIdx++
      if (dupIdx >= dupArr.length) {
        document.getElementById('dup-output').textContent = 'Reached end — no duplicates found. Return False.'
        dupDone = true
      }
    }
  }

  window.dupReset = function() {
    dupIdx = 0; dupSeen = new Set(); dupDone = false
    for (let i = 0; i < dupArr.length; i++) {
      document.getElementById('dup-' + i).className = 'arr-cell'
    }
    document.getElementById('dup-seen').textContent = '{}'
    document.getElementById('dup-output').textContent = 'Array: [1,2,3,1,4] — Does it contain a duplicate?'
    document.getElementById('dup-btn').textContent = 'Next Step →'
  }
}
