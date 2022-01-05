import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditPage = ({ exerciseToEdit }) => {

    const formattedDate = exerciseToEdit.date.substr(0,10);
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(formattedDate);

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date 
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
             alert("Successfully edited the exercise!");
             history.push("/");
        } else {
             alert(`Failed to edit movie, status code = ${response.status}`);
        }     
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <p>Edit the exercise using the boxes below. Then click the Save button.</p>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select name='unit'
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value='lbs' selected>lbs</option>
                <option value='kgs'>kgs</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <br></br>
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditPage;