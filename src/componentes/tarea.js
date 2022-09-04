import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useListaTareas from '../hooks/useListaTareas';

export default function Tarea({tarea, deleteTask, setTareas}){

    const { cargaTareas, actualizarTarea } = useListaTareas();

    const estado ={
        'false':<CheckBoxOutlineBlankIcon/>,
        'true':<CheckBoxIcon/>
    }

    const setState = (estado)=>{
        actualizarTarea({...tarea , realizado:estado});
        setTareas(cargaTareas());
    }

    const borrarTarea = (event)=>{
        deleteTask(tarea.id);
    }

    return(
        <li className='tarea'>
            <h3>{tarea.nombre}</h3>
            <div>
                <IconButton onClick={()=>setState(!tarea.realizado)}>{estado[tarea.realizado]}</IconButton>
                <IconButton onClick={borrarTarea}><DeleteIcon/></IconButton>
            </div>
        </li>
    );
}