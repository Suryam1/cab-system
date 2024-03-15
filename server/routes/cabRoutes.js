const express = require("express");
const router = express.Router();
const Cab = require("../models/Cab");

// GET /cabs
router.get("/", async (req, res) => {
  try {
    const cabs = await Cab.find({ busyDuration: { $lt: new Date() } });
    res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve cabs." });
  }
});

router.get("/allCabs", async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve cabs." });
  }
});

router.post("/addCab", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newCab = new Cab({
      name,
      price,
      busyDuration: new Date(),
    });
    await newCab.save();
    res.status(201).json(newCab);
  } catch (error) {
    res.status(500).json({ error: "Could not create a new cab." });
  }
});

// GET /cabs/:id
router.get("/:id", async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    if (!cab) {
      return res.status(404).json({ error: "Cab not found." });
    }
    res.status(200).json(cab);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the cab." });
  }
});

// PUT /cabs/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedCab = await Cab.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCab) {
      return res.status(404).json({ error: "Cab not found." });
    }
    res.status(200).json(updatedCab);
  } catch (error) {
    res.status(500).json({ error: "Could not update the cab." });
  }
});

// router.put("/edit-cab/:id", async (req, res) => {
//   try {
//     const updatedCab = await Cab.findByIdAndUpdate(
//       req.params.id,
//       {
//         busyDuration: new Date(req.body.busyDuration),
//       },
//       {
//         new: true,
//       }
//     );
//     if (!updatedCab) {
//       return res.status(404).json({ error: "Cab not found." });
//     }
//     res.status(200).json(updatedCab);
//   } catch (error) {
//     res.status(500).json({ error: "Could not book the cab." });
//   }
// });

// DELETE /cabs/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCab = await Cab.findByIdAndRemove(req.params.id);
    if (!deletedCab) {
      return res.status(404).json({ error: "Cab not found." });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the cab." });
  }
});

module.exports = router;
