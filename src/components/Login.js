import "./Login.css";
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () =>{
	
	const {token, setToken} = useContext(UserContext);
	const [sending, setSending] = useState(false);
	
	const autenticar_usuario = async () =>{
		
		const form_data = new FormData();
		form_data.append("username",  formik.values.username);
		form_data.append("password", formik.values.password);	
		
		await axios({
			method: 'post',
			url: '/token/',  
			header: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: form_data,			
		}).then(response => {
			if (response.status === 200) {						
				setToken(response.data.access_token);
				console.log(window.localStorage.getItem("hidro-application-v1.0"));
				setSending(false);
			}
			else{
				window.localStorage.removeItem("hidro-application-v1.0");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Access denied!", error.response.data.detail, "error");
			window.localStorage.removeItem("hidro-application-v1.0");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		username: Yup.string().trim()	
			.min(5, "Password must be 3 characters at minimum")
			.max(15, "Password must be 15 characters at maximum")
			.required("Username is required"),
		password: Yup.string()
			.min(5, "Password must be 3 characters at minimum")
			.required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
					'Password must contains at least 5 characters, 1 uppercase, 1 lowercase, 1 especial character, y 1 number'),
	});
	
	const registerInitialValues = {
		username: '',
		password: ''
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Sending datas...");
			autenticar_usuario();
			formik.resetForm();
			setSending(true);
		},
		validationSchema: validationRules,
	});
	
	return (
		<>
		{!token && (
			<>
				<div className="Auth-form-container">
					<form className="Auth-form" onSubmit={formik.handleSubmit}>
						<div className="Auth-form-content">				
							<h1 className="text-sigin text-center">Sing-in</h1>
							<label className="label">Username</label>
							<div className="form-group mt-3">
								<input
								  type="text"
								  name="username"
								  value={formik.values.username}
								  onChange={formik.handleChange}
								  onBlur={formik.handleBlur}
								  className={"form-control mt-1" + 
												(formik.errors.username && formik.touched.username
												? "is-invalid" : "" )}
								  placeholder="Enter a valid username"
								/>
								<div>{(formik.errors.username) ? <p style={{color: 'red'}}>{formik.errors.username}</p> : null}</div>
							</div>							
							<label className="label">Password</label>
							<div className="form-group">
								<input
								  type="password"
								  name="password"
								  value={formik.values.password}
								  onChange={formik.handleChange}
								  onBlur={formik.handleBlur}
								  className={"form-control mt-1" + 
												(formik.errors.password && formik.touched.password
												? "is-invalid" : "" )}
								  placeholder="Enter a valid password"
								/>
								<div>{(formik.errors.password) ? <p style={{color: 'red'}}>{formik.errors.password}</p> : null}</div>
							</div>							
							<br/>
							<button className="btn btn-success" 
									type="submit" 
									disabled={sending}>
								{!sending ? "Enter" : "Waitng"}
							</button>
						</div>
					</form>		
				</div>				
			</>
		)}	
		</>
	);
};

export default Login;
