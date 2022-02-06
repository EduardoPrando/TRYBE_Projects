SELECT ContactName AS `Nome de contato`,
ShipperName AS `Empresa que fez o envio`,
ord.OrderDate AS `Data do pedido`
FROM w3schools.orders AS ord
INNER JOIN w3schools.customers AS cust ON ord.CustomerID = cust.CustomerID
INNER JOIN w3schools.shippers AS ship ON  ord.ShipperID = ship.ShipperID WHERE ship.ShipperID IN (1 , 2)
ORDER BY `Nome de contato` ASC, `Empresa que fez o envio` ASC, `Data do pedido` ASC;
