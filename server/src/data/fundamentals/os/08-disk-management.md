# Chapter 8: Mass-Storage (Disk) Management

## 8.1 Disk Structure
*   **Platter**: Circular magnetic disk.
*   **Track**: Concentric circles on platter.
*   **Sector**: Tracks divided into sectors (usually 512 bytes).
*   **Cylinder**: Set of tracks at same arm position.
*   **Seek Time**: Time to move disk arm to desired cylinder.
*   **Rotational Latency**: Time for desired sector to rotate under disk head.
*   **Transfer Rates**: Rate at which data flows.

---

## 8.2 Disk Scheduling
The OS needs to schedule I/O requests to minimize Seek Time.

1.  **FCFS (First-Come First-Served)**:
    *   Fair.
    *   Poor performance (Wild swings).
2.  **SSTF (Shortest Seek Time First)**:
    *   Select request with min seek time from current head position.
    *   Can cause **Starvation** for far requests.
3.  **SCAN (Elevator Algorithm)**:
    *   Arm starts at one end, moves to other, servicing requests. Then reverses.
4.  **C-SCAN (Circular SCAN)**:
    *   Like SCAN, but when it reaches the end, it immediately returns to beginning *without servicing requests on return trip*.
    *   Provides more uniform wait time.
5.  **LOOK / C-LOOK**:
    *   Like SCAN/C-SCAN, but arm only goes as far as the last request in each direction, then reverses (doesn't go to full end of disk).

---

## 8.3 RAID (Redundant Array of Independent Disks)
Multiple disk drives used to improve reliability via redundancy.

1.  **RAID 0 (Striping)**:
    *   Splits data across drives.
    *   Performance: High (Parallel access).
    *   Reliability: Zero (If one fails, all data lost).
2.  **RAID 1 (Mirroring)**:
    *   Duplicate data on second drive.
    *   Reliability: High (100% redundancy).
    *   Cost: High (Need 2x storage).
    *   Performance: Good read, Slow write (write to both).
3.  **RAID 5 (Block Interleaved Parity)**:
    *   Data and Parity striped across N+1 disks.
    *   One disk failure can be recovered.
    *   Most common compromise.
4.  **RAID 6**:
    *   Two parity blocks. Can withstand 2 simultaneous failures.
5.  **RAID 10 (1+0)**:
    *   Striping of Mirrors. High Performance + High Reliability.

---

## 8.4 File System Implementation
*   **Boot Control Block**: Code to boot OS.
*   **Volume Control Block**: Total blocks, free block count/pointers.
*   **File Control Block (FCB)**: Inode (in Unix). File permissions, dates, location.

### Allocation Methods
1.  **Contiguous**: File occupies contiguous blocks. Simple. Fails with external fragmentation.
2.  **Linked**: Each file is a linked list of blocks. No external fragmentation. Slow random access.
3.  **Indexed**: Brings all pointers together into ONE index block. (Unix Inode uses multi-level index).
