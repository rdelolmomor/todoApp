import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import useListaTareas from '../hooks/useListaTareas';

export default function DialogoCrear({showDialog, setShowDialog, setTareas}){

    const [tarea, setTarea] = useState({id:' ',nombre:''})
    const { guardaTarea, cargaTareas } = useListaTareas();

    const addTask = ()=>{
        if(tarea.nombre) {
            guardaTarea(tarea);
            setTareas(cargaTareas());
            setShowDialog(false);
        }
    }

    const changeNameValue = (event)=>{
        setTarea({ ...tarea, id:Math.floor(Math.random() * 10000), nombre:event.target.value, realizado:false})
    }

    return(
        <Dialog className='dialogo' open={showDialog} >
            <DialogTitle>Crear Recordatorio</DialogTitle>
            <DialogContent className={'dialogoContent'}>
                <div>
                    <input type='text' placeholder='Nombre de la tarea' onChange={changeNameValue}></input>
                </div>
            </DialogContent>
            <DialogActions className={'dialogoActions'} >
                <Fab size='medium' onClick={addTask}>
                    <DoneIcon/>
                </Fab>
                <Fab size='medium' onClick={()=>setShowDialog(false)}>
                    <CloseIcon/>
                </Fab>
            </DialogActions>
        </Dialog>
    );
}