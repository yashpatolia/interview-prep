export function render() {
  return `
<nav>
  <a href="/">Home</a>
  <span class="sep">›</span>
  <span class="current">Stacks &amp; Queues</span>
</nav>

<div class="toc">
  <h4>On This Page</h4>
  <a href="#stack">The Stack (LIFO)</a>
  <a href="#queue">The Queue (FIFO)</a>
  <a href="#monotonic">Monotonic Stack</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Stacks</em> &amp; Queues</h1>
  <p class="subtitle">Chapter 5 · Last-in-first-out vs first-in-first-out</p>

  <h2 id="stack"><span class="emoji">📚</span>The Stack (LIFO)</h2>

  <p>A <strong>stack</strong> is a Last In, First Out structure. The most recently added item is always the first one you can remove. Think of it as a vertical pile — you can only touch the top.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Stack of Plates</div>
    You're washing dishes and stacking clean plates. You always add a new plate on <em>top</em>, and when someone needs a plate they take from the <em>top</em> too. The plate you put on last is the first one used. That's LIFO: Last In, First Out.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Stack — push adds to top, pop removes from top</div>
    <svg width="100%" height="160" viewBox="0 0 500 160">
      <defs>
        <marker id="sq-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
        <marker id="sq-arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#E8442A"/>
        </marker>
        <marker id="sq-arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#2A7A52"/>
        </marker>
      </defs>
      <!-- Stack frame -->
      <rect x="170" y="20" width="100" height="130" rx="6" fill="none" stroke="#D8D5D0" stroke-width="1.5" stroke-dasharray="4 3"/>
      <!-- Items in stack (bottom to top) -->
      <rect x="175" y="120" width="90" height="26" rx="4" fill="rgba(43,92,230,0.1)" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="220" y="137" text-anchor="middle" fill="#18192A" font-size="12" font-weight="700">10</text>
      <rect x="175" y="92" width="90" height="26" rx="4" fill="rgba(43,92,230,0.1)" stroke="#2B5CE6" stroke-width="1.5"/>
      <text x="220" y="109" text-anchor="middle" fill="#18192A" font-size="12" font-weight="700">20</text>
      <rect x="175" y="64" width="90" height="26" rx="4" fill="rgba(42,122,82,0.15)" stroke="#2A7A52" stroke-width="2"/>
      <text x="220" y="81" text-anchor="middle" fill="#18192A" font-size="12" font-weight="700">30</text>
      <text x="280" y="77" fill="#2A7A52" font-size="10" font-weight="600">← top</text>
      <!-- push arrow -->
      <line x1="100" y1="50" x2="168" y2="50" stroke="#2A7A52" stroke-width="1.5" marker-end="url(#sq-arr-green)"/>
      <text x="58" y="44" fill="#2A7A52" font-size="11" font-weight="600">push(30)</text>
      <text x="62" y="58" fill="#8A8F9E" font-size="9">O(1)</text>
      <!-- pop arrow -->
      <line x1="168" y1="77" x2="100" y2="77" stroke="#E8442A" stroke-width="1.5" marker-end="url(#sq-arr-red)"/>
      <text x="62" y="72" fill="#E8442A" font-size="11" font-weight="600">pop() → 30</text>
      <text x="62" y="85" fill="#8A8F9E" font-size="9">O(1)</text>
    </svg>
  </div>

<pre><code><span class="cm"># Python list used as a stack</span>
stack = []

<span class="cm"># Push — add to top (end of list)</span>
stack.append(<span class="num">10</span>)   <span class="cm"># stack: [10]</span>
stack.append(<span class="num">20</span>)   <span class="cm"># stack: [10, 20]</span>
stack.append(<span class="num">30</span>)   <span class="cm"># stack: [10, 20, 30]</span>

<span class="cm"># Peek — look at top without removing</span>
top = stack[-<span class="num">1</span>]    <span class="cm"># 30, O(1)</span>

<span class="cm"># Pop — remove from top</span>
val = stack.pop()   <span class="cm"># returns 30, stack: [10, 20]</span>

<span class="cm"># Check if empty</span>
<span class="kw">if not</span> stack:
    <span class="fn">print</span>(<span class="st">"empty!"</span>)

<span class="cm"># Common pattern: process until empty</span>
<span class="kw">while</span> stack:
    item = stack.pop()
    <span class="fn">print</span>(item)   <span class="cm"># prints 20, then 10</span></code><span class="code-label">Python</span></pre>

  <h2 id="queue"><span class="emoji">☕</span>The Queue (FIFO)</h2>

  <p>A <strong>queue</strong> is First In, First Out. Items are added to the back and removed from the front — just like a real queue at a shop. The first person to join is the first served.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Coffee Shop Line</div>
    You join the line at the back. The barista serves from the front. The person who arrived first gets their coffee first. No cutting in line — that's FIFO: First In, First Out.
  </div>

  <div class="callout warn">
    <div class="callout-title">Never use list.pop(0) for a queue</div>
    <code>list.pop(0)</code> is <strong>O(n)</strong> because it shifts every remaining element left. Use <code>collections.deque</code> instead — its <code>popleft()</code> is <strong>O(1)</strong> because a deque is a doubly-linked list under the hood.
  </div>

<pre><code><span class="kw">from</span> collections <span class="kw">import</span> deque

q = <span class="fn">deque</span>()

<span class="cm"># Enqueue — add to back</span>
q.append(<span class="st">"Alice"</span>)   <span class="cm"># q: ['Alice']</span>
q.append(<span class="st">"Bob"</span>)     <span class="cm"># q: ['Alice', 'Bob']</span>
q.append(<span class="st">"Carol"</span>)   <span class="cm"># q: ['Alice', 'Bob', 'Carol']</span>

<span class="cm"># Peek front</span>
front = q[<span class="num">0</span>]   <span class="cm"># 'Alice', O(1)</span>

<span class="cm"># Dequeue — remove from front — O(1)!</span>
served = q.popleft()   <span class="cm"># 'Alice'</span>
<span class="cm"># q: ['Bob', 'Carol']</span>

<span class="cm"># Check empty</span>
<span class="kw">while</span> q:
    next_up = q.popleft()
    <span class="fn">print</span>(next_up)   <span class="cm"># Bob, then Carol</span></code><span class="code-label">Python</span></pre>

  <h2 id="monotonic"><span class="emoji">📈</span>The Monotonic Stack</h2>

  <p>A <strong>monotonic stack</strong> is a regular stack with one extra rule: its elements are always in monotonically increasing <em>or</em> decreasing order. Before pushing a new element, you pop any elements that would break the order. This lets you efficiently find the <strong>next greater</strong> or <strong>next smaller</strong> element for every position in O(n) total — instead of O(n²) brute force.</p>

  <h3>Example — Daily Temperatures (#739)</h3>
  <p>Given a list of daily temperatures, find how many days you must wait until a warmer day. E.g. <code>[73,74,75,71,69,72,76,73]</code> → <code>[1,1,4,2,1,1,0,0]</code>.</p>

<pre><code><span class="kw">def</span> <span class="fn">daily_temperatures</span>(temps):
    result = [<span class="num">0</span>] * <span class="fn">len</span>(temps)
    stack  = []   <span class="cm"># monotonic decreasing stack of INDICES</span>

    <span class="kw">for</span> i, temp <span class="kw">in</span> <span class="fn">enumerate</span>(temps):
        <span class="cm"># Pop indices whose temperature is less than current</span>
        <span class="kw">while</span> stack <span class="kw">and</span> temps[stack[-<span class="num">1</span>]] &lt; temp:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx   <span class="cm"># days waited</span>
        stack.append(i)

    <span class="kw">return</span> result   <span class="cm"># remaining stack indices get 0 (default)</span>

<span class="cm"># Walk-through on [73, 74, 75, 71]:</span>
<span class="cm">#  i=0 temp=73: stack=[]       → push 0.  stack=[0]</span>
<span class="cm">#  i=1 temp=74: 73&lt;74 pop 0   → result[0]=1. push 1. stack=[1]</span>
<span class="cm">#  i=2 temp=75: 74&lt;75 pop 1   → result[1]=1. push 2. stack=[2]</span>
<span class="cm">#  i=3 temp=71: 75&gt;71, no pop → push 3. stack=[2,3]</span>
<span class="cm">#  End: indices 2,3 remain → result stays 0</span>
<span class="cm">#  result = [1, 1, 0, 0] ✓</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">The Monotonic Stack Pattern</div>
    Any time a problem asks "for each element, find the nearest element to the right that is greater/smaller" — reach for a monotonic stack. The key insight: when you pop element <code>x</code> because the current element is larger, you have just found the <em>next greater element</em> for <code>x</code>.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity</h2>

  <table>
    <thead>
      <tr><th>Operation</th><th>Stack (list)</th><th>Queue (deque)</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Push / Enqueue</td><td class="o-1">O(1)*</td><td class="o-1">O(1)</td><td>*Amortized for list</td></tr>
      <tr><td>Pop (from top/front)</td><td class="o-1">O(1)</td><td class="o-1">O(1)</td><td>deque.popleft() is O(1); list.pop(0) is O(n)</td></tr>
      <tr><td>Peek (top/front)</td><td class="o-1">O(1)</td><td class="o-1">O(1)</td><td><code>stack[-1]</code> or <code>q[0]</code></td></tr>
      <tr><td>Search</td><td class="o-n">O(n)</td><td class="o-n">O(n)</td><td>Must scan entire structure</td></tr>
      <tr><td>Size check</td><td class="o-1">O(1)</td><td class="o-1">O(1)</td><td><code>len()</code> is O(1) for both</td></tr>
    </tbody>
  </table>

  <div class="callout">
    <div class="callout-title">deque vs list for queues</div>
    <code>collections.deque</code> is optimised for O(1) appends and pops from <em>both ends</em>. A plain <code>list</code> is only O(1) at the right end. For a stack, either works. For a queue, always use <code>deque</code>.
  </div>

  <h3>Interactive Demo — Valid Parentheses Stack Trace</h3>
  <div class="demo-box">
    <h4>Process "({[]})" character by character</h4>
    <div class="demo-controls">
      <button class="btn" onclick="vpStep()" id="vp-btn">Next Char →</button>
      <button class="btn" onclick="vpReset()">Reset</button>
    </div>
    <div style="display:flex; gap:1rem; margin:1rem 0; flex-wrap:wrap;">
      <div style="flex:1; min-width:160px;">
        <div style="font-family:var(--font-display); font-size:0.65rem; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted); margin-bottom:0.5rem; font-weight:600;">Input String</div>
        <div id="vp-chars" style="display:flex; gap:4px;"></div>
      </div>
      <div style="flex:1; min-width:160px;">
        <div style="font-family:var(--font-display); font-size:0.65rem; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted); margin-bottom:0.5rem; font-weight:600;">Stack (top →)</div>
        <div id="vp-stack" style="font-family:var(--font-mono); font-size:1rem; min-height:2rem; color:var(--blue);">[ ]</div>
      </div>
    </div>
    <div class="demo-output" id="vp-output">Click "Next Char" to process the string one character at a time.</div>
  </div>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#20 · Valid Parentheses</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Given a string containing only <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code>, <code>']'</code>, determine if the input string is valid (brackets closed in correct order).
      <br><br>
      <strong>Example:</strong> <code>"()[]{}"</code> → <code>True</code>, <code>"(]"</code> → <code>False</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Push every opening bracket onto the stack. For every closing bracket, check if the top of the stack is the matching opener — use a dict <code>{')':'(', '}':'{', ']':'['}</code>. If the stack is empty at the end, valid.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/valid-parentheses/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#155 · Min Stack</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time.
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use <strong>two stacks</strong>: a normal one and a parallel "min stack." Each time you push a value, also push <code>min(val, min_stack[-1])</code> onto the min stack. When you pop, pop both. <code>getMin()</code> is just <code>min_stack[-1]</code>.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/min-stack/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#739 · Daily Temperatures</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an array of temperatures, return an array where <code>result[i]</code> is the number of days you must wait after day <code>i</code> for a warmer temperature. If no warmer day exists, <code>result[i] = 0</code>.
      <br><br>
      <strong>Example:</strong> <code>[73,74,75,71,69,72,76,73]</code> → <code>[1,1,4,2,1,1,0,0]</code>
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use a monotonic decreasing stack of <em>indices</em>. For each temperature, pop indices where the stored temperature is lower than the current — the wait time is <code>i - popped_index</code>.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/daily-temperatures/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#84 · Largest Rectangle in Histogram</span>
      <span class="difficulty diff-hard">Hard</span>
    </div>
    <div class="problem-desc">
      Given an array of bar heights in a histogram, find the area of the largest rectangle that can be formed.
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use a monotonic <em>increasing</em> stack of indices. When you encounter a bar shorter than the stack's top, start popping — each popped bar can extend leftward to where it was pushed and rightward to the current index. Track the max area. Don't forget to drain the stack at the end using a sentinel height of 0.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#20 Valid Parentheses</strong> — it's the perfect intro to how a stack "remembers" context. Then try <strong>#155 Min Stack</strong> to get comfortable with the two-stack trick. Save <strong>#84</strong> for after you're comfortable with #739.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/linked-lists" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Linked Lists</a>
    <a href="/binary-search" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Binary Search →</a>
  </div>
</article>
`
}

