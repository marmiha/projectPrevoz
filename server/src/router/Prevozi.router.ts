export{};
const express = require("express");
const router = express.Router();

const PrevoziController = require("../controller/PrevoziController");

router.post("/test", PrevoziController.void);

module.exports = router;