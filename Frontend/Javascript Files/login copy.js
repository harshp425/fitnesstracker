import React,{useState} from "react"
import "./loginstyle.css"
import { Link } from "react-router-dom"
import Signup from "./signup"
import {useNavigate} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {isAuth} from "./PrivateRoute";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //this function handles the submission logic when a user signs in. It sends a JSON object to the associated backend endpoint.
    //If the credentials are valid, the endpoint will send back a unique jwt token for that user which is stored in local storage, 
    //for later reference.
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const user = {username, password}
        try {
            const loginResponse = await fetch("http://localhost:8080/auth/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(user)
        });
        if (!loginResponse.ok) {
            throw new Error(`Error: ${loginResponse.status}`);
        }
        const data = await loginResponse.json();
        const token = data.jwt;
        localStorage.setItem("jwt", token);

        
        setErrorMessage('');
        navigate('/dashboard')

        }catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setErrorMessage('Failed to Login. Please try again');
        }
        
    }
    
    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100"style={{backgroundColor:"#1B3358"}}>
            <div className="form-container p-5 rounded bg-white">
                <form onSubmit={handleSubmit}>
                <h3 className="text-center">Sign In</h3>
                <div className="mb-2">
                    <label htmlFor="email">Email</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="email" placeholder="Enter Email" name="email" className="form-control"></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" name="password" className="form-control"></input>
                </div> 
                <div className="mb2">
                    <input type="checkbox" className="custom-control custom-checkbox" id="check"></input>
                    <label htmlFor="check" className="custom-input-label ms-2">Remember Me</label>
                </div>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary rounded-1" style={{backgroundColor:"#1B3358"}}>Sign In</button>
                </div>
                <p className="text-right"> 
                    <Link to="/signup">Sign Up</Link>
                </p>
                </form>
            </div>
        </div>
    )
}

export default Login