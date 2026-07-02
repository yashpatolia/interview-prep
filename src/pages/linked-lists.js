export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What is a Linked List?</a>
  <a href="#impl">Python Implementation</a>
  <a href="#techniques">Key Techniques</a>
  <a href="#complexity">vs Arrays</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Linked</em> Lists</h1>
  <p class="subtitle">Chapter 4 · Nodes connected by pointers</p>

  <h2 id="what"><span class="emoji">🔗</span>What is a Linked List?</h2>

  <p>A linked list is a sequence of <strong>nodes</strong>, where each node holds a <strong>value</strong> and a <strong>pointer</strong> (reference) to the next node in the chain. The last node points to <code>None</code>. Unlike arrays, nodes are scattered anywhere in memory — they are not contiguous.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Treasure Hunt</div>
    Imagine a treasure hunt where each clue tells you <em>where the next clue is hidden</em>. You can't jump straight to clue #4 — you must follow the chain from clue #1 to #2 to #3 to #4. That's a linked list: no random access, you always start at the head and follow <code>.next</code> pointers until you reach your destination (or <code>None</code>).
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Singly Linked List — 4 nodes, last points to null</div>
    <svg width="100%" height="90" viewBox="0 0 580 90">
      <defs>
        <marker id="ll-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
      </defs>
      <!-- Node 1 -->
      <rect x="10" y="20" width="90" height="50" rx="8" fill="#EBF0FD" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="35" y="41" fill="#8A8F9E" font-size="9">val</text>
      <text x="35" y="57" fill="#18192A" font-size="14" font-weight="700">3</text>
      <line x1="75" y1="32" x2="75" y2="58" stroke="#D8D5D0" stroke-width="1"/>
      <text x="79" y="41" fill="#8A8F9E" font-size="9">next</text>
      <text x="79" y="57" fill="#2B5CE6" font-size="9">→</text>
      <!-- Arrow 1 to 2 -->
      <line x1="100" y1="45" x2="148" y2="45" stroke="#8A8F9E" stroke-width="1.5" marker-end="url(#ll-arr)"/>
      <!-- Node 2 -->
      <rect x="150" y="20" width="90" height="50" rx="8" fill="#EBF0FD" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="175" y="41" fill="#8A8F9E" font-size="9">val</text>
      <text x="175" y="57" fill="#18192A" font-size="14" font-weight="700">1</text>
      <line x1="215" y1="32" x2="215" y2="58" stroke="#D8D5D0" stroke-width="1"/>
      <text x="219" y="41" fill="#8A8F9E" font-size="9">next</text>
      <text x="219" y="57" fill="#2B5CE6" font-size="9">→</text>
      <!-- Arrow 2 to 3 -->
      <line x1="240" y1="45" x2="288" y2="45" stroke="#8A8F9E" stroke-width="1.5" marker-end="url(#ll-arr)"/>
      <!-- Node 3 -->
      <rect x="290" y="20" width="90" height="50" rx="8" fill="#EBF0FD" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="315" y="41" fill="#8A8F9E" font-size="9">val</text>
      <text x="315" y="57" fill="#18192A" font-size="14" font-weight="700">4</text>
      <line x1="355" y1="32" x2="355" y2="58" stroke="#D8D5D0" stroke-width="1"/>
      <text x="359" y="41" fill="#8A8F9E" font-size="9">next</text>
      <text x="359" y="57" fill="#2B5CE6" font-size="9">→</text>
      <!-- Arrow 3 to 4 -->
      <line x1="380" y1="45" x2="428" y2="45" stroke="#8A8F9E" stroke-width="1.5" marker-end="url(#ll-arr)"/>
      <!-- Node 4 -->
      <rect x="430" y="20" width="90" height="50" rx="8" fill="#EBF0FD" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="455" y="41" fill="#8A8F9E" font-size="9">val</text>
      <text x="455" y="57" fill="#18192A" font-size="14" font-weight="700">2</text>
      <line x1="495" y1="32" x2="495" y2="58" stroke="#D8D5D0" stroke-width="1"/>
      <text x="499" y="41" fill="#8A8F9E" font-size="9">next</text>
      <text x="499" y="57" fill="#8A8F9E" font-size="9">∅</text>
      <!-- null label -->
      <text x="524" y="49" fill="#8A8F9E" font-size="11">None</text>
      <!-- head label -->
      <text x="43" y="14" text-anchor="middle" fill="#E8442A" font-size="10" font-weight="700">head</text>
    </svg>
  </div>

  <p>Key properties:</p>
  <ul>
    <li><strong>No random access</strong> — to get node at index 3, you must traverse from <code>head</code> through nodes 0, 1, 2, 3.</li>
    <li><strong>Dynamic size</strong> — growing or shrinking is cheap; no reallocation needed.</li>
    <li><strong>O(1) insert/delete at head</strong> — just update one pointer.</li>
    <li><strong>O(n) insert/delete at arbitrary position</strong> — must traverse to find it first.</li>
  </ul>

  <h2 id="impl"><span class="emoji">🐍</span>Python Implementation</h2>

  <p>Python doesn't have a built-in linked list node type, so we define our own class:</p>

