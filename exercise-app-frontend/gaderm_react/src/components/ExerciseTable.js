import React from 'react';
import Exercise from './ExerciseRow';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <caption>Keep track of completed exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
