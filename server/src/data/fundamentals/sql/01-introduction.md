# Chapter 1: Introduction to SQL

## 1.1 What is SQL?
Structured Query Language (SQL) is the standard language for dealing with Relational Databases.

### 1.1.1 Types of Commands
1.  **DDL (Data Definition)**: Defines structure. (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`).
2.  **DML (Data Manipulation)**: Manipulates data. (`INSERT`, `UPDATE`, `DELETE`).
3.  **DQL (Data Query)**: Retrieves data. (`SELECT`).
4.  **DCL (Data Control)**: Permissions. (`GRANT`, `REVOKE`).
5.  **TCL (Transaction Control)**: Integrity. (`COMMIT`, `ROLLBACK`, `SAVEPOINT`).

---

## 1.2 Data Types
*   `INT`, `BIGINT`: Integers.
*   `VARCHAR(n)`: Variable length string.
*   `CHAR(n)`: Fixed length string. (Padded with spaces).
*   `DATE`, `DATETIME`: Time.
*   `DECIMAL(p, s)`: Exact precision numbers (Money).

---

## 1.3 Constraints
1.  **PRIMARY KEY**: Unique + Not Null.
2.  **FOREIGN KEY**: Referential integrity.
3.  **UNIQUE**: No duplicates (Null allowed).
4.  **NOT NULL**: Mandatory.
5.  **CHECK**: Validate condition (`Age > 18`).
6.  **DEFAULT**: Default value.
