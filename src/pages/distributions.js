export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#bernoulli">Bernoulli &amp; Binomial</a>
  <a href="#poisson">Poisson</a>
  <a href="#normal">Normal Distribution</a>
  <a href="#reference">Formula Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Distributions</em> You Must Know</h1>
  <p class="subtitle">Chapter 3 · Four distributions cover almost every quant interview question</p>

  <h2 id="bernoulli"><span class="emoji">🪙</span>Bernoulli &amp; Binomial</h2>

  <p>A <strong>Bernoulli</strong> random variable is the simplest possible: a single trial with two outcomes, success (1) with probability p, failure (0) with probability 1−p. A coin flip. A single trade winning or losing.</p>

  <p>A <strong>Binomial</strong> random variable counts the number of successes across <code>n</code> independent Bernoulli trials, each with the same probability p.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — One Flip vs a Season of Flips</div>
    Bernoulli is one coin flip. Binomial is "how many heads in 20 flips" — you're not tracking the sequence, just the total count. This is exactly how you'd model "how many of my next 20 trades are profitable" if each trade independently wins with probability p.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Binomial(n=10, p=0.5) — probability mass by number of successes</div>
    <svg width="100%" height="140" viewBox="0 0 560 140">
      <g fill="#2B5CE6">
        <rect x="30"  y="128" width="40" height="2"/>
        <rect x="75"  y="118" width="40" height="12"/>
        <rect x="120" y="90"  width="40" height="40"/>
        <rect x="165" y="50"  width="40" height="80"/>
        <rect x="210" y="24"  width="40" height="106"/>
        <rect x="255" y="14"  width="40" height="116"/>
        <rect x="300" y="24"  width="40" height="106"/>
        <rect x="345" y="50"  width="40" height="80"/>
        <rect x="390" y="90"  width="40" height="40"/>
        <rect x="435" y="118" width="40" height="12"/>
        <rect x="480" y="128" width="40" height="2"/>
      </g>
      <text x="275" y="10" text-anchor="middle" fill="#8A8F9E" font-size="10">peaks at n·p = 5 successes</text>
      <text x="275" y="134" text-anchor="middle" fill="#8A8F9E" font-size="9">0 through 10 successes →</text>
    </svg>
  </div>

<pre><code><span class="kw">from</span> math <span class="kw">import</span> comb

<span class="kw">def</span> <span class="fn">binomial_pmf</span>(n: <span class="fn">int</span>, k: <span class="fn">int</span>, p: <span class="fn">float</span>) -> <span class="fn">float</span>:
    <span class="kw">return</span> comb(n, k) * (p ** k) * ((<span class="num">1</span> - p) ** (n - k))

<span class="cm"># Probability of exactly 5 heads in 10 fair coin flips</span>
<span class="fn">print</span>(<span class="fn">round</span>(binomial_pmf(<span class="num">10</span>, <span class="num">5</span>, <span class="num">0.5</span>), <span class="num">4</span>))   <span class="cm"># 0.2461</span>

<span class="cm"># E[X] = n*p, Var(X) = n*p*(1-p)</span>
n, p = <span class="num">10</span>, <span class="num">0.5</span>
<span class="fn">print</span>(<span class="st">'mean:'</span>, n * p, <span class="st">'variance:'</span>, n * p * (<span class="num">1</span> - p))</code><span class="code-label">Python</span></pre>

  <h2 id="poisson"><span class="emoji">📞</span>Poisson</h2>

  <p>The Poisson distribution models the <strong>count of rare events</strong> over a fixed interval of time or space, when events happen independently at a constant average rate λ (lambda). Think: number of trades that hit a limit order in the next minute, number of customer arrivals per hour.</p>

  <div class="callout tip">
    <div class="callout-title">Poisson as a limit of Binomial</div>
    If you take a Binomial(n, p) and let n → ∞ while holding <code>n·p = λ</code> fixed (many trials, each individually rare), it converges to Poisson(λ). This is why Poisson is the natural model for "many opportunities, each individually unlikely, but a predictable rate overall."
  </div>

<pre><code><span class="kw">from</span> math <span class="kw">import</span> exp, factorial

<span class="kw">def</span> <span class="fn">poisson_pmf</span>(lam: <span class="fn">float</span>, k: <span class="fn">int</span>) -> <span class="fn">float</span>:
    <span class="kw">return</span> (lam ** k) * exp(-lam) / factorial(k)

