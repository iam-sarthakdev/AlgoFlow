# Chapter 4: Process Synchronization

## 4.1 Background
Concurrent access to shared data may result in data inconsistency.
*   **Race Condition**: Situation where several processes access and manipulate the same data concurrently and the outcome depends on the order of access.

### 4.1.1 The Critical Section Problem
n processes compete to use some shared data. Each process has a code segment, called **Critical Section**, where shared data is accessed.
**Structure**:
```c
do {
    entry_section();
      critical_section();
    exit_section();
      remainder_section();
} while (true);
```

### 4.1.2 Solution Requirements
1.  **Mutual Exclusion**: If P1 is in CS, no other process can be in CS.
2.  **Progress**: If no one is in CS and some want to enter, selection cannot be postponed indefinitely.
3.  **Bounded Waiting**: There exists a limit on the number of times other processes are allowed to enter CS after a process has made a request.

---

## 4.2 Software Solutions (Peterson's Solution)
Restricted to 2 processes. Uses 2 variables: `int turn` and `boolean flag[2]`.
```c
// Process i
flag[i] = true;
turn = j;
while (flag[j] && turn == j);
// Critical Section
flag[i] = false;
```
*   Guarantees Mutual Exclusion, Progress, and Bounded Waiting for 2 processes.

---

## 4.3 Hardware Support
1.  **Memory Barriers**: Instructions that force memory changes to be propagated to all processors.
2.  **Hardware Instructions**: Atomic (Non-interruptible) instructions.
    *   `TestAndSet(boolean *target)`
    *   `CompareAndSwap(int *value, int expected, int new_value)`

---

## 4.4 Semaphores
A synchronization tool provided by the OS. It is essentially an integer variable `S` that, apart from initialization, is accessed only through two standard atomic operations: `wait()` and `signal()`.

### 4.4.1 Definition
*   **wait(S)** (or `P` operation):
    ```c
    while (S <= 0); // Busy wait
    S--;
    ```
*   **signal(S)** (or `V` operation):
    ```c
    S++;
    ```

### 4.4.2 Types
1.  **Counting Semaphore**: Value ranges over an unrestricted domain. Used to control access to a resource with N instances.
2.  **Binary Semaphore**: Value 0 or 1. Behaves like a **Mutex Lock**.

### 4.4.3 Deadlock and Starvation
*   **Deadlock**: Two or more processes are waiting indefinitely for an event that can be caused by only one of the waiting processes.
*   **Priority Inversion**: Lower priority holds lock needed by higher priority. Solved by **Priority Inheritance Protocol**.

---

## 4.5 Classic Problems of Synchronization

### 4.5.1 The Bounded-Buffer Problem (Producer-Consumer)
*   **Shared Data**: Buffer of size N.
*   **Semaphores**: `mutex=1`, `full=0`, `empty=N`.

### 4.5.2 The Readers-Writers Problem
*   Allow multiple readers to read at same time.
*   Only one single writer can access shared data.
*   **First Readers-Writers Problem**: No reader kept waiting unless writer has permission. Writers may starve.
*   **Second Readers-Writers Problem**: Once writer is ready, it performs write ASAP. Readers may starve.

### 4.5.3 The Dining Philosophers Problem
*   5 Philosophers sitting at a table. 5 chopsticks. Need 2 to eat.
*   **Deadlock**: Every philosopher picks up left chopstick simultaneously.
*   **Solutions**:
    *   Allow at most 4 philosophers to sit.
    *   Allow pickup only if both chopsticks available (Critical Section).
    *   Odd philosophers pick Left-Right, Even pick Right-Left.

---

## 4.6 Monitors
A high-level synchronization construct.
*   Abstract Data Type (ADT).
*   Only one process may be active within the monitor at a time.
*   **Condition Variables**: `condition x, y;`
    *   `x.wait()`: Suspend process until another calls signal.
    *   `x.signal()`: Resumes exactly one suspended process.
*   (Java `synchronized` keyword is based on Monitors).
