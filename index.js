import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./index.css"
import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import App from './src/App';
import { UserProvider } from "./src/context/UserContext";

//axios.defaults.baseURL =  "http://localhost:8000"; 
axios.defaults.baseURL =  "https://project-lead-back.onrender.com"; 

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(	
	< BrowserRouter	>
		<UserProvider>	
			< App />		
		</UserProvider>	
	</ BrowserRouter	>
);
