import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Signup(props)
{
  const host = 'http://localhost:8000';
  let navigate = useNavigate();

  const handleSubmit = async (event) =>
  {
    const email = event.target.email.value;
    const password = event.target.password.value;
    event.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Logged in Successfully", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div className='container my-3'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' />
        </div>
        <button type="submit" className="btn btn-primary" >Login</button>
      </form>
    </div>
  )
}