<pre><code><span class="cm"># Define the Node</span>
<span class="kw">class</span> <span class="cls">ListNode</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, val=<span class="num">0</span>, next=<span class="kw">None</span>):
        <span class="kw">self</span>.val  = val   <span class="cm"># the value stored in this node</span>
        <span class="kw">self</span>.next = next  <span class="cm"># pointer to the next node (or None)</span>

<span class="cm"># Build the list 3 → 1 → 4 → 2 → None manually</span>
n4 = <span class="cls">ListNode</span>(<span class="num">2</span>)
n3 = <span class="cls">ListNode</span>(<span class="num">4</span>, n4)
n2 = <span class="cls">ListNode</span>(<span class="num">1</span>, n3)
n1 = <span class="cls">ListNode</span>(<span class="num">3</span>, n2)
head = n1   <span class="cm"># head is always the first node</span>

<span class="cm"># Traversal — follow .next until None</span>
cur = head
<span class="kw">while</span> cur <span class="kw">is not</span> <span class="kw">None</span>:
    <span class="fn">print</span>(cur.val)   <span class="cm"># prints 3, 1, 4, 2</span>
    cur = cur.next   <span class="cm"># advance to next node</span>

<span class="cm"># Collect values into a Python list</span>
vals = []
cur = head
<span class="kw">while</span> cur:
    vals.append(cur.val)
    cur = cur.next
<span class="fn">print</span>(vals)  <span class="cm"># [3, 1, 4, 2]</span></code><span class="code-label">Python</span></pre>

  <div class="callout warn">
    <div class="callout-title">Common Mistake</div>
    Always check <code>cur is not None</code> before accessing <code>cur.val</code> or <code>cur.next</code>. Dereferencing <code>None</code> gives an <code>AttributeError</code> — the linked list equivalent of an index-out-of-bounds error.
  </div>

  <h3>Interactive Demo — Traverse a Linked List</h3>
  <div class="demo-box">
    <h4>Traverse: 3 → 1 → 4 → 1 → 5 → None</h4>
    <div class="demo-controls">
      <button class="btn" onclick="llStep()" id="ll-btn">Next Node →</button>
      <button class="btn" onclick="llReset()">Reset</button>
    </div>
    <div class="diagram-wrap" style="margin: 0 0 1rem; padding: 1rem;">
      <div id="ll-nodes" style="display:flex; align-items:center; gap:0; flex-wrap:wrap;"></div>
    </div>
    <div class="demo-output" id="ll-output">Click "Next Node" to start traversal from head.</div>
  </div>

  <h2 id="techniques"><span class="emoji">🛠️</span>Key Techniques</h2>

  <h3>Technique 1 — Dummy Node</h3>
  <p>A <strong>dummy (sentinel) node</strong> is a fake head node you prepend before the real list. It has no meaningful value — its only job is to give you a stable pointer so you never have to special-case "what if the operation is at the very front?"</p>

