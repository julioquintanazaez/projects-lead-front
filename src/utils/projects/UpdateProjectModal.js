import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function UpdateProjectModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setStateProjectsChange, handleLogout } = useContext(UserContext);
	
	const project_type_options = [
						{ value: "Documental", label: "Documental" },
						{ value: "Reconstruction", label: "Reconstruction" },
						{ value: "Demolition", label: "Demolition" },
						{ value: "Mixed", label: "Mixed" }
					];	
					
	const updateProject = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_project/" + id,
			data: {
				project_name: formik.values.project_name,
				project_type: formik.values.project_type,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data updated successfuly ");
				setStateProjectsChange("Project updated successfuly" + Math.random());
				Swal.fire("Project updated successfuly", "", "success");
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
		if (props.project.project_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a project to update", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		project_name: Yup.string().trim()
			.required("Name is required"),
		project_type: Yup.string().trim()
			.required("Project type is required"),
	});
	
	const registerInitialValues = {
		project_name : props.project.project_name,
		project_type : props.project.project_type
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Updating data...");
			updateProject(props.project.project_id);
			formik.resetForm();
			setShow(false);
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
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Update 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Update {props.project.project_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="project_name">
						<label>Change the name for the project</label>
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
						<label>Select a different type for the project</label>
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
								Update project
						</button>					
					</div>		
				</form>
			
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