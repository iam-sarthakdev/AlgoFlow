# Chapter 3: The Relational Data Model

## 3.1 Concepts
The Relational Model uses a collection of tables to represent both data and the relationships among those data.
*   **Relation**: A Table.
*   **Tuple**: A Row.
*   **Attribute**: A Column.
*   **Domain**: The set of permitted values for each attribute.
*   **Degree**: Number of attributes (columns).
*   **Cardinality**: Number of tuples (rows).

### Constraints
*   **Domain Constraint**: Values must come from domain (e.g., Integer).
*   **Key Constraint**: Elements must be unique.
*   **Entity Integrity**: Primary Key value cannot be NULL.
*   **Referential Integrity**: Foreign Key value must exist in the referenced table (or be NULL).

---

## 3.2 Keys
Keys are fundamental to the Relational Model. They uniquely identify a tuple.

1.  **Super Key**: A set of one or more attributes that, taken collectively, allow us to identify uniquely a tuple in the relation.
    *   Example: `{ID}`, `{ID, Name}`, `{SSN}`.
2.  **Candidate Key**: A minimal Super Key.
    *   No proper subset is a Super Key.
3.  **Primary Key (PK)**: A Candidate Key chosen by the database designer as the principal means of identifying tuples.
4.  **Alternate Key**: Candidate Keys that are not the Primary Key.
5.  **Foreign Key (FK)**: An attribute in relation $r_1$ that refers to the primary key of relation $r_2$.

### Example
**Table: Student**
*   ID (PK)
*   Email (Candidate Key)
*   Name (Not a Key)

---

## 3.3 Relational Algebra
Procedural query language. The basis for SQL.

### Basic Operations
1.  **Select ($\sigma$)**: Selects rows that satisfy a predicate.
    *   $\sigma_{topic='CS'}(Instructor)$
2.  **Project ($\Pi$)**: Selects columns.
    *   $\Pi_{ID, Name}(Instructor)$
3.  **Union ($\cup$)**: Tuples in A or B.
4.  **Set Difference ($-$)**: Tuples in A but not in B.
5.  **Cartesian Product ($\times$)**: Combine every row of A with every row of B.
6.  **Rename ($\rho$)**: Rename relations/attributes.

### Derived Operations
1.  **Natural Join ($\bowtie$)**: Cartesian Product + Selection on equality of common attributes + Projection to remove duplicate columns.
2.  **Intersection ($\cap$)**: Tuples in both A and B.

---

## 3.4 Relational Calculus
Non-procedural query language. Describes **what** is desired, not **how** to compute it.
*   **Tuple Relational Calculus (TRC)**: $\{ t | P(t) \}$. (Select tuples $t$ such that logic $P$ is true).
*   **Domain Relational Calculus (DRC)**: Variables range over domains.
