import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

const ProjectDelete = ( props ) => {
	
	const { token, setStateProjectsChange, handleLogout } = useContext(UserContext);	
	
	const deleteProject = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_project/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project Successfuly deleted");		
				setStateProjectsChange("Project deleted successfully" + Math.random());
				Swal.fire("Project deleted successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.project.project_id != null){
			deleteProject(props.project.project_id);
		}else{
			Swal.fire("Select a project to delete", "", "success");	
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete
			</button>
		</>
	);
}

export default ProjectDelete;