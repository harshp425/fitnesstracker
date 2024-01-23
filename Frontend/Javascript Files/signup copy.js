import React,{useState} from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";


function Signup() {


    const [email,setEmail] = useState('')
    const [firstName,setFirst_Name] = useState('')
    const [lastName,setLast_Name] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //this function handles the submission for the sign up data by converting it to a JSON object, 
    //and then sending it to the corresponding endpoint in the backend which then saves it to a
    //database
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, firstName, lastName, password };
        var csrfToken
        var csrfToken2;
        try {
            const registerResponse = await fetch("http://localhost:8080/registration/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                credentials: "include",
                body: JSON.stringify(user)
            });
            if (!registerResponse.ok) {

                throw new Error(`Error: ${registerResponse.status}`);
            }
            await registerResponse.json();
            setErrorMessage(''); 
            navigate('/?')
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setErrorMessage('Failed to add user. Please try again.');
        }
    };
    
    return (
        <div className="signup template d-flex justify-content-center align-items-center vh-100"style={{backgroundColor:"#1B3358"}}>
            <div className="form-container p-5 rounded bg-white">
                <form onSubmit={handleSubmit}>
                <h3 className="text-center">Sign Up</h3>
                <div className="mb-2">
                    <label htmlFor="fname">First Name</label>
                    <input value={firstName} onChange={(e)=>setFirst_Name(e.target.value)} name="fname" type="text" placeholder="Enter First Name" className="form-control"></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="lname">Last Name</label>
                    <input value={lastName} onChange={(e)=>setLast_Name(e.target.value)} name="lname" type="text" placeholder="Enter Last Name" className="form-control"></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type="email" placeholder="Enter Email" className="form-control"></input>
                </div>
                <div className="mb-2">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type="password" placeholder="Enter Password" className="form-control"></input>
                </div> 
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="d-grid mt-2">
                    <button type="submit" className="btn btn-primary" style={{backgroundColor:"#1B3358"}}>Sign Up</button>
                </div>
                <p className="text-end mt-2"> 
                    Already Registered <Link to="/?"> Sign In </Link>
                </p>
                </form>
            </div>
        </div>
    )
}

export default Signup