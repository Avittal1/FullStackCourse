-- ==========================================
-- 1. For the table "pokemon"
-- ==========================================

-- a. Present the table
SELECT * 
FROM pokemon;

-- b. Present column name
SELECT name 
FROM pokemon;

-- c. Present column name. Give the column a nickname
SELECT name AS pokemon_name 
FROM pokemon;

-- d. Present only the columns: name, abilities, speed, height, weight
SELECT name, abilities, speed, height, weight 
FROM pokemon;

-- e. What is the data type of each of the columns?
EXEC sp_help 'pokemon';

-- f. Present the columns you presented in part c, this time without duplicate values
SELECT DISTINCT name AS pokemon_name 
FROM pokemon;


-- ==========================================
-- 2. For the table "disney_plus_titles"
-- ==========================================

-- a. Present the table
SELECT * 
FROM disney_plus_titles;

-- b. Give the table a nickname
SELECT d.* 
FROM disney_plus_titles AS d;

-- c. Present only the columns: show_id, title, type
SELECT show_id, title, type 
FROM disney_plus_titles;

-- d. What is the data type of each of the columns?
EXEC sp_help 'disney_plus_titles';

-- e. What is the primary key in the table?

-- f. Present the columns you presented in part c, this time without duplicate values
SELECT DISTINCT show_id, title, type 
FROM disney_plus_titles;