import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./login";
import Signup from "./signup";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./dashboard";
import Entry from "./entrylog";
import ViewStrEntry from "./viewstrentries";
import ViewEnduEntry from "./viewenduentries";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<Login />}></Route>
                <Route path = '/Signup' element = {<Signup />}></Route>

                <Route path = '/dashboard' element = {
                <PrivateRoute element={Dashboard}>
                </PrivateRoute>
                }
                />

                <Route path = '/entrylog' element = {
                <PrivateRoute element={Entry}>
                </PrivateRoute>
                }
                />

                <Route path = '/viewstrentries' element = {
                <PrivateRoute element={ViewStrEntry}>
                </PrivateRoute>
                }
                />

                <Route path = '/viewenduentries' element = {
                <PrivateRoute element={ViewEnduEntry}>
                </PrivateRoute>
                }
                />

            </Routes>
        </BrowserRouter>
    )
}

export default App
