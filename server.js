const express = require("express");
const port = process.env.PORT || 4000;
const path = require("path");
const cors = require("cors");
const geoip = require("geoip-country");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const Country = require("./model/countryModel");

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", true);

app.get("/", async (req, res) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  if (!geo) {
    res.status(200).render("response");
    return;
  }
  try {
    await Country.create({ country: geo.country });
    console.log(
      "-----------------------------------------------------------------"
    );
    console.log("Geo is: ", geo);
    console.log(
      "-----------------------------------------------------------------"
    );
  } catch (error) {
    console.error(error);
  }
  res.status(200).render("response");
});

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
