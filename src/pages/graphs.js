export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What is a Graph?</a>
  <a href="#repr">Representations</a>
  <a href="#dfs">DFS on Graphs</a>
  <a href="#bfs">BFS on Graphs</a>
  <a href="#union-find">Union-Find</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Graphs</em></h1>
  <p class="subtitle">Chapter 9 · Networks of nodes and edges</p>

  <h2 id="what"><span class="emoji">🕸️</span>What is a Graph?</h2>

  <p>A graph is a collection of <strong>nodes</strong> (also called vertices) connected by <strong>edges</strong>. It's the most general data structure — trees, linked lists, and grids are all special cases of graphs.</p>

  <ul>
    <li><strong>Directed vs Undirected:</strong> in a directed graph, edges have a direction (A → B does not imply B → A). Twitter follows are directed; friendships are undirected.</li>
    <li><strong>Weighted vs Unweighted:</strong> edges can carry a cost/distance (road maps, flight prices) or not (just connected / not connected).</li>
    <li><strong>Trees are graphs:</strong> a connected, acyclic undirected graph with V nodes and V-1 edges is a tree.</li>
  </ul>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Road Maps and Social Networks</div>
    A city road map is a weighted graph: intersections are nodes, roads are edges, and distance is the weight. Instagram's follower graph is a directed graph: each "follow" is a one-way edge. Every network you interact with daily is a graph.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Undirected graph — 6 nodes, 7 edges</div>
    <svg width="100%" height="200" viewBox="0 0 500 200">
      <defs>
        <marker id="g-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8A8F9E"/>
        </marker>
      </defs>
      <!-- Edges -->
      <line x1="100" y1="60"  x2="220" y2="60"  stroke="#D8D5D0" stroke-width="2"/>
      <line x1="100" y1="60"  x2="100" y2="150" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="220" y1="60"  x2="340" y2="60"  stroke="#D8D5D0" stroke-width="2"/>
      <line x1="220" y1="60"  x2="220" y2="150" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="340" y1="60"  x2="340" y2="150" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="100" y1="150" x2="220" y2="150" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="220" y1="150" x2="340" y2="150" stroke="#D8D5D0" stroke-width="2"/>
      <!-- Node 0 -->
      <circle cx="100" cy="60"  r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="100" y="65"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">0</text>
      <!-- Node 1 -->
      <circle cx="220" cy="60"  r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="220" y="65"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">1</text>
      <!-- Node 2 -->
      <circle cx="340" cy="60"  r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="340" y="65"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">2</text>
      <!-- Node 3 -->
      <circle cx="100" cy="150" r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="100" y="155" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">3</text>
      <!-- Node 4 -->
      <circle cx="220" cy="150" r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="220" y="155" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">4</text>
      <!-- Node 5 -->
      <circle cx="340" cy="150" r="22" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
      <text x="340" y="155" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold">5</text>
    </svg>
  </div>

  <h2 id="repr"><span class="emoji">📋</span>Graph Representations</h2>

  <p>Two common ways to store a graph in code:</p>

  <h3>Adjacency List</h3>
  <p>A dictionary (or list of lists) where each node maps to a list of its neighbours. <strong>Space: O(V + E)</strong> — stores only the edges that actually exist. Preferred for most LeetCode problems because real-world graphs are sparse (few edges relative to the number of possible edges).</p>

  <pre><code><span class="cls">Adjacency List</span>
<span class="cm"># Build from an edge list</span>
<span class="kw">from</span> collections <span class="kw">import</span> defaultdict

edges = [(<span class="num">0</span>, <span class="num">1</span>), (<span class="num">0</span>, <span class="num">3</span>), (<span class="num">1</span>, <span class="num">2</span>), (<span class="num">1</span>, <span class="num">4</span>), (<span class="num">2</span>, <span class="num">5</span>)]
graph = defaultdict(<span class="fn">list</span>)

<span class="kw">for</span> u, v <span class="kw">in</span> edges:
    graph[u].append(v)
    graph[v].append(u)   <span class="cm"># undirected: add both directions</span>

