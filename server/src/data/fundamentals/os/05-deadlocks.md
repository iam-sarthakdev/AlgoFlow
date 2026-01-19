# Chapter 5: Deadlocks

## 5.1 Introduction
A **Deadlock** is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

> **Analogy**:
> *   Car A is on a bridge. Need to go Forward.
> *   Car B is on the other side. Needs to go Forward.
> *   **Result**: Neither can move.

### System Model
*   Resources types $R_1, R_2, ..., R_m$ (CPU cycles, memory space, I/O devices).
*   Each resource type $R_i$ has $W_i$ instances.
*   Process utilizes a resource in sequence: **Request -> Use -> Release**.

---

## 5.2 Necessary Conditions (Coffman Conditions)
A deadlock situation can arise if and **only if** the following four conditions hold simultaneously in a system:

1.  **Mutual Exclusion**: At least one resource must be held in a non-sharable mode.
2.  **Hold and Wait**: A process must be holding at least one resource and waiting to acquire additional resources held by other processes.
3.  **No Preemption**: Resources cannot be preempted; a resource can be released only voluntarily by the process holding it.
4.  **Circular Wait**: A set $\{P_0, P_1, ..., P_n\}$ of waiting processes must exist such that $P_0$ is waiting for $P_1$, $P_1$ -> $P_2$, ..., $P_n$ -> $P_0$.

---

## 5.3 Deadlock Prevention
Ensure that at least one of the necessary conditions cannot hold.

1.  **Mutual Exclusion**: Make resources sharable (e.g., Read-only files). Hard for things like printers.
2.  **Hold and Wait**: Require process to request ALL resources at start. Low resource utilization.
3.  **No Preemption**: If a process holding REQ A request REQ B (unavailable), it releases REQ A.
4.  **Circular Wait**: Impose a total ordering of all resource types. Processes request resources in increasing order of enumeration.

---

## 5.4 Deadlock Avoidance
The system has additional *a priori* information available (e.g., Max demand).
**Safe State**: A state is safe if the system can allocate resources to each process in some order (Safe Sequence) such that no deadlock occurs.

### 5.4.1 Banker's Algorithm (Dijkstra)
Used when there are multiple instances of each resource type.

**Data Structures**:
*   `Available`: Vector of length $m$.
*   `Max`: $n \times m$ matrix. Max demand of each process.
*   `Allocation`: $n \times m$ matrix. Currently allocated.
*   `Need`: $n \times m$ matrix. Remaining need. ($Need[i][j] = Max[i][j] - Allocation[i][j]$).

**Safety Algorithm**:
1.  Work = Available. Finish[i] = false.
2.  Find an $i$ such that:
    *   Finish[i] == false
    *   Need[i] <= Work
3.  If found:
    *   Work = Work + Allocation[i] (Process finishes and releases resources)
    *   Finish[i] = true
    *   Go to Step 2.
4.  If Finish[i] == true for all $i$, then system is in **Safe State**.

---

## 5.5 Deadlock Detection & Recovery
If we allow deadlocks to happen, we must detect and recover.

### 5.5.1 Detection
*   **Wait-for Graph**: Variant of Resource-Allocation graph. Nodes are processes. $P_i \to P_j$ if $P_i$ is waiting for $P_j$. Cycle = Deadlock.

### 5.5.2 Recovery
1.  **Process Termination**:
    *   Abort all deadlocked processes.
    *   Abort one at a time until cycle acts.
2.  **Resource Preemption**:
    *   Select a victim (minimize cost).
    *   Rollback (return to safe state).
    *   Starvation (ensure same process isn't always victim).
