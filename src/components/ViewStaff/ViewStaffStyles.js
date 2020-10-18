import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const ViewStaffContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const SearchFormContainer = styled.div`
	display: flex;
	height: 20%;

	form {
		display: flex;
		width: 100%;
	}
`

export const InfoDisplayContainer = styled.div`
	display: flex;
	height: 80%;
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;

	button {
		width: 12%;
		margin: 20px;
	}
`

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`