<span class="cm"># graph = {0: [1, 3], 1: [0, 2, 4], 2: [1, 5], ...}</span>
<span class="cm"># Neighbours of node 1: graph[1]  → O(1)</span>
<span class="cm"># Space: O(V + E) — only actual edges stored</span></code><span class="code-label">Python</span></pre>

  <h3>Adjacency Matrix</h3>
  <p>A 2D grid where <code>matrix[i][j] = 1</code> if there is an edge from i to j (0 otherwise). Good for <em>dense</em> graphs or when you need fast edge existence checks. <strong>Space: O(V²)</strong> — wastes memory for sparse graphs.</p>

  <pre><code><span class="cls">Adjacency Matrix</span>
n = <span class="num">6</span>   <span class="cm"># number of nodes</span>
matrix = [[<span class="num">0</span>] * n <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n)]

<span class="kw">for</span> u, v <span class="kw">in</span> edges:
    matrix[u][v] = <span class="num">1</span>
    matrix[v][u] = <span class="num">1</span>   <span class="cm"># undirected</span>

<span class="cm"># Is there an edge between 1 and 2? matrix[1][2] → O(1)</span>
<span class="cm"># But iterating neighbours of node 1 requires scanning the full row → O(V)</span>
<span class="cm"># Space: O(V²) regardless of how many edges exist</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">Which to use on LeetCode</div>
    Almost always the <strong>adjacency list</strong>. Most graph problems give you a sparse edge list. The matrix shines only when V is small (e.g., ≤ 100) and you repeatedly ask "does edge (i,j) exist?"
  </div>

  <h2 id="dfs"><span class="emoji">🔍</span>DFS on Graphs</h2>

  <p>Depth-First Search on graphs is the same idea as on trees — explore as deep as possible before backtracking — but with one crucial addition: a <strong>visited set</strong> to avoid revisiting nodes (and getting stuck in cycles).</p>

  <pre><code><span class="cls">DFS — Recursive</span>
<span class="kw">def</span> <span class="fn">dfs</span>(graph, node, visited):
    visited.<span class="fn">add</span>(node)
    <span class="fn">print</span>(node)              <span class="cm"># process node</span>
    <span class="kw">for</span> neighbour <span class="kw">in</span> graph[node]:
        <span class="kw">if</span> neighbour <span class="kw">not in</span> visited:
            <span class="fn">dfs</span>(graph, neighbour, visited)

visited = <span class="fn">set</span>()
<span class="fn">dfs</span>(graph, <span class="num">0</span>, visited)   <span class="cm"># start from node 0</span>

<span class="cls">DFS — Iterative (explicit stack)</span>
<span class="kw">def</span> <span class="fn">dfs_iter</span>(graph, start):
    visited = <span class="fn">set</span>()
    stack = [start]
    <span class="kw">while</span> stack:
        node = stack.<span class="fn">pop</span>()
        <span class="kw">if</span> node <span class="kw">in</span> visited:
            <span class="kw">continue</span>
        visited.<span class="fn">add</span>(node)
        <span class="fn">print</span>(node)
        <span class="kw">for</span> neighbour <span class="kw">in</span> graph[node]:
            <span class="kw">if</span> neighbour <span class="kw">not in</span> visited:
                stack.<span class="fn">append</span>(neighbour)
    <span class="kw">return</span> visited

<span class="cls">Count connected components with DFS</span>
<span class="kw">def</span> <span class="fn">count_components</span>(n, edges):
    graph = defaultdict(<span class="fn">list</span>)
    <span class="kw">for</span> u, v <span class="kw">in</span> edges:
        graph[u].append(v); graph[v].append(u)

    visited = <span class="fn">set</span>()
    components = <span class="num">0</span>
    <span class="kw">for</span> node <span class="kw">in</span> <span class="fn">range</span>(n):
        <span class="kw">if</span> node <span class="kw">not in</span> visited:
            <span class="fn">dfs</span>(graph, node, visited)
            components += <span class="num">1</span>   <span class="cm"># each DFS call = one component</span>
    <span class="kw">return</span> components</code><span class="code-label">Python</span></pre>

  <div class="callout warn">
    <div class="callout-title">Never forget the visited set</div>
    Without a visited set, DFS on a graph with a cycle will loop forever. On trees you don't need it (trees have no cycles), but the moment you're on a general graph, always track what you've visited.
  </div>

  <h2 id="bfs"><span class="emoji">🌊</span>BFS on Graphs</h2>

  <p>Breadth-First Search explores all nodes at the current "level" before going deeper. It uses a <strong>queue</strong> (FIFO) instead of a stack. The key property: BFS finds the <strong>shortest path</strong> (fewest edges) in an unweighted graph.</p>

  <pre><code><span class="cls">BFS — Shortest path in unweighted graph</span>
