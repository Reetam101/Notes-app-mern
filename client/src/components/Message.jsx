import { useState } from "react";
import { Alert, Button, Col, Row, Toast } from "react-bootstrap";

const Message = ({ type="info", children }) => {
	const [show, setShow] = useState(true);
		return (
			show && (
				<Alert variant={type} onClose={() => setShow(false)} dismissible>
				{/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
				<p>
					{children}
				</p>
			  </Alert>
			)
		)

}

export default Message