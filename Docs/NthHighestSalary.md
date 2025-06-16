# Finding Nth Highest Salary in SQL

There are multiple approaches to find the nth highest salary in SQL. Here are two optimized methods that are more efficient than using a simple ORDER BY with OFFSET and LIMIT.

## 1. Dense Rank Approach

```sql
SELECT DISTINCT salary 
FROM (
    SELECT salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM employee_salary
) ranked
WHERE rnk = n;
```

### How it works:
1. The inner query uses the `DENSE_RANK()` window function to assign ranks to salaries
2. Ranks are assigned in descending order (highest salary gets rank 1)
3. `DENSE_RANK()` handles duplicate values by:
   - Giving the same rank to equal values
   - Using consecutive ranks (no gaps)
4. The outer query then filters for the specific rank we want
5. `DISTINCT` ensures we don't get duplicate values

### Advantages:
- Efficient for large datasets
- Handles duplicate values correctly
- Follows SQL standards
- More readable and maintainable
- No gaps in ranking when there are duplicate values

## 2. Subquery Count Approach

```sql
SELECT DISTINCT salary
FROM employee_salary e1
WHERE n = (
    SELECT COUNT(DISTINCT salary)
    FROM employee_salary e2
    WHERE e2.salary >= e1.salary
);
```

### How it works:
1. For each salary in the outer query (e1)
2. The subquery counts how many distinct salaries are greater than or equal to the current salary
3. When this count equals n, we've found our nth highest salary
4. `DISTINCT` ensures we don't get duplicate values

### Advantages:
- Conceptually simpler to understand
- Works well with smaller to medium datasets
- Handles duplicate values correctly
- Less dependent on specific SQL features (works in older versions)

## Comparison with Simple OFFSET/LIMIT

```sql
SELECT salary 
FROM employee_salary 
ORDER BY salary DESC
OFFSET n-1 LIMIT 1;
```

### Why this is less optimal:
1. Must sort entire table
2. Has to skip n-1 rows
3. Poor performance on large datasets
4. Doesn't handle duplicates well
5. May give incorrect results with duplicate values

## Best Practice Recommendations

1. Use `DENSE_RANK()` approach when:
   - Working with modern SQL databases
   - Dealing with large datasets
   - Need consistent handling of duplicates

2. Use Subquery approach when:
   - Working with older SQL versions
   - Need more portable code
   - Working with smaller datasets

3. Avoid `OFFSET/LIMIT` approach when:
   - Working with large datasets
   - Duplicate values are present
   - Performance is critical
