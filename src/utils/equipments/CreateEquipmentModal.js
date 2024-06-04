import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CreateEquipmentModal( props ) {
	
	const { token, user, setStateEquipmentsChange, handleLogout } = useContext(UserContext);
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const createEquipment = async () => {
		
		await axios({
			method: 'post',
			url: "/create_equipment/",
			data: {
				equipment_name : formik.values.equipment_name,
				equipment_quantity : formik.values.equipment_quantity,
				equipment_unit_price : formik.values.equipment_unit_price,
				labor_equipment_id : props.labor_id 
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment added successfuly");	
				setStateEquipmentsChange("Equipment added successfuly" + Math.random());
				Swal.fire("Equipment created successfuly", "", "success");
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
		if (props.labor_id != null){	
			setShow(true);  
		}else{
			Swal.fire("Select a labor to host the equipment", "", "error");
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
		equipment_name : "",
		equipment_quantity : 1,
		equipment_unit_price: 1
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Saving data...");
			createEquipment();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			New equipment 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Create a new equipment
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