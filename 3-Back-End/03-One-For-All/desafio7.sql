CREATE VIEW perfil_artistas AS
SELECT 
AR.name AS `artista`,
AL.name AS `album`,
COUNT(F.user_id) AS `seguidores`
FROM SpotifyClone.artists AS AR
JOIN SpotifyClone.albums AS AL ON AL.artist_id = AR.artist_id
JOIN SpotifyClone.following AS F ON F.artist_id = AL.artist_id
GROUP BY AL.album_id
ORDER BY `seguidores` DESC, `artista` ASC, `album` ASC;
