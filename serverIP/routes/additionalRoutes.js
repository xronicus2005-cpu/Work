import express from "express"
import {accessTokenChecker} from "../middleware/accressTokenChecker.js"
import {getJobDetails, getAllVoc} from "../controller/additonalController.js"

const router = express.Router()


router.get("/get-job-details/:id", accessTokenChecker, getJobDetails)
router.get("/get-all-voc", getAllVoc)

export default router