<span class="cm"># Orders arrive at a rate of 3 per minute on average.</span>
<span class="cm"># Probability of exactly 5 orders in the next minute:</span>
<span class="fn">print</span>(<span class="fn">round</span>(poisson_pmf(<span class="num">3</span>, <span class="num">5</span>), <span class="num">4</span>))   <span class="cm"># 0.1008</span>

<span class="cm"># Key property: for Poisson, mean == variance == lambda</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Poisson PMF — watch the peak shift with λ</h4>
    <div class="demo-controls">
      <button class="btn" onclick="distStep(1)">λ + 1</button>
      <button class="btn" onclick="distStep(-1)">λ − 1</button>
    </div>
    <div class="demo-output" id="dist-output">λ = 3 → P(exactly 3 events) = 0.2240, mean = variance = 3</div>
  </div>

  <h2 id="normal"><span class="emoji">🔔</span>Normal Distribution</h2>

  <p>The Normal (Gaussian) distribution is the familiar bell curve, defined by its mean μ and standard deviation σ. It's the default model for <strong>continuous</strong> quantities that result from many small independent effects adding up — stock returns over short windows, measurement error, aggregated noise.</p>

  <div class="callout tip">
    <div class="callout-title">Why it shows up everywhere — the Central Limit Theorem</div>
    The sum (or average) of many independent random variables — <em>regardless of their individual distributions</em> — approaches a Normal distribution as the count grows. This is why Normal is the go-to default: almost anything that's an aggregate of many small independent factors ends up looking Normal.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Standard Normal — the 68/95/99.7 rule</div>
    <svg width="100%" height="150" viewBox="0 0 560 150">
      <path d="M 30 130 Q 150 130 200 40 Q 280 -10 360 40 Q 410 130 530 130" fill="none" stroke="#2B5CE6" stroke-width="2"/>
      <line x1="280" y1="10" x2="280" y2="130" stroke="#8A8F9E" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="280" y="145" text-anchor="middle" fill="#8A8F9E" font-size="10">μ</text>
      <rect x="220" y="10" width="120" height="120" fill="rgba(43,92,230,0.08)"/>
      <text x="280" y="65" text-anchor="middle" fill="#2B5CE6" font-size="10" font-weight="700">68% within ±1σ</text>
      <rect x="160" y="10" width="60" height="120" fill="rgba(232,68,42,0.06)"/>
      <rect x="340" y="10" width="60" height="120" fill="rgba(232,68,42,0.06)"/>
      <text x="130" y="20" text-anchor="middle" fill="#E8442A" font-size="9">95% within ±2σ</text>
    </svg>
  </div>

<pre><code><span class="kw">from</span> math <span class="kw">import</span> erf, sqrt

<span class="kw">def</span> <span class="fn">normal_cdf</span>(x: <span class="fn">float</span>, mu: <span class="fn">float</span> = <span class="num">0</span>, sigma: <span class="fn">float</span> = <span class="num">1</span>) -> <span class="fn">float</span>:
    z = (x - mu) / (sigma * sqrt(<span class="num">2</span>))
    <span class="kw">return</span> (<span class="num">1</span> + erf(z)) / <span class="num">2</span>

<span class="cm"># P(within 1 standard deviation of the mean)</span>
p_within_1sigma = normal_cdf(<span class="num">1</span>) - normal_cdf(-<span class="num">1</span>)
<span class="fn">print</span>(<span class="fn">round</span>(p_within_1sigma, <span class="num">4</span>))   <span class="cm"># 0.6827 — the "68" in 68/95/99.7</span></code><span class="code-label">Python</span></pre>

  <h2 id="reference"><span class="emoji">📐</span>Formula Reference</h2>

  <table>
    <thead>
      <tr><th>Distribution</th><th>Mean</th><th>Variance</th><th>Use when</th></tr>
    </thead>
    <tbody>
      <tr><td>Bernoulli(p)</td><td class="o-1">p</td><td class="o-1">p(1−p)</td><td>Single success/failure trial</td></tr>
      <tr><td>Binomial(n,p)</td><td class="o-1">np</td><td class="o-1">np(1−p)</td><td>Count of successes in n independent trials</td></tr>
      <tr><td>Poisson(λ)</td><td class="o-1">λ</td><td class="o-1">λ</td><td>Rare event counts over a fixed interval</td></tr>
      <tr><td>Normal(μ,σ)</td><td class="o-1">μ</td><td class="o-1">σ²</td><td>Aggregates of many independent small effects</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Win Streak Probability</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A trader wins each individual trade with probability 0.55, independent of other trades. What's the probability of exactly 7 wins out of the next 10 trades?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Direct application of the Binomial PMF: <code>C(10,7) · 0.55⁷ · 0.45³</code>.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code><span class="kw">from</span> math <span class="kw">import</span> comb

