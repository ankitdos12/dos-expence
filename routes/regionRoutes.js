const express = require("express");
const router = express.Router();
const {createRegion, getAllRegions} = require("../controllers/regionController");


router.post("/", createRegion);
router.get("/", getAllRegions);

module.exports = router;
