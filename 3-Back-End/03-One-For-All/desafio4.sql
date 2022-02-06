CREATE VIEW top_3_artistas AS
SELECT 
A.name AS `artista`,
COUNT(F.artist_id) AS `seguidores`
FROM SpotifyClone.artists AS A
JOIN SpotifyClone.following AS F ON A.artist_id = F.artist_id
GROUP BY F.artist_id
ORDER BY `seguidores` DESC, `artista` ASC
LIMIT 3;
