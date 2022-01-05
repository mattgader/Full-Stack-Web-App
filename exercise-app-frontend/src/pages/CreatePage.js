import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <p>Create an exercise entry using the boxes below. Then click the Add button.</p>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <label htmlFor='exunit' ></label>
            <select name='unit'
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
                <option value='miles'>Miles</option>
            </select>
            <input
                type="date"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <br></br>
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreatePage;