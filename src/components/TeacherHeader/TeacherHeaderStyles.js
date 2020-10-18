import styled from 'styled-components';
import {Link} from 'react-router-dom';



export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #2196f3;
	height: 100vh;
	color: white;
	width: 15%;
	text-align: center;
	border-right: 1px solid #8080804f;
	position: fixed;
`

export const Title = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 18%;
	width: 100%;
	border-bottom: 1px solid white;

	span {
		font-size: 1.5em;
		padding: 10px;
		font-weight: bold;
		height: 40%;
	}

	a {
		color: white;
		text-decoration: none;
	}
`

export const Options = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 80vh;
	width: 100%;
	padding: 10px;

	button {
		border: 1px solid white;
		margin-top: 3%;

		&:hover {
			background-color: #006fc7;
			cursor: pointer;
		}
	}
`

export const Option = styled(Link)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 8%;
	font-size: 1em;
	color: white;
	border-radius: 10px;
	padding: 10px;

	&:hover {
		cursor: pointer;
		background-color: #006fc7;
		color: white;
		text-decoration: none;
	}

	&:visited {
		color: white;
		text-decoration: none;
		background-color: #006fc7;
	}

	&:link {
		color: white;
		text-decoration: none;
	}
`

export const Dropdown = styled.div`
	

	/* The container <div> - needed to position the dropdown content */
	
	  position: relative;
	  display: inline-block; 
	  width: 100%;
	  height: 6vh;
	  font-size: 1em;
	  text-align: left;
	  padding: 10px;
	  border-radius: 10px;

	/* Dropdown Content (Hidden by Default) */
	.dropdown-content {
	  display: none;
	  position: absolute;
	  background-color: #2196f3;
	  min-width: 100%;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	  z-index: 1;
	  font-weight: normal;
	  border-radius: 10px;
	}

	/* Links inside the dropdown */
	.dropdown-content a {
	  color: white;
	  padding: 12px 16px;
	  text-decoration: none;
	  display: block;
	  border-radius: 10px;
	}

	/* Change color of dropdown links on hover */
	.dropdown-content {a:hover {background-color: #006fc7;}}

	/* Show the dropdown menu on hover */
	&:hover {.dropdown-content {display: block;}}

	&:hover {
		cursor: pointer;
		background-color: #006fc7;
	}
`

export const SelectYear = styled.select` 
	color: white;
	width: 60%;
	height: 20%;
	border: none;
	background-color: #2196f3;
	outline: none;
	font-size: 1.3em;
	position: relative;

	&:hover {	
		background-color: #006fc7;
		cursor: pointer;
	}
`