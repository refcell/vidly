const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const router = express.Router();
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('Rental not found.');

    if (rental.dateReturned) return res.status(400).send('Renturn already processed');

    rental.return();
    await rental.save();

    await movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.send(rental);
});

function validateReturn(req) {
    const schema = {
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;