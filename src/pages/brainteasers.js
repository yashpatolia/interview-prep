export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#structure">How to Structure an Answer</a>
  <a href="#locker">The Locker Problem</a>
  <a href="#eggdrop">Egg Drop</a>
  <a href="#reference">Puzzle Type Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Brainteasers</em> &amp; Logic Puzzles</h1>
  <p class="subtitle">Chapter 4 · Interviewers grade how you think, not just the final number</p>

  <h2 id="structure"><span class="emoji">🧩</span>How to Structure an Answer</h2>

  <p>Brainteasers don't test whether you know a formula — they test whether you can <strong>reason out loud under pressure</strong>. A correct final answer delivered silently scores worse than a wrong answer arrived at through visibly sound reasoning.</p>

  <div class="callout tip">
    <div class="callout-title">The four-step template</div>
    <strong>1. Clarify.</strong> Restate the problem and ask about any ambiguous constraints. <strong>2. Simplify.</strong> Solve a smaller version first (2 doors instead of 100, 2 balls instead of 12). <strong>3. Find the pattern.</strong> Generalize from the small case. <strong>4. Sanity check.</strong> Plug your answer back into the original problem and verify it's not absurd (e.g., "12 weighings" for a 12-item problem is a red flag).
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Debugging Out Loud</div>
    A brainteaser interview is like pair-debugging with a senior engineer watching. They don't just want the bug fixed — they want to see you form a hypothesis, test it on a small case, and narrow down systematically. Guessing the right answer without showing that process reads the same as guessing wrong.
  </div>

  <h2 id="locker"><span class="emoji">🔐</span>The Locker Problem</h2>

  <p><strong>Setup:</strong> 100 lockers, all closed. Person 1 opens every locker. Person 2 toggles every 2nd locker (closes it, since it's open). Person 3 toggles every 3rd locker. This continues through person 100. Which lockers end up open?</p>

  <p>Simplify first: locker <code>n</code> gets toggled once for every divisor of <code>n</code> (person <code>d</code> toggles locker <code>n</code> exactly when <code>d</code> divides <code>n</code>). A locker ends up <strong>open</strong> if it's toggled an <strong>odd</strong> number of times — meaning <code>n</code> has an odd number of divisors.</p>

  <div class="callout analogy">
    <div class="callout-title">The key insight — divisors usually pair up</div>
    Divisors of n normally come in pairs: if <code>d</code> divides <code>n</code>, so does <code>n/d</code>. That pairing is why most numbers have an <em>even</em> divisor count. The pairing breaks only when <code>d = n/d</code>, i.e. when <code>n</code> is a <strong>perfect square</strong> — that divisor doesn't have a distinct partner, leaving an odd total.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Locker 36 (a perfect square) has an odd number of divisors</div>
    <svg width="100%" height="90" viewBox="0 0 560 90">
      <g font-family="monospace" font-size="13" fill="#18192A">
        <text x="30"  y="30">1</text><text x="30"  y="55" fill="#8A8F9E" font-size="10">×36</text>
        <text x="90"  y="30">2</text><text x="90"  y="55" fill="#8A8F9E" font-size="10">×18</text>
        <text x="150" y="30">3</text><text x="150" y="55" fill="#8A8F9E" font-size="10">×12</text>
        <text x="210" y="30">4</text><text x="210" y="55" fill="#8A8F9E" font-size="10">×9</text>
        <text x="270" y="30">6</text><text x="270" y="55" fill="#E8442A" font-size="10" font-weight="700">×6 ← unpaired!</text>
      </g>
      <text x="30" y="80" fill="#8A8F9E" font-size="11">Divisors of 36: {1,2,3,4,6,9,12,18,36} — 9 total, an odd count</text>
    </svg>
  </div>

<pre><code><span class="kw">def</span> <span class="fn">open_lockers</span>(n: <span class="fn">int</span>) -> <span class="fn">list</span>:
    <span class="kw">return</span> [i * i <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="fn">int</span>(n ** <span class="num">0.5</span>) + <span class="num">1</span>) <span class="kw">if</span> i * i &lt;= n]

<span class="fn">print</span>(open_lockers(<span class="num">100</span>))
<span class="cm"># [1, 4, 9, 16, 25, 36, 49, 64, 81, 100] — exactly the perfect squares</span></code><span class="code-label">Python</span></pre>

  <h2 id="eggdrop"><span class="emoji">🥚</span>Egg Drop</h2>

  <p><strong>Setup:</strong> You have 2 identical eggs and a 100-floor building. An egg breaks if dropped from the "critical floor" or above, and survives below it. Find the critical floor while minimizing the <strong>worst-case</strong> number of drops. An egg that breaks can't be reused.</p>

  <div class="callout tip">
    <div class="callout-title">Why you can't just binary search</div>
    Binary search assumes you can always retry after a failed comparison. Here, breaking your first egg costs you a resource — you're down to 1 egg (linear search only) for the remaining range. The strategy has to <strong>shrink the jump size after every break</strong> to keep the worst case bounded.
  </div>

  <p>Optimal strategy: drop from floor 14, then 27, then 39, then 50... — decreasing the gap by 1 each time. If it breaks, switch to checking floors one-by-one from the last safe floor. This balances "worst case = broke early" against "worst case = never broke."</p>

