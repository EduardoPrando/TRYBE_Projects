SELECT ct1.ContactName AS `Nome`, 
ct1.Country AS `País`,
COUNT(ct2.Country) AS `Número de compatriotas`
FROM w3schools.customers AS ct1,
w3schools.customers AS ct2
WHERE ct1.Country = ct2.Country
AND ct1.CustomerID <> ct2.CustomerID
GROUP BY `Nome`, `País`
ORDER BY `Nome`;
