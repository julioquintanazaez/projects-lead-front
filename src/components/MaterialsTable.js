import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './TablesGeneric.css'
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import MaterialDelete from "./../utils/materials/MaterialDelete.js";
import UpdateMaterialModal from "./../utils/materials/UpdateMaterialModal.js";

const MaterialsTable = ( props ) => {

	const {	token } = useContext(UserContext);	
		
	const getTotal = ( list ) => {
		let total = 0;
		for (var i = 0; i < list.length; i++) {
			total += list[i].material_amount;
		}		
		return total;
	}
	
	const renderTableData = () => {
		
		return props.materials?.map((material, index) => (
				<tr className="row-md" key={material.material_id}>
					<th scope="row">{index + 1}</th>
					<td>{material.material_name}</td>
					<td>{material.material_quantity}</td>
					<td>{material.material_price}</td>
					<td>{material.material_amount}</td>		
					<td>
						<MaterialDelete material={material} />
						<UpdateMaterialModal material={material} />
					</td>	
				</tr>					
			));
		}

	return (
		<div className="col">   
		{props.materials.length > 0 && (
            <table className="table table-striped table-bordered" responsive="true">
				<thead className="table-light">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Name</th>		
						<th scope="col">Quantity</th>			
						<th scope="col">Price</th>						
						<th scope="col">Amount</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
					<tr>
						<td colSpan="4" style={{ textAlign: "right"}}>Total Amount</td>
						<td colSpan="2" style={{ textAlign: "left" }}>
						{getTotal(props.materials)}
						</td>
					</tr>
				</tbody>
			</table> 
		)}
        </div>
	);  
}

export default MaterialsTable;