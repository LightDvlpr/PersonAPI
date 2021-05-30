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

