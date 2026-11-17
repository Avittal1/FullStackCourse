-- ==========================================
-- Part 1: "Pokemon" table
-- ==========================================

-- 1. Present all the pokemons with the letter R in their name.
SELECT *
FROM pokemon
WHERE name LIKE '%R%' OR name LIKE '%r%';

-- 2. Order all the pokemons by their weight in descending order.
SELECT *
FROM pokemon
ORDER BY weight DESC;

-- 3. Present the pokemons' names in lowercase.
SELECT LOWER(name) AS pokemon_name_lower
FROM pokemon;

-- 4. Count the number of pokemons that are taller than 70.
SELECT COUNT(*) AS tall_pokemons_count
FROM pokemon
WHERE height > 70;


-- ==========================================
-- Part 2: "DsOne_orders" table
-- ==========================================

-- 1. For all the orders in the "Office Supplies" category that shipped in 2019, calculate the average number of days to ship.
SELECT AVG(days_to_ship) AS avg_days_to_ship
FROM DsOne_orders
WHERE category = 'Office Supplies' 
  AND YEAR(ship_date) = 2019;

-- 2. For all the orders placed on Monday, calculate the average length of the products' names.
SELECT AVG(LEN(product_name)) AS avg_product_name_length
FROM DsOne_orders
WHERE order_weekday = 'Monday';

-- 3. Which city has the largest total sales amount? Present the city, the sales amount, and the state.
SELECT TOP 1 city, state, SUM(sales) AS total_sales
FROM DsOne_orders
GROUP BY city, state
ORDER BY SUM(sales) DESC;

-- 4. Find the state with the highest number of customers whose names include "C", and then count how many in each city (one query).
SELECT TOP 1 WITH TIES state, city, COUNT(DISTINCT customer_id) AS customer_count
FROM DsOne_orders
WHERE (customer_name LIKE '%C%' OR customer_name LIKE '%c%')
  AND state IN (
      SELECT TOP 1 state
      FROM DsOne_orders
      WHERE customer_name LIKE '%C%' OR customer_name LIKE '%c%'
      GROUP BY state
      ORDER BY COUNT(DISTINCT customer_id) DESC
  )
GROUP BY state, city
ORDER BY COUNT(DISTINCT customer_id) DESC;


-- ==========================================
-- Part 3: "data_auto" tables (November & October)
-- ==========================================

-- 1. November table - What is the total cost of Ferrari ads placed on Sunday?
SELECT SUM(cost) AS total_ferrari_cost
FROM data_auto_November
WHERE Advertiser = 'Ferrari' AND [Day of Week] = 'Sunday';

-- 2. Union both tables (October & November) - once with "union all", once with "union".
-- a. UNION ALL:
SELECT * FROM data_auto_october
UNION ALL
SELECT * FROM data_auto_november;

-- b. UNION:
SELECT * FROM data_auto_october
UNION
SELECT * FROM data_auto_november;

-- =========================================================================
-- Theory Section - Aggregate & Analytic Functions
-- =========================================================================

-- 1. What is the difference between an aggregate function and scalar / conversion functions?
-- Scalar and conversion functions operate on a single row and return a value for each row, 
-- whereas aggregate functions operate on a group of rows and return a single summary value for the entire group.

-- 2. When using an aggregate function in a query, what columns can be presented in the select?
-- Only the aggregate functions themselves or columns that are explicitly included in the GROUP BY clause.

-- 3. How can we condition the results of an aggregate function?
-- By using the HAVING clause (which filters groups after aggregation, unlike WHERE which filters individual rows before grouping).

-- 4. When using an aggregative function, where will we write distinct?
-- Inside the parentheses of the aggregate function itself (e.g., COUNT(DISTINCT column_name)) to calculate or count only unique values.

-- =========================================================================
-- Theory Section - Data Auto & Set Operations
-- =========================================================================

-- Q: November table – What is the total cost of advertisements for Ferrari cars published on a Sunday?
-- A: We use SUM(cost) with WHERE Advertiser = 'Ferrari' AND [Day of Week] = 'Sunday' to aggregate the total advertising cost based on the specific brand and day.

-- Q: Union the two tables (October & November) - UNION ALL vs UNION. Is there a difference and what is its significance?
-- A: UNION ALL includes all rows (including duplicates), while UNION removes duplicate rows and returns only unique ones. 
-- The difference signifies whether the two monthly datasets contain exact identical duplicate rows across months; 
-- if the results differ, it means there are identical ad records that appeared in both October and November.

-- Q: Without running a query—based on conclusions from the previous step—if we perform INTERSECT, what would the result be?
-- A: INTERSECT will return only the exact identical rows (campaigns/ads) that appear in both the October table and the November table simultaneously. 
-- If UNION produced fewer rows than UNION ALL, INTERSECT will return precisely those duplicate rows that were filtered out by UNION.