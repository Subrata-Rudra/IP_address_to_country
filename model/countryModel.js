const mongoose = require("mongoose");

const countrySchema = mongoose.Schema(
  {
    country: { type: String },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
