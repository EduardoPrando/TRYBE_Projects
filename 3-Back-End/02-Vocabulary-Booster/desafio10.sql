SELECT prod.ProductName AS `Produto`,
MIN(Quantity) AS `Mínima`,
MAX(Quantity) AS `Máxima`,
ROUND(AVG(Quantity), 2) AS `Média`
FROM w3schools.order_details AS det
INNER JOIN w3schools.products AS prod ON det.ProductID = prod.ProductID
GROUP BY `Produto`
HAVING `Média` > 20
ORDER BY `Média` ASC, `Produto` ASC;
