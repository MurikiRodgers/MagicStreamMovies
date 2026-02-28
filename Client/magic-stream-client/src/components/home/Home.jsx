import {useState, useEffect} from 'react';
import axiosClient from '../../api/axiosConfig';
import Movies from '../movies/Movies';
import axios from 'axios';

const Home= () =>{
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")

    useEffect(()=>{
        const fetchMovies = async()=>{
            setLoading(true);
            setMessage("");
            try{
const response = await axiosClient.get('/movies');
setMovies(response.data)
if (response.data.length === 0){
    setMessage("No movies found.")
}
            }catch(error){
                console.log("Error fetching movies:", error);
                setMessage("Error fetching movies.")

            }finally{
                setLoading(false);
            }
        }
        fetchMovies();
    },[])
    return(
        <>
        {loading ? (<h2>Loading....</h2>):(
            <Movies movies={movies} message={message}/>
        )}
        </>
    )
}
export default Home;