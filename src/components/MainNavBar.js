import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Logout from "./Logout";
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router";

import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

const MainNavBar = ( props ) => {
	
	const { token, currentuser, roles } = useContext(UserContext);	
	
	return (
		<>	
			{token && (					
				<div className="container-fluid-md">	
					<div className="columns m-5 is-two-thirds"><br/>	
						<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="warning">
							<Container>
								<Navbar.Brand href="#home">
									Projects
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<LinkContainer to="/">
											<Nav.Link>Home</Nav.Link>
										</LinkContainer>
										{roles.includes("admin") && (
										<LinkContainer to="/users">
											<Nav.Link>Users</Nav.Link>
										</LinkContainer>
										)}
									</Nav>
									<Logout />
								</Navbar.Collapse>
							</Container>
						</Navbar>						
					</div>				
				</div>	
			)}
		</>		
	);
};

export default MainNavBar;