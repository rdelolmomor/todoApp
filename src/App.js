import React, { useState, useEffect } from 'react';
import './app.css';
import Buscador from './componentes/buscador';
import Contador from './componentes/contador';
import Tarea from './componentes/tarea';
import DialogoCrear from './componentes/dialogo';
import Boton from './componentes/boton';
import useListaTareas from './hooks/useListaTareas';

function App() {

  const [filtro, setFiltro] = useState('');
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const { cargaTareas } = useListaTareas();

  useEffect(()=>{
    setTareas(cargaTareas());
    // eslint-disable-next-line
  },[]);
  
 useEffect(()=>{
  setTareasFiltradas(tareas.filter((tarea)=>tarea.nombre.includes(filtro)))
 },[tareas,filtro]);

  return (
      <div className="App">
        <div className="Objects">
          <Contador lista={tareas}/>
          <Buscador filtrar={setFiltro}/>
          <div className='contenedorLista'>
            <div className='margenLista'>
              <ul className='lista'>
                {
                tareasFiltradas.map((tarea,index)=> <Tarea key={'tarea'+index} tarea={tarea} showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas}/>)
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='Button'>
          <Boton setShowDialog={setShowDialog} />
        </div>
        { showDialog &&
          <DialogoCrear showDialog={showDialog} setShowDialog={setShowDialog} setTareas={setTareas}/>
        }
      </div>
  );
}

export default App;
