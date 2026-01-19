# Chapter 4: Normalization

## 4.1 Pitfalls of Bad Design
1.  **Redundancy**: Implementation of same information (Waste of space).
2.  **Update Anomaly**: If data is redundant, updating it in one place but not another causes inconsistency.
3.  **Insertion Anomaly**: Inability to add data because part of the primary key is missing.
    *   *Example*: A table `(Student, Course, Instructor)`. If PK is `Student+Course`, we cannot add a new Instructor without a Student enrolling.
4.  **Deletion Anomaly**: Unintended loss of data.
    *   *Example*: If last student drops a course, we lose the Instructor information.

---

## 4.2 Functional Dependency (FD)
$X \to Y$. "X determines Y".
If two tuples agree on X, they MUST agree on Y.
*   **Trivial FD**: $X \to Y$ if $Y \subseteq X$. (Reflexivity). `(A,B) -> A`.
*   **Non-Trivial FD**: $Y$ is not a subset of $X$. `EmployeeID -> Name`.

### Closure of a Set of FDs ($F^+$)
The set of all functional dependencies logically implied by $F$. Used to find Keys.
*   *Algorithm*: Start with Attribute set. Add things determined by it. Repeat.
*   If Closure of $X$ includes ALL attributes, $X$ is a Super Key.

---

## 4.3 Normal Forms

### 4.3.1 First Normal Form (1NF)
*   Domain of attribute must include only **atomic** (simple, indivisible) values.
*   No repeating groups/arrays.
*   **Fix**: Create a new row for each value in specific set.

### 4.3.2 Second Normal Form (2NF)
*   Must be in 1NF.
*   **No Partial Dependency**.
    *   A non-prime attribute (not part of candidate key) is dependent on **part** of a composite candidate key.
    *   *Fix*: Decompose table. Move the dependent attribute to a new table with its partial key.

### 4.3.3 Third Normal Form (3NF)
*   Must be in 2NF.
*   **No Transitive Dependency**.
    *   A non-prime attribute depends on another non-prime attribute.
    *   $A \to B$ and $B \to C$ implies $A \to C$. If $A$ is Key, but $B$ is not, then $B \to C$ is transitive.
    *   *Fix*: Move $B$ and $C$ to new table.

### 4.3.4 Boyce-Codd Normal Form (BCNF)
*   Strict version of 3NF.
*   For every dependency $X \to Y$ in $F$, **X must be a Super Key**.
*   *Every determinant is a candidate key*.

---

## 4.4 Decomposition Properties
When splitting tables, we must ensure:
1.  **Lossless Join**: $R1 \bowtie R2$ must yield exactly original $R$.
    *   *Condition*: $R1 \cap R2$ must be a superkey of R1 OR R2.
2.  **Dependency Preservation**: We should be able to check valid FDs without joining tables.
