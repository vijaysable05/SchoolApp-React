import React from 'react';

import {AddAttendanceContainer, UpperContainer, BottomContainer} from './AddAttendanceStyles.js';

import Button from '../Button/Button.js';

import AddAttendance2 from '../AddAttendance2/AddAttendance2.js';
import AddAttendance3 from '../AddAttendance2/AddAttendance3.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';


class AddAttendance extends React.Component {
	constructor() {
		super()
		this.state = {
			staff: false,
			class: true
		}
	}

	changeStaff = () => {
		this.setState({staff: true,
			class: false})
	}

	changeClass = () => {
		this.setState({staff: false,
			class: true})
	}

	returnAttendance = () => {
		if(this.state.class) {
			return <AddAttendance2 />
		} else if(this.state.staff) {
			return <AddAttendance3 persons={["Joey","Joey Tribbiani joey","Joey","Joey","Joey","Joey","Joey","Joey","Joey"]}/>
		}
	}
	
	render() {
		return (
			<AddAttendanceContainer>	
					{
						this.props.admin ?
						<UpperContainer>
						<Button type="button" name="Class" handleClick={this.changeClass}/>
						<Button type="button" name="Staff" handleClick={this.changeStaff}/>
						</UpperContainer>
						: null
					}
				<BottomContainer>
				{
					this.returnAttendance()
				}
				</BottomContainer>
			</AddAttendanceContainer>
			)
	}
}


const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance);
