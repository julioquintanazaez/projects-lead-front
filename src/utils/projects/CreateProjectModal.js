import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import useLoadUsers from "./../../hooks/useLoadUsers";
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CreateProjectModal( props ) {
	
	const { token, user, setStateProjectsChange, handleLogout } = useContext(UserContext);
	const users = useLoadUsers();
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const project_type_options = [
						{ value: "Documental", label: "Documental" },
						{ value: "Reconstruction", label: "Reconstruction" },
						{ value: "Demolition", label: "Demolition" },
						{ value: "Mixed", label: "Mixed" }
					];	
							
	const createProject = async () => {
		
		await axios({
			method: 'post',
			url: "/create_project/",
			data: {
				project_name: formik.values.project_name,
				project_type: formik.values.project_type,
				user_project_id: formik.values.user_project_id					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project added successfuly");	
				setStateProjectsChange("Project added successfuly" + Math.random());
				Swal.fire("Project created successfuly", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		setShow(true);  
	}
	
	const validationRules = Yup.object().shape({		
		project_name: Yup.string().trim()
			.required("Name is required"),
		project_type: Yup.string().trim()
			.required("Project type is required"),
		user_project_id: Yup.string().trim()
			.required("Maneger specification is required")	
	});
	
	const registerInitialValues = {
		project_name : "",
		project_type : project_type_options[0]["value"],  
		user_project_id : ""
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Saving data...");
			createProject();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	const RenderOptions = (listValues) => {
		return (
			listValues.map(item => 
				<option value={item.value} label={item.label}>{item.value}</option>
			) 
		)
	};
	
	const RenderUsers = () => {
		return (
			users.map(item => 
				<option value={item.user_id} label={item.full_name}>{item.full_name}</option>
			) 
		)
	};
	
	return (
		<>
		<button className="add-button" onClick={handleShow}>
			New project 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Create a new project
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="user_project_id">
						<label>Select maneger to the project</label>
						<select
						  type="text"
						  name="user_project_id"
						  value={formik.values.user_project_id}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.user_project_id && formik.touched.user_project_id
										? "is-invalid" : "" )
									}>
							<option value="" label="Select a maneger">Seleccione una opcion</option>	
							{RenderUsers()}					
						</select>
						<div>{(formik.errors.user_project_id) ? <p style={{color: 'red'}}>{formik.errors.user_project_id}</p> : null}</div>
					</div>	
					<div className="form-group mt-3" id="project_name">
						<label>Enter a name for the project</label>
						<input
						  type="text"
						  name="project_name"
						  value={formik.values.project_name}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.project_name && formik.touched.project_name
										? "is-invalid" : "" )}
						  placeholder="Enter a name here"
						/>					
						<div>{(formik.errors.project_name) ? <p style={{color: 'red'}}>{formik.errors.project_name}</p> : null}</div>
					</div>
					<div className="form-group mt-3" id="project_type">
						<label>Select a type for the project</label>
						<select
						  type="text"
						  name="project_type"
						  value={formik.values.project_type}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.project_type && formik.touched.project_type
										? "is-invalid" : "" )
									}>
							<option value="" label="Select an option">Seleccione una opcion</option>	
							{RenderOptions(project_type_options)} 
						</select>
						<div>{(formik.errors.project_type) ? <p style={{color: 'red'}}>{formik.errors.project_type}</p> : null}</div>
					</div>	
					
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Save data
						</button>					
					</div>		
				</form>
			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}