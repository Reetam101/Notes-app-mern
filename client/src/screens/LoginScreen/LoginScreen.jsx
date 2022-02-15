import './LoginScreen.css'
import MainScreen from "../../components/MainScreen"
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const submitHandler = async (e) => {
		e.preventDefault()

		try {
			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
			setLoading(true)

			const { data } = await axios.post('/api/users/login', {
				email, password
			}, config)

			console.log(data)
			localStorage.setItem('userInfo', JSON.stringify(data))
			setLoading(false)
		} catch(err) {
			setError(err.response.data.message)
			setLoading(false)
			setTimeout(() => {
				setError(false)
			}, 3000)
		}
	}


	return (
		<MainScreen title='Login'>
			<div className="d-flex flex-column p-5 m-5 border border-dark rounded">
				{error && <ErrorMessage type="danger">{error}</ErrorMessage>}
				<Form onSubmit={submitHandler}>
				  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
				    <Form.Label column sm={2}>
				      Email
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				    </Col>
				  </Form.Group>

				  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
				    <Form.Label column sm={2}>
				      Password
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				    </Col>
				  </Form.Group>
				  <Form.Group as={Row} className="mb-2">
				    <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
				      <button className="btn btn-outline-info btn-rounded" type="submit">Login</button>
				    </Col>
				    <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
						{loading && <Loading />}
				    </Col>
				  </Form.Group>
				  <Form.Group>
				  	<p>Create a new account ? <a href="/register">
		                <strong className="text-primary">Register</strong>
		              </a>
		            </p>
				  </Form.Group>
				  </Form>
			</div>
		</MainScreen>
	)
}

export default LoginScreen