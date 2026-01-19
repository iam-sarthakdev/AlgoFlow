# Chapter 3: CPU Scheduling

## 3.1 Concepts
*   **CPU Burst**: Duration where process needs CPU.
*   **I/O Burst**: Duration where process waits for I/O.
*   *(Processes alternate between these two).*
*   **CPU Scheduler**: Selects process from Ready Queue to run.

### 3.1.1 Dispatcher
The module that gives control of the CPU to the process selected by the Short-Term Scheduler.
*   Functions: Switching context, Switching to user mode, Jumping to location in user program.
*   **Dispatch Latency**: Time it takes to stop one process and start another.

---

## 3.2 Scheduling Criteria (Metrics)
1.  **CPU Utilization**: Keep CPU as busy as possible (MAX).
2.  **Throughput**: Number of processes completed per time unit (MAX).
3.  **Turnaround Time (TAT)**: Time from submission to completion (MIN). `TAT = Completion - Arrival`.
4.  **Waiting Time (WT)**: Time spent waiting in Ready Queue (MIN). `WT = TAT - Burst`.
5.  **Response Time**: Time from submission to *first response* (MIN). Important for Time-Sharing.

---

## 3.3 Scheduling Algorithms

### 3.3.1 First-Come, First-Served (FCFS)
*   **Type**: Non-Preemptive.
*   **Logic**: FIFO Queue.
*   **Pros**: Simple.
*   **Cons**: **Convoy Effect**. If P1 (200s) arrives first, P2 (1s) waits 200s. Average WT is high.

### 3.3.2 Shortest Job First (SJF)
*   **Type**: Non-Preemptive.
*   **Logic**: Process with smallest next CPU burst gets CPU.
*   **Pros**: **Provably Optimal** (Gives minimum average Waiting Time).
*   **Cons**: Requires knowing the future (CPU burst length). Impossible to implement exactly; estimated using exponential averaging.

### 3.3.3 Shortest Remaining Time First (SRTF)
*   **Type**: Preemptive SJF.
*   **Logic**: If new process arrives with `Burst < Current_Remaining`, preempt current.

### 3.3.4 Round Robin (RR)
*   **Type**: Preemptive.
*   **Logic**: Each process gets a small unit of time (**Time Quantum** q), usually 10-100ms. If burst > q, process goes to tail of queue.
*   **Performance**: Depends explicitly on `q`.
    *   `q = Large` -> FCFS.
    *   `q = Small` -> Processor Sharing (Context Switch overhead dominates).
    *   *Rule of Thumb*: 80% of CPU bursts should be shorter than `q`.

### 3.3.5 Priority Scheduling
*   **Type**: Preemptive or Non-Preemptive.
*   **Logic**: Highest priority runs.
*   **Problem**: **Starvation** (Indefinite blocking). Low priority process may never execute.
*   **Solution**: **Aging**. Increase priority of process as it waits.

### 3.3.6 Multilevel Queue Scheduling
Ready queue is partitioned into separate queues, e.g.:
1.  Foreground (Interactive) - RR.
2.  Background (Batch) - FCFS.
*   Fixed Priority Preemptive Scheduling between queues. (Foreground must finish before Background).
*   Or Time Slice (80% FG, 20% BG).

---

## 3.4 Thread Scheduling
*   **Scope**:
    *   **Process-Contention Scope (PCS)**: Library schedules user threads onto LWP (Many-to-Many).
    *   **System-Contention Scope (SCS)**: Kernel schedules kernel threads onto CPU.

---

## 3.5 Multi-Processor Scheduling
*   **Asymmetric Multiprocessing**: One Master Server handles scheduling, others execute code. Simple, but Master is bottleneck.
*   **Symmetric Multiprocessing (SMP)**: Each processor is self-scheduling.
*   **Load Balancing**:
    *   *Push Migration*: Periodic task checks load and pushes tasks to idle CPUs.
    *   *Pull Migration*: Idle CPU pulls waiting task from busy CPU.
*   **Processor Affinity**: Process prefers to run on same CPU (warm cache).
    *   *Soft Affinity*: OS tries, but no guarantee.
    *   *Hard Affinity*: System call forces process to specific CPU.
