import express from "express"
import {accessTokenChecker} from "../middleware/accressTokenChecker.js"
import {changeUserInfo, createWork, giveAllWorks, createVocation, giveAllVocation} from "../controller/userController.js"
import {uploadAvatar} from "../middleware/uploadAvatar.js"
import {uploadWork} from "../middleware/uploadWork.js"
const router = express.Router()

router.post("/change-user-info", accessTokenChecker, uploadAvatar.single("avatar"), changeUserInfo)
router.post("/create-work", accessTokenChecker, uploadWork.single("imgWork"), createWork)
router.get("/get-all-works", accessTokenChecker, giveAllWorks, createVocation)


router.post("/create-vocation", accessTokenChecker, createVocation)
router.get("/get-vocations", accessTokenChecker, giveAllVocation)

export default router