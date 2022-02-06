CREATE VIEW historico_reproducao_usuarios AS 
SELECT 
U.name AS `usuario`,
S.name AS `nome`
FROM SpotifyClone.users AS U
JOIN SpotifyClone.history AS H ON U.user_id = H.user_id
JOIN SpotifyClone.songs AS S ON S.song_id = H.song_id
ORDER BY `usuario` ASC, `nome` ASC;
