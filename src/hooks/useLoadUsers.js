import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "./../context/UserContext";
import axios from 'axios'; 

export default function useLoadUsers(){
	
	const {token, stateUsersChange, handleLogout} = useContext(UserContext);
	const [users, setUsers] = useState([]);	
	
	useEffect(() => {
		
		const fetchUsers = async () =>{
			await axios({
				method: 'get',
				url: '/read_users/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setUsers(response.data);
				}else {	
					setUsers([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchUsers();
		
	}, [stateUsersChange]);
	
	return users;
};