import "./TableItems.css";
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

function ItemsTable( props ){
	
	const { token,
			stateProjectsChange, 
			stateLaborsChange, 
			stateMaterialsChange, 
			stateEquipmentsChange, 
			stateTasksChange } = useContext(UserContext);	
	const [material, setMaterial] = useState(0);
	const [task, setTask] = useState(0);
	const [equipment, setEquipment] = useState(0);	
	
	
	useEffect(() => {
		
		const fetchItems = async () =>{
			await axios({
				method: 'get',
				url: '/read_project_items_total_by_project_id/' + props.project_id,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setMaterial(response.data[0].material_amount);
					setTask(response.data[0].task_amount);
					setEquipment(response.data[0].equipment_amount);
				}else {	
					setMaterial(0);
					setTask(0);
					setEquipment(0);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchItems();
		
	}, [stateProjectsChange, 
		stateLaborsChange, 
		stateMaterialsChange, 
		stateEquipmentsChange, 
		stateTasksChange]);
	
	return (	
		<table className="table" responsive="true">
			<thead className="thead">
				<tr>
					<th>Project items</th>	
					<th>Amount($)</th>						
				</tr>				
			</thead>
			<tbody className="tbody">				
				<tr>
					<td>Total Materials</td>						
					<td>{material}</td>					
				</tr>
				<tr>
					<td>Total labor task</td>
					<td>{task}</td>
				</tr>
				<tr>
					<td>Total labor equipment</td>
					<td>{equipment}</td>
				</tr>	
				<tr>
					<td style={{ textAlign: "right"}}>Proposal</td>
					<td style={{ textAlign: "left" }}>{material + task + equipment}</td>
				</tr>	
			</tbody>
		</table>  
	)
}

export default ItemsTable;