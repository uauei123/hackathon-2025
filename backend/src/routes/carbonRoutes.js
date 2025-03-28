const express = require("express");
const { submitTest } = require("../controllers/carbonController");
const router = express.Router();

router.post("/submit-test", submitTest);

module.exports = router;