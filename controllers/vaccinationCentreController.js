const VaccinationCentre = require("../model/VaccinationCentre");

const getAllVaccinationCentres = async (req, res) => {
  try {
    const vaccinationCentres = await VaccinationCentre.find().exec();
    if (!vaccinationCentres) {
      return res.status(204).json({ message: "No VaccinationCentres Found" });
    }
    res.json(vaccinationCentres);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vaccination centres" });
  }
};

const createNewVaccinationCentre = async (req, res) => {
  try {
    if (!req?.body?.name || !req?.body?.role) {
      return res.status(400).json({ message: "Name and Role are required fields, please fill them" });
    }

    await VaccinationCentre.create({ name: req.body.name, role: req.body.role });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Failed to create new vaccination centre" });
  }
};

const updateVaccinationCentre = async (req, res) => {
  try {
    const vaccinationCentre = await VaccinationCentre.findOne({ _id: req.body.id });

    if (!vaccinationCentre) {
      return res.status(404).json({ message: "VaccinationCentre not found" });
    }

    if (req?.body?.name) {
      vaccinationCentre.name = req.body.name;
    }

    if (req?.body?.role) {
      vaccinationCentre.area = req.body.area;
    }

    const result = await vaccinationCentre.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update vaccination centre" });
  }
};

const deleteVaccinationCentre = async (req, res) => {
  try {
    const vaccinationCentre = await VaccinationCentre.findOne({ _id: req.body.id });
    
    if (!vaccinationCentre) {
      return res.status(404).json({ message: "VaccinationCentre not found" });
    }
    
    await vaccinationCentre.deleteOne();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vaccination centre" });
  }
};

const bookSlot = async (req, res) => {
  try {
    const vaccinationCentre = await VaccinationCentre.findOne({ _id: req.params.id });

    if (!vaccinationCentre) {
      return res.status(404).json({ message: "VaccinationCentre not found" });
    }

    if (vaccinationCentre.availableSlots === 0) {
      return res.status(400).json({ message: "No available slots" });
    }

    vaccinationCentre.availableSlots--;
    await vaccinationCentre.save();

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Failed to book a slot" });
  }
};

const getVaccinationCentre = async (req, res) => {
  try {
    const vaccinationCentre = await VaccinationCentre.findOne({ _id: req.params.id }).exec();

    if (!vaccinationCentre) {
      return res.status(404).json({ message: "VaccinationCentre not found" });
    }

    res.json(vaccinationCentre);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vaccination centre" });
  }
};

module.exports = {
  getAllVaccinationCentres,
  createNewVaccinationCentre,
  updateVaccinationCentre,
  deleteVaccinationCentre,
  bookSlot,
  getVaccinationCentre,
};
