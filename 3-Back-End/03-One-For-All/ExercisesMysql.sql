DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE subscription(
subscription_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(40) NOT NULL,
price DECIMAL(6,2) DEFAULT 0
) engine = InnoDB;

CREATE TABLE users(
user_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(75) NOT NULL,
age INT NOT NULL,
subscription_id INT NOT NULL,
FOREIGN KEY (subscription_id) REFERENCES subscription (subscription_id)
) engine = InnoDB;

CREATE TABLE artists(
artist_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(75) NOT NULL
) engine = InnoDB;

CREATE TABLE albums(
album_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(75) NOT NULL,
artist_id INT NOT NULL,
FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
) engine = InnoDB;

CREATE TABLE songs(
song_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(75) NOT NULL,
album_id INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES albums (album_id)
) engine = InnoDB;

CREATE TABLE history(
user_id INT NOT NULL,
song_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (user_id, song_id),
FOREIGN KEY (user_id) REFERENCES users (user_id),
FOREIGN KEY (song_id) REFERENCES songs (song_id)
) engine = InnoDB;

CREATE TABLE following(
user_id INT NOT NULL,
artist_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (user_id, artist_id),
FOREIGN KEY (user_id) REFERENCES users (user_id),
FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
) engine = InnoDB;

INSERT INTO subscription (name, price)
VALUES
('gratuito', 0),
('universitário', 5.99),
('familiar', 7.99);

INSERT INTO users(name, age, subscription_id)
VALUES
('Thati', 23, 1),
('Cintia', 35, 3),
('Bill', 20, 2),
('Roger', 45, 1);

INSERT INTO artists (name)
VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

INSERT INTO albums (name, artist_id)
VALUE
('Envious', 1),
('Exuberant', 1),
('Hallowed Steam', 2),
('Incandescent', 3),
('Temporary Culture', 4);

INSERT INTO songs (name, album_id)
VALUE
('Soul For Us', 1),
('Reflections Of Magic', 1),
('Dance With Her Own', 1),
('Troubles Of My Inner Fire', 2),
('Time Fireworks', 2),
('Magic Circus', 3),
('Honey, So Do I', 3),
("Sweetie, Let's Go Wild", 3),
('She Knows', 3),
('Fantasy For Me', 4),
('Celebration Of More', 4),
('Rock His Everything', 4),
('Home Forever', 4),
('Diamond Power', 4),
("Honey, Let's Be Silly", 4),
('Thang Of Thunder', 5),
('Words Of Her Life', 5),
('Without My Streets', 5);

INSERT INTO history(user_id, song_id)
VALUES
(1, 1),
(1, 6),
(1, 14),
(1, 16),
(2, 13),
(2, 17),
(2, 2),
(2, 15),
(3, 4),
(3, 16),
(3, 6),
(4, 3),
(4, 18),
(4, 11);

INSERT INTO following(user_id, artist_id)  
VALUES
(1, 1),
(1, 4),
(1, 3),
(2, 1),
(2, 3),
(3, 2),
(3, 1),
(4, 4);

-- Exercicio 2
DROP VIEW estatisticas_musicais;

CREATE VIEW estatisticas_musicais AS SELECT
(SELECT COUNT(song_id) FROM SpotifyClone.songs) AS `cancoes`,
(SELECT COUNT(artist_id) FROM SpotifyClone.artists) AS `artistas`,
(SELECT COUNT(album_id) FROM SpotifyClone.albums) AS `albuns`;

SELECT * FROM estatisticas_musicais;

-- Exercicio 3
DROP VIEW historico_reproducao_usuarios;

CREATE VIEW historico_reproducao_usuarios AS 
SELECT 
U.name AS `usuario`,
S.name AS `nome`
FROM SpotifyClone.users AS U
JOIN SpotifyClone.history AS H ON U.user_id = H.user_id
JOIN SpotifyClone.songs AS S ON S.song_id = H.song_id
ORDER BY `usuario` ASC, `nome` ASC;

SELECT * FROM historico_reproducao_usuarios;

-- Exercicio 4
DROP VIEW top_3_artistas;

CREATE VIEW top_3_artistas AS
SELECT 
A.name AS `artista`,
COUNT(F.artist_id) AS `seguidores`
FROM SpotifyClone.artists AS A
JOIN SpotifyClone.following AS F ON A.artist_id = F.artist_id
GROUP BY F.artist_id
ORDER BY `seguidores` DESC, `artista` ASC
LIMIT 3;

SELECT * FROM top_3_artistas;

-- Exercicio 5
DROP VIEW top_2_hits_do_momento;

CREATE VIEW top_2_hits_do_momento AS
SELECT
S.name AS `cancao`,
COUNT(H.song_id) AS `reproducoes`
FROM SpotifyClone.songs AS S
JOIN SpotifyClone.history AS H ON S.song_id = H.song_id
GROUP BY S.name
ORDER BY `reproducoes` DESC, `cancao` ASC
LIMIT 2;

SELECT * FROM top_2_hits_do_momento;

-- Exercicio 6
DROP VIEW faturamento_atual;

CREATE VIEW faturamento_atual AS
SELECT
MIN(S.price) AS `faturamento_minimo`,
MAX(S.price) AS `faturamento_maximo`,
ROUND(AVG(S.price),2) AS `faturamento_medio`,
SUM(S.price) AS `faturamento_total`
FROM SpotifyClone.subscription AS S
JOIN SpotifyClone.users AS U ON S.subscription_id = U.subscription_id;

SELECT * FROM faturamento_atual;

-- Exercicio 7
DROP VIEW perfil_artistas;

-- CREATE VIEW perfil_artistas AS
SELECT 
AR.name AS `artista`,
AL.name AS `album`,
COUNT(F.artist_id) AS `seguidores`
FROM SpotifyClone.artists AS AR,
SpotifyClone.albums AS AL
JOIN SpotifyClone.following AS F ON F.artist_id = AL.artist_id
GROUP BY `album`;

SELECT * FROM perfil_artistas;



