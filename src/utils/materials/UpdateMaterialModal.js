import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function UpdateMaterialModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setStateMaterialsChange, handleLogout } = useContext(UserContext);
	
	const updateMaterial = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_material/" + id,
			data: {
				material_name: formik.values.material_name,
				material_quantity: formik.values.material_quantity,
				material_price: formik.values.material_price,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material data updated successfuly ");
				setStateMaterialsChange("Material updated successfuly" + Math.random());
				Swal.fire("Material update sucessfuly", "", "success");
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
		if (props.material.material_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a material to update", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({	
		material_name: Yup.string().trim()
			.required("Material name is required"),
		material_quantity: Yup.number().positive()
			.required("Material quantity is required"),
		material_price: Yup.number().positive()
			.required("Material price is required"),
	});
	
	const registerInitialValues = {
		material_name : props.material.material_name,
		material_quantity : props.material.material_quantity,
		material_price : props.material.material_price
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Updating data...");
			updateMaterial(props.material.material_id);
			formik.resetForm();
			setShow(false);
		},
		validationSchema: validationRules
	});
	
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Update {props.material.material_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="material_name">
						<label>Change the quantity for the material</label>
						<input
						  type="text"
						  name="material_name"
						  value={formik.values.material_name}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_name && formik.touched.material_name
										? "is-invalid" : "" )}
						  placeholder="Enter a name here"
						/>					
						<div>{(formik.errors.material_name) ? <p style={{color: 'red'}}>{formik.errors.material_name}</p> : null}</div>
					</div>
					<div className="form-group mt-3" id="material_quantity">
						<label>Change the quantity for the material</label>
						<input
						  type="number"
						  name="material_quantity"
						  value={formik.values.material_quantity}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_quantity && formik.touched.material_quantity
										? "is-invalid" : "" )}
						  placeholder="Enter a quantity here"
						/>					
						<div>{(formik.errors.material_quantity) ? <p style={{color: 'red'}}>{formik.errors.material_quantity}</p> : null}</div>
					</div>
					<div className="form-group mt-3" id="material_price">
						<label>Change the price for the task</label>
						<input
						  type="number"
						  name="material_price"
						  value={formik.values.material_price}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_price && formik.touched.material_price
										? "is-invalid" : "" )}
						  placeholder="Enter a price here"
						/>					
						<div>{(formik.errors.material_price) ? <p style={{color: 'red'}}>{formik.errors.material_price}</p> : null}</div>
					</div>
									
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Update material
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