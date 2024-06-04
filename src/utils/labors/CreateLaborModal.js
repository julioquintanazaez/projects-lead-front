import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CreateLaborModal( props ) {
	
	const { token, user, setStateLaborsChange, handleLogout } = useContext(UserContext);
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const createLabor = async () => {
		
		await axios({
			method: 'post',
			url: "/create_labor/",
			data: {
				labor_type: formik.values.labor_type,
				project_labor_id: props.project_id					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor added successfuly");	
				setStateLaborsChange("Labor added successfuly" + Math.random());
				Swal.fire("Labor created successfuly", "", "success");
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
		if (props.project_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a project to host the labor", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		labor_type: Yup.string().trim()
			.required("Labor type is required")
	});
	
	const registerInitialValues = {
		labor_type : ""
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Saving data...");
			createLabor();
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
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			New labor 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Create a new labor
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="labor_type">
						<label>Enter a type for the labor</label>
						<input
						  type="text"
						  name="labor_type"
						  value={formik.values.labor_type}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.labor_type && formik.touched.labor_type
										? "is-invalid" : "" )}
						  placeholder="Enter a type here"
						/>					
						<div>{(formik.errors.labor_type) ? <p style={{color: 'red'}}>{formik.errors.labor_type}</p> : null}</div>
					</div>					
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Save data
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