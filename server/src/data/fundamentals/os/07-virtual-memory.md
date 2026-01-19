# Chapter 7: Virtual Memory

## 7.1 Background
Virtual Memory separates user logical memory from physical memory.
*   Allows execution of processes not completely in (physical) memory.
*   Logical address space can be much larger than physical address space.
*   Allows address spaces to be shared by several processes.

---

## 7.2 Demand Paging
Bring a page into memory only when it is needed.
*   **Pager**: Swapper that deals with individual pages.
*   **Valid-Invalid Bit**: In Page Table. 1 = In Memory, 0 = On Disk.

### 7.2.1 Page Fault Handling
1.  Reference to a page.
2.  Trap to OS (Page Fault).
3.  OS checks: Invalid reference? Abort. Just not in memory? Continue.
4.  Find a free frame.
5.  Schedule disk operation to read page into frame.
6.  Modify Page Table (Valid = 1).
7.  Restart instruction.

---

## 7.3 Page Replacement
What if there are no free frames?
Need to find a **victim frame**, write it to disk (if modified), and use it for the new page.
**Modify (Dirty) Bit**: Only write back to disk if page has been modified.

### 7.3.1 Algorithms
1.  **FIFO (First-In-First-Out)**: Replace oldest page.
    *   **Belady's Anomaly**: For some algorithms (like FIFO), increasing number of frames can INCREASE page faults.
2.  **Optimal**: Replace page that will not be used for longest period of time.
    *   Impossible to implement (need future knowledge). Used as a benchmark.
3.  **LRU (Least Recently Used)**: Replace page that has not been used for longest period of time.
    *   Best approximation of Optimal.
    *   Implementation: Stack or Counters.

---

## 7.4 Thrashing
If a process does not have "enough" pages, the page-fault rate is very high. This leads to:
*   Low CPU utilization.
*   OS thinks it needs to increase Degree of Multiprogramming.
*   Adds another process to system.
*   **Thrashing**: A process is busy swapping pages in and out.

### 7.4.1 Working Set Model
*   Based on assumption of **Locality**.
*   **Working Set Window ($\Delta$)**: A fixed number of page references.
*   **$WSS_i$**: Working Set Size of Process $P_i$ (Total number of pages referenced in most recent $\Delta$).
*   If $\Sigma WSS_i > Total Memory$, Thrashing will occur. Suspend one process.
