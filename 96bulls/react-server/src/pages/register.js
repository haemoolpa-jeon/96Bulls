import React, { useState } from 'react';
import fire from '../config/fire-config';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
       'Password and password confirmation does not   match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000)
      setPassword('');
      setPassConf('');
      return null;
      }
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
    history.push("/signin")
  }
  return (
    <div className='container'>
      <div className='loginCard'>
      <h1 style={{color:"purple", textAlign:"center"}}>Create new user</h1>
        {notification}
      <form onSubmit={handleLogin}>
          <p>Email</p>
        <input type="text" value={userName}  
        onChange={({target}) => setUsername(target.value)} /> 
        <br />
        <p>Password</p>
        <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> 
        <br />
        <p>Confirm Password</p>
        <input type="password" value={passConf}    
        onChange={({target}) => setPassConf(target.value)} /> 
        <br />
        <br />
        <button className='registerButton' type="submit">Sign Up</button>
      </form>
      </div>
      
    </div>
  )
}
export default Register