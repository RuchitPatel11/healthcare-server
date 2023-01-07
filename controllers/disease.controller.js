const {
  validateDisease,
  Disease,
  validateDiseaseUpdate,
} = require("../Models/disease.model");

const addDisease = async (req, res, next) => {
  const { error, value } = validateDisease(req.body);

  if (error) return res.status(404).send(error.message);
  try {
    let disease = await Disease.findOne({
      name: value.name,
    });
    if (disease) return res.status(403).send("Disease Already Exists!!");

    const newDisease = new Disease(value);

    newDisease.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send("Disease Inserted Successfully !!!");
    });
    return;
  } catch (error) {
    return next({ error });
  }
};

const getDiseases = async (req, res, next) => {
  try {
    const disease = await Disease.find().select(
      "-_id -__v -createdAt -updatedAt"
    );
    if (!disease) return res.status(404).send("Disease Does Not exist");
    res.send(disease);
    return;
  } catch (error) {
    return next({ error });
  }
};

const getDiseaseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const disease = await Disease.findById(id).select(
      "-_id -__v -createdAt -updatedAt"
    );

    if (!disease) return res.status(400).send("Disease Does Not Exist");
    res.send(disease);
    return;
  } catch (error) {
    return next({ error });
  }
};

const updateDiseaseById = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = validateDiseaseUpdate(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const disease = await Disease.findByIdAndUpdate(id, value);
    if (!disease) return res.status(400).send("Disease Does Not Exist");

    return res.send("Disease Updated!!!");
  } catch (error) {
    return next({ error });
  }
};

const deleteDiseaseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const disease = await Disease.findByIdAndDelete(id);
    if (!disease) return res.status(400).send("Disease Does Not Exist");
    res.send("Disease Deleted Successfully!!!");
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addDisease,
  getDiseases,
  getDiseaseById,
  updateDiseaseById,
  deleteDiseaseById,
};
