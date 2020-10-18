import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {TeacherPageContainer, HeaderContainer, ContentContainer} from './TeacherPageStyles.js';

import TeacherHeader from '../../components/TeacherHeader/TeacherHeader.js';

import TeacherLandingPage from '../../components/TeacherLandingPage/TeacherLandingPage.js';
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

class TeacherPage extends React.Component {
	constructor() {
		super()
		this.state = {
			

		}
	}


	render() {

		return (
			<TeacherPageContainer>
				<HeaderContainer>
					<TeacherHeader />
				</HeaderContainer>
				<ContentContainer>
				<Switch>
					<Route exact path="/teacher" component={TeacherLandingPage} />
					<Route exact path="/teacher/class" component={Class} />
					<Route exact path="/teacher/viewstaff" component={ViewStaff} />
					<Route exact path="/teacher/viewstudents" component={ViewStudents} />
					<Route exact path="/teacher/viewtimetable" component={ViewTimetable} />
					<Route exact path="/teacher/viewnotifications" component={Notifications} />
					<Route exact path="/teacher/studentleave" component={StudentLeave} />
					<Route exact path="/teacher/gallery" component={Gallery} />
					<Route exact path="/teacher/bookList" component={BookList} />
					<Route exact path="/teacher/exam" component={Exam} />
					<Route exact path="/teacher/tutorial" component={Tutorial} />
					<Route exact path="/teacher/attendance" component={Attendance} />
					<Route exact path="/teacher/transport" component={Transport} />
					<Route exact path="/teacher/leaverequest" component={LeaveRequest} />
					<Route exact path="/teacher/leavessent" component={LeavesSent} />
				</Switch>
				</ContentContainer>
			</TeacherPageContainer>
			)

	}

}


export default TeacherPage;