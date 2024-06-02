import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ( props ) => {
	
	const [token, setToken] = useState(window.localStorage.getItem("projects-application-v1.0"));
	const [currentuser, setCurrentUser] = useState({});
	const [roles, setRoles] = useState([]);
	const [stateUsersChange, setStateUsersChange] = useState("");
	const [stateProjectsChange, setStateProjectsChange] = useState("");
	const [stateMaterialsChange, setStateMaterialsChange] = useState("");
	const [stateLaborsChange, setStateLaborsChange] = useState("");
	const [stateTasksChange, setStateTasksChange] = useState("");
	const [stateEquipmentsChange, setStateEquipmentsChange] = useState("");
	
	useEffect(() => {
		
		const fetchCurrentUser = async () =>{
			await axios({
				method: 'get',
				url: '/users/me/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 200) {						
					console.log("Login successfuly");
					setCurrentUser(response.data);		
					setRoles(response.data.role);						
					window.localStorage.setItem("projects-application-v1.0", token);	
				}else {	
					console.log("No existe el token");
					setToken(null); 
					setRoles([]);	
					window.localStorage.removeItem("projects-application-v1.0");
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				window.localStorage.removeItem("projects-application-v1.0");
			});		
		};		
		
		fetchCurrentUser();
		
	}, [token]);
	
	const handleLogout =() => {
		setToken(null);
		setRoles([]);	
		window.localStorage.removeItem("hidro-application-v1.0");
	};
	
	return (
		<UserContext.Provider value={{
			token, setToken,
			currentuser, roles, handleLogout, 			
			stateUsersChange, setStateUsersChange,
			stateProjectsChange, setStateProjectsChange,
			stateMaterialsChange, setStateMaterialsChange,
			stateLaborsChange, setStateLaborsChange,
			stateTasksChange, setStateTasksChange,
			stateEquipmentsChange, setStateEquipmentsChange
		}}>
			{ props.children }
		</UserContext.Provider>
	);
};