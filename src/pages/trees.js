export function render() {
  return `
<div class="toc">
  <h4>On This Page</h4>
  <a href="#what">What is a Tree?</a>
  <a href="#impl">Python Implementation</a>
  <a href="#dfs">DFS — Depth First Search</a>
  <a href="#bfs">BFS — Breadth First Search</a>
  <a href="#bst">Binary Search Trees</a>
  <a href="#complexity">Complexity</a>
  <a href="#problems">Practice Problems</a>
</div>

<article>
  <h1><em>Trees</em> &amp; BFS/DFS</h1>
  <p class="subtitle">Chapter 7 · Hierarchical data, recursive traversals</p>

  <h2 id="what"><span class="emoji">🌳</span>What is a Tree?</h2>

  <p>A <strong>tree</strong> is a hierarchical data structure with a single <strong>root</strong> node. Every node has zero or more <em>children</em>, and every node except the root has exactly one <em>parent</em>. A <strong>binary tree</strong> constrains each node to at most <strong>two children</strong> — conventionally called <em>left</em> and <em>right</em>.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Company Org Chart</div>
    The CEO is the root. Each VP reports to the CEO (root's children). Each Director reports to a VP. Unlike an array (a flat list), trees model relationships where one thing <em>owns</em> or <em>contains</em> others — file systems, HTML DOM, Git commits, decision trees.
  </div>

  <div class="diagram-wrap">
    <div class="diagram-title">Binary tree — root 4, children 2 and 6, grandchildren 1 and 3</div>
    <svg width="100%" height="200" viewBox="0 0 400 200">
      <defs>
        <marker id="tree-arr" markerWidth="0" markerHeight="0" refX="0" refY="0" orient="auto">
        </marker>
      </defs>

      <!-- Edges -->
      <line x1="200" y1="50"  x2="110" y2="110" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="200" y1="50"  x2="290" y2="110" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="110" y1="130" x2="55"  y2="170" stroke="#D8D5D0" stroke-width="2"/>
      <line x1="110" y1="130" x2="165" y2="170" stroke="#D8D5D0" stroke-width="2"/>

      <!-- Root node: 4 -->
      <circle cx="200" cy="40" r="28" fill="rgba(43,92,230,0.1)" stroke="#2B5CE6" stroke-width="2"/>
      <text x="200" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">4</text>
      <text x="200" y="14" text-anchor="middle" font-size="10" fill="#8A8F9E">root</text>

      <!-- Left child: 2 -->
      <circle cx="110" cy="120" r="28" fill="rgba(42,122,82,0.1)" stroke="#2A7A52" stroke-width="2"/>
      <text x="110" y="126" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">2</text>

      <!-- Right child: 6 -->
      <circle cx="290" cy="120" r="28" fill="rgba(42,122,82,0.1)" stroke="#2A7A52" stroke-width="2"/>
      <text x="290" y="126" text-anchor="middle" font-size="16" font-weight="700" fill="#18192A">6</text>
      <text x="290" y="94" text-anchor="middle" font-size="10" fill="#8A8F9E">leaf</text>

      <!-- Left-Left grandchild: 1 -->
      <circle cx="55" cy="180" r="24" fill="rgba(196,127,23,0.1)" stroke="#C47F17" stroke-width="2"/>
      <text x="55" y="186" text-anchor="middle" font-size="15" font-weight="700" fill="#18192A">1</text>
      <text x="55" y="196" text-anchor="middle" font-size="9" fill="#8A8F9E">leaf</text>

      <!-- Left-Right grandchild: 3 -->
      <circle cx="165" cy="180" r="24" fill="rgba(196,127,23,0.1)" stroke="#C47F17" stroke-width="2"/>
      <text x="165" y="186" text-anchor="middle" font-size="15" font-weight="700" fill="#18192A">3</text>
      <text x="165" y="196" text-anchor="middle" font-size="9" fill="#8A8F9E">leaf</text>

      <!-- Labels: left / right -->
      <text x="143" y="82" text-anchor="middle" font-size="9" fill="#8A8F9E">left</text>
      <text x="253" y="82" text-anchor="middle" font-size="9" fill="#8A8F9E">right</text>
      <text x="73"  y="157" text-anchor="middle" font-size="9" fill="#8A8F9E">left</text>
      <text x="148" y="157" text-anchor="middle" font-size="9" fill="#8A8F9E">right</text>
    </svg>
  </div>

  <p>Key vocabulary:</p>
  <ul>
    <li><strong>Root</strong> — the single top-most node (no parent)</li>
    <li><strong>Leaf</strong> — a node with no children</li>
    <li><strong>Height</strong> — the longest path from root to any leaf</li>
    <li><strong>Depth</strong> — distance from the root to a given node</li>
    <li><strong>Subtree</strong> — any node plus all its descendants</li>
  </ul>

  <h2 id="impl"><span class="emoji">🐍</span>Python Implementation</h2>

  <p>A binary tree node holds a value and optional <code>left</code> / <code>right</code> references to child nodes. <code>None</code> means no child.</p>

  <pre><code><span class="kw">class</span> <span class="cls">TreeNode</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, val=<span class="num">0</span>, left=<span class="kw">None</span>, right=<span class="kw">None</span>):
        <span class="kw">self</span>.val   = val
        <span class="kw">self</span>.left  = left
        <span class="kw">self</span>.right = right

<span class="cm"># Build the tree from the diagram above manually:</span>
<span class="cm">#       4</span>
<span class="cm">#      / \</span>
<span class="cm">#     2   6</span>
<span class="cm">#    / \</span>
<span class="cm">#   1   3</span>

root = <span class="cls">TreeNode</span>(<span class="num">4</span>)
root.left        = <span class="cls">TreeNode</span>(<span class="num">2</span>)
root.right       = <span class="cls">TreeNode</span>(<span class="num">6</span>)
root.left.left   = <span class="cls">TreeNode</span>(<span class="num">1</span>)
root.left.right  = <span class="cls">TreeNode</span>(<span class="num">3</span>)

<span class="cm"># LeetCode gives you problems where root is already built.</span>
<span class="cm"># You never construct TreeNode yourself in the contest — just traverse it.</span></code><span class="code-label">Python</span></pre>

  <h2 id="dfs"><span class="emoji">🏊</span>DFS — Depth First Search</h2>

  <p>DFS dives as deep as possible along one branch before backtracking. There are three orderings — the difference is <strong>when you visit the current node</strong> relative to its children.</p>

  <table>
    <thead>
      <tr><th>Order</th><th>Pattern</th><th>When to use</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>PreOrder</strong></td><td>root → left → right</td><td>Serialize/clone a tree; print hierarchy</td></tr>
      <tr><td><strong>InOrder</strong></td><td>left → root → right</td><td>BST gives sorted output; in-order successor</td></tr>
      <tr><td><strong>PostOrder</strong></td><td>left → right → root</td><td>Delete tree; compute subtree heights</td></tr>
    </tbody>
  </table>

  <pre><code><span class="kw">def</span> <span class="fn">preorder</span>(node):
    <span class="kw">if not</span> node:
        <span class="kw">return</span> []
    <span class="cm"># Visit BEFORE recursing into children</span>
    <span class="kw">return</span> [node.val] + <span class="fn">preorder</span>(node.left) + <span class="fn">preorder</span>(node.right)

<span class="kw">def</span> <span class="fn">inorder</span>(node):
    <span class="kw">if not</span> node:
        <span class="kw">return</span> []
    <span class="cm"># Visit BETWEEN children — gives sorted order for BST!</span>
    <span class="kw">return</span> <span class="fn">inorder</span>(node.left) + [node.val] + <span class="fn">inorder</span>(node.right)

<span class="kw">def</span> <span class="fn">postorder</span>(node):
    <span class="kw">if not</span> node:
        <span class="kw">return</span> []
    <span class="cm"># Visit AFTER children — children computed before parent</span>
    <span class="kw">return</span> <span class="fn">postorder</span>(node.left) + <span class="fn">postorder</span>(node.right) + [node.val]

<span class="cm"># For our tree (root=4, left=2, right=6, 2.left=1, 2.right=3):</span>
<span class="fn">print</span>(<span class="fn">preorder</span>(root))   <span class="cm"># [4, 2, 1, 3, 6]</span>
<span class="fn">print</span>(<span class="fn">inorder</span>(root))    <span class="cm"># [1, 2, 3, 4, 6]  ← sorted!</span>
<span class="fn">print</span>(<span class="fn">postorder</span>(root))  <span class="cm"># [1, 3, 2, 6, 4]</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">The Recursion Pattern</div>
    Every DFS function follows this structure: (1) base case — if node is None, return. (2) Recurse left. (3) Recurse right. The only thing that changes between PreOrder/InOrder/PostOrder is <em>where</em> you insert the current node's value between those two recursive calls. Once you see this, all three become trivial to remember.
  </div>

  <div class="callout warn">
    <div class="callout-title">Stack Depth = Tree Height</div>
    Recursive DFS uses the call stack — each function call for a node stays alive until that subtree is finished. If the tree is balanced, depth is O(log n) which is fine. If it's a degenerate (linked-list-like) tree, depth is O(n) and you'll hit Python's recursion limit. In that case, use an explicit stack.
  </div>

  <h2 id="bfs"><span class="emoji">🌊</span>BFS — Breadth First Search</h2>

  <p>BFS visits nodes <strong>level by level</strong>, from the root outward. It uses a <strong>queue</strong> (FIFO): enqueue the root, then repeatedly dequeue a node, process it, and enqueue its children.</p>

  <div class="callout analogy">
    <div class="callout-title">Analogy — Ripples in a Pond</div>
    Drop a stone in still water. Ripples spread outward in concentric rings — first the ring right around the stone, then the next ring, then the next. BFS works exactly like that: level 0 (root), level 1 (root's children), level 2 (grandchildren), and so on.
  </div>

  <pre><code><span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="kw">def</span> <span class="fn">level_order</span>(root):
    <span class="kw">if not</span> root:
        <span class="kw">return</span> []

    result = []
    queue = deque([root])

    <span class="kw">while</span> queue:
        level_size = <span class="fn">len</span>(queue)    <span class="cm"># number of nodes at this level</span>
        level = []

        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(level_size):
            node = queue.<span class="fn">popleft</span>()  <span class="cm"># dequeue from front</span>
            level.<span class="fn">append</span>(node.val)

            <span class="kw">if</span> node.left:
                queue.<span class="fn">append</span>(node.left)   <span class="cm"># enqueue children</span>
            <span class="kw">if</span> node.right:
                queue.<span class="fn">append</span>(node.right)

        result.<span class="fn">append</span>(level)

    <span class="kw">return</span> result

<span class="cm"># For our tree (root=4, 2, 6, 1, 3):</span>
<span class="fn">print</span>(<span class="fn">level_order</span>(root))
<span class="cm"># [[4], [2, 6], [1, 3]]   ← each sublist is one level</span></code><span class="code-label">Python</span></pre>

  <div class="callout tip">
    <div class="callout-title">BFS vs DFS — When to Use Which?</div>
    Use <strong>BFS</strong> when: you need the shortest path, you care about levels (level-order traversal, minimum depth), or you want to find something "closest to the root." Use <strong>DFS</strong> when: you need to explore full paths, compute subtree properties, or when memory is tight (DFS uses O(h) space; BFS can use O(w) where w is max width — in a complete binary tree, the last level has n/2 nodes, so BFS can use O(n) space).
  </div>

  <h2 id="bst"><span class="emoji">🔎</span>Binary Search Trees</h2>

  <p>A <strong>Binary Search Tree (BST)</strong> is a binary tree with an ordering invariant: for every node, <em>all values in the left subtree are smaller</em> and <em>all values in the right subtree are larger</em>.</p>

  <p>This means searching a BST is like binary search on an array — at each node you know exactly which subtree to follow.</p>

  <pre><code><span class="cm"># BST Property: left.val &lt; node.val &lt; right.val (for all nodes)</span>
<span class="cm">#</span>
<span class="cm">#       4         InOrder: [1, 2, 3, 4, 6] — sorted!</span>
<span class="cm">#      / \</span>
<span class="cm">#     2   6</span>
<span class="cm">#    / \</span>
<span class="cm">#   1   3</span>

<span class="kw">def</span> <span class="fn">search_bst</span>(node, target):
    <span class="kw">if not</span> node:
        <span class="kw">return</span> <span class="kw">None</span>           <span class="cm"># not found</span>
    <span class="kw">if</span> node.val == target:
        <span class="kw">return</span> node           <span class="cm"># found!</span>
    <span class="kw">elif</span> target &lt; node.val:
        <span class="kw">return</span> <span class="fn">search_bst</span>(node.left, target)   <span class="cm"># go left</span>
    <span class="kw">else</span>:
        <span class="kw">return</span> <span class="fn">search_bst</span>(node.right, target)  <span class="cm"># go right</span>

<span class="cm"># Each comparison eliminates half the tree — O(h) time</span>
<span class="cm"># Balanced BST: h = O(log n)  →  search is O(log n)</span>
<span class="cm"># Degenerate BST: h = O(n)    →  search degrades to O(n)</span>

result = <span class="fn">search_bst</span>(root, <span class="num">3</span>)
<span class="fn">print</span>(result.val <span class="kw">if</span> result <span class="kw">else</span> <span class="st">"not found"</span>)  <span class="cm"># 3</span></code><span class="code-label">Python</span></pre>

  <h2 id="complexity"><span class="emoji">⚡</span>Complexity</h2>

  <table>
    <thead>
      <tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>DFS (any order)</td><td class="o-n">O(n)</td><td class="o-logn">O(h)</td><td>h = tree height; call stack depth</td></tr>
      <tr><td>BFS (level order)</td><td class="o-n">O(n)</td><td class="o-n">O(w)</td><td>w = max width; last level can hold n/2 nodes</td></tr>
      <tr><td>BST Search</td><td class="o-logn">O(h)</td><td class="o-logn">O(h)</td><td>O(log n) balanced, O(n) degenerate</td></tr>
      <tr><td>BST Insert</td><td class="o-logn">O(h)</td><td class="o-logn">O(h)</td><td>Same as search — find the spot, place node</td></tr>
      <tr><td>Balanced tree height</td><td class="o-logn">O(log n)</td><td>—</td><td>Each level doubles the nodes</td></tr>
      <tr><td>Degenerate tree height</td><td class="o-n">O(n)</td><td>—</td><td>Sorted insertions create a linked list shape</td></tr>
    </tbody>
  </table>

  <h3>Interactive Demo — DFS PreOrder Traversal</h3>

  <div class="demo-box">
    <h4>Tree: root=4, left=2, right=6, 2.left=1, 2.right=3</h4>
    <div class="demo-controls">
      <button class="btn" onclick="dfsStep()" id="dfs-btn">Next Step →</button>
      <button class="btn" onclick="dfsReset()">Reset</button>
    </div>

    <!-- SVG tree visualization -->
    <div style="margin: 1rem 0;">
      <svg width="100%" height="190" viewBox="0 0 380 190" id="dfs-svg">
        <!-- Edges -->
        <line x1="190" y1="46"  x2="100" y2="104" stroke="#D8D5D0" stroke-width="2"/>
        <line x1="190" y1="46"  x2="280" y2="104" stroke="#D8D5D0" stroke-width="2"/>
        <line x1="100" y1="124" x2="45"  y2="162" stroke="#D8D5D0" stroke-width="2"/>
        <line x1="100" y1="124" x2="155" y2="162" stroke="#D8D5D0" stroke-width="2"/>

        <!-- Node 4 (root) -->
        <circle id="dfs-node-4" cx="190" cy="36" r="26" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="2"/>
        <text x="190" y="42" text-anchor="middle" font-size="15" font-weight="700" fill="#18192A">4</text>

        <!-- Node 2 -->
        <circle id="dfs-node-2" cx="100" cy="114" r="26" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="2"/>
        <text x="100" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="#18192A">2</text>

        <!-- Node 6 -->
        <circle id="dfs-node-6" cx="280" cy="114" r="26" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="2"/>
        <text x="280" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="#18192A">6</text>

        <!-- Node 1 -->
        <circle id="dfs-node-1" cx="45" cy="172" r="24" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="2"/>
        <text x="45" y="178" text-anchor="middle" font-size="14" font-weight="700" fill="#18192A">1</text>

        <!-- Node 3 -->
        <circle id="dfs-node-3" cx="155" cy="172" r="24" fill="rgba(43,92,230,0.08)" stroke="#2B5CE6" stroke-width="2"/>
        <text x="155" y="178" text-anchor="middle" font-size="14" font-weight="700" fill="#18192A">3</text>
      </svg>
    </div>

    <div style="margin: 0.4rem 0; font-size: 0.8rem; color: var(--muted); font-family: var(--font-display);">
      <span style="color: var(--amber); font-weight: 700;">Amber</span> = currently visiting &nbsp;|&nbsp;
      <span style="color: var(--green); font-weight: 700;">Green</span> = already visited
    </div>
    <div class="demo-output" id="dfs-output">PreOrder visits: root → left → right. Click "Next Step" to start.</div>
  </div>

  <h2 id="problems"><span class="emoji">🏋️</span>Practice Problems</h2>

  <p>Work through these in order — they cover both DFS and BFS patterns you just learned.</p>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#226 · Invert Binary Tree</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Mirror a binary tree — swap left and right subtrees at every node.
      <br><br>
      <strong>Example:</strong> root=4, children 2 and 7 → root=4, children 7 and 2 (recursively)
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">DFS PostOrder or PreOrder. At each node, swap <code>node.left</code> and <code>node.right</code>, then recurse into both children. The base case: if <code>node</code> is None, return None.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/invert-binary-tree/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#104 · Maximum Depth of Binary Tree</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      Return the height (number of nodes along the longest root-to-leaf path).
      <br><br>
      <strong>Example:</strong> tree <code>[3,9,20,null,null,15,7]</code> → <code>3</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Recursive DFS. At each node: <code>1 + max(depth(node.left), depth(node.right))</code>. Base case: if node is None, depth is 0. This naturally computes the maximum path length bottom-up.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/maximum-depth-of-binary-tree/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#543 · Diameter of Binary Tree</span>
      <span class="difficulty diff-easy">Easy</span>
    </div>
    <div class="problem-desc">
      The diameter is the length of the longest path between any two nodes (not necessarily through the root).
      <br><br>
      <strong>Example:</strong> tree <code>[1,2,3,4,5]</code> → <code>3</code> (path: 4→2→1→3)
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">At each node, the longest path through it is <code>left_height + right_height</code>. Use a <code>nonlocal max_d</code> variable to track the global maximum as you recurse. Your recursive function returns the <em>height</em> of the subtree, but updates <code>max_d</code> as a side effect.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/diameter-of-binary-tree/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#102 · Binary Tree Level Order Traversal</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Return the level-by-level values as a list of lists.
      <br><br>
      <strong>Example:</strong> root=3, children 9 and 20 → <code>[[3],[9,20],[15,7]]</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">BFS with a <code>deque</code>. At the start of each iteration, snapshot <code>len(queue)</code> — that's exactly how many nodes are at the current level. Process exactly that many nodes, then the queue contains the next level.</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/binary-tree-level-order-traversal/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="problem-card">
    <div class="problem-header">
      <span class="problem-title">#235 · Lowest Common Ancestor of a BST</span>
      <span class="difficulty diff-medium">Medium</span>
    </div>
    <div class="problem-desc">
      Given a BST and two nodes p and q, find their lowest common ancestor (the deepest node that is an ancestor of both).
      <br><br>
      <strong>Example:</strong> BST root=6, p=2, q=8 → <code>6</code>
      <details class="hint-details">
        <summary>Show hint</summary>
        <p class="hint-body">Exploit the BST property. If both p and q are less than root, the LCA is in the left subtree. If both are greater, go right. Otherwise — root is "between" them — root is the LCA. No need to search both subtrees!</p>
        </details>
    </div>
    <a class="problem-link" href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">Open on LeetCode ↗</a>
  </div>

  <div class="callout tip">
    <div class="callout-title">How to Practice</div>
    Start with <strong>#104</strong> (depth) — it teaches the core DFS recursion pattern in its simplest form. Then <strong>#226</strong> (invert) — same pattern, slight twist. Once those click, <strong>#543</strong> (diameter) introduces the "side-effect in recursion" pattern used in dozens of tree problems. Finally tackle BFS with <strong>#102</strong>.
  </div>

  <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <a href="/dsa/binary-search" style="color: var(--muted); text-decoration: none; font-size: 0.9rem;">← Binary Search</a>
    <a href="/dsa/dynamic-programming" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">Dynamic Programming →</a>
  </div>
</article>
`
}

