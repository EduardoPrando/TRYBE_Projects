-- Exercise 1
SELECT * FROM hr.regions;
SELECT * FROM hr.countries;

SELECT COUNTRY_NAME AS País FROM hr.countries;
SELECT COUNTRY_NAME AS País, IF(REGION_ID = 1, 'incluido', 'não incluido') AS 'Status Inclusão' FROM hr.countries ORDER BY País;

-- Exercise 2
SELECT * FROM hr.jobs;
SELECT JOB_TITLE AS Cargo,
CASE 
	WHEN MAX_SALARY BETWEEN 5000 AND 10000 THEN 'Baixo'
    WHEN MAX_SALARY BETWEEN 10001 AND 20000 THEN 'Médio'
    WHEN MAX_SALARY BETWEEN 20001 AND 30000 THEN 'Alto'
    WHEN MAX_SALARY > 30000 THEN 'Altíssimo'
    END AS Nível
FROM hr.jobs ORDER BY Cargo;

-- Exercuse 3
SELECT * FROM hr.jobs;
SELECT JOB_TITLE AS Cargo, MAX_SALARY - MIN_SALARY AS "Diferença entre salários máximo e mínimo" FROM hr.jobs ORDER BY `Diferença entre salários máximo e mínimo`, Cargo;

-- Exercise 4
SELECT * FROM hr.jobs;
SELECT * FROM hr.employees;
SELECT JOB_TITLE AS Cargo FROM hr.jobs;

SELECT JOB_TITLE AS `Cargo`, ROUND(AVG(SALARY), 2) AS `Média salarial`, CASE
	WHEN ROUND(AVG(SALARY), 2) BETWEEN 2000 AND 5800 THEN 'Júnior'
    WHEN ROUND(AVG(SALARY), 2) BETWEEN 5801 AND 7500 THEN 'Pleno'
    WHEN ROUND(AVG(SALARY), 2) BETWEEN 7501 AND 10500 THEN 'Sênior'
    WHEN ROUND(AVG(SALARY), 2) > 10500 THEN 'CEO'
END AS `Senioridade` FROM hr.jobs INNER JOIN hr.employees ON
	hr.jobs.JOB_ID = hr.employees.JOB_ID
GROUP BY `Cargo` ORDER BY `Média salarial`, `CARGO` ASC;

-- Exercise 5
SELECT * from hr.employees;

SELECT JOB_TITLE AS 'Cargo', MAX_SALARY - MIN_SALARY AS 'Variação Salarial',
ROUND(MIN_SALARY / 12, 2) AS 'Média mínima mensal',
ROUND(MAX_SALARY / 12, 2) AS 'Média máxima mensal' FROM hr.jobs
ORDER BY `Variação Salarial`, `Cargo`;

-- Exercise 6
SELECT DEPARTMENT_ID from hr.departments;
SELECT
    CONCAT(FIRST_NAME, ' ', LAST_NAME) AS `Nome completo`,
    jb.JOB_TITLE AS `Cargo`,
    jb_hist.START_DATE AS `Data de início do cargo`,
    dep.DEPARTMENT_NAME AS `Departamento`
FROM
    hr.job_history AS jb_hist
        INNER JOIN
	hr.employees AS emp ON jb_hist.EMPLOYEE_ID = emp.EMPLOYEE_ID
		INNER JOIN
    hr.jobs AS jb ON jb.JOB_ID = jb_hist.JOB_ID
        INNER JOIN
    hr.departments AS dep ON dep.DEPARTMENT_ID = jb_hist.DEPARTMENT_ID
ORDER BY `Nome completo` DESC
, `Cargo`;

-- Exercise 7
SELECT * FROM hr.job_history;
SELECT UCASE(CONCAT(FIRST_NAME, ' ', LAST_NAME)) AS `Nome completo`,
jb_hist.START_DATE AS `Data de início`,
emp.SALARY AS `Salário`
FROM hr.job_history AS jb_hist
INNER JOIN hr.employees AS emp ON jb_hist.EMPLOYEE_ID = emp.EMPLOYEE_ID
WHERE MONTH(jb_hist.start_date) IN (01, 02, 03)
ORDER BY `Nome completo`, `Data de início`;

