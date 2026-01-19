# Chapter 1: Introduction to Computer Networks

## 1.1 What is a Network?
A set of devices (nodes) connected by communication links. A node can be a computer, printer, or any other device capable of sending/receiving data.

### 1.1.1 Criteria for Good Network
1.  **Performance**: Transit time (Delay) and Response time.
2.  **Reliability**: Frequency of failure, recovery time.
3.  **Security**: Protection from unauthorized access/damage.

### 1.1.2 Data Flow
*   **Simplex**: One way (Keyboard -> CPU, TV).
*   **Half-Duplex**: Both ways, but one at a time (Walkie-Talkie).
*   **Full-Duplex**: Both ways simultaneously (Telephone).

---

## 1.2 Topologies
The geometric representation of relationships of links/nodes.

1.  **Mesh**: Every device has dedicated point-to-point link to every other device.
    *   $N(N-1)/2$ links.
    *   Robust, Secure.
    *   Expensive cabling.
2.  **Star**: All devices connect to central Hub.
    *   Easy to install. Hub failure kills network.
3.  **Bus**: One long backbone cable.
    *   Less cable. Cable break stops all transmission.
4.  **Ring**: Each device dedicated connection to two neighbors. Token passing.

---

## 1.3 Categories of Networks
1.  **LAN (Local Area Network)**: Privately owned. Single office, building, campus. High speed.
2.  **MAN (Metropolitan)**: City-wide. Cable TV net.
3.  **WAN (Wide)**: Large geographical area (Country/Continent). Internet.

---

## 1.4 The OSI Model
**Open Systems Interconnection**. A 7-layer architecture.
"**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way"

1.  **Physical**: Transmission of raw bits over a communication channel.
2.  **Data Link**: Physical addressing (MAC), Error control, Flow control. Hop-to-Hop delivery.
3.  **Network**: Logical addressing (IP), Routing. Source-to-Destination delivery (Packets).
4.  **Transport**: Process-to-Process delivery (Port). Segmentation, Error/Flow control (End-to-End).
5.  **Session**: Dialog control, synchonization.
6.  **Presentation**: Translation, Encryption, Compression.
7.  **Application**: User services (Email, File transfer).

---

## 1.5 TCP/IP Protocol Suite
The practical implementation of network stack.
1.  **Link Layer** (Physical + Data Link).
2.  **Internet Layer** (IP, ICMP, ARP).
3.  **Transport Layer** (TCP, UDP).
4.  **Application Layer** (HTTP, FTP, DNS).
