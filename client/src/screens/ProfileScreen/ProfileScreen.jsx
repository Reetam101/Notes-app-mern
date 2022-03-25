import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Form, Row } from "react-bootstrap"
import MainScreen from "../../components/MainScreen"
import Message from "../../components/Message"
import Loading from "../../components/Loading"
import { useHistory } from "react-router-dom"
import { updateProfile } from "../../actions/userActions"

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState()
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [picMessage, setPicMessage] = useState()

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading, error, success } = userUpdate
    
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
					// console.log(data)
					setImage(data.url.toString())
					// console.log(setImage)
				})
				.catch(err => console.log(err))
		} else {
			return setPicMessage("Please select an image!")
		}
	}
    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()

        if(password === password2)
            dispatch(updateProfile({name, email, password, image}))
    }

    useEffect(() => {
        // const userInfo = localStorage.getItem("userInfo")

        if(!userInfo) {
        history.push("/")
        } else {
            setName(userInfo.name)
            setImage(userInfo.image)
            setEmail(userInfo.email)
            // setName(userInfo.name)
        }
    }, [history, userInfo])
    return (
        <MainScreen title="Edit Profile">
            <div>
                <Row className="profileContainer">
                    <Col md={6} xs={6} className="p-2 d-flex justify-content-center align-items-center">
                        <Form onSubmit={submitHandler}>
                        {error && (<Message variant="danger" >{error}</Message>)}
                        {success && (<Message variant="success" >Profile updated successfully!</Message>)}
                        <Form.Group className="mb-3" controlId="formHorizontalName">
                            <Form.Label value={name}>
                            Name
                            </Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
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
                            <Message type="danger">{picMessage}</Message>
                        )}
                        <Form.Group controlId="pic" className="mb-3">
                            <Form.Label>Upload profile picture</Form.Label>
                            <Form.Control
                                onChange={(e) => postDetails(e.target.files[0])}
                                type="file" />
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                            <Col className="mt-3">
                            <button className="btn btn-outline-info" type="submit">Register</button>
                            </Col>
                            <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
                                    {loading && <Loading />}
                            </Col>
                        </Form.Group>
                    </Form>
                    </Col>
                    <Col className="p-2 text-center" style={{backgroundColor: 'rgb(245,245,245)'}}>
                        <img style={{width:'200px', height:'200px', marginTop: '12px', borderRadius:'50%'}} src={image} alt={name} />  
                        <div className="mt-5">
                            <p style={{fontWeight: '700'}}>Name: {name}</p>
                            <p style={{fontWeight: '700'}}>Email: {email}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen