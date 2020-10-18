import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    color: white;
    font-size: 20px;
    position: relative;
    border-bottom: 1px solid white;
    background: #1565C0;
`

export const OptionContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 30%;
`

export const OptionsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 40%;
`

export const Option = styled(Link)`
	padding: 10px;
	margin: 10px;
	text-decoration: none;
	color: white;

	&:hover {
		cursor: pointer;
		color: white;
		text-decoration: none;
	}

	&:visited {
		cursor: pointer;
		color: white;
		text-decoration: none;

	}

	&:active {
		cursor: pointer;
		color: white;
		text-decoration: none;
		underline: none;
	}

	&:link {
		cursor: pointer;
		color: white;
		text-decoration: none;
		underline: none;
	}

`