DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS personsVersions;

CREATE TABLE person (
    personID UUID NOT NULL PRIMARY KEY,
    UNIQUE(personID)
);

CREATE TABLE personsVersions (
    mainID UUID NOT NULL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    middleName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    versionNum INTEGER NOT NULL,
    UNIQUE(mainID),
    pID UUID REFERENCES person(personID) NOT NULL
);

INSERT INTO person (personID) VALUES ('148df625-a771-4c9e-a450-7811f4aa449f');
INSERT INTO personsVersions (mainID, firstName, middleName, lastName, email, age, versionNum, pID) VALUES ('6bd3635a-bd8e-448b-8ffa-a44c192a5bc3', 'Jake', '', 'Charles', 'jc@gmail.com', 19, 1, '148df625-a771-4c9e-a450-7811f4aa449f');

INSERT INTO person (personID) VALUES ('d6b8e01d-b5c3-4596-8989-2619aed139ab');
INSERT INTO personsVersions (mainID, firstName, middleName, lastName, email, age, versionNum, pID) VALUES ('e79d6b5c-024f-41b9-a4ed-93fc5ea3f51f', 'Dan', 'The', 'Man', 'DanTheMan@gmail.com', 29, 1, 'd6b8e01d-b5c3-4596-8989-2619aed139ab');

INSERT INTO person (personID) VALUES ('e31f009e-968c-4a7e-95b4-da55022b693f');
INSERT INTO personsVersions (mainID, firstName, middleName, lastName, email, age, versionNum, pID) VALUES ('732528a9-b996-40e2-b2be-3ea4d095633d', 'Steve', '', 'Breeze', 'S0@gmail.com', 32, 1, 'e31f009e-968c-4a7e-95b4-da55022b693f');

INSERT INTO personsVersions (mainID, firstName, middleName, lastName, email, age, versionNum, pID) VALUES ('ca806fb5-eee7-4456-bf01-b6be32590f7d', 'Steve', '', 'Breeze', 'S0@gmail.com', 33, 2, 'e31f009e-968c-4a7e-95b4-da55022b693f');
