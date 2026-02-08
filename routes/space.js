const express = require("express")
const router = express.Router()
const {getAllSpaces,getSpace,createSpace,updateSpace,deleteSpace} = require("../controllers/space")

router.route("/").get(getAllSpaces).post(createSpace)
router.route("/:id").get(getSpace).patch(updateSpace)
router.route("/:id").delete(deleteSpace)

module.exports = router