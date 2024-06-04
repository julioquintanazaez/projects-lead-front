import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ItemsTable from "./../../components/ItemsTable.js";
import MaterialsLoad from "./../../utils/materials/MaterialsLoad.js";
import CreateMaterialModal from "./../../utils/materials/CreateMaterialModal.js";
import LaborManeger from "./../../utils/labors/LaborManeger.js";
import CreateLaborModal from "./../../utils/labors/CreateLaborModal.js";

export default function ProjectItemsModal ( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, handleLogout } = useContext(UserContext);	
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.project_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a project to show", "", "error");
		}
	}
	
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Detail 
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Project stuff
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<>
					<ItemsTable project_id={props.project_id}/>		
					
					<CreateMaterialModal project_id={props.project_id}/>
					
					<MaterialsLoad project_id={props.project_id}/>	
					
					<CreateLaborModal project_id={props.project_id}/>

					<LaborManeger project_id={props.project_id}/>
				</>	
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Close
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}