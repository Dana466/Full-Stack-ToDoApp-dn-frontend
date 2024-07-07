import React from "react";
import TaskstoDo from "./tasksList/TaskstoDo";
import Signup from "./SignUp/Signup";
import Login from "./login/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path ='/register' element={<Signup/>}></Route>
<Route path ='/login' element={<Login/>}></Route>
<Route path ='/tasks' element={<TaskstoDo/>}></Route>
   </Routes>


   </BrowserRouter>

  );
}

export default App;
//<TaskstoDo/>