<pre><code><span class="cm"># Without dummy — inserting at head is a special case</span>
<span class="kw">def</span> <span class="fn">delete_val_no_dummy</span>(head, val):
    <span class="kw">if</span> head <span class="kw">and</span> head.val == val:
        <span class="kw">return</span> head.next      <span class="cm"># special case!</span>
    cur = head
    <span class="kw">while</span> cur <span class="kw">and</span> cur.next:
        <span class="kw">if</span> cur.next.val == val:
            cur.next = cur.next.next
            <span class="kw">return</span> head
        cur = cur.next
    <span class="kw">return</span> head

<span class="cm"># With dummy — uniform logic, no special case</span>
<span class="kw">def</span> <span class="fn">delete_val</span>(head, val):
    dummy = <span class="cls">ListNode</span>(<span class="num">0</span>, head)   <span class="cm"># dummy.next = real head</span>
    cur = dummy
    <span class="kw">while</span> cur.next:
        <span class="kw">if</span> cur.next.val == val:
            cur.next = cur.next.next   <span class="cm"># skip the target node</span>
        <span class="kw">else</span>:
            cur = cur.next
    <span class="kw">return</span> dummy.next   <span class="cm"># real head (may have changed)</span></code><span class="code-label">Python</span></pre>

  <h3>Technique 2 — Fast &amp; Slow Pointers</h3>
  <p>Two pointers traverse the list at different speeds. <strong>Fast</strong> moves 2 steps at a time, <strong>slow</strong> moves 1. When fast reaches the end, slow is at the <em>middle</em>. This also detects <strong>cycles</strong>: if there is a loop, fast will eventually lap slow and they will meet.</p>

<pre><code><span class="cm"># Find middle of linked list</span>
<span class="kw">def</span> <span class="fn">find_middle</span>(head):
    slow, fast = head, head
    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:
        slow = slow.next         <span class="cm"># 1 step</span>
        fast = fast.next.next   <span class="cm"># 2 steps</span>
    <span class="kw">return</span> slow   <span class="cm"># slow is now at the middle</span>

<span class="cm"># Detect cycle (Floyd's algorithm)</span>
<span class="kw">def</span> <span class="fn">has_cycle</span>(head):
    slow, fast = head, head
    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:
        slow = slow.next
        fast = fast.next.next
        <span class="kw">if</span> slow <span class="kw">is</span> fast:   <span class="cm"># they met — cycle!</span>
            <span class="kw">return</span> <span class="kw">True</span>
    <span class="kw">return</span> <span class="kw">False</span></code><span class="code-label">Python</span></pre>

  <h3>Technique 3 — In-place Reversal</h3>
  <p>Reverse a linked list by relinking pointers iteratively. Track three variables: <code>prev</code>, <code>cur</code>, and <code>nxt</code>. At each step, point <code>cur.next</code> backward, then advance all three pointers forward.</p>

<pre><code><span class="kw">def</span> <span class="fn">reverse_list</span>(head):
    prev = <span class="kw">None</span>
    cur  = head
    <span class="kw">while</span> cur:
        nxt       = cur.next   <span class="cm"># 1. save next before overwriting</span>
        cur.next  = prev       <span class="cm"># 2. reverse the pointer</span>
        prev      = cur        <span class="cm"># 3. advance prev</span>
        cur       = nxt        <span class="cm"># 4. advance cur</span>
    <span class="kw">return</span> prev   <span class="cm"># prev is now the new head</span>

