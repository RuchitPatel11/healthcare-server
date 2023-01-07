const {
  validatePatient,
  Patient,
  validatePatientUpdate,
} = require("../Models/patient.model");

const addPatient = async (req, res, next) => {
  const { error, value } = validatePatient(req.body);

  if (error) return res.status(404).send(error.message);
  try {
    let patient = await Patient.findOne({
      name: value.name,
    });
    if (patient) return res.status(403).send("Patient Already Exists!!");

    const newPatient = new Patient(value);

    newPatient.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send("Patient Inserted Successfully");
    });
    return;
  } catch (error) {
    return next({ error });
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patient = await Patient.find();
    if (!patient) return res.status(404).send("Patient Does Not exist");
    res.send(patient);
    return;
  } catch (error) {
    return next({ error });
  }
};

const getPatientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);

    if (!patient) return res.status(400).send("Patient Does Not Exist");
    res.send(patient);
    return;
  } catch (error) {
    return next({ error });
  }
};

const updatePatientById = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = validatePatientUpdate(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const patient = await Patient.findByIdAndUpdate(id, value);
    if (!patient) return res.status(400).send("Patient Does Not Exist");

    return res.send("Patient Updated!!!");
  } catch (error) {
    return next({ error });
  }
};

const deletePatientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(400).send("Patient Does Not Exist");
    res.send("Patient Deleted!!!");
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
