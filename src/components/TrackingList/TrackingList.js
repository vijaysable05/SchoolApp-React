import React from 'react';

import {TrackingListContainer, UpperContainer, BottomContainer} from './TrackingListStyles.js';

import ViewRoutes from '../ViewRoutes/ViewRoutes.js';
import AddRoutes from '../AddRoutes/AddRoutes.js';

import Button from '../Button/Button.js';

import {connect} from 'react-redux';

class TrackingList extends React.Component {
	constructor() {
		super()
		this.state = {
			routeslist: true,
			addroutes: false,
			route: null
		}
	}

	showRoutesList = () => {
		this.setState({routeslist: true,
		addroutes: false})
	}

	showaddroutes = () => {
		this.setState({routeslist: false,
		addroutes: true})	
	}

	handleEdit = (route, busid) => {
		this.setState({routeslist: false,
		addroutes: true, route: route})
	}

	returnViews = () => {
		if(this.state.routeslist) {
			return <ViewRoutes handleEdit={this.handleEdit} />
		} else if(this.state.addroutes) {
			return <AddRoutes route={this.state.route} />
		}
	}


	render() {
		return (
			<TrackingListContainer>
				<UpperContainer>
					<Button type="button" name="View routes" handleClick={this.showRoutesList} />
					{
						this.props.currentUser.hasOwnProperty('admin') ? 
						<Button type="button" name="Add route" handleClick={this.showaddroutes} />
						: null
					}
				</UpperContainer>
				<BottomContainer>
					{
						this.returnViews()
					}
				</BottomContainer>
			</TrackingListContainer>
			)
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year
})

export default connect(mapStateToProps)(TrackingList);



