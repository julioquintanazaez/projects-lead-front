import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './TablesGeneric.css'
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import UpdateEquipmentModal from "./../utils/equipments/UpdateEquipmentModal";
import EquipmentDelete from "./../utils/equipments/EquipmentDelete";

const EquipmentsTable = ( props ) => {

	const {	token } = useContext(UserContext);	
		
	const getTotal = ( list ) => {
		let total_amount = 0;
		for (var i = 0; i < list.length; i++) {
			total_amount += list[i].equipment_amount;
		}		
		return total_amount;
	}
	
	const renderTableData = () => {
		
		return props.equipments?.map((equipment, index) => (
				<tr className="row-md" key={equipment.equipment_id}>
					<th scope="row">{index + 1}</th>
					<td>{equipment.equipment_name}</td>	
					<td>{equipment.equipment_quantity}</td>	
					<td>{equipment.equipment_unit_price}</td>	
					<td>{equipment.equipment_amount}</td>	
					<td>
						<EquipmentDelete equipment={equipment}/>
						<UpdateEquipmentModal equipment={equipment}/>
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
						<th scope="col">Name</th>		
						<th scope="col">Quantity</th>			
						<th scope="col">Unit price</th>						
						<th scope="col">Amount</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}					
					<tr>
						<td colSpan="4" style={{ textAlign: "right"}}>Total Amount</td>
						<td colSpan="2" style={{ textAlign: "left" }}>
						{getTotal(props.equipments)}
						</td>						
					</tr>					
				</tbody>
			</table>  
        </div>
	);  
}

export default EquipmentsTable;