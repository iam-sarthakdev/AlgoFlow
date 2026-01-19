# Chapter 2: Queries and Joins

## 2.1 The SELECT Statement
Logical Order of Operations:
1.  `FROM` & `JOIN` (Gather data)
2.  `WHERE` (Filter rows)
3.  `GROUP BY` (Aggregate)
4.  `HAVING` (Filter groups)
5.  `SELECT` (Select columns)
6.  `DISTINCT` (Remove dupes)
7.  `ORDER BY` (Sort)
8.  `LIMIT` (Paging)

---

## 2.2 Joins (Visual Guide)
Combining rows from two or more tables.

### 2.2.1 Inner Join
Returns records that have matching values in both tables.
```sql
SELECT * FROM A INNER JOIN B ON A.id = B.id;
```
*   *Venn Diagram*: Intersection A ∩ B.

### 2.2.2 Left (Outer) Join
Returns all records from Left table, and matched from Right. NULL if no match.
```sql
SELECT * FROM A LEFT JOIN B ON A.id = B.id;
```
*   *Venn Diagram*: All of A.

### 2.2.3 Right Join
Opposite of Left.

### 2.2.4 Full Outer Join
Returns all records when there is a match in either left or right.
*   *Venn Diagram*: A U B.

### 2.2.5 Cross Join
Cartesian Product. Every row of A paired with every row of B.
*   Count: N * M rows.
*   Use case: Generating combinations (e.g., Size x Color).

### 2.2.6 Self Join
A regular join, but the table is joined with itself.
*   Essential for Hierarchies (Employee Manager).
```sql
SELECT e.Name as Employee, m.Name as Manager
FROM Employee e
JOIN Employee m ON e.ManagerId = m.Id;
```
