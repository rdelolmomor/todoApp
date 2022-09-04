import React from 'react';

export default function Buscador({filtrar}){

    const changeInput = (event) =>{
        filtrar(event.target.value);
    }

    return(
        <div className={'buscador'}>
            <input type='search' onChange={changeInput}/>
        </div>
    );
}