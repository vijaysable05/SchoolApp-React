import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {AdminPageContainer, HeaderContainer, ContentContainer} from './AdminPageStyles.js';

import {connect} from 'react-redux';

// import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
// import {SetClasses, SetClassesFail} from '../../redux/class/ClassActions.js';

import AdminHeader from '../../components/AdminHeader/AdminHeader.js';

import AdminLandingPage from '../../components/AdminLandingPage/AdminLandingPage.js';
import AddClass from '../../components/AddClass/AddClass.js';
import Class from '../../components/class/Class.js';
import AddStaff from '../../components/AddStaff/AddStaff.js';
import ViewStaff from '../../components/ViewStaff/ViewStaff.js';
import AddStudent from '../../components/AddStudent/AddStudent.js';
import ViewStudents from '../../components/ViewStudents/ViewStudents.js';
import ViewTimetable from '../../components/ViewTimetable/ViewTimetable.js';
import AddTimetable from '../../components/AddTimetable/AddTimetable.js';
import Notifications from '../../components/Notifications/Notifications.js';
import AddNotification from '../../components/AddNotification/AddNotification.js';
import TeacherLeave from '../../components/TeacherLeave/TeacherLeave.js';
import StudentLeave from '../../components/StudentLeave/StudentLeave.js';
import Payment from '../../components/Payment/Payment.js';
import Transport from '../../components/Transport/Transport.js';
import Gallery from '../../components/Gallery/Gallery.js';
import BookList from '../../components/BookList/BookList.js';
import IssueBook from '../../components/IssueBook/IssueBook.js';
import BooksCirculated from '../../components/BooksCirculated/BooksCirculated.js';
import History from '../../components/History/History.js';
import FineAndReturns from '../../components/FineAndReturns/FineAndReturns.js';
import Store from '../../components/Store/Store.js';
import Exam from '../../components/Exam/Exam.js';
import Tutorial from '../../components/Tutorial/Tutorial.js';
import Attendance from '../../components/Attendance/Attendance.js';
import AssignTeacher from '../../components/AssignTeacher/AssignTeacher.js';

class AdminPage extends React.Component {
	constructor() {
		super()
		this.state = {
			

		}
	}

	// async componentDidMount() {
	// 	console.log(this.props.year, this.props.currentUser.token)
		
	// }

	render() {
		return (
			<AdminPageContainer>
				<HeaderContainer>
					<AdminHeader />
				</HeaderContainer>
				<ContentContainer>
				<Switch>
					<Route exact path="/admin" component={AdminLandingPage} />
					<Route exact path="/admin/addclass" component={AddClass} />
					<Route exact path="/admin/class" render={(props) => <Class admin Edit Delete {...props}/>} />
					<Route exact path="/admin/addstaff" component={AddStaff} />
					<Route exact path="/admin/viewstaff" render={(props) => <ViewStaff admin Edit Delete {...props}/>} />
					<Route exact path="/admin/addstudent" component={AddStudent} />
					<Route exact path="/admin/viewstudents" render={(props) => <ViewStudents admin Edit Delete {...props}/>} />
					<Route exact path="/admin/viewtimetable" render={(props) => <ViewTimetable admin Edit Delete {...props}/>} />
					<Route exact path="/admin/addtimetable" component={AddTimetable} />
					<Route exact path="/admin/viewnotifications" render={(props) => <Notifications admin Edit Delete {...props}/>} />
					<Route exact path="/admin/addnotification" component={AddNotification} />
					<Route exact path="/admin/teacherleave" component={TeacherLeave} />
					<Route exact path="/admin/studentleave" component={StudentLeave} />
					<Route exact path="/admin/payment" component={Payment} />
					<Route exact path="/admin/transport" render={(props) => <Transport admin {...props}/>} />
					<Route exact path="/admin/gallery" render={(props) => <Gallery admin Edit Delete {...props}/>} />
					<Route exact path="/admin/bookList" render={(props) => <BookList admin Edit Delete {...props}/>} />
					<Route exact path="/admin/issuebook" component={IssueBook} />
					<Route exact path="/admin/bookscirculated" component={BooksCirculated} />
					<Route exact path="/admin/history" component={History} />
					<Route exact path="/admin/fine" component={FineAndReturns} />
					<Route exact path="/admin/store" component={Store} />
					<Route exact path="/admin/exam" render={(props) => <Exam admin {...props}/>} />
					<Route exact path="/admin/tutorial" render={(props) => <Tutorial admin {...props}/>} />
					<Route exact path="/admin/attendance" render={(props) => <Attendance admin {...props}/>} />
					<Route exact path="/admin/assignteacher" render={(props) => <AssignTeacher admin {...props}/>} />
				</Switch>
				</ContentContainer>
			</AdminPageContainer>
			)

	}

}

const mapStateToProps = (state) => ({
	isLoading: state.user.isLoading
})


// const mapDispatchToProps = (dispatch) => ({
// 	LoadingStart: () => dispatch(LoadingStart()),
// 	LoadingEnd: () => dispatch(LoadingEnd())
// })


export default connect(mapStateToProps)(AdminPage);