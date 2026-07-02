export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#payoffs">Call &amp; Put Payoffs</a>
  <a href="#parity">Put-Call Parity</a>
  <a href="#value">Intrinsic vs Time Value</a>
  <a href="#reference">Term Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Options</em> &amp; Derivatives Intuition</h1>
  <p class="subtitle">Chapter 7 · Payoff diagrams and pricing intuition, no heavy math required</p>

  <h2 id="payoffs"><span class="emoji">📈</span>Call &amp; Put Payoffs</h2>

  <p>A <strong>call option</strong> gives the buyer the right (not obligation) to <strong>buy</strong> an asset at a fixed <strong>strike price</strong> K by expiration. A <strong>put option</strong> gives the right to <strong>sell</strong> at K. At expiration, the payoffs are purely mechanical:</p>

<pre><code>Call payoff = max(S - K, 0)   <span class="cm"># S = spot price at expiration</span>
Put payoff  = max(K - S, 0)</code></pre>

  <div class="diagram-wrap">
    <div class="diagram-title">Call payoff — the classic "hockey stick"</div>
    <svg width="100%" height="140" viewBox="0 0 560 140">
      <line x1="30" y1="120" x2="530" y2="120" stroke="#D8D5D0" stroke-width="1.5"/>
      <line x1="30" y1="10" x2="30" y2="120" stroke="#D8D5D0" stroke-width="1.5"/>
      <polyline points="30,120 280,120 480,20" fill="none" stroke="#2B5CE6" stroke-width="2.5"/>
      <line x1="280" y1="10" x2="280" y2="120" stroke="#8A8F9E" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="280" y="135" text-anchor="middle" fill="#8A8F9E" font-size="10">Strike (K)</text>
      <text x="150" y="112" text-anchor="middle" fill="#8A8F9E" font-size="10">out of the money — payoff = 0</text>
      <text x="410" y="55" text-anchor="middle" fill="#2B5CE6" font-size="10">in the money — payoff = S − K</text>
      <text x="500" y="135" fill="#8A8F9E" font-size="10">Spot price (S) →</text>
    </svg>
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — A Price-Lock Coupon</div>
    A call option is like a coupon that lets you buy a TV for $500 anytime in the next month, regardless of the store's actual price. If the TV goes on sale for $400, your coupon is worthless — just buy it at the store price. If the TV's price rises to $600, your coupon is worth exactly $100 — the gap you'd save by using it instead of paying market price.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">call_payoff</span>(spot: <span class="fn">float</span>, strike: <span class="fn">float</span>) -> <span class="fn">float</span>:
    <span class="kw">return</span> <span class="fn">max</span>(spot - strike, <span class="num">0</span>)

<span class="kw">def</span> <span class="fn">put_payoff</span>(spot: <span class="fn">float</span>, strike: <span class="fn">float</span>) -> <span class="fn">float</span>:
    <span class="kw">return</span> <span class="fn">max</span>(strike - spot, <span class="num">0</span>)

<span class="fn">print</span>(call_payoff(spot=<span class="num">120</span>, strike=<span class="num">100</span>))   <span class="cm"># 20 — in the money</span>
<span class="fn">print</span>(call_payoff(spot=<span class="num">80</span>,  strike=<span class="num">100</span>))   <span class="cm"># 0 — worthless, just buy at market</span>
<span class="fn">print</span>(put_payoff(spot=<span class="num">80</span>,  strike=<span class="num">100</span>))   <span class="cm"># 20 — in the money</span></code><span class="code-label">Python</span></pre>

  <div class="demo-box">
    <h4>Call payoff — drag the spot price</h4>
    <div class="demo-controls">
      <button class="btn" onclick="optStep(1)">Spot + $5</button>
      <button class="btn" onclick="optStep(-1)">Spot − $5</button>
    </div>
    <div class="demo-output" id="opt-output">Strike = $100, Spot = $100 → call payoff = $0 (at the money)</div>
  </div>

  <h2 id="parity"><span class="emoji">⚖️</span>Put-Call Parity</h2>

  <p>Put-call parity is a <strong>no-arbitrage relationship</strong> that must hold between a call, a put, and the underlying — regardless of how you model volatility or anything else about the future. It's pure algebra on payoffs:</p>

<pre><code>Call - Put = Spot - Strike (discounted to present value)
C - P = S - K·e^(-rT)</code></pre>

  <div class="callout tip">
    <div class="callout-title">Why this must be true — construct two identical portfolios</div>
    Portfolio A: own a call, sell a put, same strike and expiry. Portfolio B: own the stock, borrow K dollars (to repay at expiry). Both portfolios have the <em>exact same payoff</em> in every possible future scenario — verify this by checking both above and below the strike. If two portfolios always pay off identically, they must cost the same today, or you could arbitrage the difference risk-free.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">check_parity</span>(call: <span class="fn">float</span>, put: <span class="fn">float</span>, spot: <span class="fn">float</span>, strike: <span class="fn">float</span>, r: <span class="fn">float</span>, T: <span class="fn">float</span>) -> <span class="fn">float</span>:
    <span class="kw">import</span> math
    lhs = call - put
    rhs = spot - strike * math.exp(-r * T)
    <span class="kw">return</span> lhs - rhs   <span class="cm"># should be ~0 if no arbitrage exists</span>

