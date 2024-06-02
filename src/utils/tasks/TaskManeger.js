import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';


import TasksTable from "./../../components/TasksTable";
import CreateTaskModal from "./../../utils/tasks/CreateTaskModal";

export default function TaskManeger( props ) {
	
	const { token, 
			user, 
			stateProjectsChange, 
			stateLaborsChange, 
			stateTasksChange, 
			handleLogout } = useContext(UserContext);	
	const [tasks, setTasks] = useState([]);	
	
	useEffect(() => {
		
		const fetchLaborTasks = async () =>{
			await axios({
				method: 'get',
				url: '/read_tasks_by_labor_id/' + props.labor_id,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setTasks(response.data);
				}else {	
					setTasks([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchLaborTasks();
		
	}, [stateProjectsChange, stateLaborsChange, stateTasksChange]);
	
	return (
		<>
			<div className="col">
				<CreateTaskModal labor_id={props.labor_id} />
			</div>
			<div className="col">
			{(tasks.length > 0) ? (				
				<div className="col">							
					< TasksTable tasks={tasks}/>					
				</div>				
			) : (
				<span className="badge bg-info">there are not tasks to show </span>
			)}
			</div>
		</>
	);
	
}