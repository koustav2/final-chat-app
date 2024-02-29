
const express = require('express')
const { login, register, logout } = require("../controllers/user.controllers.js");
const { verifyToken } = require("../middlewares/auth.middleware.js")
const router = express.Router();



router.route("/register").post(register)
router.route('/login').post(login);
// router.route("/change-password").post(verifyToken, changeCurrentPassword);
// router.route("/update-account").patch(verifyToken, updateAccountDetails);
// router.route("/update-avatar").post(verifyToken, upload.single("avatar"), updateUserAvatar);
// router.route("/c/:username").get(verifyToken, getUserChannelProfile)
// router.route('/refresh-token').post(refreshAccessToken);
router.route('/logout').post(verifyToken, logout);

module.exports = router;