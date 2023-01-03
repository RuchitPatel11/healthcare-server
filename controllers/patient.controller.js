const { validatePatient, Patient } = require("../Models/patient.model");

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
      res.status(200).send(newPatient);
    });
    return next();
  } catch (error) {
    return next({ error });
  }
};

const getPatient = async (req, res, next) => {
  const patient = await Patient.find();
  if (!patient) return res.status(404).send("Patient Does Not exist");
  res.send(patient);
  next();
};

const getPatientById = async (req, res, next) => {
  const patient = await Patient.findById();
  if (!patient) return res.status(404).send("Patient Does Not exist");
  res.send(patient);
};

module.exports = { addPatient, getPatient, getPatientById };
