import React,{useEffect, useState} from 'react'
import ToDocomp from '../components/ToDocomp';
import './tasksCss.css'
import { addToDo, getallToDo, updateTodo,deleteTodo} from '../utils/Handletasks';
import { FaEyeSlash } from 'react-icons/fa';
import '../index.css'
import { FaEye,FaAdjust } from 'react-icons/fa'
import unknownUser from '../web Images/user image.jpeg'
import { createContext } from 'react'

export const ThemeContext =createContext(null)

const TaskstoDo = () => {

const [toDo,setToDo]=useState([])

const [text,setText] =useState("")

const [hideCompleted, setHideCompleted] = useState(false);

const [theme,setTheme] =useState("dark")

const toggletheme =() =>{
setTheme((curr) =>(curr === "light" ? "dark" : "light"))

}


useEffect(() =>{
    
getallToDo(setToDo)

},[])

  return (
    <ThemeContext.Provider value={{theme,toggletheme}}>
    <div className="container" id ={theme}>
            <div className="header items-center justify-between">
                <div className="title">
                    <h1>TO DO APP</h1>
                    <span>Stop Procrastinating, Start Organizing</span>
                </div>
                <div className="user-info">
                    <i className='vector-light  flex justify-end mr-36'><FaAdjust onClick={toggletheme}/></i>
                    <img src={unknownUser} alt="User" className='userimg  mr-20 right-20'/>
                </div>

            </div>
            <hr/>


            <div className='task-header font-primary size-4 '>
        {!hideCompleted && <span className={'completed-count font-primary '}>{toDo.filter(item => item.completed).length} Completed</span>}
        <button className="hide-completed" onClick={() => setHideCompleted(!hideCompleted)}>
          {!hideCompleted ? <FaEyeSlash width={24} height={24}/> : <FaEye className='eye w-6 h-screen flex justify-center items-center  ' />} {hideCompleted ? 'Unhide' : 'Hide'} Completed 
        </button>
      </div>


          
                <div className="task-list w-1080 h-380" id="listcheckbox">
                    <ul>
                    {toDo.map((item) => (!hideCompleted || !item.completed) && (
                    <ToDocomp
                     key={item._id} 
                     text={item.text} 
                     completed={item.completed}
                     update={() =>updateTodo(item._id,setToDo)}
                     deleteDo ={() => deleteTodo(item._id,setToDo)}
                     
                     /> )
                     )}

                    </ul>
                </div>
                
                <div className="add-note w-1120 h-24">
                    <input type="text" placeholder="New Note" value={text} onChange={(e) => setText(e.target.value)} />

                    <button className="addbtn " onClick={() => addToDo(text,setText,setToDo)} >
                        <p className='nt font-primary '> Add New Note </p></button>
                </div>
            
        </div>
        </ThemeContext.Provider>

  )
}

export default TaskstoDo

