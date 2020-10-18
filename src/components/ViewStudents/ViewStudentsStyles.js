import styled from 'styled-components';
import {Link} from 'react-router-dom';


export const ViewStudentsContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
`

export const FormContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 20%;
	width: 100%;
`

export const TableContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80%;
`

export const SearchContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40%;
`

export const ClassContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 60%;
	font-size: 1.5rem;

	select {
		height: 5vh;
		width: 40%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;

	button {
		width: 30%;
		margin: 20px;
	}
`

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`