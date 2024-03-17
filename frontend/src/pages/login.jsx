import { useState } from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.jsx";
import axios from "axios"

export const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { storeTokenInLS } = useAuth()

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', user, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          // console.log(response);
      
          if (response.status === 200) {
              const res_data = response.data;
              // console.log('Response Data', res_data);
              // localStorage.setItem('token', res_data.token)
              storeTokenInLS(res_data.token);
              setUser({
                  email: '',
                  password: '',
              });
              navigate('/');
          }
          // console.log(response);
      } catch (error) {
          console.log('Login ', error);
      }
        // try {
        //     const response = await fetch(`http://localhost:5000/api/auth/login`, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(user),
        // })

        // if(response.ok){
        //   const res_data = await response.json();
        //   console.log("Response Data", res_data);
        //   // localStorage.setItem('token', res_data.token)
        //   storeTokenInLS(res_data.token)
        //     setUser({
        //         email: "",
        //         password: ""
        //     })
        //     navigate("/")
        // }
        // console.log(response);
        // } catch (error) {
        //     console.log("Login ", error);
            
        // }
        

    }
    return (
        <>
        
          <section>
            <main>
              <div className="section-registration">
                <div className="container grid grid-two-cols">
                  <div className="registration-image">
                    <img
                      src="/images/login.png"
                      alt=" let's fill the login form "
                      width="500"
                      height="500"
                    />
                  </div>
    
                  {/* let tackle registration form  */}
                  <div className="registration-form">
                    <h1 className="main-heading mb-3">login form</h1>
                    <br />
    
                    <form onSubmit={handleSubmit}>
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
    
                      <br />
                      <button type="submit" className="btn btn-submit">
                        Log In
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