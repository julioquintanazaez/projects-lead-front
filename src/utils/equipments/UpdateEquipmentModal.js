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
	const { token, user, setStateEquipmentsChange, handleLogout } = useContext(UserContext);
	
	const updateEquipment = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_equipment/" + id,
			data: {
				equipment_name : formik.values.equipment_name,
				equipment_quantity : formik.values.equipment_quantity,
				equipment_unit_price : formik.values.equipment_unit_price	
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment data updated successfuly ");
				setStateEquipmentsChange("Equipment updated successfuly" + Math.random());
				Swal.fire("Equipment updated successfuly", "", "success");
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
		if (props.equipment.equipment_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a equipment to update", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		equipment_name: Yup.string().trim()
			.required("Equipment name is required"),
		equipment_quantity: Yup.number().positive()
			.required("Equipment quantity is required"),
		equipment_unit_price: Yup.number().positive()
			.required("Equipment unit price is required"),
	});
	
	const registerInitialValues = {
		equipment_name : props.equipment.equipment_name,
		equipment_quantity : props.equipment.equipment_quantity,
		equipment_unit_price: props.equipment.equipment_unit_price
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Updating data...");
			updateEquipment(props.equipment.equipment_id);
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
					Update 
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="equipment_name">
						<label>Enter a name for the equipment</label>
						<input
						  type="text"
						  name="equipment_name"
						  value={formik.values.equipment_name}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.equipment_name && formik.touched.equipment_name
										? "is-invalid" : "" )}
						  placeholder="Enter a name here"
						/>					
						<div>{(formik.errors.equipment_name) ? <p style={{color: 'red'}}>{formik.errors.equipment_name}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="equipment_quantity">
						<label>Enter the quantity for the equipment</label>
						<input
						  type="number"
						  name="equipment_quantity"
						  value={formik.values.equipment_quantity}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.equipment_quantity && formik.touched.equipment_quantity
										? "is-invalid" : "" )}
						  placeholder="Enter a number of mechanicals for the work here"
						/>					
						<div>{(formik.errors.equipment_quantity) ? <p style={{color: 'red'}}>{formik.errors.equipment_quantity}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="equipment_unit_price">
						<label>Enter the unit price required for the equipment</label>
						<input
						  type="number"
						  name="equipment_unit_price"
						  value={formik.values.equipment_unit_price}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.equipment_unit_price && formik.touched.equipment_unit_price
										? "is-invalid" : "" )}
						  placeholder="Enter a unit price here"
						/>					
						<div>{(formik.errors.equipment_unit_price) ? <p style={{color: 'red'}}>{formik.errors.equipment_unit_price}</p> : null}</div>
					</div>	
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Update equipment
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