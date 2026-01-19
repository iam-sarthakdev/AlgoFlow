# Chapter 5: Transport Layer

## 5.1 Responsibilities
*   **Process-to-Process Delivery**: Uses Port Numbers (16-bit) to deliver data to correct application (e.g., Web Server on 80).
*   **Segmentation and Reassembly**: Breaks message into segments.
*   **Connection Control**: Connection-oriented (TCP) or Connectionless (UDP).
*   **Flow Control & Error Control**: End-to-end.

---

## 5.2 User Datagram Protocol (UDP)
*   **Connectionless**: No handshake. Just fire and forget.
*   **Unreliable**: No Ack, no guarantee of delivery or order.
*   **Headers**: Tiny (8 bytes). Source Port, Dest Port, Length, Checksum.
*   **Use Cases**:
    *   Real-time Multimedia (Video/Audio) where speed > reliability.
    *   Simple Request-Response (DNS, DHCP).

---

## 5.3 Transmission Control Protocol (TCP)
*   **Connection-Oriented**: Logical connection established before transfer.
*   **Reliable**: Guarantees delivery, order, and integrity.
*   **Full Duplex**: Data flows both ways.

### 5.3.1 Connection Establishment (3-Way Handshake)
1.  **SYN**: Client sends segment with SYN flag = 1, Sequence Num = x.
2.  **SYN-ACK**: Server replies with SYN=1, ACK=1, Seq=y, AckNum=x+1.
3.  **ACK**: Client replies with ACK=1, AckNum=y+1.
*(State: ESTABLISHED)*.

### 5.3.2 Connection Termination (4-Way Handshake)
1.  Client: FIN.
2.  Server: ACK (Client cannot send more, but can receive).
3.  Server: FIN.
4.  Client: ACK. (Disconnect).

### 5.3.3 Flow Control (Sliding Window)
Prevents sender from overwhelming receiver.
*   Receiver advertises **Window Size (Rwnd)** in every TCP header.
*   Sender ensures: `Sent - Acknowledged <= Rwnd`.

### 5.3.4 Congestion Control
Prevents sender from overwhelming the **network**.
Sender maintains **Congestion Window (Cwnd)**.
1.  **Slow Start**: Start Cwnd = 1 MSS (Max Segment Size). Double Cwnd for every Ack (Exponential growth).
2.  **Congestion Avoidance**: When Threshold reached, increase Cwnd linearly (+1 per RTT).
3.  **Congestion Detection**:
    *   *Timeout*: Assume massive congestion. Drop Cwnd to 1. Restart Slow Start.
    *   *3 Duplicate ACKs*: Assume packet loss but net active. Halve Cwnd. (Fast Recovery).

---

## 5.4 Sockets (Network Programming)
An interface between Application and Transport layer.
*   **Socket Address**: `IP Address : Port Number`.
*   **Functions**: `socket()`, `bind()`, `listen()`, `accept()`, `connect()`.