<pre><code><span class="cm"># Find the minimum k such that 1+2+...+k >= n (triangular number search)</span>
<span class="kw">def</span> <span class="fn">min_drops</span>(n_floors: <span class="fn">int</span>) -> <span class="fn">int</span>:
    k, total = <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> total &lt; n_floors:
        k += <span class="num">1</span>
        total += k
    <span class="kw">return</span> k

<span class="fn">print</span>(min_drops(<span class="num">100</span>))   <span class="cm"># 14 — worst case is 14 drops, first attempt at floor 14</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Minimum worst-case drops scales with √(2n)</h4>
    <div class="demo-controls">
      <button class="btn" onclick="btStep(1)">Floors + 50</button>
      <button class="btn" onclick="btStep(-1)">Floors − 50</button>
    </div>
    <div class="demo-output" id="bt-output">100 floors, 2 eggs → 14 drops worst case (first drop at floor 14, then 27, 39...)</div>
  </div>

  <h2 id="reference"><span class="emoji">📋</span>Puzzle Type Reference</h2>

  <table>
    <thead>
      <tr><th>Puzzle family</th><th>Core trick</th><th>Example</th></tr>
    </thead>
    <tbody>
      <tr><td>Counting/toggling</td><td class="o-1">Find the invariant (parity, divisor count)</td><td>Locker problem</td></tr>
      <tr><td>Constrained search</td><td class="o-1">Balance worst-case branches</td><td>Egg drop, weighing puzzles</td></tr>
      <tr><td>Information/signaling</td><td class="o-1">What can one bit of info encode?</td><td>100 prisoners &amp; a lightbulb</td></tr>
      <tr><td>Strategy/game</td><td class="o-1">Work backward from the end state</td><td>Nim-style games, last-one-loses</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">12 Balls, One Odd Weight</span>
      <span class="difficulty diff-hard">Hard</span>
    </div>
    <div class="problem-desc">
      You have 12 balls, identical in appearance. One is a different weight (could be heavier or lighter — you don't know which). Using a balance scale only <strong>3 times</strong>, find the odd ball <em>and</em> determine if it's heavier or lighter.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Each weighing has 3 outcomes (left heavy, balanced, right heavy), so 3 weighings distinguish at most <code>3³ = 27</code> possibilities. You need to distinguish 24 possibilities (12 balls × 2 directions), so 3 weighings is just barely enough — there's no slack, meaning the split of balls on each weighing must be exact. Split into groups of 4: weigh 4 vs 4 first.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Label balls 1-12. <strong>Weighing 1:</strong> {1,2,3,4} vs {5,6,7,8}.</p>
        <p><strong>Case A — balanced:</strong> the odd ball is among {9,10,11,12}, and 1-8 are all normal. <strong>Weighing 2:</strong> {9,10,11} vs {1,2,3} (known-normal). If balanced, ball 12 is odd — weigh it against any known-normal ball to find heavier/lighter. If unbalanced, the odd ball is in {9,10,11} and you know the direction; <strong>weighing 3</strong> compares two of those three balls to isolate it.</p>
        <p><strong>Case B — unbalanced</strong> (say left heavy): the odd ball is in {1,2,3,4} (possibly heavy) or {5,6,7,8} (possibly light) — 8 candidates, 2 directions won't fit in one weighing, so <strong>weighing 2</strong> mixes groups to split the remaining possibilities roughly evenly, e.g. {1,2,5} vs {3,4,6} using known-normal balls 9-12 as filler. The result narrows to 2-3 candidates, and weighing 3 isolates the answer.</p>
<pre><code><span class="cm"># The full case-tree is intricate to hand-code, but the key numeric</span>
<span class="cm"># check every quant interviewer wants to hear:</span>
outcomes_needed = <span class="num">12</span> * <span class="num">2</span>       <span class="cm"># 24 (which ball, which direction)</span>
outcomes_available = <span class="num">3</span> ** <span class="num">3</span>  <span class="cm"># 27 (3 outcomes per weighing, 3 weighings)</span>
<span class="fn">print</span>(outcomes_needed, <span class="st">"<="</span>, outcomes_available)  <span class="cm"># 24 <= 27 — just barely feasible</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> it's solvable in exactly 3 weighings using the balanced-split strategy above. The information-theoretic bound (log₃ of the number of possibilities) is the tool for instantly checking whether a weighing puzzle is even feasible before trying to construct the strategy.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">100 Prisoners &amp; a Lightbulb</span>
      <span class="difficulty diff-hard">Hard</span>
    </div>
    <div class="problem-desc">
      100 prisoners are told: one at a time, in random order and unknown to each other, each will be brought alone into a room with a lightbulb (initially off) and a switch. They can toggle the switch or leave it. At any point, any prisoner may declare "we've all visited the room at least once" — if correct, everyone goes free; if wrong, everyone stays forever. They can agree on a strategy beforehand but can't communicate afterward. Design a strategy that guarantees eventual freedom.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Designate one prisoner as the "counter." Every other prisoner turns the light <strong>on</strong> the first time they see it off (and never touches it again after that). The counter turns the light <strong>off</strong> each time they see it on, incrementing a personal count.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Pick one prisoner as the Counter. Every other prisoner's rule: the <em>first</em> time they enter and find the light off, they turn it on — and they never touch the switch again on any future visit. The Counter's rule: every time they enter and find the light on, they turn it off and increment their count; when their count reaches 99, they declare victory (they themselves are the 100th).</p>
        <p>This works because each of the 99 non-counters contributes exactly one "on" signal over the entire process, and only the Counter consumes those signals — so the Counter's tally exactly tracks how many distinct other prisoners have visited.</p>
<pre><code><span class="cm"># Expected number of room-visits until completion is O(n^2 log n) for n=100 prisoners,</span>
<span class="cm"># dominated by waiting for each of the 99 "first visits" to happen randomly:</span>
<span class="kw">import</span> random

<span class="kw">def</span> <span class="fn">simulate</span>(n: <span class="fn">int</span> = <span class="num">100</span>) -> <span class="fn">int</span>:
    has_toggled = [<span class="kw">False</span>] * n      <span class="cm"># has this non-counter turned the light on yet?</span>
    light_on, count, visits = <span class="kw">False</span>, <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> count &lt; n - <span class="num">1</span>:
        visits += <span class="num">1</span>
        p = random.randint(<span class="num">0</span>, n - <span class="num">1</span>)
        <span class="kw">if</span> p == <span class="num">0</span>:                       <span class="cm"># prisoner 0 is the Counter</span>
            <span class="kw">if</span> light_on:
                light_on, count = <span class="kw">False</span>, count + <span class="num">1</span>
        <span class="kw">elif</span> <span class="kw">not</span> light_on <span class="kw">and</span> <span class="kw">not</span> has_toggled[p]:
            light_on, has_toggled[p] = <span class="kw">True</span>, <span class="kw">True</span>
    <span class="kw">return</span> visits

<span class="fn">print</span>(simulate())   <span class="cm"># tens of thousands of visits, but it terminates with certainty</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> the counter strategy guarantees termination with probability 1 — the expected time is long (thousands of room visits), but the puzzle only asks for a strategy that <em>eventually</em> succeeds with certainty, not a fast one.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Egg Drop, General Case</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      With 2 eggs and an unknown number of floors, you want a strategy guaranteeing at most 14 drops in the worst case. What's the maximum number of floors this covers?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">With k allowed drops, the decreasing-gap strategy covers <code>k + (k−1) + ... + 1 = k(k+1)/2</code> floors. Plug in k = 14.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>k = <span class="num">14</span>
max_floors = k * (k + <span class="num">1</span>) // <span class="num">2</span>
<span class="fn">print</span>(max_floors)   <span class="cm"># 105</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> 105 floors — this is why 14 drops suffice for the 100-floor version with 2 eggs (105 ≥ 100), and it's the same triangular-number identity used to derive the minimum drops formula in the lesson above.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>Egg Drop, General Case</strong> — it's a direct formula check. Then attempt <strong>12 Balls</strong> fully on paper before reading the solution; it's the single most common "hard" brainteaser in quant interviews. Share your reasoning here before we unlock Chapter 5: Mental Math.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/distributions" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Distributions</a>
    <a href="/quant/mental-math" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Mental Math →</a>
  </div>
</article>
`
}

export function init() {
  let floors = 100

  function minDrops(n) {
    let k = 0, total = 0
    while (total < n) { k++; total += k }
    return k
  }

  function render() {
    const drops = minDrops(floors)
    const out = document.getElementById('bt-output')
    if (out) out.textContent = `${floors} floors, 2 eggs → ${drops} drops worst case (first drop at floor ${drops}, then ${drops + (drops - 1)}, ${drops + (drops - 1) + (drops - 2)}...)`
  }

  window.btStep = function(delta) {
    const next = floors + delta * 50
    if (next < 50 || next > 500) return
    floors = next
    render()
  }

  render()
}
