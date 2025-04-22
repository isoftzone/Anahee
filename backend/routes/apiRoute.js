const express = require("express");
const router =express.Router();
const shiprocket = require('../controllers/shiprocket');

router.post("/checkServiceability",shiprocket.checkServiceability);
module.exports = router