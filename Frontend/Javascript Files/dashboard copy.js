import React, { useEffect, useState } from 'react';
import "./dashboard.css"
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [record, setRecord] = useState("")
    const [removepr, setRemovePr] = useState("")
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [errorMessage4, setErrorMessage4] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [goal, setGoal] = useState("")
    const [removegoal, setRemoveGoal] = useState("")

    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()

    //Ensures that when a user loads up dashboard, thier specific personal records are retrieved from the database and displayed in a table
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const personalrecordresponse = await fetch('http://localhost:8080/personalrecord/getrecords', {
                    method:"GET",
                    headers:{
                    "Authorization" : `Bearer ${token}`
                    }
                    })
                if (!personalrecordresponse.ok) {
                    
                    throw new Error(`HTTP error! Status: ${personalrecordresponse.status}`);
                }
                const jsonData = await personalrecordresponse.json();
                console.log(jsonData)
                makePRTable(jsonData)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); 

    //Ensures that when a user loads up dashboard, thier specific goal entries are retrieved from the database and displayed in a table
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const personalgoalresponse = await fetch('http://localhost:8080/goals/getgoals', {
                    method:"GET",
                    headers:{
                    "Authorization" : `Bearer ${token}`
                    }
                    })
                if (!personalgoalresponse.ok) {
                    
                    throw new Error(`HTTP error! Status: ${personalgoalresponse.status}`);
                }
                const jsonData = await personalgoalresponse.json();
                console.log(jsonData)
                makeGoalTable(jsonData)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); 


    //handles the assignment of the user's input for the personal records fields
    const handleQuery = (event)=> {
        const {name, value} = event.target;
        switch (name) {
            case "addpr":
                setRecord(value)
                break;
            case "removepr":
                setRemovePr(value)
                break;
        }
    }

    //updates the data table for the personal records by re-retrieving the information from the database and then calling 
    //the function to create the table again
    const updatePRTable = async ()=> {
        try {
            const personalrecordresponse = await fetch('http://localhost:8080/personalrecord/getrecords', {
                method:"GET",
                headers:{
                "Authorization" : `Bearer ${token}`
                }
                })
            if (!personalrecordresponse.ok) {
                throw new Error(`HTTP error! Status: ${personalrecordresponse.status}`);
            }
            const jsonData = await personalrecordresponse.json();
            console.log(jsonData)
            makePRTable(jsonData)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    //handles the submission for the personal record form (ie adding prs and removing prs)
    const handleprsubmission  = async (e)=> {
        deletePRTable()
        e.preventDefault();
        if (record!=="") {
            const url = `http://localhost:8080/personalrecord/add`;
            const personalrecord = {record}
            try {
                const AddResponse = await fetch(url, {
                method:"POST",
                headers:{"Content-Type":"application/json",
                "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(personalrecord)
            });
            if (!AddResponse.ok) {
                throw new Error(`Error: ${AddResponse.status}`);
            }
            const data = await AddResponse.json();
            setRecord("")
            setErrorMessage1("")
            updatePRTable()
    
            }catch (error) {
                setRecord("")
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage1('Failed Fetch Entry. Please try again');
            }
        } else {
            deletePRTable()
            const url = `http://localhost:8080/personalrecord/removepr?entryName=${encodeURIComponent(removepr)}`;

            try {
                const RemoveResponse = await fetch(url, {
                method:"DELETE",
                headers:{
                "Authorization" : `Bearer ${token}`
                },
            });
            if (!RemoveResponse.ok) {
                throw new Error(`Error: ${RemoveResponse.status}`);
            }
            
            setRemovePr("")
            setErrorMessage2("")
            updatePRTable()

            } catch (error) {
                setRemovePr("")
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage2('Failed Fetch Entry. Please try again');
                
            }
        }
    }

    //handles deleting the personal record table so that it can be remade with the new entry 
    const deletePRTable = () => {
        let tableBodye = document.getElementById("personalrecordTable").getElementsByTagName("tbody")[0];
        while (tableBodye.firstChild) {
            tableBodye.removeChild(tableBodye.firstChild);
        }
    }

    //handles creating the personal records tabel
    const makePRTable = (data)=> {
        let personalRecords = data;
        let table = document.getElementById("personalrecordTable");

        if (table) {
            let tableBody = document.getElementById("personalrecordTable").getElementsByTagName("tbody")[0];
            personalRecords.forEach(entry => {
                let row = tableBody.insertRow();
                row.insertCell(0).innerHTML = entry.record
            })
        }
    }  


    //handles the assignment of the user's input for the goals' fields
    const handleQuery2 = (event)=> {
        const {name, value} = event.target;
        switch (name) {
            case "addgoal":
                setGoal(value)
                break;
            case "removegoal":
                setRemoveGoal(value)
                break;
        }
    }


    // this method retrieves the new data for the goals and then calls the function to create a new goals table
    const updateGoalTable = async ()=> {
        try {
            const goalresponse = await fetch('http://localhost:8080/goals/getgoals', {
                method:"GET",
                headers:{
                "Authorization" : `Bearer ${token}`
                }
                })
            if (!goalresponse.ok) {
                throw new Error(`HTTP error! Status: ${goalresponse.status}`);
            }
            const jsonData = await goalresponse.json();
            makeGoalTable(jsonData)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    //this function handles the submission for the goals form and also calls the appropriate functions for deleting and creating
    //a new table
    const handlegoalsubmission  = async (e)=> {
        deleteGoalTable()
        e.preventDefault();
        if (goal!=="") {
            const url = `http://localhost:8080/goals/add`;
            const mygoal = {goal}
            try {
                const AddgoalResponse = await fetch(url, {
                method:"POST",
                headers:{"Content-Type":"application/json",
                "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(mygoal)
            });
            if (!AddgoalResponse.ok) {
                throw new Error(`Error: ${AddgoalResponse.status}`);
            }
            const data = await AddgoalResponse.json();
            setGoal("")
            setErrorMessage3("")
            updateGoalTable()
    
            }catch (error) {
                setGoal("")
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage3('Failed Fetch Entry. Please try again');
                
            }
        } else {
            deleteGoalTable()
            const url = `http://localhost:8080/goals/removegoal?entryName=${encodeURIComponent(removegoal)}`;

            try {
                const RemovegoalResponse = await fetch(url, {
                method:"DELETE",
                headers:{
                "Authorization" : `Bearer ${token}`
                },
            });
            if (!RemovegoalResponse.ok) {
                throw new Error(`Error: ${RemovegoalResponse.status}`);
            }
            
            setRemoveGoal("")
            setErrorMessage4("")
            updateGoalTable()

            } catch (error) {
                setRemoveGoal("")
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage4('Failed Fetch Entry. Please try again');
                
            }
        }
    }

    //handles deleting the goal table
    const deleteGoalTable = () => {
        let tableBodye = document.getElementById("goalTable").getElementsByTagName("tbody")[0];
        while (tableBodye.firstChild) {
            tableBodye.removeChild(tableBodye.firstChild);
        }
    }

    //handles making a new goal table with the new entry information
    const makeGoalTable = (data)=> {
        let mygoals = data;
        let table = document.getElementById("goalTable");

        if (table) {
            let tableBody = document.getElementById("goalTable").getElementsByTagName("tbody")[0];
            mygoals.forEach(entry => {
                let row = tableBody.insertRow();
                row.insertCell(0).innerHTML = entry.goal
            })
        }
    }  


    //handles the logout and clearing of the jwt
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
                    <div className="col py-3" style={{backgroundColor:"#f2f2f2"}}>


                        <div className="container customheaderbox">
                            <h1 className='display-1 lead custom-header text-center'>Dashboard</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div className='personalrecordbox'> 
                                <h1> My Personal Records</h1>
                                <p></p>
                                <form onSubmit={handleprsubmission}>
                                    <div className="row mb-2 w-100">
                                        <label className="col-sm-1 col-form-label" style={{ paddingLeft: '10px' }} >Add:</label>
                                        <div className="col-sm-8">
                                            <input type="text" style={{ marginLeft: '10px' }} className="form-control" id="inputName3" name='addpr' placeholder='example: # lb' value={record} onChange={handleQuery} ></input> 
                                        </div>
                                        <div className="col-sm-1" style={{marginLeft: '10px'}}>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                        {errorMessage1 && <div className="alert alert-danger" role="alert">{errorMessage1}</div>}
                                    </div> 
                                    <div className="row mb-2 w-100">
                                        <label className="col-sm-1 col-form-label" style={{ paddingLeft: '10px' }} >Delete:</label>
                                        <div className="col-sm-8">
                                            <input type="text" style={{ marginLeft: '25px' }} className="form-control" id="inputName3" name='removepr' placeholder='example: # lb' value={removepr} onChange={handleQuery} ></input> 
                                        </div>
                                        <div className="col-sm-1" style={{marginLeft: '10px'}}>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                        {errorMessage2 && <div className="alert alert-danger" role="alert">{errorMessage2}</div>}
                                    </div> 
                                </form>
                                <table class="table table-striped table-hover table-sm" id="personalrecordTable" style={{marginLeft:"-10px"}}>
                                    <thead>
                                        <tr>
                                        <th scope="col">Personal Records: </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div className='goalsbox'> 
                                <h1> My Goals</h1>
                                <p></p>
                                <form onSubmit={handlegoalsubmission}>
                                    <div className="row mb-2 w-100">
                                        <label className="col-sm-1 col-form-label" style={{ paddingLeft: '10px' }} >Add:</label>
                                        <div className="col-sm-9">
                                            <input type="text" style={{ marginLeft: '10px' }} className="form-control" id="inputName3" name='addgoal'  placeholder="Your Goal" value={goal} onChange={handleQuery2} ></input> 
                                        </div>
                                        <div className="col-sm-1" style={{marginLeft: '10px'}}>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                        {errorMessage3 && <div className="alert alert-danger" role="alert">{errorMessage3}</div>}
                                    </div> 
                                    <div className="row mb-2 w-100">
                                        <label className="col-sm-1 col-form-label" style={{ paddingLeft: '10px' }} >Delete:</label>
                                        <div className="col-sm-9">
                                            <input type="text" style={{ marginLeft: '25px' }} className="form-control" id="inputName3" name='removegoal'  placeholder="Goal you want to remove" value={removegoal} onChange={handleQuery2} ></input> 
                                        </div>
                                        <div className="col-sm-1" style={{marginLeft: '10px'}}>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                        {errorMessage4 && <div className="alert alert-danger" role="alert">{errorMessage4}</div>}
                                    </div> 
                                </form>
                                <table class="table table-striped table-hover table-sm" id="goalTable" style={{marginLeft:"-10px"}}>
                                    <thead>
                                        <tr>
                                        <th scope="col">Goals: </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;