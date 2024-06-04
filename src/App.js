import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ProtectedRoute } from './router/ProtectedRoute';
import { UserContext } from "./context/UserContext";

import Login from "./components/Login";
import MainNavBar from "./components/MainNavBar";
import Home from './pages/Home.js';
import Users from './pages/Users.js';


const App = () => {	
	
	const {token, currentuser, roles} = useContext(UserContext); 
	
	return (
		<>				
			<MainNavBar />
			<Login />
			{token && (				
				<div className="columns">							
					<Routes>
						<Route index element={<Home />} />
						<Route path="/" element={<Home />} />	
						<Route element={<ProtectedRoute isAllowed={ roles.includes("admin") } />}>
							<Route path="/users" element={<Users />} />
						</Route>			
						<Route path="*" element={<p>There's nothing here: 404!</p>} />
					</Routes>						
				</div>
			)}				
		</>
	);
};

export default App;