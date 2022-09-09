import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import useListaTareas from '../hooks/useListaTareas';


const MiDialogo = styled(Dialog)({
    '& .MuiPaper-root' : {
        backgroundColor: 'rgb(33,33,33)',
        border: '2px solid black',
        borderRadius: '10px',
        color:'rgb(200, 200, 200)',
    },
    '& .MuiDialogContent-root':{
        '& input':{
            backgroundColor: 'rgb(93, 93, 93)',
            color:'rgb(220, 220, 220)',
            paddingLeft: '1rem',
            marginTop: '0.4rem',
            width: '80rem',
            height: '2rem',
            fontSize: 'medium',
            maxWidth: '250px',
            border: '2px solid black',
            borderRadius: '10px',
        },
        '& input::placeholder':{
            color: 'rgb(160, 160, 160)',
            opacity: 1,
        }
    },
    '& .MuiDialogActions-root > button':{
        backgroundColor:'rgb(165, 42, 42)',
        border: '2px solid black',
    },
  });


export default function Dialogo({showDialog, setShowDialog, setTareas, task}){

    const { guardaTarea, actualizarTarea, cargaTareas } = useListaTareas();
    const [tarea, setTarea] = useState({
        id: task ?task.id : Math.floor(Math.random() * 10000),
        nombre:task ?task.nombre :'',
        realizado:task ?task.realizado :false,
    })
    
    const title = task ?'Editar tarea' :'Crear tarea';
    const placeholder = task ?task.nombre : 'Nombre de la tarea';
    const value = task ?task.nombre : '';

    const handleOkClick = ()=>{
        if(tarea.nombre) {
            task ?actualizarTarea(tarea) :guardaTarea(tarea);
            setTareas(cargaTareas());
            setShowDialog(false);
        }
    }

    const changeNameValue = (event)=>{
        setTarea({ ...tarea, nombre:event.target.value})
    }

    return(
        <MiDialogo open={showDialog} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                    <input type='text' placeholder={placeholder} defaultValue={value} onChange={changeNameValue}></input>
            </DialogContent>
            <DialogActions>
                <Fab size='medium' onClick={handleOkClick}>
                    <DoneIcon/>
                </Fab>
                <Fab size='medium' onClick={()=>setShowDialog(false)}>
                    <CloseIcon/>
                </Fab>
            </DialogActions>
        </MiDialogo>
    );
}