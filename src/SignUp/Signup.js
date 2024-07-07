import {React,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './SignupCss.css'
import '../index.css'
import user from '../web Images/unknown user.png'
import { FaAdjust } from 'react-icons/fa'
import { createContext } from 'react'

export const ThemeContext =createContext(null)

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');    

  const navigate =useNavigate()
const [theme,setTheme] =useState("dark")

const toggletheme =() =>{
setTheme((curr) =>(curr === "light" ? "dark" : "light"))

}

const handleSubmit =(e) =>{
e.preventDefault()
axios.post('http://localhost:5001/user/signup',{email,password}).then(result =>{
  console.log(result.data) 
  alert(result.data.message)
navigate('/login')

})

.catch(err => {
  console.log(err)
  if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      alert(err.response.data.error) 
  } else if (err.request) {
      console.log(err.request);
  } else {
      
      console.log('Error', err.message);
  }
})

}


    const handleRegister = (e) => {
      e.preventDefault();
      const result = validateEmailAndPassword(email, password, confirmPassword);
      if (result === 'Email and password are valid.') {
       handleSubmit(e)
      } else {
        alert(result);
      }
    };
  
    const validateEmailAndPassword = (email, password, confirmPassword) => {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        return 'Invalid email format.Retype new email having example.user@example.com format';
      }
      if (password.length < 5) {
        return 'Password should be at least 5 characters long.';
      }
      if (!emailRegex.test(email) && password.length < 5) {
        return 'Wrong email and password';
      }
      if (password !== confirmPassword) {
        return 'Password and Confirm Password should match.';
      }
      return 'Email and password are valid.';
    };

  return (
    <ThemeContext.Provider value={{theme,toggletheme}}>
    <div className="container " id ={theme} >
      <div className="header items-center justify-between ">
        <div className="title flex-col ml-4% ">
          <h1 className='heading lineHeight-36 '>TO DO APP</h1>
          <span>Stop Procrastinating, Start Organizing</span>
        </div>
        <div className="user-info ">
        <div className="mode-toggle ">
          <FaAdjust onClick={toggletheme} />
        </div>
          <img src={user} alt="User" />
        </div>
      </div>
      <hr />
      <div className="register lineHeight-24">Register</div>
      <div className="form flex-col align-center">
        <input type="text" className='txt mb-12' id="email" placeholder="Email"   value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password " id="password "  placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" id="confirmPassword" placeholder="Confirm Password"  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />
        <span className='span opacity-50'>
          Already have an account?{' '}
          <Link to={"/login"} className="logLink">Login</Link>
      
        </span>
        <button id="register" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
    </ThemeContext.Provider>
    
  )
}

export default Signup