<span class="cm"># Trace on 1 → 2 → 3 → None:</span>
<span class="cm">#  iter 1: prev=None  cur=1  → 1→None  prev=1  cur=2</span>
<span class="cm">#  iter 2: prev=1     cur=2  → 2→1     prev=2  cur=3</span>
<span class="cm">#  iter 3: prev=2     cur=3  → 3→2     prev=3  cur=None</span>
<span class="cm">#  return 3 (new head of 3→2→1→None)</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">Draw It Out</div>
    Reversal is the hardest to visualise mentally. Always draw boxes with arrows on paper first. The key insight: you must save <code>cur.next</code> in <code>nxt</code> <em>before</em> you overwrite <code>cur.next = prev</code>, or you lose the rest of the list.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Linked Lists vs Arrays</h2>

  <table>
    <thead>
      <tr><th>Operation</th><th>Linked List</th><th>Array / Python list</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Access by index</td><td class="o-n">O(n)</td><td class="o-1">O(1)</td><td>Must traverse from head</td></tr>
      <tr><td>Search by value</td><td class="o-n">O(n)</td><td class="o-n">O(n)</td><td>Both require linear scan</td></tr>
      <tr><td>Insert at head</td><td class="o-1">O(1)</td><td class="o-n">O(n)</td><td>Array must shift all elements</td></tr>
      <tr><td>Insert at tail</td><td class="o-n">O(n)*</td><td class="o-1">O(1)*</td><td>LL is O(1) if tail pointer tracked</td></tr>
      <tr><td>Insert in middle</td><td class="o-1">O(1)**</td><td class="o-n">O(n)</td><td>**O(1) once you have the node</td></tr>
      <tr><td>Delete at head</td><td class="o-1">O(1)</td><td class="o-n">O(n)</td><td>Array shifts; LL just moves head</td></tr>
      <tr><td>Memory layout</td><td colspan="2" style="color:var(--muted)">Non-contiguous (scattered)</td><td>Arrays are contiguous (cache-friendly)</td></tr>
    </tbody>
  </table>

  <div class="callout">
    <div class="callout-title">When to choose a Linked List</div>
    Use a linked list when you need <strong>many insertions/deletions at the front</strong> and don't need random access. The classic use cases are: implementing a queue, LRU cache, or undo history. For most other problems, arrays win on simplicity and cache performance.
  </div>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>All four problems below directly practice the techniques above. Try each one before peeking at the hint.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#206 · Reverse Linked List</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given the <code>head</code> of a singly linked list, reverse it and return the new head.
      <br><br>
      <strong>Example:</strong> <code>1 → 2 → 3 → 4 → 5</code> → <code>5 → 4 → 3 → 2 → 1</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use three pointers: <code>prev = None</code>, <code>cur = head</code>, <code>nxt</code>. In each iteration save <code>nxt = cur.next</code>, then set <code>cur.next = prev</code>, then advance both. Draw it out on paper first — this is the single most useful linked list pattern.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">reverse_list</span>(head: <span class="cls">ListNode</span>) -> <span class="cls">ListNode</span>:
    prev = <span class="kw">None</span>
    cur = head
    <span class="kw">while</span> cur:
        nxt = cur.next       <span class="cm"># save next node before we overwrite the link</span>
        cur.next = prev      <span class="cm"># reverse the pointer</span>
        prev = cur           <span class="cm"># advance prev</span>
        cur = nxt             <span class="cm"># advance cur</span>
    <span class="kw">return</span> prev               <span class="cm"># prev is the new head</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — visits every node once &nbsp;·&nbsp; <strong>Space:</strong> O(1) — only pointers, no new nodes</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/reverse-linked-list/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#21 · Merge Two Sorted Lists</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given the heads of two sorted linked lists, merge them into one sorted linked list and return the head.
      <br><br>
      <strong>Example:</strong> <code>1→2→4</code> and <code>1→3→4</code> → <code>1→1→2→3→4→4</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Create a dummy head node so you always have a pointer to build from. Use a <code>cur</code> pointer that advances. At each step compare <code>l1.val</code> vs <code>l2.val</code>, attach the smaller one to <code>cur.next</code>, and advance that list's pointer. When one list runs out, attach the remaining other list directly.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">merge_two_lists</span>(l1: <span class="cls">ListNode</span>, l2: <span class="cls">ListNode</span>) -> <span class="cls">ListNode</span>:
    dummy = <span class="cls">ListNode</span>()
    cur = dummy
    <span class="kw">while</span> l1 <span class="kw">and</span> l2:
        <span class="kw">if</span> l1.val &lt;= l2.val:
            cur.next = l1
            l1 = l1.next
        <span class="kw">else</span>:
            cur.next = l2
            l2 = l2.next
        cur = cur.next
    cur.next = l1 <span class="kw">if</span> l1 <span class="kw">else</span> l2   <span class="cm"># attach whichever list still has nodes</span>
    <span class="kw">return</span> dummy.next</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n + m) — walks each list once &nbsp;·&nbsp; <strong>Space:</strong> O(1) — reuses existing nodes</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/merge-two-sorted-lists/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#141 · Linked List Cycle</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given the head of a linked list, determine if it contains a cycle (a node whose <code>next</code> points back to a previous node).
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use Floyd's fast/slow pointer algorithm. Start both at <code>head</code>. Move <code>fast</code> two steps and <code>slow</code> one step each iteration. If they ever point to the same node, a cycle exists. If <code>fast</code> reaches <code>None</code>, there is no cycle.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">has_cycle</span>(head: <span class="cls">ListNode</span>) -> <span class="fn">bool</span>:
    slow = fast = head
    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:
        slow = slow.next        <span class="cm"># moves 1 step</span>
        fast = fast.next.next   <span class="cm"># moves 2 steps</span>
        <span class="kw">if</span> slow <span class="kw">is</span> fast:           <span class="cm"># they met → must be inside a cycle</span>
            <span class="kw">return</span> <span class="kw">True</span>
    <span class="kw">return</span> <span class="kw">False</span>                <span class="cm"># fast hit the end → no cycle</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — fast pointer bounds the loop &nbsp;·&nbsp; <strong>Space:</strong> O(1) — just two pointers, no visited set</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/linked-list-cycle/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#19 · Remove Nth Node From End</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given the head of a linked list and an integer <code>n</code>, remove the <code>n</code>th node from the end of the list and return the head.
      <br><br>
      <strong>Example:</strong> <code>1→2→3→4→5</code>, n=2 → <code>1→2→3→5</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use two pointers both starting at a dummy head. Advance <code>fast</code> by <code>n+1</code> steps first, creating a gap. Then move both <code>fast</code> and <code>slow</code> together until <code>fast</code> is <code>None</code>. At that point, <code>slow.next</code> is the node to remove — set <code>slow.next = slow.next.next</code>.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">remove_nth_from_end</span>(head: <span class="cls">ListNode</span>, n: <span class="fn">int</span>) -> <span class="cls">ListNode</span>:
    dummy = <span class="cls">ListNode</span>(<span class="num">0</span>, head)
    slow = fast = dummy
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n + <span class="num">1</span>):
        fast = fast.next       <span class="cm"># open up an n+1 node gap</span>
    <span class="kw">while</span> fast:                  <span class="cm"># move both until fast falls off the end</span>
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next  <span class="cm"># slow now sits right before the target — skip it</span>
    <span class="kw">return</span> dummy.next</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(n) — single pass, no need to first count list length &nbsp;·&nbsp; <strong>Space:</strong> O(1)</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/remove-nth-node-from-end-of-list/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#206</strong> — reversing is the fundamental linked list move. Once you can do it from memory, the others become much easier. Solve on paper first: draw boxes and arrows, then translate to code.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/dsa/sliding-window" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Sliding Window</a>
    <a href="/dsa/stacks-queues" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Stacks &amp; Queues →</a>
  </div>
