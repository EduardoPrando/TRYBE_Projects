CREATE VIEW top_2_hits_do_momento AS
SELECT
S.name AS `cancao`,
COUNT(H.song_id) AS `reproducoes`
FROM SpotifyClone.songs AS S
JOIN SpotifyClone.history AS H ON S.song_id = H.song_id
GROUP BY S.name
ORDER BY `reproducoes` DESC, `cancao` ASC
LIMIT 2;
