# Chapter 2: Physical and Data Link Layers

## 2.1 Physical Layer
Moves bits. Concerned with voltage levels, data rates, physical connectors.

### 2.1.1 Transmission Media
*   **Guided (Wired)**: Twisted Pair (UTP/STP), Coaxial Cable, Fiber Optic (Light, fastest, low attenuation).
*   **Unguided (Wireless)**: Radio waves, Microwaves, Infrared.

---

## 2.2 Data Link Layer (DLL)
Responsible for moving frames from one node to the next (Hop-to-Hop).
*   **LLC (Logical Link Control)**: Upper sublayer. Error/Flow control.
*   **MAC (Media Access Control)**: Lower sublayer. Access to media.

### 2.2.1 Error Control
*   **Parity Check**: Add 1 bit. Detects single bit errors.
*   **CRC (Cyclic Redundancy Check)**: Polynomial division. Robust. used in Ethernet.
*   **Checksum**: Used in TCP/IP.

### 2.2.2 Flow Control
Prevent overwhelming the receiver.
1.  **Stop-and-Wait ARQ**: Send frame, wait for Ack. If timeout, retransmit. Very slow.
2.  **Go-Back-N (Sliding Window)**:
    *   Window Size $W$. Send $W$ frames.
    *   If Frame $k$ is lost, retransmit ALL from $k$.
3.  **Selective Repeat**:
    *   Retransmit ONLY the lost frame.
    *   Requires sorting at receiver.

### 2.2.3 Multiple Access Protocols (MAC)
When multiple stations share a link.
1.  **ALOHA**: Transmit whenever. If collision, retry later. (Poor efficiency).
2.  **CSMA (Carrier Sense)**: Listen before talk.
3.  **CSMA/CD (Collision Detection)**: Used in Ethernet.
    *   Listen. If idle, talk.
    *   If collision detected while talking -> Stop, Jam signal, Wait random time (**Backoff**).

---

## 2.3 Ethernet
*   **Standard**: IEEE 802.3.
*   **MAC Address**: 48-bit hex (FF:FF:FF:FF:FF:FF). Unique to NIC.
*   **Switching**:
    *   **Hub**: Physical layer. Broadcasts everything.
    *   **Switch**: DLL. Learns MAC addresses, sends frame only to destination port.
