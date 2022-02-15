const ErrorMessage = ({ type="info", children }) => {
	return (
		<div className={`alert alert-dismissible alert-${type}`}>
		<strong>{children}</strong>
		</div>
	)

}

export default ErrorMessage