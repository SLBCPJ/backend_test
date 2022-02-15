const express = require("express");
const router = express.Router();
const palabraController = require("../controllers/palabra.controller");

router.post("/", palabraController.add);
router.get("/", palabraController.list);
router.get("/:id", palabraController.find);
router.delete("/:id", palabraController.delete);
router.put("/:id", palabraController.update);

module.exports = router;
