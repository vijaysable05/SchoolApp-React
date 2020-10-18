import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NotificationsContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
`

export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 10%;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	font-weight: bold;
	height: 10%;
`

export const FormContainer = styled.form`
	display: flex;
	width: 100%;
	justify-content: flex-end;

	div {
		width: 20%;

		input {
			width: 100%;
			font-size: 15px;
			border: none;
			border-bottom: 1px solid black;
		}
	}
`

export const TableContainer = styled.div`
	display: flex;
	width: 100%;
	height: 80%;

	th, td {
		text-align: left;
	}

	th {
		border: none;
		border-bottom: 1px solid black;
		border-top: 1px solid black;
	}

	td {
		border: none;
	}
`


export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`
