import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';


const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navi = useNavigate();

  const handleSubmit = async (e) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log('BASE_URL:', BASE_URL);
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    // console.log(response.body)
    // console.log(response.success);
    if (response.ok) {
      swal("Welcome!","Log In Successfully", "success")
      const json = await response.json()
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navi("/notes");

    }
    else {
      console.log("alert")
      // alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  return (
    <>

      {/* <div className='container'> 
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div> */}
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>


                <div className="form-outline mb-4">
                  <input type="email" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" value={credentials.email} onChange={onChange} id="email" name="email" />

                </div>


                <div className="form-outline mb-3">
                  <input type="password" className="form-control form-control-lg"
                    placeholder="Enter password" value={credentials.password} onChange={onChange} name="password" id="password" />

                </div>



                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button variant='contained' color='primary' type="submit">Login</Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                    className="link-danger" >Register</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
