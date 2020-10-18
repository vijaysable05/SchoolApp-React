import styled from 'styled-components';



export const ShowTutorialsContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`

export const AlbumContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 20px 5px;
	width: 20%;
	height: 40%;
`

export const ImageContainer = styled.div` 
	display: flex;
	width: 100%;
	height: 60%;
	align-items: center;
	justify-content: center;

	img {
		cursor: pointer;
	}
`

export const AlbumInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 40%;
	justify-content: center;
	align-items: center;

	img {
		height: 40%;
		width: 12%;
		margin-top: 2%;
		cursor: pointer;
	}
`


export const SpanContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`