<span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="kw">def</span> <span class="fn">bfs</span>(graph, start):
    visited = {start}
    queue = deque([start])
    level = <span class="num">0</span>

    <span class="kw">while</span> queue:
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(queue)):   <span class="cm"># process one level at a time</span>
            node = queue.<span class="fn">popleft</span>()
            <span class="fn">print</span>(<span class="st">f"Level {level}: node {node}"</span>)
            <span class="kw">for</span> nbr <span class="kw">in</span> graph[node]:
                <span class="kw">if</span> nbr <span class="kw">not in</span> visited:
                    visited.<span class="fn">add</span>(nbr)
                    queue.<span class="fn">append</span>(nbr)
        level += <span class="num">1</span>

<span class="cls">BFS — Find shortest path between two nodes</span>
<span class="kw">def</span> <span class="fn">shortest_path</span>(graph, src, dst):
    visited = {src}
    queue = deque([(src, <span class="num">0</span>)])        <span class="cm"># (node, distance)</span>
    <span class="kw">while</span> queue:
        node, dist = queue.<span class="fn">popleft</span>()
        <span class="kw">if</span> node == dst: <span class="kw">return</span> dist
        <span class="kw">for</span> nbr <span class="kw">in</span> graph[node]:
            <span class="kw">if</span> nbr <span class="kw">not in</span> visited:
                visited.<span class="fn">add</span>(nbr)
                queue.<span class="fn">append</span>((nbr, dist + <span class="num">1</span>))
    <span class="kw">return</span> -<span class="num">1</span>   <span class="cm"># unreachable</span></code><span class="code-label">Python</span></pre>

  <h3>Interactive Demo — BFS on a Graph</h3>
  <div class="demo-box">
    <h4>BFS Traversal from Node 0</h4>
    <div class="demo-controls">
      <button class="btn" onclick="bfsStep()" id="bfs-btn">Next Step →</button>
      <button class="btn" onclick="bfsReset()">Reset</button>
    </div>
    <div class="diagram-wrap" style="margin: 0 0 1rem;">
      <svg width="100%" height="180" viewBox="0 0 460 180" id="bfs-svg">
        <!-- Edges: 0-1, 0-2, 1-3, 2-4 -->
        <line id="bfs-e01" x1="100" y1="90" x2="230" y2="40"  stroke="#D8D5D0" stroke-width="2"/>
        <line id="bfs-e02" x1="100" y1="90" x2="230" y2="145" stroke="#D8D5D0" stroke-width="2"/>
        <line id="bfs-e13" x1="230" y1="40"  x2="360" y2="40"  stroke="#D8D5D0" stroke-width="2"/>
        <line id="bfs-e24" x1="230" y1="145" x2="360" y2="145" stroke="#D8D5D0" stroke-width="2"/>
        <!-- Nodes -->
        <circle id="bfs-n0" cx="100" cy="90"  r="24" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
        <text    x="100" y="95"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold" style="pointer-events:none">0</text>
        <circle id="bfs-n1" cx="230" cy="40"  r="24" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
        <text    x="230" y="45"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold" style="pointer-events:none">1</text>
        <circle id="bfs-n2" cx="230" cy="145" r="24" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
        <text    x="230" y="150" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold" style="pointer-events:none">2</text>
        <circle id="bfs-n3" cx="360" cy="40"  r="24" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
        <text    x="360" y="45"  text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold" style="pointer-events:none">3</text>
        <circle id="bfs-n4" cx="360" cy="145" r="24" fill="#FFFFFF" stroke="#2B5CE6" stroke-width="2"/>
        <text    x="360" y="150" text-anchor="middle" fill="#18192A" font-size="14" font-weight="bold" style="pointer-events:none">4</text>
      </svg>
    </div>
    <div class="demo-output" id="bfs-output">Graph: 0 connected to 1 and 2; 1 connected to 3; 2 connected to 4. Click "Next Step" to begin BFS from node 0.</div>
  </div>

  <h2 id="union-find"><span class="emoji">🔗</span>Union-Find (Disjoint Set Union)</h2>

  <p>Union-Find is a data structure that efficiently tracks which nodes belong to the same <strong>connected component</strong>. It supports two operations:</p>
  <ul>
    <li><code>find(x)</code> — which group does x belong to? (returns the root/representative of x's component)</li>
    <li><code>union(x, y)</code> — merge the groups containing x and y</li>
  </ul>
  <p>With <strong>path compression</strong> and <strong>union by rank</strong>, both operations run in O(α(n)) — effectively O(1) for any practical input size (α is the inverse Ackermann function).</p>

  <pre><code><span class="cls">Union-Find with path compression + union by rank</span>
<span class="kw">class</span> <span class="cls">UnionFind</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, n):
        self.parent = <span class="fn">list</span>(<span class="fn">range</span>(n))   <span class="cm"># each node is its own root</span>
        self.rank   = [<span class="num">0</span>] * n

    <span class="kw">def</span> <span class="fn">find</span>(self, x):
        <span class="kw">if</span> self.parent[x] != x:
            self.parent[x] = self.<span class="fn">find</span>(self.parent[x])  <span class="cm"># path compression</span>
        <span class="kw">return</span> self.parent[x]

    <span class="kw">def</span> <span class="fn">union</span>(self, x, y):
        rx, ry = self.<span class="fn">find</span>(x), self.<span class="fn">find</span>(y)
        <span class="kw">if</span> rx == ry: <span class="kw">return</span> <span class="kw">False</span>   <span class="cm"># already in same component</span>
        <span class="kw">if</span> self.rank[rx] &lt; self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx          <span class="cm"># attach shorter tree under taller</span>
        <span class="kw">if</span> self.rank[rx] == self.rank[ry]:
            self.rank[rx] += <span class="num">1</span>
        <span class="kw">return</span> <span class="kw">True</span>

