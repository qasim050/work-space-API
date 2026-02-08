const express = require("express")
const router = express.Router()
const {startSession,endSession,getSession,getAllSessions} = require("../controllers/session")
router.route("/").get(getAllSessions)
router.route("/:id").get(getSession)
router.route("/start").post(startSession)
router.route("/end/:id").post(endSession)
// router.route("/:id").delete()
module.exports = router