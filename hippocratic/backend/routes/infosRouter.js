const router = require("express").Router();
let Info = require("../models/infoModel");

router.route("/").get((req, res) => {
  Info.find()
    .then((infos) => res.json(infos))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const overview = req.body.overview;
  const conferences = req.body.conferences;
  const insurance_companies = req.body.insurance_companies;
  const phone = Number(req.body.phone);
  const location = req.body.location;
  const working_hour = req.body.date;

  const newInfo = new Info({
    name,
    overview,
    conferences,
    insurance_companies,
    phone,
    location,
    working_hour
  });

  newInfo.save()
    .then(() => res.json("Info added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Info.findById("5ff9654af4fa7f075efeaa11")
    .then((info) => res.json(info))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Info.findByIdAndDelete(req.params.id)
    .then(() => res.json("Info Deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Info.findById(req.params.id)
    .then((info) => {
      info.name = req.body.name;
      info.overview = req.body.overview;
      info.insurance_companies = req.body.insurance_companies;
      info.conferences = req.body.conferences;
      info.phone = Number(req.body.phone);
      info.location = req.body.location;
      info.working_hour=req.body.date;

      info
        .save()
        .then(() => res.json("Info Updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
