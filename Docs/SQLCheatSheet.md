# SQL Cheat Sheet

## Table of Contents
1. [Basic Queries](#basic-queries)
2. [Filtering and Sorting](#filtering-and-sorting)
3. [Joins](#joins)
4. [Aggregate Functions](#aggregate-functions)
5. [Group By and Having](#group-by-and-having)
6. [Subqueries](#subqueries)
7. [Insert, Update, Delete](#insert-update-delete)
8. [Table Operations](#table-operations)

## Basic Queries
```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with alias
SELECT first_name AS name, salary AS annual_pay FROM employees;

-- Select distinct values
SELECT DISTINCT department FROM employees;
```

## Filtering and Sorting
```sql
-- WHERE clause
SELECT * FROM employees WHERE salary > 50000;

-- Multiple conditions
SELECT * FROM employees 
WHERE department = 'Sales' 
AND (salary > 50000 OR experience > 5);

-- BETWEEN operator
SELECT * FROM employees 
WHERE salary BETWEEN 40000 AND 60000;

-- IN operator
SELECT * FROM employees 
WHERE department IN ('Sales', 'Marketing', 'IT');

-- LIKE operator
SELECT * FROM employees 
WHERE last_name LIKE 'S%';    -- Names starting with S
WHERE email LIKE '%@gmail.com';    -- Gmail addresses
WHERE name LIKE '_ohn';    -- Four letter names ending with 'ohn'

-- ORDER BY
SELECT * FROM employees 
ORDER BY salary DESC, last_name ASC;

-- LIMIT results
SELECT * FROM employees 
ORDER BY salary DESC LIMIT 10;
```

## Joins
```sql
-- INNER JOIN
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- RIGHT JOIN
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;

-- FULL OUTER JOIN
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.id;
```

## Aggregate Functions
```sql
-- COUNT
SELECT COUNT(*) FROM employees;
SELECT COUNT(DISTINCT department) FROM employees;

-- SUM
SELECT SUM(salary) FROM employees;

-- AVG
SELECT AVG(salary) FROM employees;

-- MIN and MAX
SELECT 
    MIN(salary) as lowest_salary,
    MAX(salary) as highest_salary
FROM employees;
```

## Group By and Having
```sql
-- GROUP BY
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;

-- GROUP BY with multiple columns
SELECT department, job_title, AVG(salary) as avg_salary
FROM employees
GROUP BY department, job_title;

-- HAVING (filtering for groups)
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

## Subqueries
```sql
-- Subquery in WHERE
SELECT *
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery in FROM
SELECT dept_name, avg_salary
FROM (
    SELECT department as dept_name, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
) dept_stats
WHERE avg_salary > 60000;

-- EXISTS
SELECT *
FROM departments d
WHERE EXISTS (
    SELECT 1 
    FROM employees e 
    WHERE e.dept_id = d.id
);
```

## Insert, Update, Delete
```sql
-- INSERT single row
INSERT INTO employees (first_name, last_name, salary)
VALUES ('John', 'Doe', 50000);

-- INSERT multiple rows
INSERT INTO employees (first_name, last_name, salary)
VALUES 
    ('Jane', 'Smith', 60000),
    ('Bob', 'Johnson', 55000);

-- UPDATE
UPDATE employees
SET salary = salary * 1.1
WHERE department = 'IT';

-- DELETE
DELETE FROM employees
WHERE status = 'Terminated';
```

## Table Operations
```sql
-- Create table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    department VARCHAR(50),
    hire_date DATE
);

-- Add column
ALTER TABLE employees
ADD COLUMN phone VARCHAR(15);

-- Modify column
ALTER TABLE employees
MODIFY COLUMN salary DECIMAL(12,2);

-- Drop column
ALTER TABLE employees
DROP COLUMN phone;

-- Create index
CREATE INDEX idx_department
ON employees(department);

-- Drop table
DROP TABLE IF EXISTS employees;
```

### Best Practices
1. Always use meaningful table and column names
2. Use appropriate data types for columns
3. Include proper indexing for frequently queried columns
4. Use transactions for data consistency
5. Regularly backup your database
6. Use prepared statements to prevent SQL injection
7. Write clean, well-formatted, and documented SQL
8. Test queries on a small dataset first
9. Consider query performance and optimization
10. Follow naming conventions consistently
