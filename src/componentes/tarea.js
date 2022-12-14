import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Menu, MenuItem, Card, CardContent, CardActions, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useListaTareas from '../hooks/useListaTareas';
import DialogoEditar from './dialogo';

const MiCard = styled(Card)({
    border: '2px solid black',
    borderRadius: '15px',
    backgroundColor: 'brown',
    padding: '0 0.5rem',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiCardContent-root':{
        padding: '10px',
    }
});

const MiMenu = styled(Menu)({
    '& .MuiPaper-root' : {
        backgroundColor: 'rgb(93,93,93)',
        borderRadius: '10px',
    },
  });


export default function Tarea({tarea, setTareas}){

    const [showDialog, setShowDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { cargaTareas, actualizarTarea, borraTarea } = useListaTareas();

    const estado ={
        'false':<CheckBoxOutlineBlankIcon/>,
        'true':<CheckBoxIcon/>
    }

    const setState = (estado)=>{
        actualizarTarea({...tarea , realizado:estado});
        setTareas(cargaTareas());
    }

    const deleteTask = ()=>{
        borraTarea(tarea.id);
        setTareas(cargaTareas());
        handleClose();
    }

    const editTask = ()=>{
        setShowDialog(true);
        handleClose();
    }

    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = ()=>{
        setAnchorEl(null);
    }
/*
    return(
        <li className='tarea'>
            <h3>{tarea.nombre}</h3>
            <div>
                <IconButton onClick={()=>setState(!tarea.realizado)}>{estado[tarea.realizado]}</IconButton>
                <IconButton onClick={handleClick}><MoreVertIcon/></IconButton>
                <MiMenu className='menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={editTask}><EditIcon/></MenuItem>
                    <MenuItem onClick={deleteTask}><DeleteIcon/></MenuItem>
                </MiMenu>
            </div>
            { showDialog &&
          <DialogoEditar showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas} task={tarea}/>
        }
        </li>
    );
*/
    return(
        <li >
            <MiCard>
                <CardContent>
                    <Typography variant='h6'>{tarea.nombre}</Typography>
                    <Typography variant='body2'>{tarea.fecha}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={()=>setState(!tarea.realizado)}>{estado[tarea.realizado]}</IconButton>
                    <IconButton onClick={handleClick}><MoreVertIcon/></IconButton>
                </CardActions>
            </MiCard>
            <MiMenu className='menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={editTask}><EditIcon/></MenuItem>
                <MenuItem onClick={deleteTask}><DeleteIcon/></MenuItem>
            </MiMenu>
            { showDialog &&
            <DialogoEditar showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas} task={tarea}/>
            }
        </li>
    );
};