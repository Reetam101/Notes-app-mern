import './LoginScreen.css'
import MainScreen from "../../components/MainScreen"
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions.js'

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const userLogin = useSelector(state => state.userLogin)
	const { loading, error, userInfo } = userLogin

	

	useEffect(() => {
		if(userInfo) {
			history.push('/notes')
		}
	}, [history, userInfo]) 

	const submitHandler = async (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}


	return (
		<MainScreen title='Login'>
			<div className="d-flex flex-column p-5 mx-auto border border-primary shadow mb-4" style={{maxWidth: '50rem'}}>
				{error && <Message type="danger">{error}</Message>}
				<Form onSubmit={submitHandler}>
				  <Form.Group className="mb-3" controlId="formHorizontalEmail">
				    <Form.Label column sm={2}>
				      Email
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				    </Col>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="formHorizontalPassword">
				    <Form.Label column sm={2}>
				      Password
				    </Form.Label>
				    <Col sm={10}>
				      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				    </Col>
				  </Form.Group>
				  <Form.Group className="mb-2">
				    <Col className="mt-3">
				      <button className="btn btn-outline-info btn-rounded" type="submit">Login</button>
				    </Col>
				    <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
						{loading && <Loading />}
				    </Col>
				  </Form.Group>
				  <Form.Group>
				  	<p>Create a new account ? <Link to="/register">
		                <strong className="text-primary">Register</strong>
		              </Link>
		            </p>
				  </Form.Group>
				  </Form>
			</div>
		</MainScreen>
	)
}

export default LoginScreen