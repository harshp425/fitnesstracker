import React, { useState } from 'react';
import "./dashboard.css"
import "./entrylog.css"
import { useNavigate } from 'react-router-dom';

function Entry() {
    const [exerciseNameStren, setExerciseNameStren] = useState("")
    const [exerciseNameEndu, setExerciseNameEndu] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
    const [distance, setDistance] = useState("")
    const [avspeed, setAvSpeed] = useState("")
    const token = localStorage.getItem("jwt")
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()


    const currRawDate = new Date();
    const date = currRawDate.toLocaleDateString();

    //this function handles the users inputs into the form and ensures that the values 
    //inputted are set in the correct corresponding name

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "exerciseNameStren":
                setExerciseNameStren(value);
                break;
            case "sets":
                setSets(value);
                break;
            case "reps":
                setReps(value);
                break;
            case "weight":
                setWeight(value);
                break;
            case "exerciseNameEndu":
                setExerciseNameEndu(value);
                break;
            case "distance":
                setDistance(value);
                break;
            case "avspeed":
                setAvSpeed(value);
                break;
        }
        validateField(name, value);
    };
    
    //this function ensures that required fields are filled in and in the case that they are not, 
    //it sends an error message
    const validateField = (name, value) => {
        if (!value) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: 'This field is required' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };


    //this function handles the submission for the strength entry form and sends the inputted data to the backend to 
    //be stored into the database. It also displays appropriate error messages
    const handleSubmit1 = async (e)=> {
        console.log(date)
        e.preventDefault();
        const strentry = {exerciseNameStren,date, sets, reps, weight}

        console.log(strentry)

        try {
            const loginResponse = await fetch("http://localhost:8080/strength_entry/add", {
            method:"POST",
            headers:{"Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(strentry)
        });
        if (!loginResponse.ok) {
            throw new Error(`Error: ${loginResponse.status}`);
        }
        const data = await loginResponse.json();
        console.log(data);
        setExerciseNameStren("")
        setReps("")
        setSets("")
        setWeight("")
        setDropdownOpen1(true)
        
        setErrorMessage('');

        }catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setErrorMessage('Failed Add Entry. Please try again');
            setDropdownOpen1(true)

        }
    }

    //this function handles the submission for the endurance entry form and sends the inputted data to the backend to 
    //be stored into the database. It also displays appropriate error messages.
    const handleSubmit2 = async (e)=> {
        console.log(date)
        e.preventDefault();
        const enduentry = {exerciseNameEndu,date, distance, avspeed}

        console.log(enduentry)

        try {
            const loginResponse = await fetch("http://localhost:8080/endurance_entry/add", {
            method:"POST",
            headers:{"Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(enduentry)
        });
        if (!loginResponse.ok) {
            throw new Error(`Error: ${loginResponse.status}`);
        }
        const data = await loginResponse.json();
        console.log(data);
        setExerciseNameEndu("")
        setAvSpeed("")
        setDistance("")
        setDropdownOpen2(true)
        
        setErrorMessage('');

        }catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setErrorMessage('Failed Add Entry. Please try again');
            setDropdownOpen2(true)

        }
    }
    
    //handles the logout feature and clears the local storage of jwt tokens
    const logout = () => {
        localStorage.removeItem("jwt");
        navigate('/');
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 fixed-sidebar" style={{backgroundColor:"#1B3358"}}>
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-4 d-none d-sm-inline custom-className" style={{paddingLeft:"25px",fontFamily:"Palatino", fontSize:"35px"}}>Menu</span>
                            </a>

                            <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="pills-tab">

                                <li className="nav-item" role="presentation">
                                    <a href="dashboard" className="nav-link align-middle px-0">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{ fontSize:"17px", color:"white"}}>Home</button>
                                    </a>
                                </li>


                                <li className="nav-item" role="presentation">
                                    <a href="entrylog" className="nav-link align-middle px-0">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{ fontSize:"17px", color:"white"}}>Log Entry</button>
                                    </a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a href="viewstrentries" className="nav-link align-middle px-0">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{ fontSize:"17px", color:"white"}}>Strength Data</button>
                                    </a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a href="viewenduentries" className="nav-link align-middle px-0">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{ fontSize:"17px", color:"white"}}>Endurance Data</button>
                                    </a>
                                </li>

                                <li className="nav-item" role="presentation" style={{marginTop:"350px"}}>
                                    <a className="nav-link align-middle px-0">
                                        <button onClick={logout} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{ fontSize:"17px", color:"white"}}>Log Out</button>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col py-3"style={{backgroundColor:"#f2f2f2"}}>
                        <div className="container customheaderbox">
                            <h1 className='display-1 lead custom-header text-center'>Log an Entry</h1>
                        </div>
                        <div> 
                            <div className='strenghtentryformbox'>
                                <h1 style={{fontSize:"20px", paddingBottom:"10px"}}>Strength/Weight Training</h1>
                                <form id="strength_entry" onSubmit={handleSubmit1}>
                                    <div className="row mb-3 w-100">
                                        <label  className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }} >Exercise Name</label>
                                        <div className="col-sm-10">
                                        <input onChange={handleInputChange} value={exerciseNameStren} type="text" className="form-control" id="inputName3" name='exerciseNameStren'required></input>
                                        </div>
                                    </div>

                                    <div className="row mb-3 w-100">
                                        <label for="numberInput" className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }}>Sets</label>
                                        <div className="col-sm-10">
                                        <input value={sets} onChange={handleInputChange}type="number" className="form-control" id="inputSets3" name='sets'required></input>
                                        </div>
                                    </div>

                                    <div className="row mb-3 w-100">
                                        <label for="numberInput" className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }}>Reps</label>
                                        <div className="col-sm-10">
                                        <input value={reps} onChange={handleInputChange}type="number" className="form-control" id="inputReps3" name='reps'required></input>
                                        </div>
                                    </div>

                                    <div className="row mb-3 w-100">
                                        <label for="numberInput" className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }}>Weight</label>
                                        <div className="col-sm-10">
                                        <input value={weight} onChange={handleInputChange}type="number" className="form-control" id="inputWeight3" name='weight' required></input>
                                        </div>
                                    </div>
                                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                    <button type="submit" className="btn btn-primary" style={{ marginLeft: '20px' }}>Submit</button>
                                </form>
                            </div>
                            <div>
                                <div className='strenghtentryformbox' >
                                    <h1 style={{fontSize:"20px", paddingBottom:"10px"}}>Endurance/Cardio Training</h1>
                                    <form onSubmit={handleSubmit2}>

                                        <div className="row mb-3 w-100">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }} >Exercise Name</label>
                                            <div className="col-sm-10">
                                            <input value={exerciseNameEndu} onChange={handleInputChange} type="text" className="form-control" id="inputName3" name='exerciseNameEndu'required></input>
                                            </div>
                                        </div>

                                        <div className="row mb-3 w-100">
                                            <label for="numberInput" className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }}>Distance (miles)</label>
                                            <div className="col-sm-10">
                                            <input value={distance} onChange={handleInputChange} type="number" className="form-control" id="inputDistance3" name='distance'required></input>
                                            </div>
                                        </div>

                                        <div className="row mb-3 w-100">
                                            <label for="numberInput" className="col-sm-2 col-form-label" style={{ paddingLeft: '30px' }}>Average Speed/Pace (mph)</label>
                                            <div className="col-sm-10">
                                            <input value={avspeed} onChange={handleInputChange} type="number" className="form-control" id="inputSpeed3" name='avspeed' required></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: '20px' }}>Submit</button>

                                    </form>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Entry;