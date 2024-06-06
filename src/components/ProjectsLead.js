import "./Pagination.css";
import './ProjectsLeads.css'
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';

import CreateProjectModal from "./../utils/projects/CreateProjectModal";
import UpdateProjectModal from "./../utils/projects/UpdateProjectModal";
import ProjectDelete from "./../utils/projects/ProjectDelete";
import Pagination from "./Pagination";
import ProjectItemsModal from "./../utils/projects/ProjectItemsModal";

function ProjectsLead( props ){
	
	const { token, currentuser, roles } = useContext(UserContext);
	const [projects, setProjects] = useState(props.projects);
	const [search, setSearch] = useState(props.projects);
	const [query, setQuery] = useState("");
	const [filteredProjects, setFilteredProjects] = useState([]);
	
	//Stuff for pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPge, setItemsPerPage] = useState(10);
	
	useEffect(() => {
		const filtered = props.projects.filter(item => {
			const name = item.project_name.toLowerCase();
			const type = item.project_type.toLowerCase();
			return name.includes(query.toLowerCase()) || type.includes(query.toLowerCase());
		});
		setFilteredProjects(filtered);
	}, [query]);
	
	const getTotal = ( list ) => {
		let total = 0;
		for (var i = 0; i < list.length; i++) {
			total += list[i].project_amount;
		}		
		return total;
	}
	
	const renderButones = ( project ) => {
		return (
			<td>
				< ProjectDelete project={project} />
				< UpdateProjectModal project={project} />
				< ProjectItemsModal project_id={project.project_id}/>
			</td>
		)
	};
	
	const renderProjects = ( projects_list ) => {		
		return projects_list.map((project, index) => (
				<li key={index}>
					<span className="text"> {project.project_name} </span>
					<span className="text"> {project.project_type} </span>
					<span className="text"> ${project.project_amount} </span>
					{renderButones(project)}
				</li>			
			)
		)		
	};		
	
	const indexOfLastItem = currentPage * itemsPerPge;
	const indexOfFirstItem = indexOfLastItem - itemsPerPge;
	const currentItems = props.projects.slice(indexOfFirstItem, indexOfLastItem);
	const currentFilteredItems = filteredProjects.length > 0 ? filteredProjects.slice(indexOfFirstItem, indexOfLastItem) : [];

	const handlePagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	}
	
	return (
		<>
		{token && (	
			<div className="projects-list">		
				<h1>Projects in process</h1>			
				<div className="col">
					<input
						type="search"
						placeholder="Search..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						disabled={!props.projects.length ? true : false}
						className="text"
					/>	
					< CreateProjectModal />
				</div>		
				<br/>
				<ol>
				{filteredProjects.length > 0 ? (
					renderProjects( currentFilteredItems )					
				) : (
					renderProjects( currentItems )					
				)}
				</ol>
				<ol>
					<li className="li-total-project">
						<h4>Total amount: {getTotal( currentFilteredItems.length > 0 ? currentFilteredItems : props.projects )} </h4> 				
					</li>
				</ol>
				<div className='container-pagination'>
				{filteredProjects.length > 0 ? (				
					<Pagination length={filteredProjects.length} postsPerPage={itemsPerPge} handlePagination={handlePagination} currentPage={currentPage} />
				) : (
					<Pagination length={props.projects.length} postsPerPage={itemsPerPge} handlePagination={handlePagination} currentPage={currentPage} />
				)}
				</div>
			</div>
		)}
		</>
	);	
}

export default ProjectsLead;