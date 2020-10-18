import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {StudentPageContainer, HeaderContainer, ContentContainer} from './StudentPageStyles.js';

import StudentHeader from '../../components/StudentHeader/StudentHeader.js';

import StudentLandingPage from '../../components/StudentLandingPage/StudentLandingPage.js';
import Class from '../../components/class/Class.js';
import ViewStaff from '../../components/ViewStaff/ViewStaff.js';
import ViewStudents from '../../components/ViewStudents/ViewStudents.js';
import ViewTimetable from '../../components/ViewTimetable/ViewTimetable.js';
import Notifications from '../../components/Notifications/Notifications.js';
import StudentLeave from '../../components/StudentLeave/StudentLeave.js';
import Gallery from '../../components/Gallery/Gallery.js';
import BookList from '../../components/BookList/BookList.js';
import Exam from '../../components/Exam/Exam.js';
import Tutorial from '../../components/Tutorial/Tutorial.js';
import Attendance from '../../components/Attendance/Attendance.js';
import Transport from '../../components/Transport/Transport.js';
import LeaveRequest from '../../components/LeaveRequest/LeaveRequest.js';
import LeavesSent from '../../components/LeavesSent/LeavesSent.js';

class StudentPage extends React.Component {
	constructor() {
		super()
		this.state = {
			

		}
	}


	render() {

		return (
			<StudentPageContainer>
				<HeaderContainer>
					<StudentHeader />
				</HeaderContainer>
				<ContentContainer>
				<Switch>
					<Route exact path="/student" component={StudentLandingPage} />
					<Route exact path="/student/class" component={Class} />
					<Route exact path="/student/viewstaff" component={ViewStaff} />
					<Route exact path="/student/viewstudents" component={ViewStudents} />
					<Route exact path="/student/viewtimetable" component={ViewTimetable} />
					<Route exact path="/student/viewnotifications" component={Notifications} />
					<Route exact path="/student/studentleave" component={StudentLeave} />
					<Route exact path="/student/gallery" component={Gallery} />
					<Route exact path="/student/bookList" component={BookList} />
					<Route exact path="/student/exam" component={Exam} />
					<Route exact path="/student/tutorial" render={(props) => <Tutorial student {...props}/>} />
					<Route exact path="/student/attendance" render={(props) => <Attendance student {...props}/>} />
					<Route exact path="/student/transport" component={Transport} />
					<Route exact path="/student/leaverequest" component={LeaveRequest} />
					<Route exact path="/student/leavessent" component={LeavesSent} />
				</Switch>
				</ContentContainer>
			</StudentPageContainer>
			)

	}

}


export default StudentPage;