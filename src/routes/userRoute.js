import express from "express";
const router = express.Router();
import userController from "../controllers/userController";

router.route("/signup").post(userController.register);
router.route("/login").post(userController.login);
router.route("/all").get(userController.getAllUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
