export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What Is Expected Value?</a>
  <a href="#linearity">Linearity of Expectation</a>
  <a href="#decisions">EV-Maximizing Decisions</a>
  <a href="#reference">Formula Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Expected</em> Value</h1>
  <p class="subtitle">Chapter 2 · The single number that should drive every betting decision</p>

  <h2 id="what"><span class="emoji">⚖️</span>What Is Expected Value?</h2>

  <p>Expected value (EV) is the <strong>average outcome</strong> of a random process if you repeated it infinitely many times. Formally, for a random variable X with possible outcomes <code>x₁, x₂, ..., xₙ</code> and probabilities <code>p₁, p₂, ..., pₙ</code>:</p>

<pre><code>E[X] = x₁p₁ + x₂p₂ + ... + xₙpₙ</code></pre>

  <p>EV is not a prediction of any single outcome — it's the long-run average. A fair coin flip paying $10 for heads and $0 for tails has EV = $5, even though you'll never actually win exactly $5 on any single flip.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — The Casino's Real Business</div>
    A casino doesn't care what happens on any one spin of roulette. It cares about the <strong>average</strong> across millions of spins. If a game has a small negative EV for the player (say −$0.05 per dollar bet), the casino is guaranteed to profit over time no matter how "lucky" any individual gambler gets. Quant trading firms think the same way: no single trade needs to win, but the average across thousands of trades must be positive.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">expected_value</span>(outcomes: <span class="fn">list</span>, probabilities: <span class="fn">list</span>) -> <span class="fn">float</span>:
    <span class="kw">return</span> <span class="fn">sum</span>(x * p <span class="kw">for</span> x, p <span class="kw">in</span> <span class="fn">zip</span>(outcomes, probabilities))

<span class="cm"># A fair die roll, payouts equal to the face value</span>
faces = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>]
probs = [<span class="num">1</span>/<span class="num">6</span>] * <span class="num">6</span>

<span class="fn">print</span>(expected_value(faces, probs))   <span class="cm"># 3.5 — never rolled, but the long-run average</span></code><span class="code-label">Python</span></pre>

  <div class="diagram-wrap">
    <div class="diagram-title">EV of a fair die converges to 3.5 as trials increase</div>
    <svg width="100%" height="140" viewBox="0 0 560 140">
      <line x1="40" y1="20" x2="40" y2="120" stroke="#D8D5D0" stroke-width="1.5"/>
      <line x1="40" y1="120" x2="540" y2="120" stroke="#D8D5D0" stroke-width="1.5"/>
      <line x1="40" y1="70" x2="540" y2="70" stroke="#E8442A" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="545" y="74" fill="#E8442A" font-size="11" font-weight="700">3.5</text>
      <polyline points="60,35 100,95 140,50 180,80 220,60 260,72 300,65 340,74 380,68 420,71 460,69 500,70" fill="none" stroke="#2B5CE6" stroke-width="2"/>
      <text x="40" y="14" fill="#8A8F9E" font-size="10">Rolling average</text>
      <text x="290" y="134" text-anchor="middle" fill="#8A8F9E" font-size="10">number of rolls →</text>
    </svg>
  </div>

  <h2 id="linearity"><span class="emoji">➕</span>Linearity of Expectation</h2>

  <p>The single most powerful shortcut in probability: <strong>the expected value of a sum equals the sum of the expected values</strong> — even if the random variables are <em>not</em> independent.</p>

<pre><code>E[X + Y] = E[X] + E[Y]   <span class="cm"># always true, regardless of dependence</span></code></pre>

  <div class="callout tip">
    <div class="callout-title">Why this is a superpower</div>
    You almost never need to know the joint distribution of complicated, dependent random variables. Break a messy quantity into a <strong>sum of simple indicator variables</strong> (each either 0 or 1), find each one's easy individual expectation, and add them up.
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Splitting a Restaurant Bill</div>
    Figuring out the expected total tip for a table of 6 people doesn't require knowing how the diners' generosity correlates with each other. Just compute each person's expected tip individually and add — even if generous people tend to sit next to other generous people, the sum of expectations doesn't care.
  </div>

  <p>Classic application — expected number of fixed points when shuffling a deck of n cards (a "fixed point" is a card that ends up in its original position):</p>

<pre><code><span class="kw">import</span> random

<span class="kw">def</span> <span class="fn">count_fixed_points</span>(n: <span class="fn">int</span>) -> <span class="fn">int</span>:
    deck = <span class="fn">list</span>(<span class="fn">range</span>(n))
    shuffled = deck[:]
    random.shuffle(shuffled)
    <span class="kw">return</span> <span class="fn">sum</span>(<span class="num">1</span> <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n) <span class="kw">if</span> deck[i] == shuffled[i])

