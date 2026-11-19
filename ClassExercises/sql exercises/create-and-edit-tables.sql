-- =========================================================================
-- Exercise - Create & Edit Tables (Temporary Tables Version)
-- =========================================================================


-- =========================================================================
-- Part 1: Customers Temporary Table (CREATE, INSERT, ALTER, DROP)
-- =========================================================================

-- 1. Create a temporary table with the following columns:
-- Customer_id - int, primary key
-- Customer_name - string
-- Customer_address - string
-- Birth_date - date
CREATE TABLE #Customers (
    Customer_id INT PRIMARY KEY,
    Customer_name VARCHAR(100),
    Customer_address VARCHAR(200),
    Birth_date DATE
);

-- a. Insert 2 rows with values to the temporary table.
INSERT INTO #Customers (Customer_id, Customer_name, Customer_address, Birth_date)
VALUES 
    (1, 'Noa Cohen', '10 Herzl St, Tel Aviv', '2001-04-15'),
    (2, 'Daniel Levi', '25 Ben Yehuda St, Jerusalem', '1998-11-02');

-- Verification that the rows have been inserted:
SELECT * FROM #Customers;

-- b. Delete the column Customer_address.
ALTER TABLE #Customers
DROP COLUMN Customer_address;

-- Verification that the column has been deleted:
SELECT * FROM #Customers;

-- c. Delete the temporary table.
DROP TABLE #Customers;


-- =========================================================================
-- Part 2: Summer Olympic Athletes Temporary Table (SELECT INTO, ALTER, UPDATE, DELETE)
-- =========================================================================

-- 1. Create a temporary table containing only the athletes who participated in the summer olympic games.
-- Creating a temporary copy
SELECT *
INTO #Summer_Olympic_Athletes
FROM dbo.['Olympic']
WHERE Season = 'Summer';

-- 2. Add a new column to the temporary table - athlete city.
ALTER TABLE #Summer_Olympic_Athletes
ADD Athlete_City VARCHAR(100);

-- 3.1. Add the value 'Unknown City' to the new column for all athletes from Iceland.
UPDATE #Summer_Olympic_Athletes
SET Athlete_City = 'Unknown City'
WHERE NOC = 'ISL' OR Team = 'Iceland';

-- 3.2. Add the value "Springfield" to the new column for all athletes from the USA.
UPDATE #Summer_Olympic_Athletes
SET Athlete_City = 'Springfield'
WHERE NOC = 'USA' OR Team = 'United States';

-- Review the updates prior to deletion:
SELECT TOP 20 ID, Name, NOC, Team, Height, Athlete_City
FROM #Summer_Olympic_Athletes
WHERE Athlete_City IS NOT NULL;

-- 4. Delete all athletes who are below 1.70 meters.
-- Review prior to deletion:
SELECT COUNT(*) AS rows_to_delete
FROM #Summer_Olympic_Athletes
WHERE Height < 170;

DELETE FROM #Summer_Olympic_Athletes
WHERE Height < 170;

-- Check after deletion:
SELECT COUNT(*) AS remaining_rows
FROM #Summer_Olympic_Athletes;

-- Clean up and remove the temporary table upon completion:
DROP TABLE #Summer_Olympic_Athletes;