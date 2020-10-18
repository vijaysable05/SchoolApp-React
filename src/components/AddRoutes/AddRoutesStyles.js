import styled from 'styled-components';


export const AddRoutesContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
`

export const SelectDiv = styled.div`
	display: flex;
	margin: 1.5%;
	margin-top: 3%;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 15%;

	select {
		height: 5vh;
		width: 70%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 90%;
`

export const BottomContainer1 = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	height: 90%;
`

export const BottomContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	height: 90%;

	span {
		font-size: 2rem;
	}
`

export const RouteInput = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 15%;

	button {
		margin: 1.5%;
		width: 10%;
	}

	input {
		border: none;
		border-bottom: 1px solid black;
		background-color:#80808030;
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 40%;
	align-items: center;

	button {
		width: 30%;
		margin: 1.5%;
	}
`