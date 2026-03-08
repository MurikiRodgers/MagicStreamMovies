import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import {Route, Routes,useNavigate} from "react-router"
import Layout from "./components/Layout"
import RequiredAuth from "./components/RequiredAuth"
import Recommended from "./components/recommended/Recommended"
import Review from "./components/review/Review"
import axiosClient from "../src/api/axiosConfig";
import useAuth from "./hook/useAuth";
import StreamMovie from "./components/stream/StreamMovies"




function App() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

 const handleLogout = async () => {

        try {
            const response = await axiosClient.post("/logout",{user_id: auth.user_id});
            //console.log(response.data);
            setAuth(null);
           //localStorage.removeItem('user');
            console.log('User logged out');

        } catch (error) {
            console.error('Error logging out:', error);
        } 

    };
const updateMovieReview = (imdb_id) =>{
  navigate(`/review/${imdb_id}`);
}

  return(
    <>
    <Header handleLogout={handleLogout}/>
    <Routes path="/" element={<Layout/>}>
      <Route path="/" element={<Home  updateMovieReview={updateMovieReview}/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route element={<RequiredAuth/>}>
        <Route path="/recommended" element={<Recommended/>}></Route>
        <Route path="/review/:imdb_id" element={<Review/>}></Route>
        <Route path="/stream/:yt_id" element={<StreamMovie/>}></Route>
        </Route>
    </Routes>
    
    </>
  )
}

export default App