<span class="cm"># Count connected components</span>
uf = <span class="cls">UnionFind</span>(<span class="num">5</span>)
<span class="kw">for</span> u, v <span class="kw">in</span> [(<span class="num">0</span>,<span class="num">1</span>),(<span class="num">1</span>,<span class="num">2</span>),(<span class="num">3</span>,<span class="num">4</span>)]:
    uf.<span class="fn">union</span>(u, v)

<span class="cm"># find(0) == find(2) → True  (same component)</span>
<span class="cm"># find(0) == find(3) → False (different components)</span></code><span class="code-label">Python</span></pre>

  <div class="callout">
    <div class="callout-title">When to use Union-Find vs BFS/DFS</div>
    Use BFS/DFS when you need to traverse or explore the graph. Use Union-Find when you only need to answer <em>connectivity</em> questions ("are nodes X and Y in the same component?") as edges are added dynamically. Union-Find cannot detect directed cycles or find shortest paths.
  </div>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity Cheat Sheet</h2>

  <table>
    <thead>
      <tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>DFS (recursive / iterative)</td><td class="o-n">O(V + E)</td><td class="o-n">O(V)</td><td>Visit each vertex and edge once; O(V) for visited set + stack</td></tr>
      <tr><td>BFS</td><td class="o-n">O(V + E)</td><td class="o-n">O(V)</td><td>Visit each vertex and edge once; O(V) for visited set + queue</td></tr>
      <tr><td>Adjacency List build</td><td class="o-n">O(V + E)</td><td class="o-n">O(V + E)</td><td>One entry per node, two per undirected edge</td></tr>
      <tr><td>Adjacency Matrix build</td><td class="o-n2">O(V²)</td><td class="o-n2">O(V²)</td><td>Full V×V grid regardless of edge count</td></tr>
      <tr><td>Union-Find (find / union)</td><td class="o-1">O(α(n))</td><td class="o-n">O(V)</td><td>α(n) ≈ O(1) practically; parent + rank arrays</td></tr>
    </tbody>
  </table>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>These four problems cover the core graph patterns. Each one has a classic "go-to" approach — try to identify which algorithm fits before starting.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#200 · Number of Islands</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an m×n grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.
      <br><br>
      <strong>Example:</strong> a 4×4 grid with two groups of connected '1's → <code>2</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Iterate every cell. When you find an unvisited '1', run DFS/BFS to mark the entire island as visited (set cells to '0' or add to a visited set). Count how many times you start a new DFS — that's your island count.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">num_islands</span>(grid: <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">str</span>]]) -> <span class="fn">int</span>:
    rows, cols = <span class="fn">len</span>(grid), <span class="fn">len</span>(grid[<span class="num">0</span>])
    visited = <span class="fn">set</span>()

    <span class="kw">def</span> <span class="fn">dfs</span>(r, c):
        <span class="kw">if</span> (
            r &lt; <span class="num">0</span> <span class="kw">or</span> r &gt;= rows <span class="kw">or</span>
            c &lt; <span class="num">0</span> <span class="kw">or</span> c &gt;= cols <span class="kw">or</span>
            grid[r][c] == <span class="st">"0"</span> <span class="kw">or</span> (r, c) <span class="kw">in</span> visited
        ):
            <span class="kw">return</span>
        visited.add((r, c))            <span class="cm"># mark this land cell as part of the current island</span>
        <span class="kw">for</span> dr, dc <span class="kw">in</span> [(<span class="num">1</span>,<span class="num">0</span>), (-<span class="num">1</span>,<span class="num">0</span>), (<span class="num">0</span>,<span class="num">1</span>), (<span class="num">0</span>,-<span class="num">1</span>)]:
            dfs(r + dr, c + dc)        <span class="cm"># flood-fill into the 4 neighbours</span>

    islands = <span class="num">0</span>
    <span class="kw">for</span> r <span class="kw">in</span> <span class="fn">range</span>(rows):
        <span class="kw">for</span> c <span class="kw">in</span> <span class="fn">range</span>(cols):
            <span class="kw">if</span> grid[r][c] == <span class="st">"1"</span> <span class="kw">and</span> (r, c) <span class="kw">not</span> <span class="kw">in</span> visited:
                islands += <span class="num">1</span>          <span class="cm"># found a new, unvisited island</span>
                dfs(r, c)               <span class="cm"># sink the whole island into visited</span>
    <span class="kw">return</span> islands</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(m·n) — every cell visited once &nbsp;·&nbsp; <strong>Space:</strong> O(m·n) — visited set + recursion stack worst case</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/number-of-islands/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#133 · Clone Graph</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.
      <br><br>
      <strong>Example:</strong> a graph with 4 nodes where node 1 connects to 2 and 4, etc. → return the cloned root.
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">BFS from the given node. Maintain a hash map <code>original → clone</code>. For each node you dequeue, clone its neighbours (if not yet cloned) and wire up the edges on the cloned side.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="kw">def</span> <span class="fn">clone_graph</span>(node: <span class="st">'Node'</span>) -> <span class="st">'Node'</span>:
    <span class="kw">if</span> <span class="kw">not</span> node:
        <span class="kw">return</span> <span class="kw">None</span>

    clones = {node: <span class="cls">Node</span>(node.val)}   <span class="cm"># original → clone map</span>
    queue = deque([node])

    <span class="kw">while</span> queue:
        cur = queue.popleft()
        <span class="kw">for</span> neighbor <span class="kw">in</span> cur.neighbors:
            <span class="kw">if</span> neighbor <span class="kw">not</span> <span class="kw">in</span> clones:
                clones[neighbor] = <span class="cls">Node</span>(neighbor.val)  <span class="cm"># clone on first sight</span>
                queue.append(neighbor)
            clones[cur].neighbors.append(clones[neighbor])  <span class="cm"># wire up the cloned edge</span>

    <span class="kw">return</span> clones[node]</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(V + E) — every node and edge processed once &nbsp;·&nbsp; <strong>Space:</strong> O(V) — clone map + queue</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/clone-graph/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#207 · Course Schedule</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      There are <code>numCourses</code> courses. Some have prerequisites: <code>[a, b]</code> means you must take b before a. Return <code>True</code> if you can finish all courses.
      <br><br>
      <strong>Example:</strong> <code>numCourses = 2</code>, <code>prerequisites = [[1,0],[0,1]]</code> → <code>False</code> (cycle)
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Build a directed graph. The problem reduces to: does this directed graph have a cycle? Run DFS; track nodes in the <em>current recursion path</em> (a separate "in-progress" set). If you revisit a node that's still in-progress, there's a cycle.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">can_finish</span>(num_courses: <span class="fn">int</span>, prerequisites: <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">int</span>]]) -> <span class="fn">bool</span>:
    graph = {i: [] <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(num_courses)}
    <span class="kw">for</span> course, pre <span class="kw">in</span> prerequisites:
        graph[course].append(pre)     <span class="cm"># course depends on pre</span>

    in_progress = <span class="fn">set</span>()    <span class="cm"># nodes on the current DFS path — a cycle if revisited</span>
    visited = <span class="fn">set</span>()       <span class="cm"># fully processed nodes — safe to skip</span>

    <span class="kw">def</span> <span class="fn">has_cycle</span>(course):
        <span class="kw">if</span> course <span class="kw">in</span> in_progress:
            <span class="kw">return</span> <span class="kw">True</span>          <span class="cm"># revisited a node still on the path → cycle</span>
        <span class="kw">if</span> course <span class="kw">in</span> visited:
            <span class="kw">return</span> <span class="kw">False</span>         <span class="cm"># already proven cycle-free</span>

        in_progress.add(course)
        <span class="kw">for</span> pre <span class="kw">in</span> graph[course]:
            <span class="kw">if</span> <span class="fn">has_cycle</span>(pre):
                <span class="kw">return</span> <span class="kw">True</span>
        in_progress.remove(course)
        visited.add(course)
        <span class="kw">return</span> <span class="kw">False</span>

    <span class="kw">return</span> <span class="kw">not</span> <span class="fn">any</span>(<span class="fn">has_cycle</span>(c) <span class="kw">for</span> c <span class="kw">in</span> <span class="fn">range</span>(num_courses))</code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(V + E) — each course and prerequisite edge visited once &nbsp;·&nbsp; <strong>Space:</strong> O(V + E) — graph + recursion stack</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/course-schedule/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#417 · Pacific Atlantic Water Flow</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given an m×n matrix of heights, water can flow to adjacent cells with equal or lower height. Find all cells from which water can reach <em>both</em> the Pacific ocean (top/left border) and the Atlantic ocean (bottom/right border).
      <br>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Instead of simulating water flowing down, reverse it — do BFS/DFS <em>uphill</em> from each ocean's border. Find all cells reachable from the Pacific border, then all cells reachable from the Atlantic border. The intersection is your answer.</p>
        </details>
      <details class="solution-details">
        <summary>Show optimal solution</summary>
        <pre><code><span class="kw">def</span> <span class="fn">pacific_atlantic</span>(heights: <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">int</span>]]) -> <span class="fn">list</span>[<span class="fn">list</span>[<span class="fn">int</span>]]:
    <span class="kw">if</span> <span class="kw">not</span> heights:
        <span class="kw">return</span> []
    rows, cols = <span class="fn">len</span>(heights), <span class="fn">len</span>(heights[<span class="num">0</span>])
    pacific, atlantic = <span class="fn">set</span>(), <span class="fn">set</span>()

    <span class="kw">def</span> <span class="fn">dfs</span>(r, c, visited, prev_height):
        <span class="kw">if</span> (
            r &lt; <span class="num">0</span> <span class="kw">or</span> r &gt;= rows <span class="kw">or</span> c &lt; <span class="num">0</span> <span class="kw">or</span> c &gt;= cols <span class="kw">or</span>
            (r, c) <span class="kw">in</span> visited <span class="kw">or</span> heights[r][c] &lt; prev_height
        ):
            <span class="kw">return</span>                       <span class="cm"># can't flow uphill into a lower cell from here</span>
        visited.add((r, c))
        <span class="kw">for</span> dr, dc <span class="kw">in</span> [(<span class="num">1</span>,<span class="num">0</span>), (-<span class="num">1</span>,<span class="num">0</span>), (<span class="num">0</span>,<span class="num">1</span>), (<span class="num">0</span>,-<span class="num">1</span>)]:
            dfs(r + dr, c + dc, visited, heights[r][c])

    <span class="kw">for</span> c <span class="kw">in</span> <span class="fn">range</span>(cols):
        dfs(<span class="num">0</span>, c, pacific, heights[<span class="num">0</span>][c])         <span class="cm"># top border → Pacific</span>
        dfs(rows - <span class="num">1</span>, c, atlantic, heights[rows - <span class="num">1</span>][c])  <span class="cm"># bottom border → Atlantic</span>
    <span class="kw">for</span> r <span class="kw">in</span> <span class="fn">range</span>(rows):
        dfs(r, <span class="num">0</span>, pacific, heights[r][<span class="num">0</span>])         <span class="cm"># left border → Pacific</span>
        dfs(r, cols - <span class="num">1</span>, atlantic, heights[r][cols - <span class="num">1</span>])  <span class="cm"># right border → Atlantic</span>

    <span class="kw">return</span> [<span class="fn">list</span>(cell) <span class="kw">for</span> cell <span class="kw">in</span> pacific &amp; atlantic]  <span class="cm"># reachable from both oceans</span></code></pre>
        <p class="complexity-line"><strong>Time:</strong> O(m·n) — 4 border DFS sweeps, each visiting cells at most once &nbsp;·&nbsp; <strong>Space:</strong> O(m·n) — two visited sets + recursion stack</p>
      </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/pacific-atlantic-water-flow/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to practice</div>
    Start with <strong>#200 Number of Islands</strong> — it's the canonical graph problem and the DFS/grid pattern appears in dozens of variations. Once you solve it, <strong>#207 Course Schedule</strong> is the next must-do (cycle detection in directed graphs comes up constantly).
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: center; align-items: center;">
    <a href="/dsa/dynamic-programming" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Dynamic Programming</a>
    <span style="margin: 0 1rem; color: var(--border);">·</span>
    <a href="/dsa" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">← Back to Home</a>
  </div>
</article>
`
}

export function init() {
  // BFS demo state
  // Graph: 0-1, 0-2, 1-3, 2-4
  const bfsAdj = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 4],
    3: [1],
    4: [2]
  }

  // BFS steps pre-computed
  // Level 0: visit 0
  // Level 1: visit 1, visit 2
  // Level 2: visit 3, visit 4
  const bfsSteps = [
    { visit: 0, queueBefore: [0],       queueAfter: [1, 2],    msg: 'Dequeue 0. Visit node 0. Enqueue unvisited neighbours: [1, 2].' },
    { visit: 1, queueBefore: [1, 2],    queueAfter: [2, 3],    msg: 'Dequeue 1. Visit node 1. Enqueue unvisited neighbour: [3]. (0 already visited)' },
    { visit: 2, queueBefore: [2, 3],    queueAfter: [3, 4],    msg: 'Dequeue 2. Visit node 2. Enqueue unvisited neighbour: [4]. (0 already visited)' },
    { visit: 3, queueBefore: [3, 4],    queueAfter: [4],       msg: 'Dequeue 3. Visit node 3. No unvisited neighbours.' },
    { visit: 4, queueBefore: [4],       queueAfter: [],        msg: 'Dequeue 4. Visit node 4. No unvisited neighbours. Queue empty — BFS complete!' }
  ]

  let bfsStepIdx = 0
  const bfsVisited = new Set()

  function bfsColorNode(id, color) {
    const el = document.getElementById('bfs-n' + id)
    if (!el) return
    if (color === 'visited') {
      el.setAttribute('fill', 'rgba(42,122,82,0.18)')
      el.setAttribute('stroke', '#2A7A52')
    } else if (color === 'current') {
      el.setAttribute('fill', 'rgba(43,92,230,0.18)')
      el.setAttribute('stroke', '#2B5CE6')
    } else {
      el.setAttribute('fill', '#FFFFFF')
      el.setAttribute('stroke', '#2B5CE6')
    }
  }

  function bfsRenderAll() {
    for (let i = 0; i <= 4; i++) bfsColorNode(i, 'default')
    bfsVisited.forEach(n => bfsColorNode(n, 'visited'))
  }

  window.bfsStep = function() {
    if (bfsStepIdx >= bfsSteps.length) return
    const step = bfsSteps[bfsStepIdx]
    bfsVisited.add(step.visit)
    bfsRenderAll()
    bfsColorNode(step.visit, 'current')
    const qAfterStr = step.queueAfter.length ? '[' + step.queueAfter.join(', ') + ']' : '[]  ← done'
    document.getElementById('bfs-output').textContent = step.msg + '  |  Queue after: ' + qAfterStr
    bfsStepIdx++
    if (bfsStepIdx >= bfsSteps.length) {
      document.getElementById('bfs-btn').textContent = 'Done ✓'
    }
  }

  window.bfsReset = function() {
    bfsStepIdx = 0
    bfsVisited.clear()
    for (let i = 0; i <= 4; i++) bfsColorNode(i, 'default')
    document.getElementById('bfs-btn').textContent = 'Next Step →'
    document.getElementById('bfs-output').textContent = 'Graph: 0 connected to 1 and 2; 1 connected to 3; 2 connected to 4. Click "Next Step" to begin BFS from node 0.'
  }
}
