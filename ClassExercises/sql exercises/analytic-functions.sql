-- =========================================================================
-- Part 1: Theory Section - Analytic Functions
-- =========================================================================

-- 1. In what cases will we want to use Analytic Functions?
-- When we need to calculate running totals, moving averages, rankings, or compare individual rows 
-- against group aggregates (like overall average) without collapsing the original rows into a single group.

-- 2. What is the purpose of the OVER(partition by)?
-- It defines the window or partitions of rows over which the analytic function operates, 
-- allowing the query to group data for calculations without reducing the number of output rows.

-- 3. True/False questions:
--   1. Analytic Functions are more efficient than Aggregate functions -> FALSE
--   2. By default, we will always try to use an aggregate function before an analytic function -> TRUE
--   3. We can condition the results of an analytic function in the same query -> FALSE (requires a subquery/CTE)
--   4. We can present any column in the SELECT when using an aggregate function -> FALSE (only grouped columns or aggregates)
--   5. We can present any column in the SELECT when using an analytic function -> TRUE (all original row columns are preserved)

-- =========================================================================
-- Part 2: "Olympic" Table Solutions
-- =========================================================================

-- -------------------------------------------------------------------------
-- Question 1: What is the average height of olympic participants for each sex?
-- -------------------------------------------------------------------------
-- Aggregate Solution:
SELECT sex, AVG(height) AS avg_height
FROM dbo.['Olympic']
GROUP BY sex;

-- Analytic Solution:
SELECT DISTINCT sex, AVG(height) OVER(PARTITION BY sex) AS avg_height
FROM dbo.['Olympic'];

-- Which is best & why? 
-- Aggregate is better here because we want a summary per category, and GROUP BY naturally collapses the rows to match the distinct groups.


-- -------------------------------------------------------------------------
-- Question 2: What is the average height for each sex, plus the overall average height?
-- -------------------------------------------------------------------------
-- Aggregate Solution (Requires joining a main query with a subquery/cross join for overall avg):
SELECT o.sex, AVG(o.height) AS sex_avg, sub.overall_avg
FROM dbo.['Olympic'] o
CROSS JOIN (SELECT AVG(height) AS overall_avg FROM dbo.['Olympic']) sub
GROUP BY o.sex, sub.overall_avg;

-- Analytic Solution (Clean and efficient in a single pass):
SELECT DISTINCT sex, 
       AVG(height) OVER(PARTITION BY sex) AS sex_avg,
       AVG(height) OVER() AS overall_avg
FROM dbo.['Olympic'];

-- Which is best & why?
-- Analytic is much better because it allows calculating both the partitioned average and the overall table average simultaneously in a single scan without complex grouping or joins.


-- -------------------------------------------------------------------------
-- Question 3: How many different olympic players participated per NOC?
-- -------------------------------------------------------------------------
-- Why is it incorrect to solve this using an analytic function?
-- Because COUNT(DISTINCT) is not directly supported as a direct windowed analytic function across all SQL dialects, 
-- and more importantly, analytic functions preserve individual rows while this requires collapsing rows per NOC.

-- Aggregate Solution (The ONLY correct way):
SELECT NOC, COUNT(DISTINCT ID) AS total_players
FROM dbo.['Olympic']
GROUP BY NOC;

-- Analytic Solution: (Not applicable / Incorrect for direct row-reduction summary).


-- -------------------------------------------------------------------------
-- Question 4: What is the first year in which each NOC participated? (Show only after 2000)
-- -------------------------------------------------------------------------
-- Aggregate Solution:
SELECT NOC, MIN(year) AS first_year
FROM dbo.['Olympic']
GROUP BY NOC
HAVING MIN(year) > 2000;

-- Analytic Solution (Using a CTE because we cannot condition directly on analytic functions in WHERE):
WITH RankedNOC AS (
    SELECT NOC, year,
           ROW_NUMBER() OVER(PARTITION BY NOC ORDER BY year ASC) as rn
    FROM dbo.['Olympic']
)
SELECT NOC, year AS first_year
FROM RankedNOC
WHERE rn = 1 AND year > 2000;

-- Which is best & why?
-- Aggregate is simpler and cleaner for finding minimum values per group. Analytic is great if we need ranking, but requires a CTE wrapper to filter.


-- -------------------------------------------------------------------------
-- Question 5: Count Gold medals won by each team and the total gold medals
-- -------------------------------------------------------------------------
-- Aggregate Solution:
SELECT team, COUNT(medal) AS team_gold_medals
FROM dbo.['Olympic']
WHERE medal = 'Gold'
GROUP BY team;

-- Analytic Solution:
SELECT DISTINCT team, 
       COUNT(CASE WHEN medal = 'Gold' THEN 1 END) OVER(PARTITION BY team) AS team_gold_medals,
       COUNT(CASE WHEN medal = 'Gold' THEN 1 END) OVER() AS total_gold_medals
FROM dbo.['Olympic'];

-- Which is best & why?
-- If you only need team totals, Aggregate is best. If you need both the team total and the grand total side-by-side on every row, Analytic is best.


-- =========================================================================
-- Part 3: Pure Analytic Function Question
-- =========================================================================

-- 1. Count the number of gold medals won by each participant and the total amount per sex
SELECT Name, sex,
       COUNT(CASE WHEN medal = 'Gold' THEN 1 END) OVER(PARTITION BY name) AS participant_gold_medals,
       COUNT(CASE WHEN medal = 'Gold' THEN 1 END) OVER(PARTITION BY sex) AS sex_total_gold_medals
FROM dbo.['Olympic'];