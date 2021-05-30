import express from 'express'
import {createPerson, readPerson, versionReadPerson, readAllPersons, updatePerson, deletePerson} from '../controllers/controllers.js'

const router = express.Router()
router.post("", createPerson)
router.get("", readAllPersons)
router.get("/:personID", readPerson)
router.get("/:personID/:version", versionReadPerson)
router.put("/:personID", updatePerson)
router.delete("/:personID", deletePerson)

export default router;