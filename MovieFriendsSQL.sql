-- create tables

CREATE TABLE Movie (
	[MovieId] [int]  NOT NULL IDENTITY(1, 1) PRIMARY KEY,
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
	[DateJoined] [datetime] NOT NULL
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
VALUES('Aliens', 'https://images-na.ssl-images-amazon.com/images/I/51cAAgWdFfL._AC_.jpg'),
	  ('Bumblebee', 'https://images-na.ssl-images-amazon.com/images/I/71LlMXBogbL._AC_SY606_.jpg'),
	  ('Cabaret', 'https://images-na.ssl-images-amazon.com/images/I/61NTI5GVF-L._AC_SY879_.jpg'),
	  ('Disturbia', 'https://images-na.ssl-images-amazon.com/images/I/41jCoj%2By2WL._AC_.jpg')

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

SELECT *
FROM Event
JOIN Movie on Movie.MovieId = Event.MovieId
JOIN [User] on [User].UserId = Event.HostId

SELECT *
FROM Invite
JOIN [User] on [User].UserId = Invite.UserId
JOIN Event on Event.EventId = Invite.EventId