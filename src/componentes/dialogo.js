import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, TextField } from '@mui/material';
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
        display:'flex',
        flexDirection:'column',
        gap:'1rem',
        '& > input':{
            backgroundColor: 'rgb(93, 93, 93)',
            color:'rgb(220, 220, 220)',
            paddingLeft: '1rem',
            width: '80rem',
            height: '2rem',
            fontSize: 'medium',
            maxWidth: '250px',
            marginTop:'0.4rem',
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

  const MiTextfield = styled(TextField)({
    '& .MuiInputBase-input': { 
        backgroundColor: 'rgb(93, 93, 93)',
        color:'rgb(220, 220, 220)',
        border: '2px solid black', 
        borderRadius: '10px',
    },
  });


export default function Dialogo({showDialog, setShowDialog, setTareas, openSnack, task}){

    const { guardaTarea, actualizarTarea, cargaTareas } = useListaTareas();
    const [tarea, setTarea] = useState({
        id: task ?task.id : Math.floor(Math.random() * 10000),
        nombre:task ?task.nombre :'',
        realizado:task ?task.realizado :false,
        fecha: task ?task.fecha : new Date().toISOString().split('.')[0].substring(0,16),
    })

    const title = task ?'Editar tarea' :'Crear tarea';
    const placeholder = task ?task.nombre : 'Nombre de la tarea';
    const value = task ?task.nombre : '';

    const handleOkClick = ()=>{
        if(!tarea.nombre) {
            openSnack('Debe introducir un nombre para la tarea');
            return;
        }
        if (tarea.fecha <= new Date().toISOString().split('.')[0].substring(0,16)){
            openSnack('La fecha introducida no puede ser menor a la fecha actrual');
            return;
        }
            task ?actualizarTarea(tarea) :guardaTarea(tarea);
            setTareas(cargaTareas());
            setShowDialog(false);
    }

    const handleChange = (event) => {
        const millis = event.target.valueAsNumber;
        const date = new Date(millis);
        console.log(date.toISOString());
        setTarea({ ...tarea, fecha:date.toISOString().split('.')[0].substring(0,16)});
      };

    const changeNameValue = (event)=>{
        setTarea({ ...tarea, nombre:event.target.value})
    }

    return(
        <MiDialogo open={showDialog} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                    <input type='text' placeholder={placeholder} defaultValue={value} onChange={changeNameValue}></input>
                    <MiTextfield
                        id="datetime-local"
                        //label="Next appointment"
                        type="datetime-local"
                        defaultValue={tarea.fecha}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}/>
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