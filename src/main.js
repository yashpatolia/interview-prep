import './style.css'
import { render as renderLanding } from './pages/landing.js'
import { render as renderQuant } from './pages/quant-prep.js'
import { render as renderProbability, init as initProbability } from './pages/probability.js'
import { render as renderExpectedValue, init as initExpectedValue } from './pages/expected-value.js'
import { render as renderDistributions, init as initDistributions } from './pages/distributions.js'
import { render as renderBrainteasers, init as initBrainteasers } from './pages/brainteasers.js'
import { render as renderMentalMath, init as initMentalMath } from './pages/mental-math.js'
import { render as renderMarketMaking, init as initMarketMaking } from './pages/market-making.js'
import { render as renderOptions, init as initOptions } from './pages/options.js'
import { render as renderGameTheory, init as initGameTheory } from './pages/game-theory.js'
import { render as renderHome } from './pages/home.js'
import { render as renderArrays, init as initArrays } from './pages/arrays.js'
import { render as renderTwoPointers, init as initTwoPointers } from './pages/two-pointers.js'
import { render as renderSlidingWindow, init as initSlidingWindow } from './pages/sliding-window.js'
import { render as renderLinkedLists, init as initLinkedLists } from './pages/linked-lists.js'
import { render as renderStacksQueues, init as initStacksQueues } from './pages/stacks-queues.js'
import { render as renderBinarySearch, init as initBinarySearch } from './pages/binary-search.js'
import { render as renderTrees, init as initTrees } from './pages/trees.js'
import { render as renderDP, init as initDP } from './pages/dynamic-programming.js'
import { render as renderGraphs, init as initGraphs } from './pages/graphs.js'
import { render as renderComplexity, init as initComplexity } from './pages/complexity.js'
import { render as renderProblemSolving, init as initProblemSolving } from './pages/problem-solving.js'

const routes = {
  '/': { render: renderLanding, title: 'Interview Prep Hub' },
  '/quant': { render: renderQuant, title: 'Quant Trading' },
  '/quant/probability': { render: renderProbability, init: initProbability, title: 'Probability' },
  '/quant/expected-value': { render: renderExpectedValue, init: initExpectedValue, title: 'Expected Value' },
  '/quant/distributions': { render: renderDistributions, init: initDistributions, title: 'Distributions' },
  '/quant/brainteasers': { render: renderBrainteasers, init: initBrainteasers, title: 'Brainteasers' },
  '/quant/mental-math': { render: renderMentalMath, init: initMentalMath, title: 'Mental Math' },
  '/quant/market-making': { render: renderMarketMaking, init: initMarketMaking, title: 'Market Making' },
  '/quant/options': { render: renderOptions, init: initOptions, title: 'Options' },
  '/quant/game-theory': { render: renderGameTheory, init: initGameTheory, title: 'Game Theory' },
  '/dsa': { render: renderHome, title: 'Data Structures & Algorithms' },
  '/dsa/arrays': { render: renderArrays, init: initArrays, title: 'Arrays & Hashing' },
  '/dsa/two-pointers': { render: renderTwoPointers, init: initTwoPointers, title: 'Two Pointers' },
  '/dsa/sliding-window': { render: renderSlidingWindow, init: initSlidingWindow, title: 'Sliding Window' },
  '/dsa/linked-lists': { render: renderLinkedLists, init: initLinkedLists, title: 'Linked Lists' },
  '/dsa/stacks-queues': { render: renderStacksQueues, init: initStacksQueues, title: 'Stacks & Queues' },
  '/dsa/binary-search': { render: renderBinarySearch, init: initBinarySearch, title: 'Binary Search' },
  '/dsa/trees': { render: renderTrees, init: initTrees, title: 'Trees & BFS/DFS' },
  '/dsa/dynamic-programming': { render: renderDP, init: initDP, title: 'Dynamic Programming' },
  '/dsa/graphs': { render: renderGraphs, init: initGraphs, title: 'Graphs' },
  '/dsa/complexity': { render: renderComplexity, init: initComplexity, title: 'Complexity Cheat Sheet' },
  '/dsa/problem-solving': { render: renderProblemSolving, init: initProblemSolving, title: 'How to Solve Problems' },
}

function renderNavbar(path) {
  const inDsa = path.startsWith('/dsa')
  const inQuant = path.startsWith('/quant')
  return `
<nav>
  <a href="/" class="${path === '/' ? 'current' : ''}">Interview Prep Hub</a>
  <span class="sep">·</span>
  <a href="/dsa" class="${inDsa ? 'current' : ''}">DSA</a>
  <span class="sep">·</span>
  <a href="/quant" class="${inQuant ? 'current' : ''}">Quant Trading</a>
</nav>`
}

function renderSidebar(path) {
  const prefix = path.startsWith('/dsa/') ? '/dsa' : path.startsWith('/quant/') ? '/quant' : null
  if (!prefix) return ''
  const hubTitle = prefix === '/dsa' ? 'DSA' : 'Quant Trading'
  const links = Object.entries(routes)
    .filter(([p]) => p.startsWith(prefix + '/'))
    .map(([p, r]) => `<a class="sidebar-link${p === path ? ' active' : ''}" href="${p}">${r.title}</a>`)
    .join('')
  return `
<div class="sidebar">
  <a class="sidebar-back" href="${prefix}">← ${hubTitle}</a>
  <h4>Chapters</h4>
  ${links}
</div>`
}

function route() {
  const path = location.pathname
  const page = routes[path] ?? routes['/']
  document.title = page.title
  document.getElementById('app').innerHTML = renderNavbar(path) + renderSidebar(path) + page.render()
  page.init?.()
  if (!location.hash) window.scrollTo(0, 0)
  initTOC()
  initProblemCards()
}

function initProblemCards() {
  document.querySelectorAll('.problem-card').forEach(card => {
    const titleEl = card.querySelector('.problem-title')
    if (!titleEl) return
    const match = titleEl.textContent.match(/#(\d+)/)
    if (!match) return
    const key = `lc-done-${match[1]}`

    const btn = document.createElement('button')
    btn.className = 'problem-done-btn'

    const apply = done => {
      btn.textContent = done ? '✓ Done' : 'Mark done'
      btn.classList.toggle('is-done', done)
      card.classList.toggle('problem-card--done', done)
    }

    apply(localStorage.getItem(key) === '1')

    btn.addEventListener('click', () => {
      const done = localStorage.getItem(key) !== '1'
      localStorage.setItem(key, done ? '1' : '0')
      apply(done)
    })

    // group difficulty badge + button so header stays 2-column
    const header = card.querySelector('.problem-header')
    const diffEl = header.querySelector('.difficulty')
    const right = document.createElement('div')
    right.className = 'problem-header-right'
    if (diffEl) right.appendChild(diffEl)
    right.appendChild(btn)
    header.appendChild(right)
  })
}

function initTOC() {
  const tocLinks = document.querySelectorAll('.toc a')
  const headings = document.querySelectorAll('h2[id]')
  if (!tocLinks.length || !headings.length) return
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'))
        const link = document.querySelector(`.toc a[href="#${e.target.id}"]`)
        if (link) link.classList.add('active')
      }
    })
  }, { rootMargin: '-20% 0px -70% 0px' })
  headings.forEach(h => observer.observe(h))
}

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]')
  if (!a) return
  const href = a.getAttribute('href')
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//') || a.target) return
  e.preventDefault()
  history.pushState(null, '', href)
  route()
})

window.addEventListener('popstate', route)
route()
