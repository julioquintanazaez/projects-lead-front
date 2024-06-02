import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

const EquipmentDelete = ( props ) => {
	
	const { token, setStateEquipmentsChange, handleLogout } = useContext(UserContext);	
	
	const deleteEquipment = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_equipment/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment Successfuly deleted");		
				setStateEquipmentsChange("Equipment deleted successfully" + Math.random());
				Swal.fire("Equipment deleted successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.equipment.equipment_id != null){
			deleteEquipment(props.equipment.equipment_id);
		}else{
			Swal.fire("Select a equipment to delete", "", "success");	
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="delete-button"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete
			</button>
		</>
	);
}

export default EquipmentDelete;