<span class="fn">print</span>(<span class="fn">round</span>(check_parity(call=<span class="num">12</span>, put=<span class="num">7</span>, spot=<span class="num">105</span>, strike=<span class="num">100</span>, r=<span class="num">0.05</span>, T=<span class="num">1</span>), <span class="num">2</span>))
<span class="cm"># If this isn't ~0, one side is mispriced — a risk-free arbitrage exists</span></code><span class="code-label">Python</span></pre>

  <h2 id="value"><span class="emoji">💰</span>Intrinsic vs Time Value</h2>

  <p>An option's price before expiration splits into two components: <strong>intrinsic value</strong> (what it would be worth if exercised right now — <code>max(S−K, 0)</code> for a call) and <strong>time value</strong> (the extra premium for the chance the option becomes more valuable before expiry).</p>

  <div class="callout tip">
    <div class="callout-title">Time value always decays to zero</div>
    Time value shrinks to exactly $0 at expiration — there's no more "time left" for anything to change. This decay is called <strong>theta</strong>, and it accelerates as expiration approaches. An option seller profits from this decay if the underlying doesn't move enough to offset it.
  </div>

  <h2 id="reference"><span class="emoji">📋</span>Term Reference</h2>

  <table>
    <thead>
      <tr><th>Term</th><th>Meaning</th></tr>
    </thead>
    <tbody>
      <tr><td>Call / Put</td><td class="o-1">Right to buy / sell at the strike price</td></tr>
      <tr><td>Strike (K)</td><td class="o-1">The fixed price set in the option contract</td></tr>
      <tr><td>Intrinsic value</td><td class="o-1">max(S−K, 0) for a call — value if exercised now</td></tr>
      <tr><td>Time value</td><td class="o-1">Option price − intrinsic value; decays to 0 at expiry</td></tr>
      <tr><td>Moneyness</td><td class="o-1">In-the-money / at-the-money / out-of-the-money</td></tr>
      <tr><td>Put-call parity</td><td class="o-1">C − P = S − K·e^(−rT)</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Payoff at Expiration</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      You bought a call option with strike $50 for a $3 premium. At expiration, the stock is trading at $58. What's your net profit?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Net profit = payoff at expiration − premium paid. Compute the payoff first with <code>max(S−K, 0)</code>, then subtract the $3 you spent upfront.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>strike, premium, spot = <span class="num">50</span>, <span class="num">3</span>, <span class="num">58</span>
payoff = <span class="fn">max</span>(spot - strike, <span class="num">0</span>)
net_profit = payoff - premium
<span class="fn">print</span>(payoff, net_profit)   <span class="cm"># 8 5</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> $5 net profit ($8 payoff minus the $3 premium) — a common trap is forgetting to subtract the premium and answering $8, which is the payoff, not the profit.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Spot the Arbitrage</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      A stock trades at $100. A 1-year call with strike $100 costs $8. A 1-year put with the same strike costs $5. Assume the risk-free rate is 0% (so no discounting needed). Does put-call parity hold? If not, describe the arbitrage.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">With r = 0, parity simplifies to <code>C − P = S − K</code>. Plug in the numbers on both sides and see if they match.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>C, P, S, K = <span class="num">8</span>, <span class="num">5</span>, <span class="num">100</span>, <span class="num">100</span>
lhs = C - P         <span class="cm"># 3</span>
rhs = S - K         <span class="cm"># 0</span>
<span class="fn">print</span>(lhs, rhs, lhs - rhs)   <span class="cm"># 3 0 3 — parity is violated by $3</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> parity is violated — the call is overpriced (or the put underpriced) by $3. The arbitrage: sell the call, buy the put, buy the stock. This costs <code>−8 + 5 + 100 = 97</code> today and is guaranteed to pay back exactly $100 at expiration regardless of where the stock ends up — a risk-free $3 profit.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Which Has More Time Value?</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Two calls on the same stock, same expiration: Call A has strike equal to the current spot price (at-the-money). Call B has a strike far below the current spot price (deep in-the-money). Which one has more time value, and why?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Time value reflects uncertainty about whether the option's payoff will change before expiry. Think about which option's outcome is more "in doubt" — the one right at the strike, or the one already deep in the money.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Call A (at-the-money) has more time value. Its final payoff is maximally uncertain — the stock could easily end up above or below the strike, so there's real value in "waiting to see." Call B (deep in-the-money) is very likely to stay in the money regardless of small moves, so its price is dominated by intrinsic value with relatively little time value left.</p>
        <p class="complexity-line"><strong>Answer:</strong> at-the-money options carry the most time value of any strike — this is why option sellers (market makers) often focus their risk management most heavily on at-the-money strikes, where uncertainty (and thus time value decay) is largest.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Master the payoff formulas cold — <strong>Payoff at Expiration</strong> should be instant. Then work through <strong>Spot the Arbitrage</strong>, which is the conceptual core of derivatives pricing: prices are pinned down by no-arbitrage, not by guessing. Share your reasoning here before we unlock Chapter 8: Game Theory.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/market-making" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Market Making</a>
    <a href="/quant/game-theory" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Game Theory &amp; Auctions →</a>
  </div>
</article>
`
}

export function init() {
  const strike = 100
  let spot = 100

  function render() {
    const payoff = Math.max(spot - strike, 0)
    const moneyness = spot > strike ? 'in the money' : spot < strike ? 'out of the money' : 'at the money'
    const out = document.getElementById('opt-output')
    if (out) out.textContent = `Strike = $${strike}, Spot = $${spot} → call payoff = $${payoff} (${moneyness})`
  }

  window.optStep = function(delta) {
    const next = spot + delta * 5
    if (next < 50 || next > 150) return
    spot = next
    render()
  }

  render()
}
