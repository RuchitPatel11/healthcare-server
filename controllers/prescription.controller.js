const { Disease } = require("../Models/disease.model");
const { Medicine } = require("../Models/medicine.model");
const { Patient } = require("../Models/patient.model");
const {
  validatePrescription,
  Prescription,
  validatePrescriptionUpdate,
} = require("../Models/prescription.model");

const addPrescription = async (req, res, next) => {
  const { error, value } = validatePrescription(req.body);

  if (error) return res.status(404).send(error.message);
  try {
    let patient = await Patient.findById(value.patient);
    let disease = await Disease.findById(value.diseases);
    let medicine = await Medicine.findById(value.medicines);
    if (patient && disease && medicine) {
      const newPrescription = new Prescription(value);

      newPrescription.save(function (err) {
        if (err) return res.status(404).send(err);
        res.status(200).send("Prescription Added");
      });
      return;
    } else {
      res.send("Invalid Patient,Disease or Medicine");
    }
    return;
  } catch (error) {
    return next({ error });
  }
};

const getPrescriptions = async (req, res, next) => {
  try {
    const prescription = await Prescription.find()
      .populate("patient medicines diseases", "-_id -__v -createdAt -updatedAt")
      .select("-_id -__v -createdAt -updatedAt");
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
    const prescription = await Prescription.findById(id)
      .populate("patient medicines diseases", "-_id -__v -createdAt -updatedAt")
      .select("-_id -__v -createdAt -updatedAt");

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
    let patient = await Patient.findById(value.patient);
    let disease = await Disease.findById(value.diseases);
    let medicine = await Medicine.findById(value.medicines);
    if (patient && disease && medicine) {
      const prescription = await Prescription.findByIdAndUpdate(id, value);
      if (!prescription)
        return res.status(400).send("Prescription Does Not Exist");

      return res.send("Prescription Updated");
    } else {
      res.send("Invalid Patient,Disease or Medicine");
    }
    return;
  } catch (error) {
    return next({ error });
  }
};

const updatePrescriptionMedicine = async (req, res, next) => {
  const { id } = req.params;
  const { medicines } = req.body;
  try {
    let medicine = await Medicine.findById(value.medicines);
    if (medicine) {
      const prescription = await Prescription.findOne({ id });
      if (!prescription)
        return res.status(400).send("Prescription Does Not Exist");

      const already = prescription.medicines.includes(medicines);
      if (already)
        return res.status(400).send("Medicine already exists in Prescription");
      prescription.medicines.push(medicines);

      await prescription.save();
      return res.send("Prescription Updated");
    } else {
      res.send("Medicine Does not Exist");
    }
  } catch (error) {
    return next({ error });
  }
};

const updatePrescriptionDisease = async (req, res, next) => {
  const { id } = req.params;
  const { diseases } = req.body;

  try {
    let disease = await Disease.findById(value.diseases);
    if (disease) {
      const prescription = await Prescription.findOne({ id });
      if (!prescription)
        return res.status(400).send("Prescription Does Not Exist");
      const already = prescription.diseases.includes(diseases);
      if (already)
        return res.status(400).send("Disease already exist in Prescription");
      prescription.diseases.push(diseases);

      await prescription.save();
      return res.send("Prescription Updated");
    } else {
      res.send("Disease Does not Exist");
    }
  } catch (error) {
    return next({ error });
  }
};

const deletePrescriptionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findByIdAndDelete(id);
    if (!prescription)
      return res.status(400).send("Prescription Does Not Exist");
    res.send("Deleted Successfully");
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
  updatePrescriptionMedicine,
  updatePrescriptionDisease,
};
