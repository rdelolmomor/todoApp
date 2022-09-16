import React, { useState, useEffect } from 'react';
import './app.css';
import Buscador from './componentes/buscador';
import Contador from './componentes/contador';
import Tarea from './componentes/tarea';
import DialogoCrear from './componentes/dialogo';
import Boton from './componentes/boton';
import useListaTareas from './hooks/useListaTareas';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MiSnackbar = styled(Snackbar)({
  '.MuiPaper-root':{
    backgroundColor: 'rgb(255, 102, 0)',
    borderRadius:'10px',
    display: 'flex',
    padding: '6px 16px',
    color:'rgb(200, 200, 200)',
    fontSize:'large',
  },
})

function App() {

  const [filtro, setFiltro] = useState('');
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [snackState, setSnackState] = useState({open:false,text:''});
  const { cargaTareas, guardarTotalTareas } = useListaTareas();

  console.log(tareas);

  useEffect(()=>{
    setTareas(cargaTareas());
    // eslint-disable-next-line
  },[]);
  
 useEffect(()=>{
  console.log('filtratareas');
  setTareasFiltradas(tareas.filter((tarea)=>tarea.nombre.includes(filtro)))
 },[tareas,filtro]);

 const closeSnack = () => {
  setSnackState({...snackState, open:false});
};

const openSnack = (texto) =>{
  setSnackState({text:texto, open:true});
};

const onDragEnd = (event) =>{
  if(tareasFiltradas.length < tareas.length){
    openSnack('Hay tareas ocultas, elimina los filtros establecidos antesde ordenar tu lista de tareas');
    return;
  }//else{
    const source = event.source.index;
    const destination = event.destination.index;
    console.log(`Mover desde: ${source} a: ${destination}`);
    const copiaTareas = tareas;
    const tareaEliminada = copiaTareas.splice(source,1)[0];
    copiaTareas.splice(destination,0,tareaEliminada);
    guardarTotalTareas(copiaTareas);
    setTareas(cargaTareas());
    //setTareas(copiaTareas);
  //}
  
}



  return (
      <div className="App">
        <div className="Objects">
          <Contador lista={tareas}/>
          <Buscador filtrar={setFiltro}/>
          <div className='contenedorLista'>
            <div className='margenLista'>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='task'>
                  { 
                  (droppableProvider)=> (
                  <ul 
                    {...droppableProvider.droppableProps} 
                    ref={droppableProvider.innerRef} 
                    className='lista'>
                      {tareasFiltradas.map((tarea,index)=> (
                        <Draggable key={tarea.id} draggableId={`task ${tarea.id}`} index={index}>
                          {(draggableProvider)=>(
                          <div
                          {...draggableProvider.draggableProps} 
                          ref={draggableProvider.innerRef}
                          {...draggableProvider.dragHandleProps}>
                            <Tarea tarea={tarea} showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas}/>
                          </div>)}
                        </Draggable>
                      ))}
                    {droppableProvider.placeholder}
                  </ul>)}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
        <div className='Button'>
          <Boton setShowDialog={setShowDialog} />
        </div>
        { showDialog &&
          <DialogoCrear showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas} openSnack={openSnack}/>
        }
        <MiSnackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={snackState.open}
        onClose={closeSnack}
        message={snackState.text}
      />
      </div>
  );
}

export default App;