-- Exercise 8
SELECT * FROM customers;
SELECT ContactName AS `Nome de contato`,
ShipperName AS `Empresa que fez o envio`,
ord.OrderDate AS `Data do pedido`
FROM w3schools.orders AS ord
INNER JOIN w3schools.customers AS cust ON ord.CustomerID = cust.CustomerID
INNER JOIN w3schools.shippers AS ship ON  ord.ShipperID = ship.ShipperID WHERE ship.ShipperID IN (1 , 2)
ORDER BY `Nome de contato` ASC, `Empresa que fez o envio` ASC, `Data do pedido` ASC
;

-- Exercise 9
SELECT CONCAT(FirstName, ' ', LastName) AS `Nome completo`,
COUNT(ord.EmployeeID) AS `Total de pedidos`
FROM w3schools.orders AS ord
INNER JOIN w3schools.employees AS emp ON ord.EmployeeID = emp.EmployeeID
GROUP BY `Nome completo`
ORDER BY `Total de pedidos`;

-- Exercise 10
SELECT prod.ProductName AS `Produto`,
MIN(Quantity) AS `Mínima`,
MAX(Quantity) AS `Máxima`,
ROUND(AVG(Quantity), 2) AS `Média`
FROM w3schools.order_details AS det
INNER JOIN w3schools.products AS prod ON det.ProductID = prod.ProductID
GROUP BY `Produto`
HAVING `Média` > 20
ORDER BY `Média` ASC, `Produto` ASC;

-- Exercise 11
SELECT ct1.ContactName AS `Nome`, 
ct1.Country AS `País`,
COUNT(*) - 1 AS `Número de compatriotas`
FROM w3schools.customers AS ct1,
w3schools.customers AS ct2
WHERE ct1.Country = ct2.Country
-- AND ct1.CustomerID <> ct2.CustomerID
GROUP BY `Nome`, `País`
ORDER BY `Nome`;



SELECT ct1.ContactName AS `Nome`, 
ct1.Country AS `País`,
(
SELECT 
COUNT(*) -1
FROM w3schools.customers AS ct2
WHERE ct1.Country = ct2.Country
GROUP BY ct2.Country
) AS `a`
FROM w3schools.customers AS ct1
WHERE (
SELECT 
COUNT(*) -1
FROM w3schools.customers AS ct2
WHERE ct1.Country = ct2.Country
GROUP BY ct2.Country
) > 0
ORDER BY `Nome`;

-- Exercicio 12
SELECT 
CONCAT(E1.FIRST_NAME, ' ', E1.LAST_NAME) AS `Nome completo funcionário 1`,
E1.SALARY AS `Salário funcionário 1`,
E1.PHONE_NUMBER AS `Telefone funcionário 1`,
CONCAT(E2.FIRST_NAME, ' ', E2.LAST_NAME) AS `Nome completo funcionário 2`,
E2.SALARY AS `Salário funcionário 2`,
E2.PHONE_NUMBER AS `Telefone funcionário 2`
FROM hr.employees AS E1,
hr.employees AS E2
WHERE E1.JOB_ID = E2.JOB_ID
AND E1.EMPLOYEE_ID <> E2.EMPLOYEE_ID
ORDER BY `Nome completo funcionário 1` ASC,
`Nome completo funcionário 2` ASC;

-- Exercise 13
SELECT ProductName AS `Produto`,
Price AS `Preço`
FROM 
w3schools.products AS P,
w3schools.order_details AS O
WHERE P.ProductID = O.ProductID AND O.Quantity > 80
ORDER BY `Produto`;

-- Exercise 14
SELECT Country AS `País` 
FROM w3schools.customers
UNION SELECT Country
FROM w3schools.suppliers
ORDER BY `País`
LIMIT 5;