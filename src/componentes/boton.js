import React from 'react';
import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MiFab =styled(Fab)({
    backgroundColor:'rgb(165, 42, 42)',
    border: '2px solid black',
    ':hover':{
        backgroundColor:'rgb(165, 42, 42)',
    },
});

export default function Boton({setShowDialog}){


    return(
        <div className='divBoton'>
                <MiFab size="medium" disableRipple={true} onClick={()=>setShowDialog(true)}>
                    <AddIcon/>
                </MiFab>
        </div>
    );
}