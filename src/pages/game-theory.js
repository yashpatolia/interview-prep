export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#nash">Nash Equilibrium</a>
  <a href="#auctions">Auction Formats</a>
  <a href="#vickrey">Why Second-Price Auctions Are Truthful</a>
  <a href="#reference">Reference</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Game Theory</em> &amp; Auctions</h1>
  <p class="subtitle">Chapter 8 · Strategic reasoning when the "right" move depends on what others do</p>

  <h2 id="nash"><span class="emoji">🎯</span>Nash Equilibrium</h2>

  <p>A <strong>Nash equilibrium</strong> is a set of strategies — one per player — where no single player can improve their outcome by unilaterally switching strategy, given what everyone else is doing. It's a stability condition, not necessarily the "best" outcome for anyone.</p>

  <div class="diagram-wrap">
    <div class="diagram-title">Prisoner's Dilemma payoff matrix (years in prison, lower is better)</div>
    <svg width="100%" height="150" viewBox="0 0 480 150">
      <g font-family="monospace" font-size="12">
        <rect x="140" y="10"  width="150" height="30" fill="var(--surface2)" stroke="#D8D5D0"/>
        <text x="215" y="30" text-anchor="middle" fill="#18192A">B: Cooperate</text>
        <rect x="290" y="10"  width="150" height="30" fill="var(--surface2)" stroke="#D8D5D0"/>
        <text x="365" y="30" text-anchor="middle" fill="#18192A">B: Defect</text>
        <rect x="10"  y="40" width="130" height="50" fill="var(--surface2)" stroke="#D8D5D0"/>
        <text x="75" y="70" text-anchor="middle" fill="#18192A">A: Cooperate</text>
        <rect x="10"  y="90" width="130" height="50" fill="var(--surface2)" stroke="#D8D5D0"/>
        <text x="75" y="120" text-anchor="middle" fill="#18192A">A: Defect</text>
        <rect x="140" y="40" width="150" height="50" fill="rgba(43,92,230,0.06)" stroke="#D8D5D0"/>
        <text x="215" y="70" text-anchor="middle" fill="#18192A">−1, −1</text>
        <rect x="290" y="40" width="150" height="50" fill="rgba(232,68,42,0.06)" stroke="#D8D5D0"/>
        <text x="365" y="70" text-anchor="middle" fill="#18192A">−10, 0</text>
        <rect x="140" y="90" width="150" height="50" fill="rgba(232,68,42,0.06)" stroke="#D8D5D0"/>
        <text x="215" y="120" text-anchor="middle" fill="#18192A">0, −10</text>
        <rect x="290" y="90" width="150" height="50" fill="rgba(42,122,82,0.12)" stroke="#E8442A" stroke-width="2"/>
        <text x="365" y="120" text-anchor="middle" fill="#18192A" font-weight="700">−5, −5 ★</text>
      </g>
    </svg>
  </div>

  <p>Both players defecting is the Nash equilibrium (★) — even though mutual cooperation (−1, −1) is better for <em>both</em> players than mutual defection (−5, −5). Neither player can unilaterally deviate from defection without making their own outcome worse (switching to cooperate while the other defects goes from −5 to −10).</p>

  <div class="callout tip">
    <div class="callout-title">Equilibrium ≠ optimal</div>
    This is the entire point of the Prisoner's Dilemma: rational individual behavior at equilibrium can be collectively worse than a coordinated alternative. Markets with repeated interactions (reputation, retaliation) can sustain cooperation that a one-shot game cannot — this is exactly why trading relationships and market-maker reputations matter in practice.
  </div>

