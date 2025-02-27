const express = require("express");
const router = express.Router();

const factController = require("../controller/fact-check");

router.post("/", factController.factCheck);

module.exports = router;
