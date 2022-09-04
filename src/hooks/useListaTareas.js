
export default function useListaTareas(){

    const guardaTarea = (mitarea)=>{
        let tareas = JSON.parse(window.localStorage.getItem('tareas')) || [];
        tareas.push(mitarea);
        window.localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    const actualizarTarea = (mitarea)=>{
        let tareas = JSON.parse(window.localStorage.getItem('tareas')) || [];
        let indexTarea = tareas.indexOf(tareas.find((tarea)=> tarea.id === mitarea.id)) ;
        tareas.splice(indexTarea,1,mitarea);
        window.localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    const cargaTareas = () =>{
        const tareas = JSON.parse(window.localStorage.getItem('tareas')) || [];
        return tareas;
    }

    const borraTarea = (idTarea) =>{
        let tareas = JSON.parse(window.localStorage.getItem('tareas')) || [];
        let newTareas = tareas.filter((tarea)=> tarea.id !== idTarea);
        window.localStorage.setItem('tareas', JSON.stringify(newTareas));
    }

    return {guardaTarea, actualizarTarea, cargaTareas, borraTarea}
}