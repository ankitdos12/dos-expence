const Region = require("../models/Region");

const createRegion = async (req, res) => {
    try {
        const region = new Region(req.body);
        await region.save();
        res.status(201).json(region);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllRegions = async (req, res) => {
    try {
        const regions = await Region.find();
        res.status(200).json(regions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRegion,
    getAllRegions,
}
