import styled from 'styled-components';



export const AddTutorialVideosContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	width: 100%;

	span {
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 10px;
	}
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	height: 15%;
	width: 100%;
	border-top: 1px solid #80808030;

	button {
		margin-right: 20px;
		height: 42%;
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 78%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 15%;

	select {
		height: 5vh;
		width: 100%;
		border: none;
		background-color: #80808030;
		margin-right: 5%;

		&:focus {
			outline: none;
		}
	}
`

export const UploadContainer = styled.div` 
	display: flex;
	height: 60%;
	width: 100%;
	justify-content: center;
	align-items: center;
`

export const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px dashed black;
	height: 100%;
	width: 25%;
	justify-content: center;
	align-items: center;
	margin-right: 20px;

	input {
		display: none;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80%;
	}

	img {
		height: 80%;
		width: 40%;
		cursor: pointer;
	}
`

export const SubmitButtonContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	justify-content: center;
	align-items: center;
	margin-top: 20px;

	button {
		width: 20%;
		height: 50%;
	}
`



