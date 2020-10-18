import React from 'react';

import {AddClassContainer, TitleContainer, UpperContainer,BottomContainer} from './AddClassStyles.js';

import Button from '../Button/Button.js';

import AddClass2 from '../AddClass2/AddClass2.js';
import AddDivision from '../AddDivision/AddDivision.js';
import AddSubject from '../AddSubject/AddSubject.js';
import AssignTeacher from '../AssignTeacher/AssignTeacher.js';

class AddClass extends React.Component {
	constructor() {
		super()
		this.state = {
			addClass2: true,
			addDivision: false,
			addSubject: false,
			assignTeacher: false
		}
	}

	renderAddClass2 = () => {
		this.setState({addClass2: true, addSubject: false, addDivision: false, assignTeacher: false})
	}

	renderAddSubject = () => {
		this.setState({addClass2: false, addSubject: true, addDivision: false, assignTeacher: false})
	}

	renderAddDivision = () => {
		this.setState({addClass2: false, addSubject: false, addDivision: true, assignTeacher: false})
	}

	renderAssignTeacher = () => {
		this.setState({addClass2: false, addSubject: false, addDivision: false, assignTeacher: true})
	}


	render() {
		return (

			<AddClassContainer>
				<TitleContainer>
					<span> Add Class</span>
				</TitleContainer>
				<UpperContainer>
					<Button type="button" name="Add Class" handleClick={this.renderAddClass2} />
					<Button type="button" name="Add Division" handleClick={this.renderAddDivision} />
					<Button type="button" name="Add Subject" handleClick={this.renderAddSubject} />
					<Button type="button" name="Assign Teacher" handleClick={this.renderAssignTeacher} />
				</UpperContainer>
				<BottomContainer>
					{
						this.state.addClass2 ? <AddClass2 /> :
						this.state.addDivision ? <AddDivision /> :
						this.state.addSubject ? <AddSubject /> :
						this.state.assignTeacher ? <AssignTeacher /> : null
					}
				</BottomContainer>
			</AddClassContainer>


			)
	}
	
}


export default AddClass;