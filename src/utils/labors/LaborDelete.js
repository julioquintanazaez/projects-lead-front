import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

const LaborDelete = ( props ) => {
	
	const { token, setStateLaborsChange, handleLogout } = useContext(UserContext);	
	
	const deleteLabor = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_labor/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor Successfuly deleted");		
				setStateLaborsChange("Labor deleted successfully" + Math.random());
				Swal.fire("Labor deleted successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.labor.labor_id != null){
			deleteLabor(props.labor.labor_id);
		}else{
			Swal.fire("Select a labor to delete", "", "success");	
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

export default LaborDelete;