const router = require("express").Router();
const { getAllUsers, signup, login } = require("../controller/user-conroller");

router.get("/",getAllUsers)
router.post("/signup",signup)
router.post("/login",login)

module.exports = router;