export function render() {
  return `
<div class="home-header">
  <h1>Quant<br>Trading</h1>
  <p>Probability, EV, brainteasers, and market intuition — the core toolkit for prop trading and quant interviews.</p>
</div>

<main class="home-main">
  <p class="section-label">Curriculum</p>

  <div class="chapter-list">

    <div class="chapter-item">
      <a class="chapter" href="/quant/probability">
        <span class="chapter-num">I</span>
        <div class="chapter-body">
          <h3>Probability &amp; Combinatorics</h3>
          <p>Permutations, combinations, conditional probability, and Bayes' rule.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">II</span>
        <div class="chapter-body">
          <h3>Expected Value &amp; EV Puzzles</h3>
          <p>Linearity of expectation, EV-maximizing decisions, and classic betting puzzles.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">III</span>
        <div class="chapter-body">
          <h3>Distributions You Must Know</h3>
          <p>Bernoulli, Binomial, Poisson, Normal — when each shows up and why.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">IV</span>
        <div class="chapter-body">
          <h3>Brainteasers &amp; Logic Puzzles</h3>
          <p>The classic interview puzzles — coins, hats, gates, and how to structure an answer out loud.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">V</span>
        <div class="chapter-body">
          <h3>Mental Math &amp; Estimation</h3>
          <p>Fast arithmetic drills and Fermi estimation for market-sizing questions.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">VI</span>
        <div class="chapter-body">
          <h3>Market Making &amp; Bid-Ask Spread</h3>
          <p>Quoting two-sided markets, adverse selection, and inventory risk.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">VII</span>
        <div class="chapter-body">
          <h3>Options &amp; Derivatives Intuition</h3>
          <p>Payoff diagrams, put-call parity, and pricing intuition without heavy math.</p>
        </div>
      </a>
    </div>

    <div class="chapter-item">
      <a class="chapter">
        <span class="chapter-num">VIII</span>
        <div class="chapter-body">
          <h3>Game Theory &amp; Auctions</h3>
          <p>Nash equilibria, auction formats, and why they matter for market structure.</p>
        </div>
      </a>
    </div>

  </div>
</main>

`
}
