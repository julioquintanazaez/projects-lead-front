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
	const { token, user, setStateLaborsChange, handleLogout } = useContext(UserContext);
	
	const updateLabor = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_labor/" + id,
			data: {
				labor_type: formik.values.labor_type,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data updated successfuly ");
				setStateLaborsChange("Labor updated successfuly" + Math.random());
				Swal.fire("Labor updated successfuly", "", "success");
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
		if (props.labor.labor_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a labor to update", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		labor_type: Yup.string().trim()
			.required("Labor type is required")
	});
	
	const registerInitialValues = {
		labor_type : props.labor.labor_type
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Updating data...");
			updateLabor(props.labor.labor_id);
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
					Update {props.labor.labor_type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="labor_type">
						<label>Change the type for the labor</label>
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
								Update labor
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