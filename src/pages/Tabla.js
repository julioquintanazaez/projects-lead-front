import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import ItemsTable from "./../components/ItemsTable.js";
import MaterialsLoad from "./../utils/materials/MaterialsLoad.js";
import CreateMaterialModal from "./../utils/materials/CreateMaterialModal.js";
import LaborManeger from "./../utils/labors/LaborManeger.js";
import CreateLaborModal from "./../utils/labors/CreateLaborModal.js";


const Tabla = ( props ) => {	

	const { token } = useContext(UserContext);
	const project_id = "5231fb5a-ef34-47d2-b153-f42f247a2b31";
	
	
	return (
		<>
			<ItemsTable project_id={project_id}/>		
			
			<CreateMaterialModal project_id={project_id}/>
			
			<MaterialsLoad project_id={project_id}/>	
			
			<CreateLaborModal project_id={project_id}/>

			<LaborManeger project_id={project_id}/>
		</>	
	);
  
}

export default Tabla;
