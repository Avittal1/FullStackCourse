-- ==========================================
-- Part 1: "disney_plus_titles" table
-- ==========================================

-- 1. Present the length of each movie / TV show title.
SELECT title, LEN(title) AS title_length
FROM disney_plus_titles;

-- 2. Present the directors of movies. Show their name in capital letters.
SELECT UPPER(director) AS director_upper
FROM disney_plus_titles
WHERE type = 'Movie' AND director IS NOT NULL;

-- 3. Present all the movies / TV shows that have the letter "e" in their title, and their release year is between 2017 and 2019.
SELECT *
FROM disney_plus_titles
WHERE (title LIKE '%e%' OR title LIKE '%E%')
  AND release_year BETWEEN 2017 AND 2019;

-- 4. For all the movies released between 2015 and 2020, concat the director name to the cast names. Order the results by the year.
SELECT title, release_year, CONCAT(director, ' - ', cast) AS director_and_cast
FROM disney_plus_titles
WHERE type = 'Movie' 
  AND release_year BETWEEN 2015 AND 2020
ORDER BY release_year;


-- ==========================================
-- Part 2: "DsOne_orders" table
-- ==========================================

-- 1. Present the product name, and the sales amount rounded.
-- (הערה: תלוי בשמות העמודות המדויקים בטבלה, למשל product_name ו-sales_amount)
SELECT product_name, ROUND(sales_amount, 2) AS rounded_sales
FROM DsOne_orders;

-- 2. For products in a sub category that begin with the letter "S/s", present the sub_category, product name unit cost rounded down.
SELECT sub_category, product_name, FLOOR(unit_cost) AS rounded_down_cost
FROM DsOne_orders
WHERE sub_category LIKE 'S%';

-- 3. Present all the products that have the letter "e" and are longer than 7. Order the results by length of name in descending order.
SELECT product_name
FROM DsOne_orders
WHERE (product_name LIKE '%e%' OR product_name LIKE '%E%')
  AND LEN(product_name) > 7
ORDER BY LEN(product_name) DESC;