import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Boton({setShowDialog}){


    return(
        <div className='divBoton'>
                <Fab size="medium" disableRipple={true} onClick={()=>setShowDialog(true)}>
                    <AddIcon/>
                </Fab>
        </div>
    );
}