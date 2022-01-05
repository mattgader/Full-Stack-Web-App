// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once("open", () => {
        console.log("Successfully connected to MongoDB using Mongoose!");
});

//Define the schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true, default: 'lbs' },
    date: { type: Date, required: true, min: '11-29-2018', default: new Date ()}   
});

// Compile the model from the schema. This must be done after defining the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date
     });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
};

// Retrive all exercises 
 const findExercises = async () => {
    const query = Exercise.find()
    return query.exec();
}

 // Find the exercise with the given ID value
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date 
    });
    return result.modifiedCount;
}

// Delete the exercise with provided id value
 const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;     
}

export { createExercise, findExercises, findExerciseById, replaceExercise, deleteById};
