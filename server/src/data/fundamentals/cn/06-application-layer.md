# Chapter 6: Application Layer

## 6.1 Domain Name System (DNS)
Mapping human-readable names (`google.com`) to IP addresses (`142.250.x.x`).

### 6.1.1 Hierarchy
*   **Root Servers**: The top. 13 logical servers worldwide.
*   **TLD (Top Level Domain) Servers**: Handle `.com`, `.org`, `.edu`.
*   **Authoritative Servers**: Servers hosted by organizations (e.g., Google's DNS).

### 6.1.2 Resolution Process
Example: User asks for `www.wikipedia.org`.
1.  **Local DNS Cache**: Check OS cache.
2.  **ISP DNS Resolver**: Check ISP cache.
3.  **Root Server**: "I don't know detailed IP, but here is IP of `.org` TLD server".
4.  **TLD Server**: "I don't know `www`, but here is IP of `wikipedia.org` Name Server".
5.  **Authoritative Server**: "Here is the IP for `www.wikipedia.org`".
*(This is Iterative Resolution)*.

---

## 6.2 World Wide Web (HTTP/HTTPS)

### 6.2.1 HyperText Transfer Protocol (HTTP)
*   **Port**: 80.
*   **Stateless**: Server doesn't remember previous requests. (Cookies used to maintain state).
*   **Persistent vs Non-Persistent**:
    *   *HTTP 1.0*: Open TCP, Send Request, Get Response, Close TCP. (Slow).
    *   *HTTP 1.1*: Open TCP, Send multiple, Close. (Keep-Alive).

### 6.2.2 Important Methods
*   **GET**: Retrieve resource. Safe, Idempotent. Params in URL.
*   **POST**: Submit data. Not Idempotent. Data in Body.
*   **PUT**: Update/Create resource. Idempotent.
*   **DELETE**: Remove resource.

### 6.2.3 Status Codes
*   **1xx**: Informational.
*   **2xx**: Success (200 OK, 201 Created).
*   **3xx**: Redirection (301 Moved Permanently).
*   **4xx**: Client Error (400 Bad Request, 403 Forbidden, 404 Not Found).
*   **5xx**: Server Error (500 Internal Error, 502 Bad Gateway).

---

## 6.3 Email Protocols

### 6.3.1 SMTP (Simple Mail Transfer Protocol)
*   **Port**: 25.
*   **Push Protocol**: Used to SEND mail from User Agent to Server, and between Servers.
*   Text based.

### 6.3.2 POP3 (Post Office Protocol v3)
*   **Port**: 110.
*   **Pull Protocol**: Download email from server to local machine. Deletes from server (typically).

### 6.3.3 IMAP (Internet Message Access Protocol)
*   **Port**: 143.
*   More complex. Keeps email on server. Validates sync across multiple devices.

---

## 6.4 Network Security (Brief)
1.  **Cryptography**: Encryption/Decryption.
2.  **Symmetric Key (AES)**: Same key. Fast. Key distribution is hard.
3.  **Asymmetric Key (RSA)**: Public/Private Key pair. Slow. Secure distribution.
4.  **Digital Signature**: Hashed message encrypted with Private Key. Verifies authenticity and integrity.
5.  **Firewall**: A device that monitors and controls incoming/outgoing traffic based on security rules.
