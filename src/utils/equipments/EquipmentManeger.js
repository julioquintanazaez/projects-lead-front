import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';


import EquipmentsTable from "./../../components/EquipmentsTable";
import CreateEquipmentModal from "./../../utils/equipments/CreateEquipmentModal";

export default function EquipmentManeger( props ) {
	
	const { token, 
			user, 
			stateProjectsChange, 
			stateLaborsChange, 
			stateEquipmentsChange, 
			handleLogout } = useContext(UserContext);	
	const [equipments, setEquipments] = useState([]);	
	
	useEffect(() => {
		
		const fetchLaborEquipments = async () =>{
			await axios({
				method: 'get',
				url: '/read_equipments_by_labor_id/' + props.labor_id,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setEquipments(response.data);
				}else {	
					setEquipments([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchLaborEquipments();
		
	}, [stateProjectsChange, stateLaborsChange, stateEquipmentsChange]);
	
	return (
		<>
			<div className="col">
				<CreateEquipmentModal labor_id={props.labor_id} />
			</div>
			<div className="col">
			{(equipments.length > 0) ? (				
				<div className="col">							
					< EquipmentsTable equipments={equipments}/>					
				</div>				
			) : (
				<span className="badge bg-info">there are not equipments to show </span>
			)}
			</div>
		</>
	);
	
}