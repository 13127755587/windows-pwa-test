import React, { useState } from 'react';
import { Table, Button, ButtonGroup, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios'; // axios is a http request module

export default function UsersTable() {
	let url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/users' : "https://windows-pwa-express.azurewebsites.net/api/users"

	const [users, setUsers] = React.useState([]);
	// modify button modal
	const [show, setShow] = React.useState({
		show: false,
		activeModal: null
	});
	const handleShow = (e, index) => setShow({
		show: true,
		activeModal: index,
	});
	const handleClose = () => setShow({
		show: false,
		activeModal: null,
	});

	// use react hook to fetch all the user data from Express API
	React.useEffect(() => {
		fetch(url)
			.then(results => results.json())
			.then(users => {
				setUsers(users);
				// console.log(users);
			});
	}, []);
	// handle delete record.
	const [showdelete, SetShowdelete] = React.useState({
		showdelete: false,
		activedelete: null
	});
	const handleShowdelete = (e, index) => SetShowdelete({
		showdelete: true,
		activedelete: index
	});
	const handleClosedelete = () => SetShowdelete({
		showdelete: false,
		activedelete: null
	});
	// send request to express delete api and delete the data due to Mongo index ID. findByIdAndRemove()
	function deleteRecord(e, id) {
		console.log(id);
		console.log(url + '/delete/' + id);
		axios({ 				// send POST request to the delete api
			method: 'post',
			url: url + '/delete/' + id,
			query: {
				Id: id,
			}
		})
			.then(res => {
				console.log(res);
				if (res.status == 200) {
					console.log("delete success"); // login success
					window.location.reload();
				} else {
					console.log("delete failed");
					window.location.reload();
				}
			})
			.catch(err => {
				console.log(err);
				window.location.reload();
			})
	}

	// set from info
	const [modifyuser, setModifyuser] = React.useState({
		_id:'',
		email: '',
		password: '',
		first_name: '',
		country_name: '',
		city_name: '',
		state_name: '',
	})
	// create form submit
	const modifyRecord = e => {
		e.preventDefault();
		console.log(modifyuser);
		// axios call to express create user
		// axios({
		// 	method: 'POST',
		// 	url: url + '/edit' + modifyuser._id,
		// 	data: {
		// 		Id: modifyuser._id,
		// 		email: modifyuser.email,
		// 		password: modifyuser.password,
		// 		first_name: modifyuser.first_name,
		// 		country_name: modifyuser.country_name,
		// 		city_name: modifyuser.city_name,
		// 		state_name: modifyuser.state_name,
		// 	}
		// })
		// 	.then(res => {
		// 		if (res.status == 200) {
		// 			console.log("modify success");
		// 			window.location.reload();
		// 		} else {
		// 			console.log("modify failed");
		// 			window.location.reload();
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
		// console.log(url + '/edit' + modifyuser._id)
	};
	// match form name properity with the input value
	const updateValue = e => {
		console.log(e.target.value)
		setModifyuser({
			...modifyuser,
			[e.target.name]: e.target.value
		});
	};

	const renderTable = () => {
		return users.map((user) => {
			// console.log(user);
			return (
				<tr key={user._id}>
					<td>{user.first_name}</td>
					<td>{user.email}</td>
					<td>{user.password}</td>
					<td>{user.country_name}</td>
					<td>{user.city_name}</td>
					<td>{user.state_name}</td>
					<td>{user.company_address}</td>
					<td>
						<ButtonGroup aria-label="Basic example">
							<Button size="sm" variant="primary" onClick={e => handleShow(e, user._id)}>Modify</Button>
							<Modal show={show.activeModal === user._id} onHide={handleClose} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
								<Modal.Header closeButton>
									<Modal.Title>Details</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form id='modifyuser' onSubmit={modifyRecord}>
										<Form.Group as={Row} controlId="formPlaintextEmail">
											<Form.Label column sm="2">Email</Form.Label>
											<Col sm="10">
												<Form.Control type='text' readOnly placeholder={user._id} value={user._id} name="_id"/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextEmail">
											<Form.Label column sm="2">Email</Form.Label>
											<Col sm="10">
												<Form.Control type='text' placeholder={user.email} value={user.email} name="email" onChange={updateValue}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextPassword">
											<Form.Label column sm="2">Password</Form.Label>
											<Col sm="10">
												<Form.Control type='password' placeholder="" value={user.password} name="password" onChange={updateValue}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextPassword">
											<Form.Label column sm="2">First Name</Form.Label>
											<Col sm="10">
												<Form.Control type='text' placeholder="" value={user.first_name} name="first_name" onChange={updateValue}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextPassword">
											<Form.Label column sm="2">Country Name</Form.Label>
											<Col sm="10">
												<Form.Control type='text' placeholder="" value={user.country_name} name="country_name" onChange={updateValue}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextPassword">
											<Form.Label column sm="2">City Name</Form.Label>
											<Col sm="10">
												<Form.Control type='text' placeholder="" value={user.city_name} name="city_name" onChange={updateValue}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId="formPlaintextPassword">
											<Form.Label column sm="2">State Name</Form.Label>
											<Col sm="10">
												<Form.Control type='text' placeholder="" value={user.state_name} name="state_name" onChange={updateValue}/>
											</Col>
										</Form.Group>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button form='modifyuser' type='submit' variant="primary" >Submit</Button>
								</Modal.Footer>
							</Modal>
						</ButtonGroup>
						<ButtonGroup>
							<Button size="sm" variant="danger" onClick={e => handleShowdelete(e, user._id)}>Delete</Button>
							<Modal show={showdelete.activedelete === user._id} onHide={handleClosedelete} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
								<Modal.Header variant="danger" closeButton bg="danger">
									<Modal.Title>Sure to Delete?</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<p>user email is: {user.email}</p>
								</Modal.Body>
								<Modal.Footer>
									<Button type='button' variant="danger" onClick={e => deleteRecord(e, user._id)}>Delete</Button>
								</Modal.Footer>
							</Modal>
						</ButtonGroup>
					</td>
				</tr>
			)
		})
	}


	// create record
	const [showcreate, setShowcreate] = React.useState(false);

	const handleShowcreate = () => {
		setShowcreate(true);
	}
	const handleClosecreate = () => {
		setShowcreate(false);
	}
	// set from info
	const [newuser, setNewuser] = React.useState({
		_id:'',
		email: '',
		password: '',
		first_name: '',
		country_name: '',
		city_name: '',
		state_name: '',
	})
	// create form submit
	const createRecord = e => {
		e.preventDefault();
		console.log(newuser);
		// axios call to express create user
		axios({
			method: 'POST',
			url: url + '/register',
			data: {
				email: newuser.email,
				password: newuser.password,
				first_name: newuser.first_name,
				country_name: newuser.country_name,
				city_name: newuser.city_name,
				state_name: newuser.state_name,
			}
		})
			.then(res => {
				if (res.status == 200) {
					console.log("create success");
					window.location.reload();
				} else {
					console.log("create failed");
					window.location.reload();
				}
			})
			.catch(err => {
				console.log(err);
			})
	};
	// match form name properity with the input value
	const updateField = e => {
		setNewuser({
			...newuser,
			[e.target.name]: e.target.value
		});
	};

	const createData = () => {
		return (
			<div>
				<ButtonGroup aria-label="Basic example">
					<Button size="lg" variant="success" onClick={handleShowcreate}>Create</Button>
					<Modal show={showcreate} onHide={handleClosecreate} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton>
							<Modal.Title>Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form id='createuser' onSubmit={createRecord}>
								<Form.Group as={Row} controlId="formPlaintextEmail">
									<Form.Label column sm="2">Email</Form.Label>
									<Col sm="10">
										<Form.Control type='text' placeholder="sample@sample.com" value={newuser.email} name="email" onChange={updateField}/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPassword">
									<Form.Label column sm="2">Password</Form.Label>
									<Col sm="10">
										<Form.Control type='password' placeholder="" value={newuser.password} name="password" onChange={updateField}/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPassword">
									<Form.Label column sm="2">First Name</Form.Label>
									<Col sm="10">
										<Form.Control type='text' placeholder="" value={newuser.first_name} name="first_name" onChange={updateField}/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPassword">
									<Form.Label column sm="2">Country Name</Form.Label>
									<Col sm="10">
										<Form.Control type='text' placeholder="" value={newuser.country_name} name="country_name" onChange={updateField}/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPassword">
									<Form.Label column sm="2">City Name</Form.Label>
									<Col sm="10">
										<Form.Control type='text' placeholder="" value={newuser.city_name} name="city_name" onChange={updateField}/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPassword">
									<Form.Label column sm="2">State Name</Form.Label>
									<Col sm="10">
										<Form.Control type='text' placeholder="" value={newuser.state_name} name="state_name" onChange={updateField}/>
									</Col>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button form='createuser' type='submit' variant="success" >Submit</Button>
						</Modal.Footer>
					</Modal>
				</ButtonGroup>
			</div>
		)
	}

	return (
		<div>
			{createData()}
			<Table responsive >
				<thead>
					<tr>
						<th>First_name</th>
						<th>Email</th>
						<th>Password</th>
						<th>Country_name</th>
						<th>city_name</th>
						<th>state_name</th>
						<th>company_address</th>
						<th>Operations</th>
					</tr>
				</thead>
				<tbody>
					{renderTable()}
				</tbody>
			</Table>
		</div>
	);
}


// https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81