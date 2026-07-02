export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#counting">Counting: Permutations vs Combinations</a>
  <a href="#conditional">Conditional Probability</a>
  <a href="#bayes">Bayes' Rule</a>
  <a href="#reference">Formula Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Probability</em> &amp; Combinatorics</h1>
  <p class="subtitle">Chapter 1 · The counting and conditioning toolkit every quant question leans on</p>

  <h2 id="counting"><span class="emoji">🔢</span>Counting: Permutations vs Combinations</h2>

  <p>Almost every quant probability question starts with a counting problem: <strong>how many ways can this happen?</strong> There are exactly two counting tools you need, and the entire skill is knowing which one applies.</p>

  <ul>
    <li><strong>Permutations</strong> — order matters. Arranging 3 books on a shelf: <code>ABC</code> and <code>BAC</code> are different outcomes.</li>
    <li><strong>Combinations</strong> — order doesn't matter. Picking 3 people for a committee: <code>{A,B,C}</code> and <code>{B,A,C}</code> are the same outcome.</li>
  </ul>

  <div class="callout tip">
    <div class="callout-title">The one question that decides which to use</div>
    Ask: <strong>if I relabeled the same selection in a different order, is that a new outcome?</strong> Yes → permutation. No → combination.
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Podium vs Team</div>
    A race podium (1st, 2nd, 3rd place) is a <strong>permutation</strong> — Alice-then-Bob is a different result from Bob-then-Alice. A 3-person relay <strong>team</strong> pulled from the same 5 racers is a <strong>combination</strong> — once the team is set, who you listed first on the roster doesn't change who's on the team.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Choosing 2 from {A, B, C} — combinations collapse permutations</div>
    <svg width="100%" height="150" viewBox="0 0 560 150">
      <text x="20" y="24" fill="#8A8F9E" font-size="11" font-weight="700">PERMUTATIONS (order matters) — 6 outcomes</text>
      <g font-size="14" font-weight="700" fill="#18192A">
        <rect x="20"  y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="48" y="54" text-anchor="middle">AB</text>
        <rect x="84"  y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="112" y="54" text-anchor="middle">BA</text>
        <rect x="148" y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="176" y="54" text-anchor="middle">AC</text>
        <rect x="212" y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="240" y="54" text-anchor="middle">CA</text>
        <rect x="276" y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="304" y="54" text-anchor="middle">BC</text>
        <rect x="340" y="34" width="56" height="30" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="1.5"/>
        <text x="368" y="54" text-anchor="middle">CB</text>
      </g>
      <text x="20" y="94" fill="#8A8F9E" font-size="11" font-weight="700">COMBINATIONS (order doesn't matter) — 3 outcomes</text>
      <g font-size="14" font-weight="700" fill="#18192A">
        <rect x="20"  y="104" width="80" height="30" rx="5" fill="rgba(232,68,42,0.10)" stroke="#E8442A" stroke-width="1.5"/>
        <text x="60" y="124" text-anchor="middle">{A,B}</text>
        <rect x="112" y="104" width="80" height="30" rx="5" fill="rgba(232,68,42,0.10)" stroke="#E8442A" stroke-width="1.5"/>
        <text x="152" y="124" text-anchor="middle">{A,C}</text>
        <rect x="204" y="104" width="80" height="30" rx="5" fill="rgba(232,68,42,0.10)" stroke="#E8442A" stroke-width="1.5"/>
        <text x="244" y="124" text-anchor="middle">{B,C}</text>
      </g>
      <line x1="48" y1="66" x2="60" y2="102" stroke="#8A8F9E" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="112" y1="66" x2="60" y2="102" stroke="#8A8F9E" stroke-width="1" stroke-dasharray="3,3"/>
    </svg>
  </div>

  <p>Each combination corresponds to exactly <code>2! = 2</code> permutations (AB and BA both collapse to {A,B}). In general, dividing permutations by the <code>k!</code> ways to reorder each group is exactly how the combination formula is derived.</p>

<pre><code><span class="kw">from</span> math <span class="kw">import</span> factorial, comb, perm

<span class="cm"># Permutations: order matters — P(n, k) = n! / (n-k)!</span>
<span class="fn">print</span>(perm(<span class="num">5</span>, <span class="num">3</span>))   <span class="cm"># 60 — ways to seat 3 of 5 people in a row</span>

<span class="cm"># Combinations: order doesn't matter — C(n, k) = n! / (k! * (n-k)!)</span>
<span class="fn">print</span>(comb(<span class="num">5</span>, <span class="num">3</span>))   <span class="cm"># 10 — ways to pick a 3-person team from 5</span>

<span class="cm"># Sanity check: permutations = combinations * k!</span>
<span class="fn">print</span>(comb(<span class="num">5</span>, <span class="num">3</span>) * factorial(<span class="num">3</span>))  <span class="cm"># 60 — matches perm(5, 3)</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Pick k from n — watch the count explode</h4>
    <div class="demo-controls">
      <button class="btn" onclick="probStep(1)" id="prob-n-up">n + 1</button>
      <button class="btn" onclick="probStep(-1)">n − 1</button>
      <button class="btn" onclick="probStepK(1)">k + 1</button>
      <button class="btn" onclick="probStepK(-1)">k − 1</button>
    </div>
    <div class="demo-output" id="prob-output">n = 5, k = 2 → P(5,2) = 20 permutations, C(5,2) = 10 combinations</div>
  </div>

  <h2 id="conditional"><span class="emoji">🎯</span>Conditional Probability</h2>

  <p>Conditional probability answers: <strong>given that I already know B happened, what's the chance A also happened?</strong> It's written <code>P(A | B)</code> and defined as:</p>

  <div class="diagram-wrap">
    <div class="diagram-title">P(A | B) = P(A ∩ B) / P(B)</div>
    <svg width="100%" height="130" viewBox="0 0 400 130">
      <circle cx="150" cy="65" r="55" fill="rgba(43,92,230,0.10)" stroke="#2B5CE6" stroke-width="1.8"/>
      <circle cx="210" cy="65" r="55" fill="rgba(232,68,42,0.10)" stroke="#E8442A" stroke-width="1.8"/>
      <text x="115" y="40" fill="#2B5CE6" font-size="13" font-weight="700">A</text>
      <text x="255" y="40" fill="#E8442A" font-size="13" font-weight="700">B</text>
      <text x="180" y="68" text-anchor="middle" fill="#18192A" font-size="12" font-weight="700">A ∩ B</text>
      <text x="180" y="110" text-anchor="middle" fill="#8A8F9E" font-size="11">shrink the universe to just B, then ask: how much of it is A?</text>
    </svg>
  </div>

  <p>The intuition: conditioning on B <strong>shrinks your sample space</strong> down to just the outcomes where B happened. Then you ask what fraction of that smaller space also satisfies A.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Filtering a Spreadsheet</div>
    <code>P(A | B)</code> is like filtering a spreadsheet of outcomes down to only the rows where B is true, then checking what fraction of the <em>remaining</em> rows also have A true. You never look at the rows you filtered out.
  </div>

  <p>Two events are <strong>independent</strong> exactly when knowing B tells you nothing about A — formally <code>P(A | B) = P(A)</code>, which is equivalent to <code>P(A ∩ B) = P(A) · P(B)</code>.</p>

<pre><code><span class="cm"># Classic example: draw 2 cards without replacement from a standard deck.</span>
<span class="cm"># A = second card is an Ace, B = first card is an Ace</span>

p_B = <span class="num">4</span> / <span class="num">52</span>                    <span class="cm"># P(first card is Ace)</span>
p_A_and_B = (<span class="num">4</span> / <span class="num">52</span>) * (<span class="num">3</span> / <span class="num">51</span>)   <span class="cm"># P(both are Aces)</span>
p_A_given_B = p_A_and_B / p_B

<span class="fn">print</span>(<span class="fn">round</span>(p_A_given_B, <span class="num">4</span>))    <span class="cm"># 0.0588 == 3/51, exactly what intuition says:</span>
                              <span class="cm"># if the first card WAS an Ace, 3 Aces remain in 51 cards</span></code><span class="code-label">Python</span></pre>

  <h2 id="bayes"><span class="emoji">🔄</span>Bayes' Rule</h2>

  <p>Bayes' rule flips a conditional probability around — it lets you go from <code>P(evidence | hypothesis)</code>, which is usually easy to reason about, to <code>P(hypothesis | evidence)</code>, which is usually what you actually want to know.</p>

<pre><code>P(H | E) = P(E | H) * P(H) / P(E)</code></pre>

  <div class="callout tip">
    <div class="callout-title">Why interviewers love Bayes' rule</div>
    It's the standard setup for "false positive" style questions: a test is 99% accurate, the disease is rare — what's the real chance you're sick given a positive result? The answer is almost always far lower than the "99%" makes it feel, because the <strong>base rate</strong> (how rare H is) dominates.
  </div>

<pre><code><span class="cm"># A disease affects 1 in 1000 people. A test is 99% accurate</span>
<span class="cm"># (99% true positive rate, 99% true negative rate). You test positive.</span>
<span class="cm"># What's P(have disease | positive test)?</span>

p_disease = <span class="num">1</span> / <span class="num">1000</span>
p_no_disease = <span class="num">1</span> - p_disease

p_pos_given_disease = <span class="num">0.99</span>
p_pos_given_healthy = <span class="num">0.01</span>          <span class="cm"># false positive rate</span>

p_pos = p_pos_given_disease * p_disease + p_pos_given_healthy * p_no_disease
p_disease_given_pos = (p_pos_given_disease * p_disease) / p_pos

<span class="fn">print</span>(<span class="fn">round</span>(p_disease_given_pos, <span class="num">4</span>))   <span class="cm"># ≈ 0.0902 — under 10%, not 99%!</span></code></pre>

  <p>This is why quant interviewers push on <strong>base rates</strong>: intuition anchors on the test's accuracy and ignores how rare the condition is to begin with.</p>

  <h2 id="reference"><span class="emoji">📐</span>Formula Reference</h2>

  <table>
    <thead>
      <tr><th>Concept</th><th>Formula</th><th>Use when</th></tr>
    </thead>
    <tbody>
      <tr><td>Permutations</td><td class="o-n">n! / (n−k)!</td><td>Order matters</td></tr>
      <tr><td>Combinations</td><td class="o-n">n! / (k!(n−k)!)</td><td>Order doesn't matter</td></tr>
      <tr><td>Complement</td><td class="o-1">P(Aᶜ) = 1 − P(A)</td><td>"At least one" problems — compute the opposite</td></tr>
      <tr><td>Union</td><td class="o-1">P(A∪B) = P(A)+P(B)−P(A∩B)</td><td>Avoid double-counting overlap</td></tr>
      <tr><td>Conditional</td><td class="o-1">P(A|B) = P(A∩B)/P(B)</td><td>You're told B already happened</td></tr>
      <tr><td>Independence</td><td class="o-1">P(A∩B) = P(A)·P(B)</td><td>Events don't affect each other</td></tr>
      <tr><td>Bayes' rule</td><td class="o-1">P(H|E) = P(E|H)P(H)/P(E)</td><td>Flipping a conditional, factoring in base rate</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These are the counting and conditioning questions that show up almost verbatim in quant trading interviews. Work through them on paper before checking the hint.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Birthday Paradox</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      In a room of 23 random people, what's the probability that at least two share a birthday? (Assume 365 equally likely birthdays, no leap years.)
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Don't compute "at least one match" directly — use the <strong>complement</strong>. Compute P(no two people share a birthday) as a product of shrinking fractions: <code>365/365 · 364/365 · 363/365 · ...</code> for 23 people, then subtract from 1. The answer is surprisingly over 50%.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Two Children Problem</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      A family has two children. You're told at least one is a girl. What's the probability both are girls?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">List the full sample space of equally likely outcomes first: <code>{BB, BG, GB, GG}</code>. "At least one is a girl" eliminates BB, leaving 3 equally likely outcomes: <code>{BG, GB, GG}</code>. Only one of those three is "both girls" — so the answer is 1/3, not 1/2. This is a direct application of conditional probability: shrink the sample space to match the given information, then count within it.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Monty Hall</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Three doors: a car behind one, goats behind the other two. You pick a door. The host, who knows what's behind each door, opens a different door revealing a goat. Should you switch to the remaining door?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Track probability mass, not doors. Your original pick has a 1/3 chance of being the car — that never changes just because a goat was revealed. The other two doors together held 2/3. The host's reveal doesn't remove any of that 2/3 probability, it just concentrates all of it onto the one remaining unopened door. Switching wins 2/3 of the time.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Committee Selection</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      From a group of 6 men and 4 women, a committee of 4 people is chosen at random. What's the probability the committee has exactly 2 men and 2 women?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">This is "favorable outcomes / total outcomes" using pure combinations. Total ways to choose any 4 from 10: <code>C(10,4)</code>. Favorable: choose 2 men from 6 <strong>and</strong> 2 women from 4 — multiply, don't add, because both choices happen together: <code>C(6,2) · C(4,2)</code>. Divide the two.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Talk through your reasoning <strong>out loud</strong> as if in an interview — quant interviewers grade the structure of your thinking as much as the final number. Start with Committee Selection and the Two Children Problem, then share your reasoning here before we unlock Chapter 2: Expected Value.
  </div>
</article>
`
}

export function init() {
  let n = 5
  let k = 2

  function factorial(x) {
    let r = 1
    for (let i = 2; i <= x; i++) r *= i
    return r
  }

  function render() {
    const perm = factorial(n) / factorial(n - k)
    const comb = perm / factorial(k)
    const out = document.getElementById('prob-output')
    if (out) out.textContent = `n = ${n}, k = ${k} → P(${n},${k}) = ${perm} permutations, C(${n},${k}) = ${comb} combinations`
  }

  window.probStep = function(delta) {
    const next = n + delta
    if (next < k || next > 10) return
    n = next
    render()
  }

  window.probStepK = function(delta) {
    const next = k + delta
    if (next < 0 || next > n) return
    k = next
    render()
  }

  render()
}
