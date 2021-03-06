-- create tables

CREATE TABLE Movie (
	[MovieId] [int]  NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[MovieDBId] [nvarchar](100) NOT NULL,
	[MovieTitle] [nvarchar](max) NOT NULL,
	[MoviePoster] [nvarchar](500) NOT NULL,
)

CREATE TABLE MovieChoices (
	[MovieChoicesId] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[MovieId] [int] NOT NULL,
	[EventId] [int] NOT NULL,
	[Votes] [int] NULL,
)

CREATE TABLE [Event] (
	[EventId] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[MovieId] [int] NULL,
	[HostId] [int] NOT NULL,
	[DateTime] [datetime] NOT NULL,
	[Location] [varchar](100) NOT NULL,
	[DateEventCreated] [datetime] NOT NULL,
	[Notes] [nvarchar](max) NULL,
)

CREATE TABLE [Invite] (
	[InviteId] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[UserId] int NOT NULL,
	[EventId] int NOT NULL,
)

CREATE TABLE [User] (
	[UserId] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[DateJoined] [datetime] NOT NULL,
	FirebaseUid nvarchar(500) NULL
)

-- adding foreign keys

ALTER TABLE [MovieChoices] ADD FOREIGN KEY (MovieId) REFERENCES [Movie](MovieId)

ALTER TABLE [MovieChoices] ADD FOREIGN KEY (EventId) REFERENCES [Event](EventId)

ALTER TABLE [Event] ADD FOREIGN KEY (MovieId) REFERENCES [Movie](MovieId)

ALTER TABLE [Event] ADD FOREIGN KEY (HostId) REFERENCES [User](UserId)

ALTER TABLE [Invite] ADD FOREIGN KEY (EventId) REFERENCES [Event](EventId)

ALTER TABLE [Invite] ADD FOREIGN KEY (UserId) REFERENCES [User](UserId)

-- add seed data

INSERT INTO [User](FirstName, LastName, Email, DateJoined)
VALUES('Abra', 'Abramson', 'aa@test.com', '2020-01-19'),
	  ('Barry', 'Bronson', 'bb@test.com', '2020-02-19'),
	  ('Carl', 'Clark', 'cc@test.com', '2020-03-19'),
	  ('Diane', 'Damian', 'dd@test.com', '2020-04-19'),
	  ('Edward', 'Elijah', 'ee@test.com', '2020-05-19')

INSERT INTO Movie(MovieTitle, MoviePoster)
VALUES('Aliens', 'https://m.media-amazon.com/images/M/MV5BZGU2OGY5ZTYtMWNhYy00NjZiLWI0NjUtZmNhY2JhNDRmODU3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'),
	  ('Bumblebee', 'https://m.media-amazon.com/images/M/MV5BMjUwNjU5NDMyNF5BMl5BanBnXkFtZTgwNzgxNjM2NzM@._V1_SX300.jpg'),
	  ('Cabaret', 'https://m.media-amazon.com/images/M/MV5BNTEyMzc0Mjk5MV5BMl5BanBnXkFtZTgwMjI2NDIwMTE@._V1_SX300.jpg'),
	  ('Disturbia', 'https://m.media-amazon.com/images/M/MV5BMTMyNTIxOTQ3M15BMl5BanBnXkFtZTcwMjU2NzAzMw@@._V1_SX300.jpg')

INSERT INTO MovieChoices(MovieId, EventId, Votes)
VALUES(1, 1, 0),
	  (2, 1, 0),
	  (3, 1, 0),
	  (4, 1, 4),
	  (1, 2, 0),
	  (2, 2, 0),
	  (3, 2, 4),
	  (4, 2, 0),
	  (1, 3, 2),
	  (2, 3, 1),
	  (3, 3, 1),
	  (4, 3, 0),
	  (1, 4, 1),
	  (2, 4, 1),
	  (3, 4, 1),
	  (4, 4, 1)

