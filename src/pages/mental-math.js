export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#tricks">Fast Arithmetic Tricks</a>
  <a href="#fermi">Fermi Estimation</a>
  <a href="#reference">Quick Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Mental Math</em> &amp; Estimation</h1>
  <p class="subtitle">Chapter 5 · Speed and structure matter more than precision</p>

  <h2 id="tricks"><span class="emoji">⚡</span>Fast Arithmetic Tricks</h2>

  <p>Quant interviews often include timed mental math rounds — multiplying two-digit numbers, computing percentages, squaring numbers near a round base. None of this requires raw calculation speed; it requires knowing a handful of algebraic shortcuts.</p>

  <div class="callout tip">
    <div class="callout-title">Squaring numbers near a round base</div>
    To square a number close to a round base <code>b</code>, write it as <code>b ± d</code> and expand: <code>(b±d)² = b² ± 2bd + d²</code>. For <code>47²</code>: base 50, d = 3 → <code>50² − 2·50·3 + 3² = 2500 − 300 + 9 = 2209</code>.
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Rounding a Trade Estimate</div>
    A trader pricing a position in their head does the same thing you're doing with 47²: round to a convenient number, compute exactly, then apply a small correction. Nobody multiplies 47 × 47 digit-by-digit under time pressure — they multiply 50 × 50 and adjust. The skill transfers directly to estimating position sizes and P&amp;L on the fly.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">square_near_base</span>(n: <span class="fn">int</span>, base: <span class="fn">int</span>) -> <span class="fn">int</span>:
    d = n - base
    <span class="kw">return</span> base**<span class="num">2</span> + <span class="num">2</span>*base*d + d**<span class="num">2</span>

<span class="fn">print</span>(square_near_base(<span class="num">47</span>, <span class="num">50</span>))   <span class="cm"># 2209, matches 47*47</span>
<span class="fn">print</span>(square_near_base(<span class="num">103</span>, <span class="num">100</span>))  <span class="cm"># 10609, matches 103*103</span></code><span class="code-label">Python</span></pre>

  <p>Another workhorse: <strong>the difference of squares</strong> for multiplying two numbers equidistant from a midpoint. <code>a × b = m² − d²</code> where <code>m</code> is the midpoint and <code>d</code> is the distance from each to <code>m</code>. For <code>38 × 42</code>: midpoint 40, d = 2 → <code>1600 − 4 = 1596</code>.</p>

<pre><code><span class="fn">print</span>(<span class="num">38</span> * <span class="num">42</span>)               <span class="cm"># 1596</span>
<span class="fn">print</span>(<span class="num">40</span>**<span class="num">2</span> - <span class="num">2</span>**<span class="num">2</span>)          <span class="cm"># 1596 — same answer, no long multiplication needed</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Percentage chaining — compounding two percentages</h4>
    <div class="demo-controls">
      <button class="btn" onclick="mmStep(1)">Rate + 5%</button>
      <button class="btn" onclick="mmStep(-1)">Rate − 5%</button>
    </div>
    <div class="demo-output" id="mm-output">A stock up 20% then down 20% ends at 96% of original — not 100%. Multiply factors, never add percentages.</div>
  </div>

  <h2 id="fermi"><span class="emoji">🌍</span>Fermi Estimation</h2>

  <p>Fermi questions ask you to estimate a quantity with no way to look it up — "how many gas stations are in the US?" — using only reasonable assumptions and multiplication. The goal isn't precision, it's a defensible order of magnitude.</p>

  <div class="callout tip">
    <div class="callout-title">The decomposition strategy</div>
    Break the unknown quantity into a chain of numbers you <em>can</em> estimate confidently, multiply them together, and don't apologize for rounding. Interviewers care about the structure of the decomposition far more than whether your final digit is exactly right.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Decomposing "how many piano tuners in Chicago?"</div>
    <svg width="100%" height="130" viewBox="0 0 560 130">
      <g font-family="monospace" font-size="12" fill="#18192A">
        <rect x="10"  y="10" width="120" height="34" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6"/>
        <text x="70" y="31" text-anchor="middle">Population</text>
        <rect x="150" y="10" width="120" height="34" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6"/>
        <text x="210" y="31" text-anchor="middle">÷ people/piano</text>
        <rect x="290" y="10" width="120" height="34" rx="5" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6"/>
        <text x="350" y="31" text-anchor="middle">÷ tunings/yr</text>
        <rect x="430" y="10" width="120" height="34" rx="5" fill="rgba(232,68,42,0.10)" stroke="#E8442A"/>
        <text x="490" y="31" text-anchor="middle" font-weight="700">= # tuners</text>
      </g>
      <text x="70" y="66" fill="#8A8F9E" font-size="11" text-anchor="middle">2.7M</text>
      <text x="210" y="66" fill="#8A8F9E" font-size="11" text-anchor="middle">50 people/piano</text>
      <text x="350" y="66" fill="#8A8F9E" font-size="11" text-anchor="middle">1 tuning/yr,</text>
      <text x="350" y="80" fill="#8A8F9E" font-size="11" text-anchor="middle">200 tunings/tuner/yr</text>
      <text x="490" y="66" fill="#8A8F9E" font-size="11" text-anchor="middle">≈ 270 tuners</text>
    </svg>
  </div>

