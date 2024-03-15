const express = require('express');
const router = express.Router();
const Path = require('../models/Path');
const calculateShortestTime = require('../utils/shortestPath');

// GET /path
router.get('/', async (req, res) => {
    try {
        const path = await Path.find();

        res.status(200).json(path);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve path.' });
    }
});



router.get('/calculateShortestTime', async (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ error: 'Source and destination are required' });
    }


    try {
        const shortestTime = await calculateShortestTime(source, destination);

        if (shortestTime === null) {
            return res.status(404).json({ error: 'No path found' });
        }

        res.send(shortestTime);

    } catch (error) {
        console.error('Error calculating shortest time', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;