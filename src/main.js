import './style.css'
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
  '/':                     { render: renderHome,          title: "Yash's DSA Journal" },
  '/arrays':               { render: renderArrays,        init: initArrays,        title: 'Arrays & Hashing — DSA Journal' },
  '/two-pointers':         { render: renderTwoPointers,   init: initTwoPointers,   title: 'Two Pointers — DSA Journal' },
  '/sliding-window':       { render: renderSlidingWindow, init: initSlidingWindow, title: 'Sliding Window — DSA Journal' },
  '/linked-lists':         { render: renderLinkedLists,   init: initLinkedLists,   title: 'Linked Lists — DSA Journal' },
  '/stacks-queues':        { render: renderStacksQueues,  init: initStacksQueues,  title: 'Stacks & Queues — DSA Journal' },
  '/binary-search':        { render: renderBinarySearch,  init: initBinarySearch,  title: 'Binary Search — DSA Journal' },
  '/trees':                { render: renderTrees,         init: initTrees,         title: 'Trees & BFS/DFS — DSA Journal' },
  '/dynamic-programming':  { render: renderDP,            init: initDP,            title: 'Dynamic Programming — DSA Journal' },
  '/graphs':               { render: renderGraphs,        init: initGraphs,        title: 'Graphs — DSA Journal' },
  '/complexity':           { render: renderComplexity,    init: initComplexity,    title: 'Complexity Cheat Sheet — DSA Journal' },
  '/problem-solving':      { render: renderProblemSolving, init: initProblemSolving, title: 'How to Solve Problems — DSA Journal' },
}

function route() {
  const path = location.pathname
  const page = routes[path] ?? routes['/']
  document.title = page.title
  document.getElementById('app').innerHTML = page.render()
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
