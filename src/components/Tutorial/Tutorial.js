import React from 'react';

import {TutorialContainer, TitleContainer, UpperContainer, BottomContainer} from './TutorialStyles.js';

import Button from '../Button/Button.js';

import ViewTutorial from '../ViewTutorial/ViewTutorial.js';
import AddTutorial from '../AddTutorial/AddTutorial.js';
import AddTutorialVideos from '../AddTutorialVideos/AddTutorialVideos.js';

class Tutorial extends React.Component {
	constructor() {
		super()
		this.state = {
			viewTutorial: true,
			addTutorial: false,
			addVideos: false
		}
	}

	changeViewTutorial = () => {
		this.setState((prevState) => ({
			viewTutorial: true,
			addTutorial: false,
			addVideos: false
		}))
	}

	changeAddTutorial = () => {
		this.setState((prevState) => ({
			viewTutorial: false,
			addTutorial: true,
			addVideos: false
		}))
	}

	changeAddVideos = () => {
		this.setState((prevState) => ({
			viewTutorial: false,
			addTutorial: false,
			addVideos: true
		}))
	}

	render() {
		return (
			<TutorialContainer>
				<TitleContainer>
					<span> Tutorial </span>
				</TitleContainer>
				{
					this.props.student ? null :
				<UpperContainer>
					<Button type="button" name="View Tutorial" handleClick={this.changeViewTutorial} />
					<Button type="button" name="Add Tutorial" handleClick={this.changeAddTutorial} />
					<Button type="button" name="Add Videos" handleClick={this.changeAddVideos} />
				</UpperContainer>
				}
				<BottomContainer>
					{
						this.state.viewTutorial ? <ViewTutorial admin={this.props.admin}/> : 
						this.state.addTutorial ? <AddTutorial /> :
						this.state.addVideos ? <AddTutorialVideos /> : null
					}
				</BottomContainer>
			</TutorialContainer>
			)
	}
}




export default Tutorial;
