# Chapter 5: Window Functions (Advanced)

## 5.1 Concept
Performs a calculation across a set of table rows that are related to the current row.
*   Unlike `GROUP BY`, **does not collapse rows**.
*   Syntax: `Function() OVER (PARTITION BY ... ORDER BY ...)`

---

## 5.2 Ranking Functions
1.  **ROW_NUMBER()**: Sequential integer (1, 2, 3, 4). Unique.
2.  **RANK()**: Skips for ties (1, 2, 2, 4).
3.  **DENSE_RANK()**: No skipping (1, 2, 2, 3).

### Interview Question: Nth Highest Salary
```sql
SELECT Salary FROM (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as rnk
    FROM Employee
) WHERE rnk = N;
```

---

## 5.3 Aggregate Window Functions
*   **Running Total**:
    ```sql
    SELECT Date, Sales,
           SUM(Sales) OVER (ORDER BY Date) as RunningTotal
    FROM Sales;
    ```
*   **Moving Average**:
    ```sql
    AVG(Sales) OVER (ORDER BY Date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
    ```

---

## 5.4 Value Functions (Lead & Lag)
Access data from subsequent or preceding rows.
*   **LAG(col, n)**: Value from n rows before.
*   **LEAD(col, n)**: Value from n rows after.

```sql
-- Compare Today vs Yesterday
SELECT Date, Sales,
       LAG(Sales) OVER (ORDER BY Date) as YestSales,
       Sales - LAG(Sales) OVER (ORDER BY Date) as Diff
FROM Sales;
```
