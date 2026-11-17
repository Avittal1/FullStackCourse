-- ==========================================
-- Part 1: "DsOne_orders" table - Conversion Functions
-- ==========================================

-- 1. For each order date present only the day of the month. Order the results by the day of the month.
SELECT DAY(order_date) AS order_day
FROM DsOne_orders
ORDER BY DAY(order_date);

-- 2. For products in the "Office Supplies" category, present the month in which they were shipped.
SELECT ship_date, MONTH(ship_date) AS ship_month_number, DATENAME(month, ship_date) AS ship_month_name
FROM DsOne_orders
WHERE category = 'Office Supplies';

-- 3. For products in the sub category "Phones", present the order month and the ship month. Order the results by the ship month.
SELECT order_date, ship_date, 
       MONTH(order_date) AS order_month, 
       MONTH(ship_date) AS ship_month
FROM DsOne_orders
WHERE sub_category = 'Phones'
ORDER BY MONTH(ship_date);

-- 4. Using a function, present the number of days between the ship date and the order date. Order the results by this new column.
SELECT order_date, ship_date, 
       DATEDIFF(day, order_date, ship_date) AS days_difference
FROM DsOne_orders
ORDER BY DATEDIFF(day, order_date, ship_date);

-- 5. Present the order date column and add 2 years to it.
SELECT order_date, 
       DATEADD(year, 2, order_date) AS order_date_plus_2_years
FROM DsOne_orders;

-- 6. For every order that shipped in December, use cast to turn the "days to ship" column into data type CHAR.
SELECT days_to_ship, 
       CAST(days_to_ship AS CHAR(10)) as days_to_ship_char
FROM DsOne_orders
WHERE MONTH(ship_date) = 12;