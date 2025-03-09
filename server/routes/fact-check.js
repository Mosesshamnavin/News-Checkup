const express = require("express");
const router = express.Router();

const factController = require("../controller/fact-check");

router.post("/", factController.factCheck);
router.get("/", factController.getfactCheck);

module.exports = router;
