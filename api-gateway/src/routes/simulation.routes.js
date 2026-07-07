const express = require("express");
const { simulate } = require("../controller/gateway.controller");

const router = express.Router();

router.post("/", simulate);

module.exports = router;