n, k, p = <span class="num">10</span>, <span class="num">7</span>, <span class="num">0.55</span>
prob = comb(n, k) * (p ** k) * ((<span class="num">1</span> - p) ** (n - k))
<span class="fn">print</span>(<span class="fn">round</span>(prob, <span class="num">4</span>))   <span class="cm"># 0.1665</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> ≈ 16.7% — note the trap: "exactly 7" is much less likely than it feels, because the Binomial spreads probability across all 11 possible outcomes (0 through 10 wins), not just the ones near the mean of 5.5.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Order Flow Poisson</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Orders hit your book at an average rate of 4 per second (Poisson). What's the probability that <strong>zero</strong> orders arrive in the next second, and the probability of at least 1?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">P(k=0) has a clean closed form for Poisson: just <code>e^(−λ)</code>, since the factorial and λ⁰ terms both vanish to 1. Use the complement for "at least 1."</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code><span class="kw">from</span> math <span class="kw">import</span> exp

lam = <span class="num">4</span>
p_zero = exp(-lam)
p_at_least_one = <span class="num">1</span> - p_zero

<span class="fn">print</span>(<span class="fn">round</span>(p_zero, <span class="num">4</span>))          <span class="cm"># 0.0183</span>
<span class="fn">print</span>(<span class="fn">round</span>(p_at_least_one, <span class="num">4</span>))  <span class="cm"># 0.9817</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> P(0 orders) ≈ 1.8%, P(at least 1) ≈ 98.2% — the "P(k=0) = e^(−λ)" shortcut is worth memorizing, it comes up constantly in "time until next event" framing (it's the same math as the exponential distribution).</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Z-Score Sanity Check</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A stock's daily return is approximately Normal with mean 0% and standard deviation 2%. Roughly what's the probability the return exceeds +4% on a given day?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">+4% is exactly 2 standard deviations above the mean. Use the 68/95/99.7 rule: 95% of mass lies within ±2σ, so 5% lies outside, split evenly across both tails by symmetry.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code><span class="kw">from</span> math <span class="kw">import</span> erf, sqrt

<span class="kw">def</span> <span class="fn">normal_cdf</span>(x, mu=<span class="num">0</span>, sigma=<span class="num">1</span>):
    z = (x - mu) / (sigma * sqrt(<span class="num">2</span>))
    <span class="kw">return</span> (<span class="num">1</span> + erf(z)) / <span class="num">2</span>

p_exceeds_4pct = <span class="num">1</span> - normal_cdf(<span class="num">4</span>, mu=<span class="num">0</span>, sigma=<span class="num">2</span>)
<span class="fn">print</span>(<span class="fn">round</span>(p_exceeds_4pct, <span class="num">4</span>))   <span class="cm"># 0.0228 — matches the "2.5% in one tail" rule of thumb</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> ≈ 2.3% — memorize this shortcut: since ~95% falls within ±2σ, ~5% falls outside, and by symmetry ~2.5% falls above +2σ specifically. Fast mental math beats reaching for a calculator in an interview.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Memorize the mean/variance table above cold — interviewers expect instant recall. Then work the <strong>Z-Score</strong> problem until the 68/95/99.7 rule is automatic. Share your reasoning here before we unlock Chapter 4: Brainteasers.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/expected-value" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Expected Value</a>
    <a href="/quant/brainteasers" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Brainteasers →</a>
  </div>
</article>
`
}

export function init() {
  let lambda = 3

  function poissonPmf(lam, k) {
    let factK = 1
    for (let i = 2; i <= k; i++) factK *= i
    return (lam ** k) * Math.exp(-lam) / factK
  }

  function render() {
    const p = poissonPmf(lambda, lambda)
    const out = document.getElementById('dist-output')
    if (out) out.textContent = `λ = ${lambda} → P(exactly ${lambda} events) = ${p.toFixed(4)}, mean = variance = ${lambda}`
  }

  window.distStep = function(delta) {
    const next = lambda + delta
    if (next < 1 || next > 10) return
    lambda = next
    render()
  }

  render()
}
