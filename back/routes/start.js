const usersController = require('../controllers/UsersController');
const authController = require('../controllers/AuthController');
const authMiddleware = require("../controllers/middlewares/auth")

const express = require('express');
const router = express.Router();

router.get("/users", usersController.index);
router.post("/users", usersController.store);
router.get("/users/:id", usersController.show);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.destroy);
router.get("/users/:id/house", usersController.getHouse)
router.get(
    "/getMyProfile", authMiddleware.authenticate,
    usersController.getMyProfile
)
router.post("/login", authController.login);

module.exports = router;