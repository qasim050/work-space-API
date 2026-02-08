const express = require("express")
const router = express.Router()
const {getAllUsers,getUser,createUser,deleteUser} = require("../controllers/user")

router.get("/",getAllUsers)
router.post("/",createUser)
router.delete("/:id",deleteUser)
router.get("/:id",getUser)

 module.exports = router