<span class="cm"># Each card has a 1/n chance of landing back in its own spot.</span>
<span class="cm"># By linearity: E[total fixed points] = n * (1/n) = 1 — regardless of n!</span>
trials = [count_fixed_points(<span class="num">52</span>) <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">100_000</span>)]
<span class="fn">print</span>(<span class="fn">sum</span>(trials) / <span class="fn">len</span>(trials))   <span class="cm"># ≈ 1.0</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Linearity in action — expected fixed points scales with n</h4>
    <div class="demo-controls">
      <button class="btn" onclick="evStep(1)">n + 10</button>
      <button class="btn" onclick="evStep(-1)">n − 10</button>
    </div>
    <div class="demo-output" id="ev-output">n = 10 cards → each has a 1/10 chance of landing on itself → E[fixed points] = 10 × (1/10) = 1.0</div>
  </div>

  <h2 id="decisions"><span class="emoji">🎲</span>EV-Maximizing Decisions</h2>

  <p>In interviews, EV puzzles almost always boil down to: <strong>should you take this bet?</strong> Compute the EV of each option and compare — but watch for two traps interviewers love to set.</p>

  <div class="callout warn">
    <div class="callout-title">Trap 1 — Positive EV isn't always "take it"</div>
    A bet can have positive EV but unbounded downside (e.g., "double your money 51% of the time, lose everything 49% of the time, repeated forever"). Real traders also weigh <strong>variance</strong> and risk of ruin, not EV alone. If asked to just "maximize EV" in an interview, state the EV-optimal answer but mention this caveat — it shows depth.
  </div>

  <div class="callout warn">
    <div class="callout-title">Trap 2 — Conditioning changes the EV</div>
    "You draw cards until you see a King — what's your expected payout?" is a different (and usually harder) computation than a one-shot bet, because the number of draws is itself random. Don't forget to account for the <strong>stopping condition</strong>.
  </div>

  <h2 id="reference"><span class="emoji">📐</span>Formula Reference</h2>

  <table>
    <thead>
      <tr><th>Concept</th><th>Formula</th><th>Use when</th></tr>
    </thead>
    <tbody>
      <tr><td>Expected value (discrete)</td><td class="o-1">E[X] = Σ xᵢpᵢ</td><td>Weighted average of all outcomes</td></tr>
      <tr><td>Linearity</td><td class="o-1">E[X+Y] = E[X]+E[Y]</td><td>Break a sum into simple pieces — dependence doesn't matter</td></tr>
      <tr><td>Indicator trick</td><td class="o-1">E[count] = n · P(one event)</td><td>Counting occurrences across many trials</td></tr>
      <tr><td>Variance</td><td class="o-1">Var(X) = E[X²] − (E[X])²</td><td>Measuring spread/risk around the EV</td></tr>
      <tr><td>EV of a bet</td><td class="o-1">EV = p·win − (1−p)·loss</td><td>Deciding whether to take a wager</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">St. Petersburg Paradox</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      A casino flips a fair coin repeatedly until it lands tails. The payout is <code>2ⁿ</code> dollars, where n is the number of flips (so 1 flip → $2, 2 flips → $4, 3 flips → $8, ...). What's the expected payout, and how much should you pay to play?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Sum over all possible n: P(exactly n flips) = (1/2)ⁿ, payout = 2ⁿ. Each term in the sum is <code>(1/2)ⁿ · 2ⁿ = 1</code>. There are infinitely many terms.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>The probability the game lasts exactly n flips is <code>(1/2)ⁿ</code> (n−1 heads then a tail... actually here every flip before the final tail contributes, so it's <code>(1/2)ⁿ</code> for the sequence ending in tails on flip n). The payout for that outcome is <code>2ⁿ</code>.</p>
<pre><code>E[payout] = Σ (from n=1 to ∞) (1/2)ⁿ · 2ⁿ = Σ 1 = ∞</code></pre>
<pre><code>terms = [(<span class="num">0.5</span> ** n) * (<span class="num">2</span> ** n) <span class="kw">for</span> n <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">21</span>)]
<span class="fn">print</span>(terms[:<span class="num">5</span>])   <span class="cm"># [1.0, 1.0, 1.0, 1.0, 1.0] — every term is exactly 1</span>
<span class="fn">print</span>(<span class="fn">sum</span>(terms))  <span class="cm"># grows without bound as more terms are added</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> the mathematical EV is infinite, yet virtually nobody would pay more than $20-$30 to play. This is the paradox — it's the classic argument for why <strong>utility</strong> (diminishing marginal value of money) matters more than raw EV once outcomes get extreme, a point quant interviewers want you to raise unprompted.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Expected Rolls to See All Six Faces</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      You roll a fair 6-sided die repeatedly. What's the expected number of rolls until you've seen every face at least once? (This is the "coupon collector" problem.)
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Break the process into 6 stages: rolling until you see a <em>new</em> face for the 1st time, 2nd time, ..., 6th time. Use linearity of expectation to sum the expected length of each stage. When k faces have been seen, the chance the next roll is new is <code>(6−k)/6</code>, so the expected wait for that stage is <code>6/(6−k)</code>.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>After collecting k distinct faces, each new roll has probability <code>(6−k)/6</code> of being a face you haven't seen — a geometric distribution with expected wait time <code>6/(6−k)</code>. By linearity, sum these waits for k = 0 through 5:</p>
<pre><code>E[total rolls] = 6/6 + 6/5 + 6/4 + 6/3 + 6/2 + 6/1 = 6 · (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6)</code></pre>
<pre><code>n = <span class="num">6</span>
expected = <span class="fn">sum</span>(n / (n - k) <span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(n))
<span class="fn">print</span>(<span class="fn">round</span>(expected, <span class="num">2</span>))   <span class="cm"># 14.7</span>

<span class="cm"># Verify with simulation</span>
<span class="kw">import</span> random
<span class="kw">def</span> <span class="fn">simulate</span>() -> <span class="fn">int</span>:
    seen, rolls = <span class="fn">set</span>(), <span class="num">0</span>
    <span class="kw">while</span> <span class="fn">len</span>(seen) &lt; <span class="num">6</span>:
        seen.add(random.randint(<span class="num">1</span>, <span class="num">6</span>))
        rolls += <span class="num">1</span>
    <span class="kw">return</span> rolls

trials = [simulate() <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">50_000</span>)]
<span class="fn">print</span>(<span class="fn">round</span>(<span class="fn">sum</span>(trials) / <span class="fn">len</span>(trials), <span class="num">2</span>))   <span class="cm"># ≈ 14.7</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> ≈ 14.7 rolls — the general formula for n coupons is <code>n · Hₙ</code> where Hₙ is the n-th harmonic number, which grows like <code>n·ln(n)</code>, much slower than n².</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">The Insurance Bet</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A market maker offers you this bet: pay $3 to play, roll a fair die, and win an amount in dollars equal to the number rolled. Should you take the bet, and what's the market maker's expected profit per play?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Compute E[payout] using the uniform die formula, then compare to the $3 cost. The market maker's expected profit is exactly the negative of your expected net gain.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>E[payout] = (1+2+3+4+5+6)/6 = 21/6 = 3.5. Since you pay $3 to play, your expected net gain is 3.5 − 3 = $0.50 per play — positive EV, you should take it.</p>
<pre><code>payout = <span class="fn">sum</span>(<span class="fn">range</span>(<span class="num">1</span>, <span class="num">7</span>)) / <span class="num">6</span>
cost = <span class="num">3</span>
your_ev = payout - cost
<span class="fn">print</span>(your_ev)          <span class="cm"># 0.5</span>
<span class="fn">print</span>(-your_ev)         <span class="cm"># -0.5 — the house's expected loss per play</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> take the bet — you have +$0.50 EV per play, and the market maker is losing $0.50 per play on average (they'd need to reprice the entry cost to at least $3.50 to break even).</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with the <strong>Insurance Bet</strong> — it's the template for every "should I take this bet" question. Then work through <strong>Coupon Collector</strong>, which shows up constantly in disguised forms. Share your reasoning here before we unlock Chapter 3: Distributions.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/probability" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Probability &amp; Combinatorics</a>
    <a href="/quant/distributions" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Distributions →</a>
  </div>
</article>
`
}

export function init() {
  let n = 10

  function render() {
    const p = 1 / n
    const ev = (n * p).toFixed(1)
    const out = document.getElementById('ev-output')
    if (out) out.textContent = `n = ${n} cards → each has a 1/${n} chance of landing on itself → E[fixed points] = ${n} × (1/${n}) = ${ev}`
  }

  window.evStep = function(delta) {
    const next = n + delta * 10
    if (next < 10 || next > 100) return
    n = next
    render()
  }

  render()
}
