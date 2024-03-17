import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import  {Register} from "./pages/register"
import { Navbar } from './component/navbar';
import { Logout } from './pages/logout';
import { User } from './pages/user';
import { useAuth } from '../store/auth';
import  { Profile } from "./pages/profile_upload"

const App = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      <BrowserRouter >
      <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/upload" element = {<Profile />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/login" element = {isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path = "/logout" element = {<Logout />} />

          <Route path = "/profile" element = {isLoggedIn ? <Profile /> : <Navigate to={"/login"} />} />
          {/* <Route path = "/profile" element = {<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
