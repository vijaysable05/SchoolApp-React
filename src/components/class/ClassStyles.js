import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const ClassContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
`

export const SearchFormContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	align-items: center;
	justify-content: space-between;

	button {
		height: 28%;
		width: 5%;
		margin: 0 2%;
	}
`

export const ClassSearchContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: 50%;

	div {
		width: 40%;

		select {
			width: 70%;
		}
	}

	button {
		width: 15%;
	}
`

export const SearchContainer = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
	align-items: center;
	justify-content: flex-end;

	input {
		width: 70%;
	}

	button {
		width: 15%;
	}
`

export const InfoDisplayContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 80%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 20%;

	select {
		height: 5vh;
		width: 60%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const StudentTableContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 2%;
`

export const TeacherTableContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 2%;
`

export const ClassTeacherContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40%;
	margin-bottom: 2%;
`

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`