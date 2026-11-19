-- =========================================================================
-- Exercise - JOINs (DsThree & DsOne)
-- =========================================================================


-- =========================================================================
-- Part 1: DsThree
-- =========================================================================

-- 1. Join the two tables "store_customer_ids" and "store_customer_sales".
-- Show all rows, even if they cannot be joined.
SELECT *
FROM [dbo].[DsThree_store_customer_ids] AS ids
FULL OUTER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID];


-- 2. Are there rows that appear in one table and don't appear in the other table?
SELECT *
FROM [dbo].[DsThree_store_customer_ids] AS ids
FULL OUTER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID]
WHERE ids.[Client ID] IS NULL 
   OR sales.[Client ID] IS NULL;

-- 2.1. In which countries were microwaves purchased?
SELECT DISTINCT ids.country
FROM [dbo].[DsThree_store_customer_ids] AS ids
INNER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%microwave%' 
   OR sales.[Product 1] LIKE '%Microwave%';

-- 2.2. Calculate the number of customers who bought a microwave per country.
SELECT ids.country, 
       COUNT(DISTINCT ids.[Client ID]) AS customers_count
FROM [dbo].[DsThree_store_customer_ids] AS ids
INNER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%microwave%' 
   OR sales.[Product 1] LIKE '%Microwave%'
GROUP BY ids.country;


-- 3. How many customers live in Australia, and have bought products worth 100 or more?
SELECT COUNT(DISTINCT ids.[Client ID]) AS australia_high_value_customers
FROM [dbo].[DsThree_store_customer_ids] AS ids
INNER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID]
WHERE ids.country = 'Australia'
  AND sales.price >= 100;


-- 4. Present the contact information of all customers who purchased a TV.
SELECT DISTINCT contact.*
FROM [dbo].[DsThree_store_customer_contact] AS contact
INNER JOIN [dbo].[DsThree_store_customer_ids] AS ids
    ON contact.[Client ID] = ids.[Client ID]
INNER JOIN [dbo].[DsThree_store_customer_sales] AS sales
    ON ids.[Client ID] = sales.[Client ID]
WHERE sales.[Product 1] LIKE '%TV%' 
   OR sales.[Product 1] LIKE '%tv%';


-- 5 (numbered 1 in second block). Join "store_customer_ids" and "store_customer_contact"
-- such that store_customer_ids is the main table. Are there customers who don't have contact information?
SELECT *
FROM [dbo].[DsThree_store_customer_ids] AS ids
LEFT JOIN [dbo].[DsThree_store_customer_contact] AS contact
    ON ids.[Client ID] = contact.[Client ID];

-- A specific check to see if there are any customers who do not have a private contact:
SELECT ids.*
FROM [dbo].[DsThree_store_customer_ids] AS ids
LEFT JOIN [dbo].[DsThree_store_customer_contact] AS contact
    ON ids.[Client ID] = contact.[Client ID]
WHERE contact.[Client ID] IS NULL;


-- 6 (numbered 1 in third block). Cross join "store_customer_contact" and "store_customer_sales".
-- Describe in your words, what is in the retrieval you see.
SELECT *
FROM [dbo].[DsThree_store_customer_contact]
CROSS JOIN [dbo].[DsThree_store_customer_sales];

-- Description (in words):
-- A CROSS JOIN returns the Cartesian product of the two tables: every single row from
-- store_customer_contact is paired with every single row from store_customer_sales.
-- There is no ON join condition, so if there are M rows in contact and N rows in sales,
-- the result contains M * N combined rows (all possible combinations, even unrelated ones).


-- =========================================================================
-- Part 2: DS One (DsOne_orders & DsOne_returns)
-- =========================================================================

-- 1. Connect the 2 tables in the data set. Are there any orders listed in the return table that do not appear in the order table?
SELECT *
FROM DsOne_orders AS o
FULL OUTER JOIN DsOne_returns AS r
    ON o.order_id = r.order_id;

-- Specific check: Are there orders in the returns table that do not appear in the orders table?
SELECT r.*
FROM DsOne_returns AS r
LEFT JOIN DsOne_orders AS o
    ON r.order_id = o.order_id
WHERE o.order_id IS NULL;


-- 2. Display the return date of the products in the Phones subcategory.
SELECT r.return_date, o.product_name, o.sub_category
FROM DsOne_returns AS r
INNER JOIN DsOne_orders AS o
    ON r.order_id = o.order_id
WHERE o.sub_category = 'Phones';


-- 3. Present the sales of all the products returned in April.
SELECT o.order_id, o.product_name, o.sales, r.return_date
FROM DsOne_returns AS r
INNER JOIN DsOne_orders AS o
    ON r.order_id = o.order_id
WHERE MONTH(r.return_date) = 4;