<pre><code><span class="cm"># Verify no unilateral deviation improves the (Defect, Defect) outcome</span>
payoffs = {
    (<span class="st">'C'</span>,<span class="st">'C'</span>): (-<span class="num">1</span>,-<span class="num">1</span>), (<span class="st">'C'</span>,<span class="st">'D'</span>): (-<span class="num">10</span>,<span class="num">0</span>),
    (<span class="st">'D'</span>,<span class="st">'C'</span>): (<span class="num">0</span>,-<span class="num">10</span>),  (<span class="st">'D'</span>,<span class="st">'D'</span>): (-<span class="num">5</span>,-<span class="num">5</span>),
}
<span class="cm"># Player A, holding B's strategy fixed at Defect, compares C vs D:</span>
<span class="fn">print</span>(payoffs[(<span class="st">'C'</span>,<span class="st">'D'</span>)][<span class="num">0</span>], <span class="st">'vs'</span>, payoffs[(<span class="st">'D'</span>,<span class="st">'D'</span>)][<span class="num">0</span>])   <span class="cm"># -10 vs -5 — Defect is better</span></code><span class="code-label">Python</span></pre>

  <h2 id="auctions"><span class="emoji">🔨</span>Auction Formats</h2>

  <p>Auction design determines what bidders should optimally do — and market structure (how exchanges match orders) borrows directly from auction theory.</p>

  <table>
    <thead>
      <tr><th>Format</th><th>Rule</th><th>Optimal strategy</th></tr>
    </thead>
    <tbody>
      <tr><td>First-price sealed-bid</td><td class="o-1">Highest bid wins, pays own bid</td><td>Shade your bid below true value</td></tr>
      <tr><td>Second-price sealed-bid (Vickrey)</td><td class="o-1">Highest bid wins, pays 2nd-highest bid</td><td>Bid your true value, exactly</td></tr>
      <tr><td>English (ascending)</td><td class="o-1">Open outcry, price rises until one bidder remains</td><td>Stay in until price exceeds your value</td></tr>
      <tr><td>Dutch (descending)</td><td class="o-1">Price starts high, drops until someone accepts</td><td>Strategically equivalent to first-price</td></tr>
    </tbody>
  </table>

  <h2 id="vickrey"><span class="emoji">✅</span>Why Second-Price Auctions Are Truthful</h2>

  <p>In a Vickrey (second-price) auction, bidding your true value is a <strong>dominant strategy</strong> — it's optimal no matter what anyone else bids. This is one of the cleanest results in game theory and worth being able to prove on the spot.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — You Set the Threshold, Not the Price</div>
    Your bid in a Vickrey auction only ever does one thing: sets the threshold above which you win. The price you actually pay is determined entirely by someone else's bid. Bidding higher than your true value only risks winning at a price above what the item is worth to you; bidding lower only risks losing a sale that would've been profitable. Bidding your true value is the only choice with no downside.
  </div>

<pre><code><span class="kw">def</span> <span class="fn">vickrey_outcome</span>(my_bid: <span class="fn">float</span>, my_value: <span class="fn">float</span>, others_highest: <span class="fn">float</span>) -> <span class="fn">float</span>:
    <span class="cm"># My profit if I win (bid highest) vs lose</span>
    <span class="kw">if</span> my_bid > others_highest:
        <span class="kw">return</span> my_value - others_highest   <span class="cm"># I win, pay the 2nd price</span>
    <span class="kw">return</span> <span class="num">0</span>                            <span class="cm"># I lose, no profit or loss</span>

<span class="cm"># Try overbidding: value=50, bid=70, opponent bids 60</span>
<span class="fn">print</span>(vickrey_outcome(my_bid=<span class="num">70</span>, my_value=<span class="num">50</span>, others_highest=<span class="num">60</span>))  <span class="cm"># -10 — you win, but overpay relative to your value!</span>
<span class="cm"># Truthful bid=50 avoids this: you simply lose, profit = 0, better than -10</span></code><span class="code-label">Python</span></pre>

  <h2 id="reference"><span class="emoji">📋</span>Reference</h2>

  <table>
    <thead>
      <tr><th>Concept</th><th>Key idea</th></tr>
    </thead>
    <tbody>
      <tr><td>Nash equilibrium</td><td class="o-1">No player benefits from unilaterally changing strategy</td></tr>
      <tr><td>Dominant strategy</td><td class="o-1">Optimal regardless of what others do</td></tr>
      <tr><td>Vickrey auction</td><td class="o-1">Truthful bidding is dominant; winner pays 2nd-highest bid</td></tr>
      <tr><td>Zero-sum game</td><td class="o-1">One player's gain is exactly another's loss</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Guess Two-Thirds of the Average</span>
      <span class="difficulty diff-hard">Hard</span>
    </div>
    <div class="problem-desc">
      A group of players each simultaneously pick a number from 0 to 100. Whoever's guess is closest to <strong>2/3 of the average</strong> of all guesses wins. Assuming all players are perfectly rational and know everyone else is too, what number should you pick?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Use iterated elimination of dominated strategies: if everyone guesses uniformly, the average is 50, so 2/3 of that is ~33 — nobody rational should guess above 67 (since even if everyone guessed 100, the target would be 66.7). But if everyone reasons that far, they lower their guesses further, and the logic repeats indefinitely.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Each round of "everyone is rational and knows it" reasoning multiplies the plausible upper bound by 2/3. Starting from 100: round 1 caps guesses at 66.7, round 2 caps at 44.4, and so on. As this reasoning iterates infinitely (common knowledge of rationality), the only fixed point is 0.</p>
