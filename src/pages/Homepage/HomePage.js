import React from 'react';

import {HomePageContainer, Title, Content, GridContent, GridCells, 
	GridDiv1, GridDiv2, GridDiv2Div1, GridDiv2Div2} from './HomePageStyles.js';
import Header from '../../components/Header/Header.js';

import lib from './library.png'
import class1 from './class.png'
import attendance from './attendance.png'
import tutorials from './tutorials.png'
import stationary from './stationary.png'
import payment from './payment.png'
import noticeboard from './noticeboard.png'
import leave from './leave.png'
import bus from './bus.png'

class HomePage extends React.Component {
	constructor() {
		super()
		this.state = {
			

		}
	}


	render() {

		return (

			<HomePageContainer>
				<Header />
				 <Title>
				 	<span> SCHOOL MANAGEMENT SYSTEM (SMS) </span>
				 </Title>
				 <Content>
				 	<span> In this age, every other industry is operating by shaking hands with technology. This simple school 
				 	management system is easy to use and takes care of various school responsibilities efficiently. 
				 	It has all the basic tools necessary to automate daily tasks and operations of a school. Where there is always
				 	space for progress, we will be continously working to make the system better with time and include all the solutions
				 	necessary. </span>
				 </Content>	
				 <GridContent>
				 	<GridCells>
					 	<GridDiv1>
					 		<img src={class1} height="100%" width="70%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Class </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add Classes and Divisions </span>
					 		<span> <b>-</b> Assign Teachers to classes </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={attendance} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Attendance </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Students attendance </span>
					 		<span> <b>-</b> Add and Manage Staff attendance </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={lib} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Library </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add Books </span>
					 		<span> <b>-</b> Manage Issued Books </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={tutorials} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Tutorials </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Video Tutorials </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={stationary} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Store </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Stationary goods </span>
					 		<span> <b>-</b> Add and Manage your vendors data </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={payment} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Payment </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add Fee-Structure of School </span>
					 		<span> <b>-</b> Add and Manage Fee Payments </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={noticeboard} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Notices </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Notices efficiently </span>
					 		<span> <b>-</b> Send your notifications through sms </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={leave} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Leaves </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Students Leaves </span>
					 		<span> <b>-</b> Add and Manage Staffs Leaves </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 	<GridCells>
				 		<GridDiv1>
				 			<img src={bus} height="100%" width="80%" alt="img"/>
					 	</GridDiv1>
					 	<GridDiv2>
					 	<GridDiv2Div1>
					 		<span> Transport </span>
					 	</GridDiv2Div1>
					 	<GridDiv2Div2>
					 		<span> <b>-</b> Add and Manage Bus data </span>
					 		<span> <b>-</b> Add and Manage Bus Routes </span>
					 	</GridDiv2Div2>
					 	</GridDiv2>
				 	</GridCells>
				 </GridContent>
			</HomePageContainer>


			)

	}

}


export default HomePage;




// <TitleContainer>
				// 	<span> SCHOOL MANAGEMENT SYSTEM (SMS) </span>
				// </TitleContainer>
				// <ContentContainer1>
				// 	<span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
				//  	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
				//  	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
				//  	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
				//  	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
				//  	proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </span>
				// </ContentContainer1>

	// <ContentContainer2>
	// 				<ImageContainer>
	// 					<img src={class1} height="100%" width="40%" alt="img"/>
	// 				</ImageContainer>
	// 				<ContentContentContainer>
	// 					<span> Manage your Class efficiently </span>
	// 				</ContentContentContainer>
	// 			</ContentContainer2>
	// 			<ContentContainer2>
	// 				<ImageContainer>
	// 					<img src={attendance} height="100%" width="40%" alt="img"/>
	// 				</ImageContainer>
	// 				<ContentContentContainer>
	// 					<span> Manage your Attendance efficiently </span>
	// 				</ContentContentContainer>
	// 			</ContentContainer2>
	// 			<ContentContainer2>
	// 				<ImageContainer>
	// 					<img src={lib} height="100%" width="40%" alt="img"/>
	// 				</ImageContainer>
	// 				<ContentContentContainer>
	// 					<span> Manage your library efficiently </span>
	// 				</ContentContentContainer>
	// 			</ContentContainer2>
	// 			<ContentContainer2>
	// 				<ImageContainer>
	// 					<img src={tutorials} height="100%" width="40%" alt="img"/>
	// 				</ImageContainer>
	// 				<ContentContentContainer>
	// 					<span> Add Tutorials for students </span>
	// 				</ContentContentContainer>
	// 			</ContentContainer2>
	// 			<ContentContainer2>
	// 				<ImageContainer>
	// 					<img src={stationary} height="100%" width="40%" alt="img"/>
	// 				</ImageContainer>
	// 				<ContentContentContainer>
	// 					<span> Manage your stationary distribution efficiently </span>
	// 				</ContentContentContainer>
	// 			</ContentContainer2>