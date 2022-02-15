import { Spinner } from 'react-bootstrap'

const Loading = () => {
	return (
		<div style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%"
		}}>
			<Spinner style={{
			}} animation="border" variant="success" />
		</div>
	)
}

export default Loading