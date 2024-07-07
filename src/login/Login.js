import {React ,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../SignUp/SignupCss.css'
import user from '../web Images/unknown user.png'
import { FaAdjust } from 'react-icons/fa'
import { createContext } from 'react'


export const ThemeContext =createContext(null)



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate =useNavigate()

    const [theme,setTheme] =useState("dark")

    const toggletheme =() =>{
    setTheme((curr) =>(curr === "light" ? "dark" : "light"))
    
    }

        const handleSubmit = (e) => {
          e.preventDefault();
          axios.post('http://localhost:5001/user/login', { email, password })
              .then(result => {
                  if (result.data.message === "Login Successful") {
                      localStorage.setItem('token', result.data.token)
                      alert('Login In Successfully')
                      navigate('/tasks');
                  } else {
                    alert(result.data.message)
                    
                  }
              })
              .catch(err => {
                
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Don't have an account sign up before logging in ");
                    navigate('/register')
                }
                console.log(err);
                
            });
      };


 const handleLogin = (e) => {
          e.preventDefault();
          const result = validateEmailAndPassword(email, password);
          if (result === 'Email and password are valid.') {
           handleSubmit(e)
          } else {
            alert(result);
          }
        };

  const validateEmailAndPassword = (email, password) => {
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
        
          return 'Email and password are valid.';
        };
    


  return (
    <ThemeContext.Provider value={{theme,toggletheme}}>
    <div className="container" id ={theme}>
    <div className="header">
      <div className="title">
        <h1>TO DO APP</h1>
        <span>Stop Procrastinating, Start Organizing</span>
      </div>
      <div className="user-info">
      <div className="mode-toggle">
          <FaAdjust  onClick={toggletheme}/>
        </div>
        <img src={user} alt="User" />
      </div>
    </div>
    <hr />
    <div className="Login">Login</div>
    <div className="form flex-col align-center" id="myForm">
      <input type="text" id="email" name="email"placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)}  />
      <input  type="password"id="pwd"   placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)} />
      <span>
        Don't have an account yet ?{' '}
        <Link to={'/register'} className="signupLink">Signup</Link>
       
      </span>
        <button className="loginButton" id="login" onClick={handleLogin}>
          Login
        </button>
     
    </div>
  </div>
  </ThemeContext.Provider>
  )
}

export default Login