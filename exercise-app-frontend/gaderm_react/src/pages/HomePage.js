import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }
    
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Exercise Table</h2>
            <p>Add an exercise with the link above. Edit or delete exercises using the icons below.</p>
            <ExerciseTable exercises={exercises} 
                onDelete={onDelete} 
                onEdit={onEdit}>
            </ExerciseTable>
        </>
    );
}

export default HomePage;