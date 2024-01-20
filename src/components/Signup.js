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
    const name = event.target.name.value;
    event.preventDefault();

    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
      body: JSON.stringify({ email, password, name })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account Created Successfully", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div className='container my-3'>
      <h3>Create an account to use iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" required/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}
