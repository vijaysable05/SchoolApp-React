import {connect} from 'react-redux';





const selectYearAndToken = () => {
	return (this.props.year, this.props.currentUser.token
	)
}






const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	studentData: state.student.studentData
})

export default connect(mapStateToProps)(selectYearAndToken)
