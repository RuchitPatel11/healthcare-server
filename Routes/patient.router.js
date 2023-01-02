const router = require("express").Router();
const { Patient, validatePatient } = require("../Models/patient.model");

router.use((req, res, next) => {
  if (req.method === "POST" && req.user.role !== "Nurse") {
    return res
      .status(403)
      .send("You don't have permission to access this resource.");
  }
  next();
});

router.post("/", async (req, res, next) => {
  const { error, value } = validatePatient(req.body);

  if (error) return res.status(404).send(error.message);

  let patient = await Patient.findOne({
    name: value.name,
  });
  if (patient) return res.status(403).send("Patient Already Exists!!");

  const newPatient = new Patient(value);

  newPatient.save(function (err) {
    if (err) return res.status(404).send(err);
    res.status(200).send(newPatient);
  });
});

router.use((req, res, next) => {
  if (req.method === "GET" && req.user.role !== "Doctor") {
    return res
      .status(403)
      .send("You don't have permission to access this resource.");
  }
  next();
});

router.get("/", async (req, res, next) => {
  const patient = await Patient.find();
  if (!patient) return res.status(404).send("Patient Does Not exist");
  res.send(patient);
});

module.exports = router;
