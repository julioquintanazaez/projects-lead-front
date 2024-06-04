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


export default function CreateMaterialModal( props ) {
	
	const { token, user, setStateMaterialsChange, handleLogout } = useContext(UserContext);
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const material_type_options = [
						{ value: "Ducts", label: "Ducts" },
						{ value: "Sensors and accesories", label: "Sensors and accesories" },
						{ value: "Equipments", label: "Equipments" },
						{ value: "Other materials", label: "Other materials" }
					];	
							
	const createMaterial = async () => {
		
		await axios({
			method: 'post',
			url: "/create_material/",
			data: {
				material_name: formik.values.material_name,
				material_type: formik.values.material_type,	
				material_quantity: formik.values.material_quantity,
				material_price: formik.values.material_price,		
				project_material_id: props.project_id,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material added successfuly");	
				setStateMaterialsChange("Material added successfuly" + Math.random());
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
		setShow(true);  
	}
	
	const validationRules = Yup.object().shape({		
		material_name: Yup.string().trim()
			.required("Name for material is required"),
		material_type: Yup.string().trim()
			.required("Material type is required"),
		material_quantity: Yup.number().positive()
			.required("Quantity is required"),
		material_price: Yup.number()
			.required("Price is required")
	});
	
	const registerInitialValues = {
		material_name : "",
		material_type : material_type_options[0]["value"],  
		material_quantity : 0,
		material_price : 0.0
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Saving data...");
			createMaterial();
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
			New material 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Create a new material
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="material_name">
						<label>Enter a name for the material</label>
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
					<div className="form-group mt-3" id="material_type">
						<label>Select a type for the material</label>
						<select
						  type="text"
						  name="material_type"
						  value={formik.values.material_type}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_type && formik.touched.material_type
										? "is-invalid" : "" )
									}>
							<option value="" label="Select an option">Seleccione una opcion</option>	
							{RenderOptions(material_type_options)} 
						</select>
						<div>{(formik.errors.material_type) ? <p style={{color: 'red'}}>{formik.errors.material_type}</p> : null}</div>
					</div>	
					<div className="form-group mt-3" id="material_quantity">
						<label>Enter the quantity for the material</label>
						<input
						  type="number"
						  name="material_quantity"
						  value={formik.values.material_quantity}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_quantity && formik.touched.material_quantity
										? "is-invalid" : "" )}
						  placeholder="Enter the quantity"
						/>					
						<div>{(formik.errors.material_quantity) ? <p style={{color: 'red'}}>{formik.errors.material_quantity}</p> : null}</div>
					</div>
					<div className="form-group mt-3" id="material_price">
						<label>Enter the price for the material</label>
						<input
						  type="number"
						  name="material_price"
						  value={formik.values.material_price}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.material_price && formik.touched.material_price
										? "is-invalid" : "" )}
						  placeholder="Enter the price"
						/>					
						<div>{(formik.errors.material_price) ? <p style={{color: 'red'}}>{formik.errors.material_price}</p> : null}</div>
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