<pre><code>upper_bound = <span class="num">100.0</span>
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">20</span>):
    upper_bound *= <span class="num">2</span>/<span class="num">3</span>
<span class="fn">print</span>(<span class="fn">round</span>(upper_bound, <span class="num">4</span>))   <span class="cm"># converges toward 0</span></code></pre>
        <p class="complexity-line"><strong>Answer:</strong> the game-theoretic Nash equilibrium is 0 — but in practice, real humans don't iterate infinitely, and empirical experiments of this game typically settle around 20-35, since most players only reason 1-2 levels deep. Mentioning both the theoretical and empirical answer shows depth.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Prove Truthful Bidding Is Dominant</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      In a second-price sealed-bid auction, prove that bidding your true value v is always at least as good as any other bid, regardless of what other bidders do.
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Let b = your bid, v = your true value, and p = the highest bid among everyone else. Compare your outcome under b vs. v across the three regions: p &lt; v, p = v, p &gt; v. Show truthful bidding never does worse in any region.</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p><strong>Case p &lt; v</strong> (you should want to win): bidding v wins (since v &gt; p) and profit is v−p &gt; 0. Bidding b &lt; p would lose, forgoing that profit — strictly worse. Bidding b &gt; p still wins with the same v−p profit — no better than truthful.</p>
        <p><strong>Case p &gt; v</strong> (you should want to lose): bidding v loses (v &lt; p), profit = 0. Bidding b &gt; p would win but at a loss (v−p &lt; 0) — strictly worse. Bidding b &lt; p still loses — no better than truthful.</p>
        <p><strong>Case p = v</strong>: you're indifferent between winning and losing (both give 0 profit), so no bid does better than truthful here either.</p>
<pre><code><span class="kw">def</span> <span class="fn">profit</span>(bid, value, others_highest):
    <span class="kw">return</span> value - others_highest <span class="kw">if</span> bid > others_highest <span class="kw">else</span> <span class="num">0</span>

<span class="cm"># Sweep every case to confirm truthful bidding never loses to any alternative</span>
v = <span class="num">50</span>
<span class="kw">for</span> p <span class="kw">in</span> [<span class="num">30</span>, <span class="num">50</span>, <span class="num">70</span>]:
    truthful = profit(v, v, p)
    <span class="kw">for</span> b <span class="kw">in</span> [<span class="num">20</span>, <span class="num">40</span>, <span class="num">60</span>, <span class="num">80</span>]:
        <span class="kw">assert</span> profit(b, v, p) &lt;= truthful
<span class="fn">print</span>(<span class="st">'truthful bidding dominates in every tested case'</span>)</code></pre>
        <p class="complexity-line"><strong>Answer:</strong> in every region of the opponent's bid p, deviating from v never strictly improves your outcome and sometimes strictly worsens it — this is exactly the definition of a dominant strategy.</p>
      </details>
    </div>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">Splitting $100</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Two players simultaneously (and independently) claim a share of $100 by naming any integer from $0 to $100. If their claims sum to $100 or less, each gets what they claimed (and the remainder is discarded). If their claims sum to more than $100, neither gets anything. What should you claim?
      <br><br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Think about what happens if you both claim $50 — is either player incentivized to deviate? What about claiming $100?</p>
      </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <p>Both claiming $50 is a Nash equilibrium: if you unilaterally raise your claim above $50, the total exceeds $100 and you get nothing (worse than $50). If you lower your claim, you get less than $50 for no benefit. Interestingly, <strong>any pair of claims summing to exactly $100</strong> is also a Nash equilibrium (e.g., $70/$30) — neither player can improve by deviating, since raising blows the deal and lowering just gives away money.</p>
        <p class="complexity-line"><strong>Answer:</strong> $50 is the natural focal-point equilibrium, but the game technically has infinitely many Nash equilibria along the line claim_A + claim_B = 100 — a good reminder that "an equilibrium" and "the unique equilibrium" are not the same claim.</p>
      </details>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>Splitting $100</strong> to build intuition for what a Nash equilibrium actually requires. Then work through the Vickrey auction proof — it's a favorite "prove this on a whiteboard" question. That's all 8 chapters — nice work getting through the curriculum. Share your reasoning on any problem here anytime.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-start; align-items: center;">
    <a href="/quant/options" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Options &amp; Derivatives</a>
  </div>
</article>
`
}

export function init() {}
