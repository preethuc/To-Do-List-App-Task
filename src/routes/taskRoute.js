import express from "express";
const router = express.Router();
import taskController from "../controllers/taskController";
router.route("/aggr").get(taskController.getTaskAndStatus);
router.route("/byDays/").get(taskController.getBeforeDaysTask);


router.route("/all").get(taskController.getAllList);
router.route("/create").post(taskController.createTask);
router.route("/comment").put(taskController.addComment);
router
  .route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
