CREATE VIEW faturamento_atual AS
SELECT
MIN(S.price) AS `faturamento_minimo`,
MAX(S.price) AS `faturamento_maximo`,
ROUND(AVG(S.price),2) AS `faturamento_medio`,
SUM(S.price) AS `faturamento_total`
FROM SpotifyClone.subscription AS S
JOIN SpotifyClone.users AS U ON S.subscription_id = U.subscription_id;
