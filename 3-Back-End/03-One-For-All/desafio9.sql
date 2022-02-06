DELIMITER $$
CREATE PROCEDURE albuns_do_artista(IN artist_name VARCHAR(75))
BEGIN
SELECT AR.name AS `artista`,
AL.name AS `album`
FROM SpotifyClone.artists AS AR
JOIN SpotifyClone.albums AS AL ON AR.artist_id = AL.artist_id
WHERE AR.name LIKE artist_name;
END $$
DELIMITER ;
