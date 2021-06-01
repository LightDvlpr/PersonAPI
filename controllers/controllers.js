import { v4 as uuidv4 } from "uuid";
import db from "../db/setConnect.js";

export const createPerson = async (req, res) => {
  try {
    const personID = uuidv4();
    const mainID = uuidv4();
    const { firstName, middleName, lastName, email, age } = req.body;
    const version = 1;
    await db.query(
      "INSERT INTO person VALUES ($1)",
      [personID]
    );
    
    await db.query(
      "INSERT INTO personsVersions VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [mainID, firstName, middleName, lastName, email, age, version, personID]
    );

    res.status(201).send("Query successfully submitted");
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};

export const readPerson = async (req, res) => {
  try {
    const { personID } = req.params;
    const readPerson = await db.query(
      "SELECT firstname, middlename, lastname, email, age, pID, MAX(versionnum) as latestVersion FROM person inner join personsVersions on personID = pID WHERE pID = $1 GROUP BY firstname, middlename, lastname, email, age, pid",
      [personID]
    );

    res.json(readPerson.rows);
    res.status(201)
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};

export const versionReadPerson = async (req, res) => {
  try {
    const { personID, version } = req.params;
    const versionReadPerson = await db.query(
      "SELECT firstname, middlename, lastname, email, age, pID, MAX(versionnum) as chosenVersion FROM person inner join personsVersions on personID = pID WHERE pID = $1 AND versionNum = $2 GROUP BY firstname, middlename, lastname, email, age, pid",
      [personID, version]
    );

    res.json(versionReadPerson.rows);
    res.status(201)
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};

export const readAllPersons = async (req, res) => {
  try {
    const readAllPersons = await db.query(
      "SELECT firstname, middlename, lastname, email, age, pID, MAX(versionnum) as latestVersion FROM person inner join personsVersions on personID = pID  WHERE firstname IS NOT NULL GROUP BY firstname, middlename, lastname, email, age, pid"
    );

    res.json(readAllPersons.rows);
    res.status(201)
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};

export const updatePerson = async (req, res) => {
  try {
      const newID = uuidv4();
      const {personID} = req.params
      const { firstName, middleName, lastName, email, age } = req.body;
      const version = (await db.query("SELECT MAX(versionnum) FROM personsVersions WHERE pID = $1",
      [personID])).rows[0].max + 1

      const updatePerson = await db.query("INSERT INTO personsVersions VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [newID, firstName, middleName, lastName, email, age, version, personID])

      res.json(updatePerson.rows);
      res.status(201)
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};

export const deletePerson = async (req, res) => {
  try {
    const {personID} = req.params
    const version = (await db.query("SELECT MAX(versionnum) FROM personsVersions WHERE pID = $1",
      [personID])).rows[0].max

    if(version == 1){
      await db.query("DELETE FROM personsVersions WHERE (firstName, versionnum) IN (SELECT firstname, MAX(versionnum) as latestVersion FROM person inner join personsVersions on personID = pID WHERE pID = $1 GrOUP BY firstname);", 
      [personID])
      const deleteFromPerson = await db.query("DELETE FROM person WHERE personID = $1", [personID])
      res.json(deleteFromPerson.rows)
    } else {
      const deleteFromPersonsVersions = await db.query("DELETE FROM personsVersions WHERE (firstName, versionnum) IN (SELECT firstname, MAX(versionnum) as latestVersion FROM person inner join personsVersions on personID = pID WHERE pID = $1 GrOUP BY firstname);", 
      [personID])
      res.json(deleteFromPersonsVersions.rows)
    }

    res.status(201)
  } catch (err) {
    console.log(err.message);
    res.send(err.message)
  }
};