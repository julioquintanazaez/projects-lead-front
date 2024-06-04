import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';

import MaterialsTable from "./../../components/MaterialsTable";

const MaterialsLoad = ( props ) => {

	const {	token, stateMaterialsChange, handleLogout } = useContext(UserContext);	
	const [materials, setMaterials] = useState([]);			
	
	const [ducts, setDucts] = useState([]);			
	const [sensors, setSensors] = useState([]);			
	const [equipments, setEquipments] = useState([]);			
	const [others, setOthers] = useState([]);			
	
	useEffect(() => {
		
		const fetchMaterials = async () =>{
			await axios({
				method: 'get',
				url: '/read_project_materials_project_by_id/' + props.project_id,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setMaterials(response.data);
				}else {	
					setMaterials([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});	
		};						
		
		fetchMaterials();
			
	}, [stateMaterialsChange]);	

	const otherFilter = (list, type ) => {
		const filtered = list.filter(item =>
			item.material_type != null && item.material_type.toLowerCase().includes(type.toLowerCase())
		);
		return filtered;
	}	

	const materials_ducts = otherFilter(materials, "duct");
	const materials_sensors = otherFilter(materials, "sensor");
	const materials_equipments = otherFilter(materials, "equipment");
	const materials_other = otherFilter(materials, "other");		
	
	return(
		<div className="col">
			<>
				<MaterialsTable materials={materials_ducts}/>			
				<MaterialsTable materials={materials_sensors}/>			
				<MaterialsTable materials={materials_equipments}/>			
				<MaterialsTable materials={materials_other}/>
			</>
		</div>
	);
	
}
	
export default MaterialsLoad;
	