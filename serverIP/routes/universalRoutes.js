import express from "express"

import {getAllItJobs, getAllTeachJobs, getAllHandJobs, getAllCarJobs, getAllElectrJobs, getAllStat} from "../controller/universalController.js"

const router = express.Router()

router.get("/get-all-it-jobs", getAllItJobs)
router.get("/get-all-teach-jobs", getAllTeachJobs)
router.get("/get-all-hand", getAllHandJobs)
router.get("/get-all-car", getAllCarJobs)
router.get("/get-all-electr", getAllElectrJobs)
router.get("/get-stat", getAllStat)

export default router