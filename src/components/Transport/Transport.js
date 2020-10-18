import React from 'react';

import {TransportContainer, UpperContainer, BottomContainer, 
	TitleContainer, ViewSelectionContainer} from './TransportStyles.js';

import Button from '../Button/Button.js';

import ViewBuses from '../ViewBuses/ViewBuses.js';
import AddBus from '../AddBus/AddBus.js';
import TrackingList from '../TrackingList/TrackingList.js';

class Transport extends React.Component {
	constructor() {
		super()
		this.state = {
			viewBuses: true,
			addBus: false,
			trackingList: false,
			bus: null
		}
	}

	changeAddBus = () => {
		this.setState({
			viewBuses: false,
			addBus: true,
			trackingList: false
		})
	}

	changeTrackingList = () => {
		this.setState({
			viewBuses: false,
			addBus: false,
			trackingList: true,
			bus: null
		})
	}

	changeViewBus = () => {
		this.setState({
			viewBuses: true,
			addBus: false,
			trackingList: false,
			bus: null
		})
	}

	handleEdit = (bus) => {
		this.setState({bus: bus, viewBuses: false,
			addBus: true,
			trackingList: false})
	}


	render() {
		return (
			<TransportContainer>
				<UpperContainer>
					<TitleContainer>
						<span> Transport </span>
					</TitleContainer>
					<ViewSelectionContainer>
						<Button type="button" name="View Buses" handleClick={this.changeViewBus} />
						<Button type="button" name="Tracking List" handleClick={this.changeTrackingList} />
					</ViewSelectionContainer>
				</UpperContainer>
				<BottomContainer>
				{
					this.state.trackingList ? <TrackingList />
					:
					this.state.addBus ? <AddBus bus={this.state.bus} changeViewBus={this.changeViewBus} /> :
					<ViewBuses handleEdit={this.handleEdit} changeAddBus={this.changeAddBus} admin={this.props.admin}/>
				}
				</BottomContainer>
			</TransportContainer>
			)
	}

}




export default Transport;