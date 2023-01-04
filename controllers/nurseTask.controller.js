const {
  validateNurseTask,
  NurseTask,
  validateNurseTaskUpdate,
} = require("../Models/task.model");

const addTask = async (req, res, next) => {
  const { error, value } = validateNurseTask(req.body);

  if (error) return res.status(404).send(error.message);
  try {
    let task = await NurseTask.findOne({
      patientId: value.patientId,
    });
    if (task) return res.status(403).send("Task Already Exists!!");

    const newTask = new NurseTask(value);

    newTask.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send("Task Inserted Successfully !!!");
    });
    return;
  } catch (error) {
    return next({ error });
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await NurseTask.find();
    if (!task) return res.status(404).send("Task Does Not exist");
    res.send(task);
    return;
  } catch (error) {
    return next({ error });
  }
};

const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await NurseTask.findById(id);

    if (!task) return res.status(400).send("Task Does Not Exist");
    res.send(task);
    return;
  } catch (error) {
    return next({ error });
  }
};

const updateTaskById = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = validateNurseTaskUpdate(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const task = await NurseTask.findByIdAndUpdate(id, value);
    if (!task) return res.status(400).send("Task Does Not Exist");

    return res.send(task);
  } catch (error) {
    return next({ error });
  }
};

const deleteTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await NurseTask.findByIdAndDelete(id);
    res.send(task);
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addTask,
  getTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
