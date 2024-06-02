import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

const MaterialDelete = ( props ) => {
	
	const { token, setStateMaterialsChange, handleLogout } = useContext(UserContext);	
	
	const deleteMaterial = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_material/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material Successfuly deleted");		
				setStateMaterialsChange("Material deleted successfully" + Math.random());
				Swal.fire("Material deleted successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.material.material_id != null){
			deleteMaterial(props.material.material_id);
		}else{
			Swal.fire("Select a material to delete", "", "error");	
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-success"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete
			</button>
		</>
	);
}

export default MaterialDelete;