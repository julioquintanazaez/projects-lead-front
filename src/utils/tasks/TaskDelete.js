import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

const TaskDelete = ( props ) => {
	
	const { token, setStateTasksChange, handleLogout } = useContext(UserContext);	
	
	const deleteTask = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_task/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task Successfuly deleted");		
				setStateTasksChange("Task deleted successfully" + Math.random());
				Swal.fire("Task deleted successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.task.task_id != null){
			deleteTask(props.task.task_id);
		}else{
			Swal.fire("Select a task to delete", "", "success");	
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

export default TaskDelete;