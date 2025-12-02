import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();
export default router;

let movies = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994 },
    { id: 2, title: 'The Godfather', year: 1972 },
    { id: 3, title: 'The Dark Knight', year: 2008 }
];

const validFields = {"title": "string","description":"string","durationMin":"number","basePrice":"number"}

router.get('/', async function (req, res) {
    res.json(await prisma.movie.findMany());
});

router.get('/:id', function (req, res) {
    let movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

router.post('/', async function (req, res) {
    const cleanData = {};
    for (const field in validFields) {
        if (req.body[field] !== undefined) {
            if (typeof req.body[field] !== validFields[field]) {
                return res.status(400).send(`Invalid type for field ${field}, should be ${validFields[field]}.`);
            }
            cleanData[field] = req.body[field];
        }
    }
    
    const newMovie = await prisma.movie.create({
        data: cleanData
    });
    res.status(201).json(newMovie);
});