# Chapter 6: Review of SQL (Structured Query Language)

*(Note: A dedicated Deep Dive into SQL is provided in the separate "SQL" subject. This chapter covers the integration of SQL with DBMS concepts).*

## 6.1 Data Definition Language (DDL)
Commands to define schemas.
*   `CREATE TABLE`: Define a new table.
*   `DROP TABLE`: Delete table and data.
*   `ALTER TABLE`: Modify structure (Add column).
*   `TRUNCATE`: Delete data, keep structure. Reset identity.

## 6.2 Data Manipulation Language (DML)
Commands to modify data.
*   `INSERT INTO`: Add rows.
*   `UPDATE`: Modify existing rows.
*   `DELETE`: Remove rows.

## 6.3 Data Query Language (DQL)
*   `SELECT`: The primary command.
    ```sql
    SELECT DISTINCT Name
    FROM Student
    WHERE GPA > 3.5
    ORDER BY Name ASC;
    ```

## 6.4 Joins and Keys
*   SQL implements the Relational Algebra joins.
*   **INNER JOIN**: Natural Join.
*   **OUTER JOIN**: Preserves tuples that don't match.

## 6.5 Views
A virtual table containing results of a stored query.
```sql
CREATE VIEW GoodStudents AS
SELECT * FROM Student WHERE GPA > 3.5;
```
*   **Security**: Hide sensitive columns.
*   **Simplicity**: Hide complex joins.
