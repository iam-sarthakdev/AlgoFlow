# Chapter 7: Indexing and Hashing

## 7.1 Basic Concepts
Indices are additional files used to speed up access to data.
*   **Search Key**: Attribute to search.
*   **Data Entry**: Pointer to the actual record.

### Types of Indices
1.  **Ordered Indices**: Search keys stored in sorted order.
2.  **Hash Indices**: Search keys distributed using buckets.

---

## 7.2 Ordered Indices
*   **Clustered Index (Primary Index)**:
    *   The data file is sequentially ordered by the Search Key.
    *   Only **ONE** clustered index per table possible (physically sorted).
    *   Usually on Primary Key.
*   **Non-Clustered Index (Secondary Index)**:
    *   Separate file. Contains key and pointer to data.
    *   Data is NOT sorted by this key.
    *   Multiple possible.

---

## 7.3 B+ Tree Index Files
The industry standard structure for dynamic indexing.
*   Balanced Tree. All paths from root to leaf are same length.
*   **Internal Nodes**: Guide search. Contains only keys and pointers.
*   **Leaf Nodes**: Contain Keys and **Data Pointers**.
*   **Linked Leaves**: Leaf nodes are linked together.

### Advantages of B+ Tree over B-Tree
1.  **More keys in Internal Nodes**: Since data pointers are only at leaves, internal nodes are smaller. Fan-out is higher. Height is lower. (Less Disk IO).
2.  **Range Queries**: Very fast. Just find start point and traverse the linked list of leaves.

---

## 7.4 Hashing
*   **Bucket**: Unit of storage.
*   **Hash Function**: Maps search key to bucket.
*   **Collision**: Two keys map to same bucket. Use Chaining (Linked List) or Open Addressing.

### 7.4.1 Static vs Dynamic Hashing
*   **Static**: Fixed number of buckets. Bad if DB grows/shrinks.
*   **Dynamic (Extendible)**: Buckets grow/shrink on demand. Uses directories.
