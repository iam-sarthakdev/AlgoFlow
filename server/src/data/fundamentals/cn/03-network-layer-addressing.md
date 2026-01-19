# Chapter 3: Network Layer - Logical Addressing

## 3.1 Responsibilities
The Network Layer is responsible for the source-to-destination delivery of packets, possibly across multiple networks.
*   **Logical Addressing**: Unique IP address for each device.
*   **Routing**: Determining the best path for packets.
*   **Fragmentation**: Breaking packets to fit MTU (Maximum Transmission Unit) of DLL.

---

## 3.2 IPv4 Addressing
An IP address is a 32-bit address that uniquely identifiers a connection to the internet.
*   Ideally, written in **Dotted Decimal Notation** (e.g., `192.168.1.1`).
*   Example: `11000000 10101000 00000001 00000001`.

### 3.2.1 Classful Addressing (Obsolete but foundational)
1.  **Class A**: First bit `0`. Range: 0.0.0.0 to 127.255.255.255.
    *   Format: `Net.Host.Host.Host` (/8).
    *   Designed for huge organizations.
2.  **Class B**: Starts `10`. Range: 128.0.0.0 to 191.255.255.255.
    *   Format: `Net.Net.Host.Host` (/16).
    *   Mid-sized orgs.
3.  **Class C**: Starts `110`. Range: 192.0.0.0 to 223.255.255.255.
    *   Format: `Net.Net.Net.Host` (/24).
    *   Small networks (LANs).
4.  **Class D**: Multicast (224-239).
5.  **Class E**: Reserved (240-255).

### 3.2.2 Subnetting
Dividing a large network into smaller sub-networks.
*   **Subnet Mask**: 32-bit number. 1s represent Network part, 0s represent Host part.
*   **Example**: Class C Network `200.1.2.0`. Default Mask `255.255.255.0`.
    *   If we borrow 1 bit for subnet: Mask becomes `255.255.255.128` (/25).
    *   Subnet 1: `200.1.2.0` to `200.1.2.127`.
    *   Subnet 2: `200.1.2.128` to `200.1.2.255`.

### 3.2.3 Classless Inter-Domain Routing (CIDR)
Replaced classful. Uses slash notation `a.b.c.d/n`.
*   `/n` tells number of network bits.
*   Allows arbitrary sized networks (Supernetting).
*   **Example**: `192.168.0.0/20` means first 20 bits are network.

---

## 3.3 Special Protocols
1.  **ARP (Address Resolution Protocol)**:
    *   Issue: We know destination IP, but LAN needs MAC address.
    *   Solution: Broadcast "Who has `192.168.1.5`?" Owner replies with MAC.
2.  **ICMP (Internet Control Message Protocol)**:
    *   Used for error reporting and queries.
    *   **Ping**: Uses ICMP Echo Request/Reply.
    *   **Traceroute**: Uses ICMP Time Exceeded.
3.  **NAT (Network Address Translation)**:
    *   Allows a private network (192.168.x.x) to share a single Public IP.
    *   Router maintains a translation table (PrivateIP:Port <-> PublicIP:Port).
