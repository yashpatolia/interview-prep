export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#spread">Quoting a Two-Sided Market</a>
  <a href="#adverse">Adverse Selection</a>
  <a href="#inventory">Inventory Risk &amp; Skewing</a>
  <a href="#reference">Term Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Market Making</em> &amp; Bid-Ask Spread</h1>
  <p class="subtitle">Chapter 6 · How a market maker actually makes money</p>

  <h2 id="spread"><span class="emoji">📊</span>Quoting a Two-Sided Market</h2>

  <p>A market maker doesn't bet on direction — they quote a <strong>bid</strong> (price they'll buy at) and an <strong>ask</strong> (price they'll sell at), profiting from the gap between them, the <strong>spread</strong>, as long as buy and sell orders arrive roughly evenly.</p>

  <div class="diagram-wrap">
    <div class="diagram-title">Anatomy of a quote</div>
    <svg width="100%" height="110" viewBox="0 0 560 110">
      <line x1="30" y1="60" x2="530" y2="60" stroke="#D8D5D0" stroke-width="1.5"/>
      <circle cx="180" cy="60" r="6" fill="#2A7A52"/>
      <text x="180" y="40" text-anchor="middle" fill="#2A7A52" font-size="12" font-weight="700">Bid: 99.90</text>
      <text x="180" y="85" text-anchor="middle" fill="#8A8F9E" font-size="10">you buy here</text>
      <circle cx="380" cy="60" r="6" fill="#E8442A"/>
      <text x="380" y="40" text-anchor="middle" fill="#E8442A" font-size="12" font-weight="700">Ask: 100.10</text>
      <text x="380" y="85" text-anchor="middle" fill="#8A8F9E" font-size="10">you sell here</text>
      <line x1="180" y1="60" x2="380" y2="60" stroke="#2B5CE6" stroke-width="3"/>
      <text x="280" y="20" text-anchor="middle" fill="#2B5CE6" font-size="11" font-weight="700">spread = 0.20</text>
      <text x="280" y="60" text-anchor="middle" dy="-14" fill="#8A8F9E" font-size="10">mid = 100.00</text>
    </svg>
  </div>

  <div class="callout analogy">
    <div class="callout-title">Analogy — The Currency Exchange Booth</div>
    An airport currency booth buys dollars at one rate and sells at a slightly worse rate for the customer. They don't care whether the dollar goes up or down after the trade — they've already locked in the spread the moment a customer transacts on both sides. A market maker runs the same playbook, just electronically and at much tighter margins.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">spread_capture</span>(bid: <span class="fn">float</span>, ask: <span class="fn">float</span>, round_trips: <span class="fn">int</span>) -> <span class="fn">float</span>:
    <span class="cm"># Profit if you buy at bid and sell at ask, repeatedly, with balanced flow</span>
    spread = ask - bid
    <span class="kw">return</span> spread * round_trips

<span class="fn">print</span>(spread_capture(<span class="num">99.90</span>, <span class="num">100.10</span>, <span class="num">1000</span>))   <span class="cm"># 200.0 in captured spread</span></code><span class="code-label">Python</span></pre>

  <h2 id="adverse"><span class="emoji">⚠️</span>Adverse Selection</h2>

  <p>The spread isn't free money — it exists to compensate for <strong>adverse selection</strong>: the risk that whoever trades against you knows something you don't. If informed traders only hit your quote when it's mispriced, you systematically lose on those trades even while "capturing the spread."</p>

  <div class="callout warn">
    <div class="callout-title">Why market makers widen spreads before news</div>
    Right before an earnings announcement or economic data release, market makers widen their quotes dramatically. It's not because they expect the price to move in a specific direction — it's because the <em>proportion</em> of informed vs. uninformed order flow spikes, and a wider spread is the only defense against being picked off by traders who know the news is coming.
  </div>

  <p>The core tradeoff: <strong>tighter spreads win more volume</strong> (more uninformed flow captures the spread) <strong>but lose more to informed flow</strong> when it arrives. Optimal spread width balances these two forces.</p>

  <div class="demo-box">
    <h4>Spread width vs. informed-flow fraction</h4>
    <div class="demo-controls">
      <button class="btn" onclick="mktStep(1)">Informed % + 5</button>
      <button class="btn" onclick="mktStep(-1)">Informed % − 5</button>
    </div>
    <div class="demo-output" id="mm-mkt-output">10% informed flow, avg loss $0.50/informed trade → breakeven spread ≈ $0.06 per trade</div>
  </div>

  <h2 id="inventory"><span class="emoji">📦</span>Inventory Risk &amp; Skewing</h2>

  <p>Every filled order changes the market maker's <strong>inventory</strong> — a filled bid means they now own more of the asset (long), a filled ask means they own less (short). Large directional inventory is risky: if the price moves against an unbalanced position, the market maker loses money even though every individual trade captured a positive spread.</p>

  <div class="callout tip">
    <div class="callout-title">Skewing quotes to manage inventory</div>
    When a market maker accumulates unwanted long inventory, they <strong>skew their quotes down</strong> — lowering both bid and ask slightly. This makes their ask more attractive (encourages people to buy from them, reducing inventory) and their bid less attractive (discourages further buying by the market maker). The skew is a self-correcting mechanism, not a directional bet.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">skewed_quote</span>(mid: <span class="fn">float</span>, half_spread: <span class="fn">float</span>, inventory: <span class="fn">float</span>, skew_factor: <span class="fn">float</span>) -> <span class="fn">tuple</span>:
    <span class="cm"># Positive inventory (long) shifts quotes down to encourage selling it off</span>
    center = mid - skew_factor * inventory
    <span class="kw">return</span> (center - half_spread, center + half_spread)

bid, ask = skewed_quote(mid=<span class="num">100</span>, half_spread=<span class="num">0.10</span>, inventory=<span class="num">500</span>, skew_factor=<span class="num">0.001</span>)
<span class="fn">print</span>(<span class="fn">round</span>(bid, <span class="num">3</span>), <span class="fn">round</span>(ask, <span class="num">3</span>))   <span class="cm"># 99.4 99.6 — both quotes shifted down from the 100 mid</span></code><span class="code-label">Python</span></pre>

  <h2 id="reference"><span class="emoji">📋</span>Term Reference</h2>

  <table>
    <thead>
      <tr><th>Term</th><th>Meaning</th></tr>
    </thead>
    <tbody>
      <tr><td>Bid / Ask</td><td class="o-1">Price you buy at / sell at as the quoting party</td></tr>
      <tr><td>Spread</td><td class="o-1">Ask − Bid; the market maker's gross revenue per round trip</td></tr>
      <tr><td>Mid price</td><td class="o-1">(Bid + Ask) / 2; the "fair value" reference point</td></tr>
      <tr><td>Adverse selection</td><td class="o-1">Losing to counterparties who trade on superior information</td></tr>
      <tr><td>Inventory</td><td class="o-1">Net position accumulated from filled quotes</td></tr>
      <tr><td>Skew</td><td class="o-1">Shifting both quotes to manage inventory risk</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Quote a Coin Flip Market</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      A fair coin will be flipped: heads pays $100, tails pays $0. You must quote a two-sided market (bid and ask) that a counterparty can trade against. What's a reasonable quote, and why not just quote 50/50 with zero spread?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">The fair value is the expected payout: E[X] = 0.5·100 + 0.5·0 = $50. A zero-spread quote earns nothing to compensate for the risk of being adversely selected or simply the capital risk of holding the position — you need a spread around $50 to have any edge.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>fair_value = <span class="num">0.5</span> * <span class="num">100</span> + <span class="num">0.5</span> * <span class="num">0</span>
<span class="fn">print</span>(fair_value)   <span class="cm"># 50.0</span>

<span class="cm"># A reasonable quote centers on fair value with a modest spread, e.g.:</span>
bid, ask = fair_value - <span class="num">2</span>, fair_value + <span class="num">2</span>
<span class="fn">print</span>(bid, ask)   <span class="cm"># 48 52</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> quote around $48 / $52 (or similar) — the fair value is $50, and the spread exists to compensate for the risk of the position and any information asymmetry, not because $50 itself is uncertain.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Breakeven Spread with Adverse Selection</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      10% of the flow hitting your quotes is "informed" and costs you $1.00 on average per informed trade. The other 90% is uninformed and you capture the full spread on those. What's the minimum spread (per trade) needed to break even overall?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Set up an expected-value equation: <code>0.9 · (spread/2) − 0.1 · 1.00 = 0</code> (each round-trip trade captures half the spread on entry). Solve for spread. Note: framing of "half-spread per fill" vs "full spread per round trip" varies — state your assumption clearly in an interview.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
<pre><code>p_informed = <span class="num">0.1</span>
loss_per_informed = <span class="num">1.00</span>
p_uninformed = <span class="num">1</span> - p_informed

<span class="cm"># Solve: p_uninformed * half_spread == p_informed * loss_per_informed</span>
half_spread = (p_informed * loss_per_informed) / p_uninformed
spread = <span class="num">2</span> * half_spread
<span class="fn">print</span>(<span class="fn">round</span>(spread, <span class="num">4</span>))   <span class="cm"># 0.2222</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> ≈ $0.22 minimum spread — as the informed fraction rises, the required spread grows roughly linearly, which is exactly why real market makers widen quotes sharply when they suspect informed flow has increased.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">When to Skew</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      You've been quoting a stock all morning and are now long 10,000 shares (much more than your target inventory of 0). The stock's fair value hasn't changed. Should you adjust your quotes, and in which direction?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">You want to attract sellers of your inventory (buyers from you) and discourage further accumulation. Think about which direction makes your ask more attractive to hit.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Skew both quotes <strong>down</strong>. A lower ask makes it more attractive for counterparties to buy from you, helping offload the excess long inventory. A lower bid makes it less attractive for you to buy even more. This isn't a bet that the price will fall — it's purely a risk-management response to an unbalanced position.</p>
        <p class="complexity-line"><strong>Answer:</strong> skew quotes down — the direction of the skew always opposes the sign of your inventory (long → skew down, short → skew up), regardless of your view on where the price is headed.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>Quote a Coin Flip Market</strong> — it's the cleanest example of separating "fair value" from "spread." Then work through the breakeven spread math, which is the quantitative core of every market-making interview question. Share your reasoning here before we unlock Chapter 7: Options.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/quant/mental-math" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Mental Math</a>
    <a href="/quant/options" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Options &amp; Derivatives →</a>
  </div>
</article>
`
}

export function init() {
  let informedPct = 10

  function render() {
    const pInformed = informedPct / 100
    const pUninformed = 1 - pInformed
    const lossPerInformed = 0.5
    const halfSpread = (pInformed * lossPerInformed) / pUninformed
    const spread = 2 * halfSpread
    const out = document.getElementById('mm-mkt-output')
    if (out) out.textContent = `${informedPct}% informed flow, avg loss $0.50/informed trade → breakeven spread ≈ $${spread.toFixed(2)} per trade`
  }

  window.mktStep = function(delta) {
    const next = informedPct + delta * 5
    if (next < 5 || next > 60) return
    informedPct = next
    render()
  }

  render()
}
