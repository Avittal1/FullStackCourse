-- ==========================================
-- Part 1: "DsOne_orders" table - Aggregate Functions
-- ==========================================

-- 1. Calculate the number of orders in each of the categories.
SELECT category, COUNT(*) AS total_orders
FROM DsOne_orders
GROUP BY category;

-- 2. Calculate the average number of "days_to_ship" for each of the months of the year, sorted descending.
SELECT order_month, AVG(days_to_ship) AS avg_days_to_ship
FROM DsOne_orders
GROUP BY order_month
ORDER BY AVG(days_to_ship) DESC;

-- 3. Of all the products purchased in October, what is the price of the most expensive product (unit cost)?
SELECT MAX(unit_cost) AS max_unit_cost_october
FROM DsOne_orders
WHERE order_month = 'October' OR MONTH(order_date) = 10;

-- 4. What is the last order date in 2019 for each of the cities in Illinois, ordered by date descending?
SELECT city, MAX(order_date) AS last_order_date
FROM DsOne_orders
WHERE state = 'Illinois' AND YEAR(order_date) = 2019
GROUP BY city
ORDER BY MAX(order_date) DESC;

-- 5 & 6. For every customer, number of different products starting with "M", showing only those with at least 2, ordered descending.
SELECT customer_name, COUNT(DISTINCT product_name) AS distinct_m_products
FROM DsOne_orders
WHERE product_name LIKE 'M%'
GROUP BY customer_name
HAVING COUNT(DISTINCT product_name) >= 2
ORDER BY COUNT(DISTINCT product_name) DESC;

-- 7. Smallest unit cost in each category, presenting only categories where min unit cost is under 1.
SELECT category, MIN(unit_cost) AS min_unit_cost
FROM DsOne_orders
GROUP BY category
HAVING MIN(unit_cost) < 1;

-- 8. For orders made to Texas, what was the monthly average sales amount, ordered by month?
SELECT order_month, AVG(sales) AS avg_monthly_sales
FROM DsOne_orders
WHERE state = 'Texas'
GROUP BY order_month
ORDER BY order_month;


-- ==========================================
-- Part 2: "DsOne_returns" table
-- ==========================================

-- 1. Count the number of orders returned for each state, showing states with more than 10 returns.
SELECT states, COUNT(*) AS return_count
FROM DsOne_returns
GROUP BY states
HAVING COUNT(*) > 10;

-- 2. Calculate the number of orders returned in each category in the state of Indiana, ordered descending.
SELECT category, COUNT(*) AS return_count
FROM DsOne_returns
WHERE states = 'Indiana'
GROUP BY category
ORDER BY COUNT(*) DESC;