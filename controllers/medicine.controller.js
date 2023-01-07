const {
  validateMedicine,
  Medicine,
  validateMedicineUpdate,
} = require("../Models/medicine.model");

const addMedicine = async (req, res, next) => {
  const { error, value } = validateMedicine(req.body);

  if (error) return res.status(404).send(error.message);
  try {
    let medicine = await Medicine.findOne({
      name: value.name,
    });
    if (medicine) return res.status(403).send("Medicine Already Exists!!");

    const newMedicine = new Medicine(value);

    newMedicine.save(function (err) {
      if (err) return res.status(404).send(err);
      res.status(200).send("Medicine Inserted Successfully !!!");
    });
    return;
  } catch (error) {
    return next({ error });
  }
};

const getMedicines = async (req, res, next) => {
  try {
    const medicine = await Medicine.find();
    if (!medicine) return res.status(404).send("Medicine Does Not exist");
    res.send(medicine);
    return;
  } catch (error) {
    return next({ error });
  }
};

const getMedicineById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findById(id);

    if (!medicine) return res.status(400).send("Medicine Does Not Exist");
    res.send(medicine);
    return;
  } catch (error) {
    return next({ error });
  }
};

const updateMedicineById = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = validateMedicineUpdate(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const medicine = await Medicine.findByIdAndUpdate(id, value);
    if (!medicine) return res.status(400).send("Medicine Does Not Exist");

    return res.send(medicine);
  } catch (error) {
    return next({ error });
  }
};

const deleteMedicineById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) return res.status(400).send("Medicine Does Not Exist");
    res.send("Medicine Deleted Successfully!!!");
    return;
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicineById,
  deleteMedicineById,
};