INSERT INTO [Event](MovieId, HostId, [DateTime], [Location], DateEventCreated, Notes)
VALUES(4, 1, '2020-06-19', 'Abra House', '2020-06-18', 'Somebody bring popcorn'),
	  (3, 2, '2020-07-19', 'Barry House', '2020-07-18', 'N/A'),
	  (1, 3, '2020-08-19', 'Clark House', '2020-08-18', 'Do not park in the yard'),
	  (2, 4, '2020-09-19', 'Damian House', '2020-09-18', 'Mops included')

INSERT INTO Invite(UserId, EventId)
VALUES(2, 1),
	  (3, 1),
	  (4, 1),
	  (5, 1),
	  (1, 2),
	  (3, 2),
	  (4, 2),
	  (5, 2),
	  (1, 3),
	  (2, 3),
	  (4, 3),
	  (5, 3),
	  (1, 4),
	  (2, 4),
	  (3, 4),
	  (5, 4)
	  
SELECT *
FROM [User]

SELECT *
FROM Movie

SELECT *
FROM MovieChoices
JOIN Movie on Movie.MovieId = MovieChoices.MovieId
JOIN Event on Event.EventId = MovieChoices.EventId

SELECT Event.[DateTime], Event.[Location], Event.[DateEventCreated], Event.Notes, Movie.MovieTitle, Movie.MoviePoster, [User].FirstName, [User].LastName
FROM Event
JOIN Movie on Movie.MovieId = Event.MovieId
JOIN [User] on [User].UserId = Event.HostId
WHERE Event.EventId = 3

SELECT *
FROM Event
JOIN Movie on Movie.MovieId = Event.MovieId
JOIN [User] on [User].UserId = Event.HostId

SELECT *
FROM Invite
JOIN [User] on [User].UserId = Invite.UserId
JOIN Event on Event.EventId = Invite.EventId

/* get events for host */
SELECT *
FROM [Event]
JOIN [User] ON Event.HostId = [User].UserId
WHERE [User].UserId = 1

/* get events for user */
SELECT *
FROM [Event]
JOIN Invite ON Event.EventId = Invite.EventId
JOIN [User] ON Invite.UserId = [User].UserId
JOIN Movie ON Event.MovieId = Movie.MovieId
WHERE [User].UserId = 1

UPDATE [User]
SET [User].FirebaseUid = 'qqdXTVnDDabwq2X9vWXikUuZvz32'
WHERE [User].UserId = 1

UPDATE [User]
SET [User].Email = 'jtestaddress1@gmail.com'
WHERE [User].UserId = 1

UPDATE [User]
SET [User].FirebaseUid = 'ArCyHOKtIqYtAslVraPuMERpMPb2'
WHERE [User].UserId = 2

UPDATE [User]
SET [User].Email = 'jtestaddress2@gmail.com'
WHERE [User].UserId = 2

SELECT *
FROM [Event]
JOIN [User] ON Event.HostId = [User].UserId
JOIN Movie ON Event.MovieId = Movie.MovieId
WHERE [User].UserId = 1

SELECT *
FROM Invite

SELECT *
FROM Movie

ALTER TABLE [Movie] ADD [MovieDBId] [nvarchar](100) NULL

UPDATE [Movie]
SET [Movie].MovieDbId = 'tt0090605'
WHERE [Movie].MovieId = 1

UPDATE [Movie]
SET [Movie].MovieDbId = 'tt4701182'
WHERE [Movie].MovieId = 2

UPDATE [Movie]
SET [Movie].MovieDbId = 'tt0068327'
WHERE [Movie].MovieId = 3

UPDATE [Movie]
SET [Movie].MovieDbId = 'tt0486822'
WHERE [Movie].MovieId = 4

SELECT  *
FROM invite

DELETE
FROM [Invite]
WHERE EventId = 12

SELECT  *
FROM invite

select *
from [event]

DELETE
FROM [Event]
WHERE EventId = 12

select *
from [event]

SELECT *
FROM Movie

DELETE Movie
FROM Movie
WHERE Movie.MovieId = 13

SELECT *
FROM Movie

DELETE Movie
USING [Event]
WHERE Movie.MovieId = [Event].MovieId

SELECT *
FROM Movie

select *
from [event]

SELECT  *
FROM invite