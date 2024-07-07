import React from 'react'
import {AiFillDelete} from "react-icons/ai"
import { FaCheckSquare } from 'react-icons/fa';
import { FaRegSquare } from 'react-icons/fa';

export const ToDocomp = ({text, completed,update,deleteDo}) => {

 
  return (
    <div className="todo font-primary" >
      <div className="completion" onClick={update}>
      {
        completed ?  <FaCheckSquare style={{backgroundColor:'#29ABE2'}} className='check w-6 h-6 backgroundColor: #29ABE2;'></FaCheckSquare> :<FaRegSquare></FaRegSquare> 
      }
      </div>
<div className={completed ? "line_through" :" txt"}> {text}</div>
<div className="icons ">
<AiFillDelete className='icon' onClick={deleteDo}/>

</div>


    </div>
    
  )
}
export default ToDocomp
/* */