<pre><code>population = <span class="num">2_700_000</span>
people_per_piano = <span class="num">50</span>
pianos = population / people_per_piano             <span class="cm"># 54,000 pianos</span>

tunings_per_piano_per_year = <span class="num">1</span>
tunings_needed = pianos * tunings_per_piano_per_year  <span class="cm"># 54,000 tunings/year</span>

tunings_per_tuner_per_year = <span class="num">200</span>              <span class="cm"># ~4/week, working days</span>
tuners = tunings_needed / tunings_per_tuner_per_year

<span class="fn">print</span>(<span class="fn">round</span>(tuners))   <span class="cm"># ≈ 270 — the real number for Chicago is in the low hundreds</span></code><span class="code-label">Python</span></pre>

  <h2 id="reference"><span class="emoji">📐</span>Quick Reference</h2>

  <table>
    <thead>
      <tr><th>Trick</th><th>Formula</th><th>Example</th></tr>
    </thead>
    <tbody>
      <tr><td>Square near a base</td><td class="o-1">(b±d)² = b² ± 2bd + d²</td><td>47² = 2500−300+9 = 2209</td></tr>
      <tr><td>Product of near-equal numbers</td><td class="o-1">a·b = m² − d²</td><td>38×42 = 1600−4 = 1596</td></tr>
      <tr><td>Compounding percentages</td><td class="o-1">multiply factors, never add %</td><td>+20% then −20% = ×0.96, not ×1.00</td></tr>
      <tr><td>Percent of a percent</td><td class="o-1">x% of y% = (x·y)/100 %</td><td>20% of 15% = 3%</td></tr>
      <tr><td>Quick division by 7</td><td class="o-1">1/7 ≈ 0.142857 (repeats)</td><td>3/7 ≈ 0.4286</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Fast Square: 97²</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Compute 97² without long multiplication, in under 5 seconds.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use base 100, d = −3 (since 97 = 100 − 3): <code>100² − 2·100·3 + 3²</code>.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>base, d = <span class="num">100</span>, <span class="num">3</span>
result = base**<span class="num">2</span> - <span class="num">2</span>*base*d + d**<span class="num">2</span>
<span class="fn">print</span>(result)   <span class="cm"># 9409</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> 9409 — with base 100, the middle term <code>2·100·d</code> is just "d followed by two zeros," making this variant nearly instant mental arithmetic.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Chained Percentages</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A portfolio gains 30% in year one, then loses 25% in year two. What's the net percentage change over the two years?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Never add percentage changes. Multiply the growth factors: <code>1.30 × 0.75</code>.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>factor = <span class="num">1.30</span> * <span class="num">0.75</span>
<span class="fn">print</span>(<span class="fn">round</span>((factor - <span class="num">1</span>) * <span class="num">100</span>, <span class="num">2</span>))   <span class="cm"># -2.5</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> −2.5% net — a common trap is guessing "+5%" (30 − 25) which is wrong because percentage changes compound multiplicatively, not additively, especially with large swings.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Fermi: Windows in NYC</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Estimate the total number of windows in New York City. Show your decomposition.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Chain: (number of buildings) × (average floors per building) × (windows per floor). Estimate each factor independently — don't try to reason about "total windows" directly.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>buildings = <span class="num">1_000_000</span>          <span class="cm"># rough estimate across all boroughs, mostly residential</span>
avg_floors = <span class="num">3</span>                  <span class="cm"># skewed low by many small residential buildings</span>
windows_per_floor = <span class="num">6</span>

total_windows = buildings * avg_floors * windows_per_floor
<span class="fn">print</span>(<span class="fn">round</span>(total_windows / <span class="num">1_000_000</span>, <span class="num">1</span>), <span class="st">'million'</span>)   <span class="cm"># ≈ 18 million</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> order of magnitude ≈ 10-20 million — any answer in that range with a clearly stated, defensible decomposition is a strong interview response. The exact number matters far less than showing you can chain independent estimates.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Drill <strong>Fast Square</strong> and <strong>Chained Percentages</strong> until they're automatic — time yourself. Then practice a fresh Fermi question every day; the skill is decomposition speed, not any specific fact. Share your reasoning here before we unlock Chapter 6: Market Making.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/brainteasers" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Brainteasers</a>
    <a href="/quant/market-making" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Market Making →</a>
  </div>
</article>
`
}

export function init() {
  let up = 20

  function render() {
    const down = up
    const factor = (1 + up / 100) * (1 - down / 100)
    const pct = ((factor - 1) * 100).toFixed(1)
    const out = document.getElementById('mm-output')
    if (out) out.textContent = `A stock up ${up}% then down ${down}% ends at ${(factor * 100).toFixed(1)}% of original (net ${pct}%) — not 100%. Multiply factors, never add percentages.`
  }

  window.mmStep = function(delta) {
    const next = up + delta * 5
    if (next < 5 || next > 50) return
    up = next
    render()
  }

  render()
}
