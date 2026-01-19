# Chapter 4: Subqueries and CTEs

## 4.1 Subqueries
A query nested inside another query.

### 4.1.1 Scalar Subquery
Returns a single value.
```sql
-- Employees earning more than average
SELECT Name FROM Employee
WHERE Salary > (SELECT AVG(Salary) FROM Employee);
```

### 4.1.2 Multi-Row Subquery
Returns multiple rows. Used with `IN`, `ANY`, `ALL`.
```sql
-- Employees in IT or HR
SELECT Name FROM Employee
WHERE DeptId IN (SELECT Id FROM Dept WHERE Name IN ('IT', 'HR'));
```

### 4.1.3 Correlated Subquery
Depends on the outer query. Executed for **each row** of the outer query. Slow.
```sql
-- Employees earning more than average IN THEIR OWN department
SELECT Name, Salary, DeptId
FROM Employee e1
WHERE Salary > (
    SELECT AVG(Salary)
    FROM Employee e2
    WHERE e2.DeptId = e1.DeptId
);
```

---

## 4.2 Common Table Expressions (CTE)
A temporary result set that you can reference within a `SELECT` statement.
*   Cleaner, more readable than subqueries.

```sql
WITH DeptStats AS (
    SELECT DeptId, COUNT(*) as Count, AVG(Salary) as AvgSal
    FROM Employee
    GROUP BY DeptId
)
SELECT e.Name, d.AvgSal
FROM Employee e
JOIN DeptStats d ON e.DeptId = d.DeptId
WHERE e.Salary > d.AvgSal;
```
