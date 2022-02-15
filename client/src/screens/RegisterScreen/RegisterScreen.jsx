import { useState, useEffect } from 'react'
import './RegisterScreen.css'
import { Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import axios from 'axios'


const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('')
	const [pic, setPic] = useState("https://cdn-icons-png.flaticon.com/512/456/456212.png")

	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [message, setMessage] = useState(null)
	const [picMessage, setPicMessage] = useState(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const submitHandler = async (e) => {
		e.preventDefault()

		if(password !== password2) {
			setMessage('Passwords do not match')
		} else {
			setMessage(null)
			try {
				const config = {
				headers: {
					"Content-type": "application/json"
				}
			}

			setLoading(true)
			const { data } = await axios.post('/api/users/', {
				name, email, password, pic
			}, config)

			setLoading(false)
			localStorage.setItem('userInfo', JSON.stringify(data))

			} catch(error) {
				setError(error.response.data.message)
				setLoading(false)
				setTimeout(() => {
					setError(false)
				}, 3000)
			}
		}

	}

	return (
		<MainScreen title='Register'>
			<div className="d-flex flex-column p-5 m-5 border border-dark rounded">
				 {error && <ErrorMessage type="danger">{error}</ErrorMessage>} 
				<Form onSubmit={submitHandler}>
				  <Form.Group className="mb-3" controlId="formHorizontalName">
				    <Form.Label column sm={2} value={name}>
				      Name
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
				    </Col>
				  </Form.Group>
				  <Form.Group className="mb-3" controlId="formHorizontalEmail">
				    <Form.Label column sm={2}>
				      Email
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				    </Col>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="formHorizontalPassword">
				    <Form.Label column sm={2}>
				      Password
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				    </Col>
				  </Form.Group>
				  <Form.Group className="mb-3" controlId="formHorizontalPassword2">
				    <Form.Label column>
				      Confirm Password
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
				    </Col>
				  </Form.Group>

			    <Form.Group controlId="formFile" className="mb-3">
				    <Form.Label>Upload profile picture</Form.Label>
				    <Form.Control type="file" />
				  </Form.Group>

				  <Form.Group as={Row} className="mb-2">
				    <Col className="mt-" sm={{ span: 10, offset: 2 }}>
				      <button className="btn btn-outline-info btn-rounded" type="submit">Register</button>
				    </Col>
				    <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
							{loading && <Loading />}
				    </Col>
				  </Form.Group>
				  <Form.Group>
				  	<p>Already have an account ? <Link to="/login">
		                <strong className="text-primary">Login</strong>
		              </Link>
		            </p>
				  </Form.Group>
				  </Form>
			</div>
		</MainScreen>
	)
}

export default RegisterScreen