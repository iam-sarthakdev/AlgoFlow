# Chapter 3: Aggregation and Grouping

## 3.1 Aggregate Functions
Perform a calculation on a set of values, and return a single value.
*   `COUNT(*)`: Returns number of rows.
*   `COUNT(col)`: Returns number of non-null values in col.
*   `SUM(col)`: Sum of values.
*   `AVG(col)`: Average value.
*   `MIN(col)`: Minimum value.
*   `MAX(col)`: Maximum value.

---

## 3.2 GROUP BY
Grouping rows that have the same values into summary rows.
*   **Fundamental Rule**: Every column in the `SELECT` clause must either be in the `GROUP BY` clause or be used in an aggregate function.

```sql
-- Find average salary per department
SELECT DeptId, AVG(Salary) as AvgSal
FROM Employee
GROUP BY DeptId;
```

---

## 3.3 HAVING Clause
Used to filter **Groups**. (Since `WHERE` cannot be used with aggregate functions).

*   `WHERE`: Filters rows *before* grouping.
*   `HAVING`: Filters groups *after* grouping.

```sql
-- Find departments where average salary > 50000
SELECT DeptId, AVG(Salary)
FROM Employee
GROUP BY DeptId
HAVING AVG(Salary) > 50000;
```
