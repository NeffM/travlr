const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const q = await Model.find({});
        if (q.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }
        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ code: req.params.tripCode });
        if (q.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
