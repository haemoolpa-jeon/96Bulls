import React, { useState } from 'react';
import fire from '../config/fire-config';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotification] = useState('');
    const handleLogin = (e) => {
      e.preventDefault();
      fire.auth()
        .signInWithEmailAndPassword(username, password)
        .catch((err) => {
          console.log(err.code, err.message)
          setNotification(err.message)
          setTimeout(() => {
            setNotification('')
          }, 2000)
        })
      setUsername('')
      setPassword('')   
      history.push("/home")
    }
    return (
      <div className='container2'>
        <div className='loginCard'>
          <h1 style={{color:"purple", textAlign:"center"}}>Login</h1>
        {notify}
        <form onSubmit={handleLogin}>
            <p>Email</p>
          <input type="text" value={username} 
          onChange= {({target}) => setUsername(target.value)} />
          <br />
          <p>Password</p>
          <input type="password" value={password} 
          onChange={({target}) => setPassword(target.value)} />
          <br />
          <br />
          <br />
          <button className='registerButton' type="submit">Login</button>
          <button className='registerButton' onClick={() => history.push('/register')}>Regiter</button>
        </form> 
        </div>
        
      </div>
    )
  }

  export default Login