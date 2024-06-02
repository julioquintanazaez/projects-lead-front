import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import useLoadProjects from "./../hooks/useLoadProjects";
import ProjectsLead from "./../components/ProjectsLead"; 

const Home = () => {	

	const { token, handleLogout } = useContext(UserContext);
	const projects = useLoadProjects();

	console.log(projects);
	
	return (		
		<ProjectsLead projects={projects}/>				
	);  
}

export default Home;
