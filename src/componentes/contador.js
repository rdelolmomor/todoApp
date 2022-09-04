import React from 'react';

import { Typography } from '@mui/material';

export default function Contador({lista}){
    
    const totales = lista.length;
    const realizadas = lista ?lista.filter((item)=>item.realizado===true).length : 0;

    return(
        <div className='contador'>
            <Typography variant='h6'>{`${realizadas} de ${totales} tareas realizadas`}</Typography>
        </div>
    );
}