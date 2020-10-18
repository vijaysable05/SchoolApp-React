import styled from 'styled-components';

export const AddVendorContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 15%;
	width: 100%;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 25px;
		font-weight: bold;
		margin-left: 20px;
	}

	button {
		width: 10%;
		height: 50%;
		margin-right: 20px;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;
`

export const ImageContainer = styled.div` 
	display: flex;
	justify-content: center;
	height: 100%;
	width: 20%;
	

		input {
			display: none;
		}

		label {
			height: 30%;
			width: 50%;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin: 20px;
			border-radius: 100%;
			cursor: pointer;

			img {
				height: 70%;
				width: 80%;
			}

			&:focus {
				outline: none;
			}
		}

`

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100%;
	width: 80%;
	font-size: 14px;

	input {
		width: 60%;
		border: none;
		border-bottom: 1px solid black;
		background-color: #80808030;
	}
`

export const TitleContainer = styled.div` 
	display: flex;
	width: 100%;
	height: 10%;
	align-items: center;
	font-size: 20px;
	font-weight: bold;
	margin: 20px 0;
`

export const PersonalFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 30%;
`

export const PersonalFormFields = styled.div`
	display: flex;
	width: 100%;
	height: 50%;

	div {
		width: 33%;
	}
`

export const AddressAndBankFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 30%;
`

export const AddressAndBankFormFields = styled.div`
	display: flex;
	width: 100%;
	height: 50%;

	div {
		width: 33%;
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 10%;
	margin: 20px 0;

	button {
		width: 15%;
	}
`