import React, { useState, useEffect } from 'react';
import './app.css';
import Buscador from './componentes/buscador';
import Contador from './componentes/contador';
import Tarea from './componentes/tarea';
import DialogoCrear from './componentes/dialogoCrear';
import Boton from './componentes/boton';
import useListaTareas from './hooks/useListaTareas';

function App() {

  const [filtro, setFiltro] = useState('');
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const { cargaTareas, borraTarea } = useListaTareas();

  const deleteTask = (id)=>{
    borraTarea(id);
    setTareas(cargaTareas());
  }

  useEffect(()=>{
    setTareas(cargaTareas());
  },[]);
  
 useEffect(()=>{
  setTareasFiltradas(tareas.filter((tarea)=>tarea.nombre.includes(filtro)))
 },[tareas,filtro]);

  return (
    <div className='contenedorApp'>
      <div className="App">
        <Contador lista={tareas}/>
        <Buscador filtrar={setFiltro}/>
        <ul className='lista'>
          {
           tareasFiltradas.map((tarea,index)=> <Tarea key={'tarea'+index} tarea={tarea} setTareas={setTareas} deleteTask={deleteTask}/>)
          }
        </ul>
        <Boton setShowDialog={setShowDialog} />
        { showDialog &&
          <DialogoCrear showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas}/>
        }
      </div>
    </div>
  );
}

export default App;
