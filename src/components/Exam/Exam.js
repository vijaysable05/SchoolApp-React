import React from 'react';

import {ExamContainer, UpperContainer, BottomContainer, 
	TitleContainer, ViewSelectionContainer} from './ExamStyles.js';

import Button from '../Button/Button.js';

import ViewExam from '../ViewExam/ViewExam.js';
import ViewExamTimetable from '../ViewExamTimetable/ViewExamTimetable.js';

class Exam extends React.Component {
	constructor() {
		super()
		this.state = {
			exam: true,
			timetable: false
		}
	}

	changeExam = () => {
		this.setState({exam: true,
			timetable: false})
	}

	changeTimetable = () => {
		this.setState({exam: false,
			timetable: true})
	}

	render() {
		return (
			<ExamContainer>
				<UpperContainer>
					<TitleContainer>
						<span> Exam </span>
					</TitleContainer>
					<ViewSelectionContainer>
						<Button type="button" name="View Exam" handleClick={this.changeExam}/>
						<Button type="button" name="View Timetable" handleClick={this.changeTimetable}/>
					</ViewSelectionContainer>
				</UpperContainer>
				<BottomContainer>
				{
					this.state.exam ? <ViewExam  admin={this.props.admin} />
					:
					this.state.timetable ? <ViewExamTimetable  admin={this.props.admin} /> : null
				}
				</BottomContainer>
			</ExamContainer>
			)
	}

}




export default Exam;