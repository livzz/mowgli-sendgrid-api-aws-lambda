const express = require("express");
const notify = require('../controller/notify');
const newsletters = require('../controller/newsletters');
const cors = require('cors');

const router = express.Router();
router.use(cors());
router.post("/notify", notify.main);
router.post("/newsletters", newsletters.main);

router.use("/", async (req, res) => {
    res.send("You are not authorized!!");
});

module.exports = router;