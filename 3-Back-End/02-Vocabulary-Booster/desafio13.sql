SELECT ProductName AS `Produto`,
Price AS `Preço`
FROM 
w3schools.products AS P,
w3schools.order_details AS O
WHERE P.ProductID = O.ProductID AND O.Quantity > 80
ORDER BY `Produto`;
