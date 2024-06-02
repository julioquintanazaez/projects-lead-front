import React, { useContext } from 'react';

import { UserContext } from "../context/UserContext";

const Logout = () => {
	
	const {token, handleLogout} = useContext(UserContext); 
	
	return (
		<>		
			{token && (				
				<a className="button is-danger" onClick={handleLogout}>
					Salir
				</a>
			)}	
		</>
	);
};

export default Logout;