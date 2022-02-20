import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './RegisterScreen.css'
import { Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { register } from '../../actions/userActions'


const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('')
	const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/456/456212.png")

	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [picMessage, setPicMessage] = useState(null)
	const [message, setMessage] = useState(null)
	const dispatch = useDispatch()

	const { loading, error, userInfo } = useSelector(state => state.userRegister)

	const history = useHistory()
	useEffect(() => {
		if(userInfo) {
			history.push("/notes")
		}
	}, [history, userInfo])

	const postDetails = (pic) => {
		if(!pic) {
			return setPicMessage("Please select an image")
		}
		setPicMessage(null)

		if(pic.type === 'image/jpeg' || pic.type === 'image/png') {
			const data = new FormData()
			data.append('file', pic)
			data.append('upload_preset', 'noted-app')
			data.append('cloud_name', 'reetam01')
			fetch('https://api.cloudinary.com/v1_1/reetam01/image/upload', {
				method: 'post',
				body: data
			}).then((res) => res.json())
				.then((data) => {
					console.log(data)
					setImage(data.url.toString())
					console.log(setImage)
				})
				.catch(err => console.log(err))
		} else {
			return setPicMessage("Please select an image!")
		}
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		if(password !== password2) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(name, email, password, image))
		}
	}


	return (
		<MainScreen title='Register'>
			<div className="d-flex flex-column p-5 m-5 border border-dark rounded">
				 {error && <ErrorMessage type="danger">{error}</ErrorMessage>} 
				 {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
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
				  {picMessage && (
				  	<ErrorMessage type="danger">{picMessage}</ErrorMessage>
				  )}
			    <Form.Group controlId="pic" className="mb-3">
				    <Form.Label>Upload profile picture</Form.Label>
				    <Form.Control
				    	onChange={(e) => postDetails(e.target.files[0])}
				     	type="file" />
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