export function init() {
  // DFS PreOrder demo: visits 4, 2, 1, 3, 6 in that order
  const dfsVisitOrder = [4, 2, 1, 3, 6]
  let dfsIdx = 0
  const dfsVisited = []

  const nodeColors = {
    default: { fill: 'rgba(43,92,230,0.08)', stroke: '#2B5CE6' },
    active:  { fill: 'rgba(196,127,23,0.18)', stroke: '#C47F17' },
    done:    { fill: 'rgba(42,122,82,0.15)',  stroke: '#2A7A52' }
  }

  function dfsSetNodeStyle(val, state) {
    const circle = document.getElementById('dfs-node-' + val)
    if (!circle) return
    circle.setAttribute('fill', nodeColors[state].fill)
    circle.setAttribute('stroke', nodeColors[state].stroke)
    circle.setAttribute('stroke-width', state === 'active' ? '3' : '2')
  }

  function dfsRenderAll() {
    // Reset all to default first
    dfsVisitOrder.forEach(v => dfsSetNodeStyle(v, 'default'))
    // Mark visited nodes as done
    dfsVisited.forEach(v => dfsSetNodeStyle(v, 'done'))
    // Mark current active
    if (dfsIdx < dfsVisitOrder.length) {
      dfsSetNodeStyle(dfsVisitOrder[dfsIdx], 'active')
    }
  }

  window.dfsStep = function() {
    if (dfsIdx >= dfsVisitOrder.length) return

    const val = dfsVisitOrder[dfsIdx]
    dfsVisited.push(val)
    dfsRenderAll()
    // Move highlight to next if there is one
    if (dfsIdx + 1 < dfsVisitOrder.length) {
      dfsSetNodeStyle(dfsVisitOrder[dfsIdx + 1], 'active')
    }

    const result = dfsVisited.slice()
    document.getElementById('dfs-output').textContent =
      'Visiting node ' + val + '. PreOrder result so far: [' + result.join(', ') + ']'

    dfsIdx++

    if (dfsIdx >= dfsVisitOrder.length) {
      document.getElementById('dfs-output').textContent =
        'Done! Full PreOrder traversal: [' + dfsVisited.join(', ') + ']. Root visited first, left subtree before right.'
      document.getElementById('dfs-btn').textContent = 'Done ✓'
      // Make all green on finish
      dfsVisited.forEach(v => dfsSetNodeStyle(v, 'done'))
    }
  }

  window.dfsReset = function() {
    dfsIdx = 0
    dfsVisited.length = 0
    dfsVisitOrder.forEach(v => dfsSetNodeStyle(v, 'default'))
    document.getElementById('dfs-output').textContent =
      'PreOrder visits: root → left → right. Click "Next Step" to start.'
    document.getElementById('dfs-btn').textContent = 'Next Step →'
  }
}
