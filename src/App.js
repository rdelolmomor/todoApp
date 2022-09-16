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
  const { cargaTareas } = useListaTareas();

  useEffect(()=>{
    setTareas(cargaTareas());
    // eslint-disable-next-line
  },[]);
  
 useEffect(()=>{
  setTareasFiltradas(tareas.filter((tarea)=>tarea.nombre.includes(filtro)))
 },[tareas,filtro]);

 const closeSnack = () => {
  setSnackState({...snackState, open:false});
};

const openSnack = (texto) =>{
  setSnackState({text:texto, open:true});
};

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
