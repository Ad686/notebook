
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Signup() {
  const [credentials, setCredentials] = useState({email: "", password: "",name:""}) 

    let navi = useNavigate();
    const Loginpage=()=>{
        navi('/login')
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth//createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password,name:credentials.name})
      });
      // console.log(response.body)
      // console.log(response.success);
      if (response.ok){
          const json = await response.json()
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          swal("Signup success")
          navi("/login");

      }
      else{
          console.log("alert")
          // alert("Invalid credentials");
      }
  }
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  
  return (
    <div>
       <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleSubmit}>
         
        <div className="form-outline mb-4">
            <input type="text" className="form-control form-control-lg"
              placeholder="Enter Your Full Name"  value={credentials.name} onChange={onChange} name="name" id="name"  />
            
          </div>
          <div className="form-outline mb-4">
            <input type="email"  className="form-control form-control-lg"
              placeholder="Enter a valid email address"  value={credentials.email} onChange={onChange} id="email" name="email" required minLength={5} />
            
          </div>

         
          <div className="form-outline mb-3">
            <input type="password"  className="form-control form-control-lg"
              placeholder="Enter password"  value={credentials.password} onChange={onChange} name="password" id="password" required minLength={5} />
            
          </div>

          <div className="d-flex justify-content-between align-items-center">
            
            
           
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <Button variant='contained' color='primary' type='submit'>Signup</Button>
            <p className="small fw-bold mt-2 pt-1 mb-0"> Have an account? <a href="/login"
                className="link-danger" >Login</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
