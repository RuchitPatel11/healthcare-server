const {
  validatePrescription,
  Prescription,
  validatePrescriptionUpdate,
} = require("../Models/prescription.model");

const addPrescription = async (req, res, next) => {
  const { error, value } = validatePrescription(req.body);
  console.log("hello");
  if (error) return res.status(404).send(error.message);
  try {
    const newPrescription = new Prescription(value);

    newPrescription.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send(newPrescription);
    });
    return;
  } catch (error) {
    return next({ error });
  }
};

const getPrescription = async (req, res, next) => {
  console.log("helo");
  try {
    const prescription = await Prescription.find()
      .populate("patientId medicines", "-_id -__v -createdAt -updatedAt")
      .populate({
        path: "diseases",
        select: "-_id -__v -createdAt -updatedAt",
      });
    if (!prescription)
      return res.status(404).send("Prescription Does Not exist");
    res.send(prescription);
    return;
  } catch (error) {
    return next({ error });
  }
};

const getPrescriptionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id);

    if (!prescription)
      return res.status(400).send("Prescription Does Not Exist");
    res.send(prescription);
    return;
  } catch (error) {
    return next({ error });
  }
};

const updatePrescriptionById = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = validatePrescriptionUpdate(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const prescription = await Prescription.findByIdAndUpdate(id, value);
    if (!prescription)
      return res.status(400).send("Prescription Does Not Exist");

    return res.send(prescription);
  } catch (error) {
    return next({ error });
  }
};

const deletePrescriptionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findByIdAndDelete(id);
    res.send(prescription);
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addPrescription,
  getPrescription,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
};
