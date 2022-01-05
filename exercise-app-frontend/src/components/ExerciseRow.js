import React from 'react';
import { FiEdit, FiDelete } from 'react-icons/fi';

function Exercise({ exercise, onDelete, onEdit }) {
    const {
        name = '', 
        reps = 0,
        weight = '',
        unit = 'lbs',
        date = '',
        _id 
    } = exercise;
    
    return (
        <tr>
            <td>{name}</td>
            <td>{reps}</td>
            <td>{weight}</td>
            <td>{unit}</td>
            <td>{date?.substring?.(0,10)}</td>
            <td><FiEdit onClick={() => onEdit(exercise)} /></td>
            <td><FiDelete onClick={() => onDelete(_id)} /></td>
        </tr>
    );
}

export default Exercise;