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

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();
        if(!q){
            return res.status(400).json(err);
        }
        else{
            return res.status(201).json(q);
        }
}

const tripsUpdateTrip = async (req, res) => {
    const q = await Model.findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    )
    .exec();

    if (!q) {
        // Database returned no data
        return res.status(400).json({err});
    } else {
        // Return resulting updated trip
        return res.status(201).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};


