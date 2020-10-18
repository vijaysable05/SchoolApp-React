import styled from 'styled-components';



export const ViewGalleryContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 15%;
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 100%;
	border-bottom: 1px solid #80808030;

	select {
		height: 5vh;
		width: 15%;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

// export const AlbumContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	margin: 20px 5px;
// 	width: 20%;
// 	height: 30%;
// `

// export const ImageContainer = styled.div` 
// 	display: flex;
// 	width: 100%;
// 	height: 80%;
// 	align-items: center;
// 	justify-content: center;
// 	cursor: pointer;
// `

// export const AlbumInfoContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	width: 100%;
// 	height: 10%;
// 	justify-content: center;
// 	align-items: center;
// `