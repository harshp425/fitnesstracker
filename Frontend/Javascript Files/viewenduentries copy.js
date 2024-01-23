import React, { useState } from 'react';
import StrengthVolumeChart from './StrengthVolumechart';
import EndurancedurationChart from './Endurancedurationchart';
import EndurancepaceChart from './Endurancepacechart';
import EnduranceIntensityChart from './Enduranceintensitychart';
import "./viewenduentries.css"
import { useNavigate } from 'react-router-dom';


function ViewEnduEntry () {

    const [equery, setEquery] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [transformDurationData, setTransformDurationData] = useState("")
    const [transformPaceData, setTransformPaceData] = useState("")
    const [transformIntensityData, setTransformIntensityData] = useState("")
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()

    //This function assigns the user's input to the appropriate variable for later reference
    const handleQuery = (event)=> {
        const {name, value} = event.target;
        setEquery(value);
    }
    
    //This function handles the submission for the query by sending the queried exercise to the backend along with the user's stored 
    //jwt token which is used for identification purposes.It also calls the appropriate function to update the data table and to create
    //the charts
    const handleQuerySubmision  = async (e)=> {
        deleteTable();
        e.preventDefault();
        const url = `http://localhost:8080/endurance_entry/getentry?equery=${encodeURIComponent(equery)}`;

        try {
            const QueryResponse = await fetch(url, {
            method:"GET",
            headers:{
            "Authorization" : `Bearer ${token}`
            },
        });
        if (!QueryResponse.ok) {
            throw new Error(`Error: ${QueryResponse.status}`);
        }
        const data = await QueryResponse.json();
        setEquery("")
        setErrorMessage("")
        makeTable(data)

        const transformedDurationData = data.map(entry=> ({
            date: entry.date,
            distance: entry.distance
        }));

        const transformedPaceData = data.map(entry=> ({
            distance: entry.distance,
            pace: entry.avspeed
        }));

        const transformedIntensityData = data.map(entry=> ({
            date: entry.date,
            intensity: entry.avspeed * entry.distance
        }));

        setTransformDurationData(transformedDurationData)
        setTransformPaceData(transformedPaceData)
        setTransformIntensityData(transformedIntensityData)

        }catch (error) {
            setEquery("")
            console.error('There was a problem with the fetch operation:', error);
            setErrorMessage('Failed Fetch Entry. Please try again');
            
        }
    }

    //This method handles deleting the table so that a new, updated table can be made in its place
    const deleteTable = () => {
        let tableBodye = document.getElementById("workoutTable").getElementsByTagName("tbody")[0];
        while (tableBodye.firstChild) {
            tableBodye.removeChild(tableBodye.firstChild);
        }
    }

    //This method creates a new table with the new data
    const makeTable = (data)=> {
        let workoutEntries = data;
        let tableBody = document.getElementById("workoutTable").getElementsByTagName("tbody")[0];

        workoutEntries.forEach(entry => {
            let row = tableBody.insertRow();
            row.insertCell(0).innerHTML = entry.date;
            row.insertCell(1).innerHTML = entry.exercise;
            row.insertCell(2).innerHTML = entry.distance;
            row.insertCell(3).innerHTML = entry.avspeed;
        });

    }

    //Handles the logout logic and removes the jwt tokens from local storage for security purposes
    const logout = () => {
        localStorage.removeItem("jwt");
        navigate('/');
    }

    return(
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
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"style={{fontSize:"17px", color:"white"}}>Strength Data</button>
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
                            <div>
                                <h1 className='display-1 lead custom-header text-center'>View Endurance Progress</h1>
                            </div>
                        </div>

                        <div>

                            <div className='enduquerybox'> 
                                <form onSubmit={handleQuerySubmision}>
                                    <div className="row mb-4 w-100">
                                        <label className="col-sm-2 col-form-label" style={{ paddingLeft: '10px' }} >Exercise Name:</label>
                                        <div className="col-sm-9">
                                            <input type="text" style={{ marginLeft: '-50px' }} className="form-control" id="inputName3" value={equery} onChange={handleQuery} name='equery' required></input> 
                                        </div>
                                        <div className="col-sm-1">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                        <p></p>
                                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                    </div> 
                                </form>
                            </div>

                            <div className='endutablebox'>
                                <table class="table table-striped table-hover table-sm" id="workoutTable">
                                    <thead>
                                        <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Exercise</th>
                                        <th scope="col">Distance (miles)</th>
                                        <th scope="col">Average Speed/Pace (mph)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <div className='customchart1'>
                                    <h2 style={{ fontFamily:"inherit",  paddingLeft: "155px" }}>Distance Progression</h2>
                                    <EndurancedurationChart data={transformDurationData} />
                                </div>
                                <div className='customchart2'>
                                    <h2 style={{ fontFamily: "inherit", paddingLeft: "100px" }}>Pace vs Duration Progression</h2>
                                    <EndurancepaceChart data={transformPaceData} />
                                </div>
                            </div>
                            <div className='customchart3'>
                                <h2 style={{ fontFamily: "inherit", paddingLeft: "425px" }}>Intensity Progression</h2>
                                <EnduranceIntensityChart data={transformIntensityData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default ViewEnduEntry;