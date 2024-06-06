import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CreateTaskModal( props ) {
	
	const { token, user, setStateTasksChange, handleLogout } = useContext(UserContext);
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const createTask = async () => {
		
		await axios({
			method: 'post',
			url: "/create_task/",
			data: {
				task_description : formik.values.task_description,
				task_mechanicals : formik.values.task_mechanicals,
				task_hour : formik.values.task_hour,
				task_price : formik.values.task_price,
				labor_task_id : props.labor_id 				
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task added successfuly");	
				setStateTasksChange("Task added successfuly" + Math.random());
				Swal.fire("Task created successfuly", "", "success");
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
			Swal.fire("Select a labor to host the tasks", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		task_description: Yup.string().trim()
			.required("Task description is required"),
		task_mechanicals: Yup.number().positive()
			.required("Task number of mechanicals is required"),
		task_hour: Yup.number().positive()
			.required("Task number of hours is required"),
		task_price: Yup.number().positive()
			.required("Task price is required")
	});
	
	const registerInitialValues = {
		task_description : "",
		task_mechanicals : 1,
		task_hour: 1,
		task_price : 0.0		
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Saving data...");
			createTask();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			New task 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Create a new task
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="task_description">
						<label>Enter a description for the task</label>
						<input
						  type="text"
						  name="task_description"
						  value={formik.values.task_description}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.task_description && formik.touched.task_description
										? "is-invalid" : "" )}
						  placeholder="Enter a description here"
						/>					
						<div>{(formik.errors.task_description) ? <p style={{color: 'red'}}>{formik.errors.task_description}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="task_mechanicals">
						<label>Enter the number of mechanicals for the task</label>
						<input
						  type="number"
						  name="task_mechanicals"
						  value={formik.values.task_mechanicals}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.task_mechanicals && formik.touched.task_mechanicals
										? "is-invalid" : "" )}
						  placeholder="Enter a number of mechanicals for the work here"
						/>					
						<div>{(formik.errors.task_mechanicals) ? <p style={{color: 'red'}}>{formik.errors.task_mechanicals}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="task_hour">
						<label>Enter the number of hours required for the task</label>
						<input
						  type="number"
						  name="task_hour"
						  value={formik.values.task_hour}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.task_hour && formik.touched.task_hour
										? "is-invalid" : "" )}
						  placeholder="Enter a number of hours here"
						/>					
						<div>{(formik.errors.task_hour) ? <p style={{color: 'red'}}>{formik.errors.task_hour}</p> : null}</div>
					</div>	
					<div className="form-group mt-3" id="task_price">
						<label>Enter the price required for the task</label>
						<input
						  type="number"
						  name="task_price"
						  value={formik.values.task_price}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.task_price && formik.touched.task_price
										? "is-invalid" : "" )}
						  placeholder="Enter a price here"
						/>					
						<div>{(formik.errors.task_price) ? <p style={{color: 'red'}}>{formik.errors.task_price}</p> : null}</div>
					</div>	
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Create task
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