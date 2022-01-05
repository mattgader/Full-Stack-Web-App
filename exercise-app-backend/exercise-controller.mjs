import * as exercises from './exercise-model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body.
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: JSON.stringify(error) });
        });
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if(exercise !== null) {
                res.json(exercise) 
            } else {
                res.status(400).json({ Error: 'Resource not found' }); //500?
            }
        })
        .catch(error => {
            console.error(error);
            // res.status(500).json({ Error: 'Request to get one exercise failed' });
            res.status(500).json({ Error: JSON.stringify(error) })
        })
});

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: JSON.stringify(error) })
            // res.send({ Error: 'Request to get all exercises failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:id', (req, res) => {
    exercises.replaceExercise(
        req.params.id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
       .then(modifiedCount => {
            if (modifiedCount === 1) {
                res.json({ _id: req.params.id, 
                    name: req.body.name, 
                    reps: req.body.reps, 
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date
                 })
            } else {
                res.status(404).json({ Error: 'Resource not found' }); //500?
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: JSON.stringify(error) })
            // res.status(500).json({ Error: 'Request to update failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters.
 */
 app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });  //500?
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: JSON.stringify(error) })
            // res.send({ error: 'Request to delete failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});