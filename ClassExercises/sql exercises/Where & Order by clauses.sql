-- ==========================================
-- Part 1: "Olympic" table
-- ==========================================

-- 1. Present all the columns for athletes who are 18 years old.
SELECT * 
FROM dbo.['Olympic'] 
WHERE Age = 18;

-- 2. Present all the columns for athletes whose weight is over 50 kg.
SELECT * 
FROM dbo.['Olympic'] 
WHERE Weight > 50;

-- 3. Present all the columns for athletes who participated in the Summer Games, and order them by age.
SELECT * 
FROM dbo.['Olympic'] 
WHERE Season = 'Summer' 
ORDER BY Age;

-- 4. Present all the columns for female athletes from Mexico. Order them by the years column.
SELECT * 
FROM dbo.['Olympic'] 
WHERE Sex = 'F' AND NOC = 'MEX' -- או לפי עמודת המדינה הקיימת בטבלה
ORDER BY Year;


-- ==========================================
-- Part 2: "Pokemon" table
-- ==========================================

-- 1. Present the name and abilities of Pokemons that include "Solar Power" in their abilities.
SELECT name, abilities 
FROM pokemon 
WHERE abilities LIKE '%Solar Power%';

-- 2. Present all the columns for Pokemons whose female_rate is over 0.2, and order them by Name in a descending order.
SELECT * 
FROM pokemon 
WHERE female_rate > 0.2 
ORDER BY name DESC;

-- 3. Present the name, primary color and speed columns for Pokemons whose primary color is green or red, and their Name starts with the letter "C". Order them by their speed.
SELECT name, primary_color, speed 
FROM pokemon 
WHERE (primary_color = 'green' OR primary_color = 'red') 
  AND name LIKE 'C%' 
ORDER BY speed;

-- 4. Present the name, shape, height and weight of Pokemons whose shape is wings, and height is above 10. Order them by their weight.
SELECT name, shape, height, weight 
FROM pokemon 
WHERE shape = 'wings' AND height > 10 
ORDER BY weight;