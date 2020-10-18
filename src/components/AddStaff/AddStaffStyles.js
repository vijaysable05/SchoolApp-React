import styled from 'styled-components';


export const AddStaffContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-wrap: wrap;
`

export const ProfilePicContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20%;
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 80%;


	input {
		width: 60%;
		border: none;
		border-bottom: 1px solid black;
		background-color: #80808030;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;

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

export const TitleDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 30px;
	font-weight: bold;
	margin: 20px 0;
`

export const DivContainer = styled.div`
	display: flex;
	justify-content: flex-start
	align-items: center;

	div {
		width: 33%;
	}
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding-top: 20px;

	button {
		width: 10%;
		margin: 20px;
	}
`

export const ImageContainer = styled.div` 
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100%;

		input {
			display: none;
		}

		label {
			height: 100%;
			width: 10%;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin: 20px;
			border-radius: 100%;

			img {
				height: 80%;
				width: 100%;
			}

			&:focus {
				outline: none;
			}
		}
`