</article>
`
}

export function init() {
  const llValues = [3, 1, 4, 1, 5]
  let llIdx = -1  // -1 = not started, 0..4 = current node index
  let llDone = false

  function llBuildNodes() {
    const container = document.getElementById('ll-nodes')
    if (!container) return
    container.innerHTML = ''
    llValues.forEach((val, i) => {
      // Node box
      const box = document.createElement('div')
      box.id = 'll-node-' + i
      box.style.cssText = [
        'display:inline-flex', 'align-items:stretch',
        'border:2px solid var(--blue)', 'border-radius:8px',
        'overflow:hidden', 'font-family:var(--font-mono)',
        'transition:all 0.25s ease', 'background:rgba(43,92,230,0.07)'
      ].join(';')

      const valPart = document.createElement('div')
      valPart.style.cssText = 'padding:8px 12px; font-size:1.1rem; font-weight:700; color:var(--ink);'
      valPart.textContent = val

      const nextPart = document.createElement('div')
      nextPart.style.cssText = [
        'padding:8px 8px', 'font-size:0.7rem', 'color:var(--muted)',
        'border-left:1px solid var(--border)', 'display:flex',
        'align-items:center', 'background:rgba(0,0,0,0.03)'
      ].join(';')
      nextPart.textContent = 'next'

      box.appendChild(valPart)
      box.appendChild(nextPart)
      container.appendChild(box)

      // Arrow between nodes
      if (i < llValues.length - 1) {
        const arrow = document.createElement('div')
        arrow.style.cssText = 'padding:0 6px; font-size:1.2rem; color:var(--muted); display:flex; align-items:center;'
        arrow.textContent = '→'
        container.appendChild(arrow)
      } else {
        // Null terminator
        const nullEl = document.createElement('div')
        nullEl.style.cssText = 'padding:0 8px; font-size:0.85rem; color:var(--muted); display:flex; align-items:center; font-family:var(--font-mono);'
        nullEl.textContent = '→ None'
        container.appendChild(nullEl)
      }
    })
  }

  function llHighlight(idx) {
    llValues.forEach((_, i) => {
      const box = document.getElementById('ll-node-' + i)
      if (!box) return
      if (i === idx) {
        box.style.borderColor = 'var(--green)'
        box.style.background = 'rgba(42,122,82,0.12)'
        box.style.transform = 'translateY(-3px)'
        box.style.boxShadow = '0 4px 12px rgba(42,122,82,0.18)'
      } else if (i < idx) {
        box.style.borderColor = 'var(--border)'
        box.style.background = 'var(--surface2)'
        box.style.transform = ''
        box.style.boxShadow = ''
      } else {
        box.style.borderColor = 'var(--blue)'
        box.style.background = 'rgba(43,92,230,0.07)'
        box.style.transform = ''
        box.style.boxShadow = ''
      }
    })
  }

  window.llStep = function() {
    if (llDone) return
    llIdx++
    if (llIdx >= llValues.length) {
      llHighlight(-1)
      document.getElementById('ll-output').textContent = 'cur is None — traversal complete. Visited all ' + llValues.length + ' nodes.'
      document.getElementById('ll-btn').textContent = 'Done ✓'
      llDone = true
      return
    }
    llHighlight(llIdx)
    const isFirst = llIdx === 0
    const nextVal = llIdx < llValues.length - 1 ? 'node(' + llValues[llIdx + 1] + ')' : 'None'
    const prefix = isFirst ? 'cur = head' : 'cur = cur.next'
    document.getElementById('ll-output').textContent =
      prefix + '  →  cur.val = ' + llValues[llIdx] + ',  cur.next = ' + nextVal
  }

  window.llReset = function() {
    llIdx = -1
    llDone = false
    llBuildNodes()
    document.getElementById('ll-output').textContent = 'Click "Next Node" to start traversal from head.'
    const btn = document.getElementById('ll-btn')
    if (btn) btn.textContent = 'Next Node →'
  }

  llBuildNodes()
}
