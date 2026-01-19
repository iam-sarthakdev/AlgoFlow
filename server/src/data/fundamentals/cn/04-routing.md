# Chapter 4: Network Layer - Routing

## 4.1 Routing Algorithms
The logic used by a router to decide where to send a packet next.
*   **Static Routing**: Manually configured table. Simple, typically no fault tolerance.
*   **Dynamic Routing**: Routers talk to each other to build table. Adapts to topology changes.

---

## 4.2 Distance Vector Routing
*   **Algorithm**: Bellman-Ford.
*   **Concept**:
    *   Each router knows distance to direct neighbors.
    *   Each router shares its knowledge with **neighbors only**.
    *   "I can reach destination D in X hops".
    *   Iteratively, everyone learns best path to everyone.
*   **Protocol**: RIP (Routing Information Protocol).
*   **Issue**: **Count-to-Infinity Problem**. (If A-B breaks, A thinks it can reach B via C, C thinks via A... loop until distance becomes infinity).

---

## 4.3 Link State Routing
*   **Algorithm**: Dijkstra's Shortest Path.
*   **Concept**:
    1.  Discover neighbors.
    2.  Measure cost (delay) to neighbors.
    3.  Construct **LSA (Link State Advertisement)** packet.
    4.  Broadcast LSA to **entire network** (Flooding).
    5.  Every router builds complete topological map.
    6.  Compute Shortest Path Tree.
*   **Protocol**: OSPF (Open Shortest Path First).
*   **Pros**: Fast convergence, no loops.
*   **Cons**: High computation/memory.

---

## 4.4 BGP (Border Gateway Protocol)
*   **Path Vector Protocol**.
*   The "Routing Protocol of the Internet".
*   Routes between **Autonomous Systems (AS)** (e.g., ISPs).
*   Metrics: Uses policies (political/economic) along with path length.

---

## 4.5 Congestion Control (Network Layer)
Too many packets present in the subnet, performance degrades.
1.  **Traffic Throttling**: Tell sender to slow down (Choke Packet).
2.  **Load Shedding**: Router drops packets.
    *   *Random Early Detection (RED)*: Start dropping packets randomly *before* buffer is full to warn TCP senders.
