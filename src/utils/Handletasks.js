import axios from 'axios'

const baseUrl ="http://localhost:5001"

// the main working frontend fcts without authentication 
/*const getallToDo =(setToDo) =>{

axios.get(baseUrl).then(({data}) => {
console.log('data --->',data);
setToDo(data)
})
.catch(error =>{
console.log("Error Fetchong task",error)

});
}



const addToDo =(text,setText,setToDo) =>{

  axios.post(`${baseUrl}/createtask`,{text})
  .then((data) =>{
console.log(data);
setText("")
return getallToDo(setToDo)

  })
}*/
/////////////////authentication fcts///////////////////////


const getallToDo =(setToDo) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(({data}) => {
    console.log('data --->',data);
    setToDo(data)
  })
  .catch(error =>{
    console.log("Error in Reading tasks",error)
  });
}

const addToDo =(text,setText,setToDo) => {
  
  const token = localStorage.getItem('token');

  axios.post(`${baseUrl}/createtask`, {text}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((data) =>{
    console.log(data);
    setText("")
    return getallToDo(setToDo)
  })
}


const updateTodo =(toDoId,setToDo) =>{
    
    axios.put(`${baseUrl}/updatetask/` +toDoId)
    .then(result => { 
      console.log(result);
      return getallToDo(setToDo)
    })
    .catch(err =>console.log(err))
    }

    const deleteTodo =(_id,setToDo) =>{
    
        axios.delete(`${baseUrl}/deletetask/`+_id).then((data) => {
  return getallToDo(setToDo)
        
        })
        .catch((err)=>console.log(err))
        }

export {getallToDo,addToDo,updateTodo,deleteTodo}