export function init() {
  const vpInput = ['(', '{', '[', ']', '}', ')']
  const matching = { ')': '(', '}': '{', ']': '[' }
  const openers = new Set(['(', '{', '['])
  let vpIdx = 0
  let vpStack = []
  let vpDone = false

  function vpBuildChars() {
    const container = document.getElementById('vp-chars')
    if (!container) return
    container.innerHTML = ''
    vpInput.forEach((ch, i) => {
      const cell = document.createElement('div')
      cell.id = 'vp-ch-' + i
      cell.style.cssText = [
        'width:36px', 'height:36px', 'border-radius:6px',
        'display:flex', 'align-items:center', 'justify-content:center',
        'font-family:var(--font-mono)', 'font-size:1rem', 'font-weight:700',
        'border:1.5px solid var(--border)', 'background:var(--surface2)',
        'color:var(--muted)', 'transition:all 0.2s ease'
      ].join(';')
      cell.textContent = ch
      container.appendChild(cell)
    })
  }

  function vpRenderStack() {
    const el = document.getElementById('vp-stack')
    if (!el) return
    if (vpStack.length === 0) {
      el.textContent = '[ ]'
      el.style.color = 'var(--muted)'
    } else {
      el.textContent = '[ ' + vpStack.join(', ') + ' ]'
      el.style.color = 'var(--blue)'
    }
  }

  function vpHighlight(idx, status) {
    // status: 'current' | 'ok' | 'bad'
    for (let i = 0; i < vpInput.length; i++) {
      const cell = document.getElementById('vp-ch-' + i)
      if (!cell) continue
      if (i === idx) {
        if (status === 'bad') {
          cell.style.background = 'rgba(232,68,42,0.12)'
          cell.style.borderColor = 'var(--accent)'
          cell.style.color = 'var(--accent)'
        } else if (status === 'ok') {
          cell.style.background = 'rgba(42,122,82,0.12)'
          cell.style.borderColor = 'var(--green)'
          cell.style.color = 'var(--green)'
        } else {
          cell.style.background = 'rgba(43,92,230,0.12)'
          cell.style.borderColor = 'var(--blue)'
          cell.style.color = 'var(--blue)'
        }
      } else if (i < idx) {
        cell.style.background = 'var(--surface2)'
        cell.style.borderColor = 'var(--border)'
        cell.style.color = 'var(--muted)'
        cell.style.opacity = '0.5'
      } else {
        cell.style.background = 'var(--surface2)'
        cell.style.borderColor = 'var(--border)'
        cell.style.color = 'var(--ink)'
        cell.style.opacity = '1'
      }
    }
  }

  window.vpStep = function() {
    if (vpDone) return
    const out = document.getElementById('vp-output')

    if (vpIdx >= vpInput.length) {
      // Done — check stack empty
      vpDone = true
      const btn = document.getElementById('vp-btn')
      if (btn) btn.textContent = 'Done ✓'
      if (vpStack.length === 0) {
        if (out) out.textContent = 'Stack is empty — all brackets matched! Return True.'
        if (out) out.style.color = 'var(--green)'
      } else {
        if (out) out.textContent = 'Stack still has ' + vpStack.join(', ') + ' — unmatched openers! Return False.'
        if (out) out.style.color = 'var(--accent)'
      }
      return
    }

    const ch = vpInput[vpIdx]

    if (openers.has(ch)) {
      vpHighlight(vpIdx, 'current')
      vpStack.push(ch)
      vpRenderStack()
      if (out) {
        out.style.color = 'var(--green)'
        out.textContent = "Processing '" + ch + "' — opening bracket. Push to stack. Stack: [" + vpStack.join(', ') + ']'
      }
    } else {
      // closing bracket
      const expected = matching[ch]
      const top = vpStack.length > 0 ? vpStack[vpStack.length - 1] : null
      if (top === expected) {
        vpHighlight(vpIdx, 'ok')
        vpStack.pop()
        vpRenderStack()
        if (out) {
          out.style.color = 'var(--green)'
          out.textContent = "Processing '" + ch + "' — matches '" + top + "' on top. Pop. Stack: [" + vpStack.join(', ') + ']'
        }
      } else {
        vpHighlight(vpIdx, 'bad')
        if (out) {
          out.style.color = 'var(--accent)'
          out.textContent = "Processing '" + ch + "' — expected '" + expected + "' on top but got '" + (top ?? 'nothing') + "'. Mismatch! Return False."
        }
        vpDone = true
        const btn = document.getElementById('vp-btn')
        if (btn) btn.textContent = 'Done ✓'
        return
      }
    }

    vpIdx++
  }

  window.vpReset = function() {
    vpIdx = 0
    vpStack = []
    vpDone = false
    vpBuildChars()
    vpRenderStack()
    const out = document.getElementById('vp-output')
    if (out) {
      out.textContent = 'Click "Next Char" to process the string one character at a time.'
      out.style.color = 'var(--green)'
    }
    const btn = document.getElementById('vp-btn')
    if (btn) btn.textContent = 'Next Char →'
  }

  vpBuildChars()
  vpRenderStack()
}
