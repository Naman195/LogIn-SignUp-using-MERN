import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { login } from "../../Backend/controllers/auth.controller";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const[user, setUser] = useState("")
    const [userId, setuserId] = useState("")


    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem('token', serverToken)
    }

    let isLoggedIn = !!token
    console.log("isLoggedIn value",isLoggedIn);

    // tackle logout functionality

    const LogoutUser = () => {
        setToken("")
        return localStorage.removeItem('token')
    }

    // JWT FUnctionality getting data ofcurrently loggedIn User


    const userAuthentication = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/profile", {
                
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            // console.log(response);

            if(response.status === 200){
                const data = response.data
                console.log("User Data", data.userData);
                // console.log(data.userData._id);

                setUser(data.userData)

            }
        } catch (error) {
            console.log("error Fetching UserData", error);
        }
    }

    useEffect(() => {
        token ? userAuthentication() : null;
        // userAuthentication()
    }, [])

    return <AuthContext.Provider value={{ 
                                isLoggedIn, 
                                storeTokenInLS, 
                                LogoutUser,
                                user
                                }} >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue
}