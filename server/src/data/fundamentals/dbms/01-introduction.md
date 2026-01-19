# Chapter 1: Introduction to DBMS

## 1.1 What is a DBMS?
A **Database Management System (DBMS)** is a collecton of programs that enables users to create and maintain a database. The DBMS is a general-purpose software system that facilitates the processes of defining, constructing, manipulating, and sharing databases.

### Key Characteristics
1.  **Self-Describing**: Stores meta-data (Catalog).
2.  **Insulation between Programs and Data**: Program-Data Independence.
3.  **Data Abstraction**: Data Model hides storage details.
4.  **ACID Properties**: Transaction support.

---

## 1.2 File System vs DBMS
Why do we need DBMS when we have file systems?

| Feature | File System | DBMS |
| :--- | :--- | :--- |
| **Redundancy** | High. Same data in multiple files. | Low. Controlled via Normalization. |
| **Consistency** | Poor. Change in one file may not reflect in others. | High. |
| **Access** | Pre-written programs required. | Query Language (SQL). |
| **Data Isolation** | Data scattered in various formats. | Centralized repository. |
| **Concurrency** | Difficult to manage. | Handled by Transaction Manager. |
| **Security** | OS-level permissions only. | Granular (Table/Row/Column level). |

---

## 1.3 Database Architecture (Three-Schema Architecture)
Proposed by ANSI-SPARC to separate User Applications from Physical Database.

1.  **Internal Level (Physical Schema)**:
    *   Describes **how** data is stored (B-Trees, Hashing, Compression).
    *   Closest to physical storage.
2.  **Conceptual Level (Logical Schema)**:
    *   Describes **what** data is stored and relationships.
    *   Hides physical details.
    *   (e.g., `CREATE TABLE Student (ID int, Name varchar)`).
3.  **External Level (View Schema)**:
    *   Describes **part** of the database for specific user groups.
    *   (e.g., Student sees Grades, Office sees Fees).

### Data Independence
*   **Logical Data Independence**: Capacity to change the Conceptual Schema without changing External Schemas/Application Programs (e.g., Adding a new column shouldn't break the app).
*   **Physical Data Independence**: Capacity to change Internal Schema without changing Conceptual Schema (e.g., Moving from HDD to SSD, changing index type).

---

## 1.4 Database Users
1.  **DBA (Database Administrator)**: Superuser. Schema definition, Access control, Performance tuning.
2.  **Database Designers**: Define structure/constraints.
3.  **End Users**:
    *   *Naive*: Use canned transactions (Bank teller).
    *   *Sophisticated*: Use SQL (Analyst).
