const express = require("express");
const router = express.Router();
const { getSchedulesByRegion, addSchedule } = require("../models/scheduleModel");

// Obtener horarios por región
router.get("/:region", async (req, res) => {
  try {
    const schedules = await getSchedulesByRegion(req.params.region);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo horario de apagón
router.post("/", async (req, res) => {
  try {
    const newSchedule = await addSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
