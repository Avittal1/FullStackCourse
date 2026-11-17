-- ==========================================
-- Part 1: "DsTwo_Ads_revenue1" & "DsTwo_Ads_revenue2" tables
-- ==========================================

-- 1. Union the tables. Make sure to present all the rows.(with double rows)
SELECT * 
FROM DsTwo_Ads_revenue1
UNION ALL
SELECT * 
FROM DsTwo_Ads_revenue2;


-- 2. Union the tables. Present only unique rows.
SELECT * 
FROM DsTwo_Ads_revenue1
UNION
SELECT * 
FROM DsTwo_Ads_revenue2;


-- 3. Present only rows that appear in both tables (including Campaign ID)
SELECT * 
FROM DsTwo_Ads_revenue1
INTERSECT
SELECT * 
FROM DsTwo_Ads_revenue2;


-- 4. Present the date and ad type from revenue1 for campaigns with inventory type Format3 and NOT in revenue2.
SELECT [date], [Ad Type]
FROM DsTwo_Ads_revenue1
WHERE InventoryType = 'Format3'
EXCEPT
SELECT [date], [Ad Type] 
FROM DsTwo_Ads_revenue2;


-- 5. Present the date and ad type from revenue1 for campaigns with inventory type Format3 and DO exist in revenue2.
SELECT [date], [Ad Type] 
FROM DsTwo_Ads_revenue1
WHERE InventoryType = 'Format3'
INTERSECT
SELECT [date], [Ad Type] 
FROM DsTwo_Ads_revenue2;


-- 6. Union the two tables, present only rows with Matched Queries > 800,000, unique rows only.
SELECT * 
FROM DsTwo_Ads_revenue1
WHERE matched_queries > 800000
UNION
SELECT * 
FROM DsTwo_Ads_revenue2
WHERE matched_queries > 800000;