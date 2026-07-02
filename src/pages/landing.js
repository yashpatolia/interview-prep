export function render() {
  return `
<div class="home-header">
  <h1>Interview Prep<br>Hub</h1>
  <p>Pick a track. Structured lessons, practice problems, and progress tracking for each.</p>
</div>

<main class="home-main">
  <div class="track-grid">

    <a class="track-card" href="/dsa">
      <span class="track-tag">Track I</span>
      <h2>Data Structures<br>&amp; Algorithms</h2>
      <p>Arrays, two pointers, trees, graphs, DP — nine chapters from fundamentals to interview-ready.</p>
      <span class="track-cta">Start learning →</span>
    </a>

    <a class="track-card" href="/quant">
      <span class="track-tag">Track II</span>
      <h2>Quant Trading</h2>
      <p>Probability, brainteasers, market making, and mental math for quant trading &amp; research interviews.</p>
      <span class="track-cta">Start learning →</span>
    </a>

  </div>
</main>

`
}
