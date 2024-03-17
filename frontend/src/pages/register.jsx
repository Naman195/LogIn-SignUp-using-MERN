import { useState } from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.jsx";
import axios from "axios"

export const Register = () => {

  // const [file, setFile] = useState()

  const navigate =  useNavigate()
  const { storeTokenInLS } = useAuth()

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const handleInput = (e) => {
    // console.log(e);
    let name  = e.target.name
    let value = e.target.value

    setUser({
      ...user,
      [name]: value,

    })
  }

  

  

  


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(user);
    // alert(user)
    try {
      const response = await  axios.post(`http://localhost:5000/api/auth/signup`, user,  {
      headers: { 
        'Content-Type': 'application/json' 
      },
      
    })
    console.log(response);
    if(response.status === 201){
      const res_data =  response.data
      console.log("res data", res_data);
      storeTokenInLS(res_data.token)
      setUser({ 
      fullName: "",
      email: "",
      phoneNumber: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
    navigate("/login")
    }
    // console.log(response);
    } catch (error) {
      console.log("register", error);
    }
    
  }

  


    return (
        <>
        
          <section>
            <main>
              <div className="section-registration">
                <div className="container grid grid-two-cols">
                  <div className="registration-image">
                    <img
                      src="/images/register.png"
                      alt="A boy trying to do registration"
                      width="500"
                      height="500"
                    />
                  </div>
    
                  {/* let tackle registration form  */}
                  <div className="registration-form">
                    <h1 className="main-heading mb-3">registration form</h1>
                    <br />
    
                    <form onSubmit={handleSubmit} >
                      <div>
                        <label htmlFor="fullname">fullname</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="fullname"
                          id="fullname"
                          required
                          autoComplete="off"
                          value={user.fullName}
                          onChange={handleInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="email">email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="enter your email"
                          id="email"
                          required
                          autoComplete="off"
                          value={user.email}
                          onChange={handleInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone">phone Number</label>
                        <input
                          type="phone"
                          name="phoneNumber"
                          placeholder="phone"
                          id="phone"
                          required
                          autoComplete="off"
                          value={user.phoneNumber}
                          onChange={handleInput}
                        />
                      </div>

                      <div>
                        <label htmlFor="username">username</label>
                        <input
                          type="text"
                          name="userName"
                          placeholder="username"
                          id="username"
                          required
                          autoComplete="off"
                          value={user.userName}
                          onChange={handleInput}
                        />
                      </div>
    
                      
                      <div>
                        <label htmlFor="password">password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          id="password"
                          required
                          autoComplete="off"
                          value={user.password}
                          onChange={handleInput}
                        />
                      </div>
                     
                      <div>
                        <label htmlFor="password">Confirm password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm-password"
                          id="confirmPassword"
                          required
                          autoComplete="off"
                          value={user.confirmPassword}
                          onChange={handleInput}
                        />
                      </div>
                      <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      required
                      value={user.gender}
                      onChange={handleInput}
                    >
                   
                      <option value="" disabled>Select your gender</option>
                      <option id="male" value="male">Male</option>
                      <option id = "female" value="female">Female</option>
                     
                    </select>
                  </div>

                    
                      <br />
                      <button type="submit" className="btn btn-submit">
                        Register Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </>
      );
}
