const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Cab = require("../models/Cab");
const calculateShortestTime = require("../utils/shortestPath");
const sendCabBookingConfirmation = require("../utils/email");

// POST /bookings create bookings
router.post("/addBooking", async (req, res) => {
  try {
    const { source, destination, email, cab, startTime } = req.body;

    const estimatedTime = await calculateShortestTime(source, destination);
    const bookingPrice = estimatedTime.time * cab?.price;

    // Create the booking in the database
    const newBooking = new Booking({
      source,
      destination,
      email,
      cab: cab,
      // startTime,
      bookingPrice: bookingPrice,
      estimatedTime: estimatedTime.time,
      status: "scheduled",
    });

    await newBooking.save();

    await Cab.findByIdAndUpdate(cab._id, {
      $set: {
        busyDuration: new Date(
          new Date().getTime() + estimatedTime.time * 60000
        ),
      },
    });

    sendCabBookingConfirmation(newBooking);

    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create a new booking." });
  }
});

// GET /bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve bookings." });
  }
});

// GET /bookings/:id
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the booking." });
  }
});

// PUT /bookings/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Could not update the booking." });
  }
});

// DELETE /bookings/:id
router.delete("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    await Cab.findByIdAndUpdate(updatedBooking.cab._id, {
      $set: {
        busyDuration: new Date(),
      },
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the booking." });
  }
});

module.exports = router;
