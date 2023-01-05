const router = require("express").Router();
const taskController = require("../controllers/nurseTask.controller");

//Add NurseTask
router.post("/", taskController.addTask);

// Get All NurseTasks
router.get("/", taskController.getTask);

//Get NurseTask By ID
router.get("/:id", taskController.getTaskById);

// Update NurseTask By ID
router.put("/:id", taskController.updateTaskById);

// Delete NurseTask By ID
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
