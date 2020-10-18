import styled from 'styled-components';
import {Link} from 'react-router-dom';


export const TimeTableContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 22%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	padding-bottom: 20px;
	font-weight: bold;
`

export const FormContainer = styled.div`
	display: flex;
`

export const ClassContainer = styled.div`
	display: flex;
	width: 60%;

	form {
		display: flex;
		width: 100%;
	}
`

export const DownloadContainer = styled.div`
	display: flex;
	width: 40%;
`

export const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 73%;

	button {
		width: 20%;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 60%;

	select {
		height: 5vh;
		width: 90%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	justify-content: center;
	width: 40%;

	button {
		width: 35%;
		margin: 20px;
	}
`

export const ButtonDiv2 = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-end;

	button {
		width: 30%;
		margin: 20px;
	}
`

export const ButtonDiv3 = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-end;

	button {
		width: 10%;
		margin: 2%;
	}
`

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

