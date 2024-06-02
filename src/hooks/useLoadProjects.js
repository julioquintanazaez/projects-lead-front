import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadProjects(){
	
	const {token,
		   stateProjectsChange,
		   stateMaterialsChange,
		   stateTasksChange,
		   stateEquipmentsChange,
		   } = useContext(UserContext);
	const [projects, setProjects] = useState([]);	
	
	useEffect(() => {
		
		const fetchProjects = async () =>{
			await axios({
				method: 'get',
				url: '/read_all_projects_with_totals/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setProjects(response.data);
				}else {	
					setProjects([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchProjects();
		
	}, [stateProjectsChange,
		stateMaterialsChange,
		stateTasksChange,
		stateEquipmentsChange,
	]);
	
	return projects;
};