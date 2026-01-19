# Chapter 5: Transaction Management

## 5.1 The Transaction Concept
A **transaction** is a unit of program execution that accesses and possibly updates various data items.
*   E.g., Transfer \$50 from Account A to Account B.
*   **Operations**: `Function`, `Read(X)`, `Write(X)`.

### 5.1.1 ACID Properties
To ensure integrity, every transaction must adhere to:
1.  **Atomicity**: "All or Nothing". Either all operations are reflected in DB, or none are.
    *   *Responsibility*: Transaction Manager (System Recovery).
2.  **Consistency**: Execution of a transaction in isolation takes database from one consistent state to another.
    *   *Responsibility*: Application Programmer / Integrity Constraints.
3.  **Isolation**: Multiple transactions executing concurrently should not interfere. Each should feel it is the only one running.
    *   *Responsibility*: Concurrency Control Manager.
4.  **Durability**: Once a transaction commits, its changes persist even after system crash.
    *   *Responsibility*: Recovery Manager (Logs).

### 5.1.2 Transaction States
*   **Active**: Executing.
*   **Partially Committed**: Final statement executed.
*   **Failed**: Normal execution no longer possible.
*   **Aborted**: Rolled back.
*   **Committed**: Successfully completed.

---

## 5.2 Concurrency Control
Why not run serially? -> Poor Throughput. We need concurrency.

### 5.2.1 Schedule
A sequence of instructions that specify the chronological order in which instructions of concurrent transactions are executed.
*   **Serial Schedule**: T1 finishes completely, then T2 starts. (Consistent, Slow).
*   **Concurrent Schedule**: Instructions interleaved.

### 5.2.2 Serializability
A concurrent schedule is **Serializable** if is equivalent to some serial schedule.

**Conflict Serializability**:
We look for conflicting instructions. Two instructions conflict if:
1.  They belong to different transactions.
2.  They access the same data item.
3.  At least one is a `write` operation. (RR - No, RW - Yes, WR - Yes, WW - Yes).

**Precedence Graph Algorithm**:
*   Create node for each Transaction.
*   Edge $T_i \to T_j$ if $T_i$ executes a conflicting operation BEFORE $T_j$.
*   If Graph has a **CYCLE**, schedule is NOT Serializable.

---

## 5.3 Protocols

### 5.3.1 Lock-Based Protocols
*   **Shared (S)**: Read-only.
*   **Exclusive (X)**: Read/Write.

**Two-Phase Locking (2PL)**:
Ensures serializability.
1.  **Growing Phase**: Transaction may obtain locks, but cannot release any.
2.  **Shrinking Phase**: Transaction may release locks, but cannot obtain any.
*   *Cascade-less Schedules*: Strict 2PL holds Exclusive locks until Commit.

### 5.3.2 Timestamp-Based Protocols
*   Assign timestamp TS(Ti) to each transaction.
*   Ensure operations execute in timestamp order.

### 5.3.3 Deadlock Handling in DB
*   **Wait-Die**: Old waits for Young. Young dies. (Non-preemptive).
*   **Wound-Wait**: Old wounds (preempts) Young. Young waits for Old. (Preemptive).
