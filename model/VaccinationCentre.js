const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationCentreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: Number,
    default: 10
  }
});

module.exports = mongoose.model("Vaccination Centre", vaccinationCentreSchema);
