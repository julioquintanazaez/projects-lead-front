import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import LaborDelete from "./LaborDelete";
import UpdateLaborModal from "./UpdateLaborModal";
import TaskManeger from "./../tasks/TaskManeger";
import EquipmentManeger from "./../equipments/EquipmentManeger";

export default function LaborManeger( props ) {
	
	const { token, user, stateProjectsChange, stateLaborsChange, handleLogout } = useContext(UserContext);	
	const [projectslabors, setProjectsLabors] = useState([]);	
	
	useEffect(() => {
		
		const fetchProjectsLabor = async () =>{
			await axios({
				method: 'get',
				url: '/read_labors_by_project_id/' + props.project_id,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setProjectsLabors(response.data);
				}else {	
					setProjectsLabors([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchProjectsLabor();
		
	}, [stateProjectsChange, stateLaborsChange]);
	
	
	return (
		<>
			<div className="col">
				<div className="accordion" id="accordionExample">
				{(projectslabors.length > 0) ? (				
					projectslabors.map((labor, index) => (						
						<div className="accordion-item">
							<h2 className="accordion-header">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
									{labor.labor_type}
								</button>
							</h2>
							<div id={"collapse" + index} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
								<div className="accordion-body">
									<div className="col" key={labor.labor_id}>
										<div className="col">
											< LaborDelete labor={labor} />
											< UpdateLaborModal labor={labor} />
										</div>
										<div className="col">							
											<TaskManeger labor_id={labor.labor_id}/>
										</div>
										<div className="col">
											<EquipmentManeger labor_id={labor.labor_id}/>
										</div>
									</div>
								</div>
							</div>
						</div>						
					))					
				) : (
					<span className="badge bg-info">there are not labors to show </span>
				)}
				</div>
			</div>
		</>
	);
	
}