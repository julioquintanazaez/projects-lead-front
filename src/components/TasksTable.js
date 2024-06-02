import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './TablesGeneric.css'
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import UpdateTaskModal from "./../utils/tasks/UpdateTaskModal";
import TaskDelete from "./../utils/tasks/TaskDelete";

const TasksTable = ( props ) => {

	const {	token } = useContext(UserContext);	
		
	const getTotalHourMens = ( list ) => {
		let total_hour_mens = 0;
		for (var i = 0; i < list.length; i++) {
			total_hour_mens += list[i].task_hour_men;
		}		
		return total_hour_mens;
	}
	
	const getTotalPrice = ( list ) => {
		let total_price = 0;
		for (var i = 0; i < list.length; i++) {
			total_price += list[i].task_price;
		}		
		return total_price;
	}
	
	const renderTableData = () => {
		
		return props.tasks?.map((task, index) => (
				<tr className="row-md" key={task.task_id}>
					<th scope="row">{index + 1}</th>
					<td>{task.task_description}</td>	
					<td>{task.task_mechanicals}</td>	
					<td>{task.task_hour}</td>	
					<td>{task.task_price}</td>
					<td>{task.task_hour_men}</td>					
					<td>
						<TaskDelete task={task}/>
						<UpdateTaskModal task={task}/>
					</td>	
				</tr>					
			));
		}

	return (
		<div className="col">            	
            <table className="table table-striped table-bordered" responsive="true">
				<thead className="table-light">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Description</th>		
						<th scope="col">Mechanicals</th>			
						<th scope="col">Hour</th>						
						<th scope="col">Price</th>
						<th scope="col">Hour/Mens($)</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}					
					<tr>
						<td colSpan="4" style={{ textAlign: "right"}}>Total Amount</td>
						<td colSpan="1" style={{ textAlign: "left" }}>
						{getTotalPrice(props.tasks)}
						</td>
						<td colSpan="2" style={{ textAlign: "left" }}>
						{getTotalHourMens(props.tasks)}
						</td>
					</tr>					
				</tbody>
			</table>  
        </div>
	);  
}

export default TasksTable;