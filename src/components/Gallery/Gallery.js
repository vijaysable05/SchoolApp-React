import React from 'react';

import {GalleryContainer, TitleContainer, UpperContainer, BottomContainer} from './GalleryStyles.js';

import Button from '../Button/Button.js';

import ViewGallery from '../ViewGallery/ViewGallery.js';
import NewAlbum from '../NewAlbum/NewAlbum.js';
import AddPhotos from '../AddPhotos/AddPhotos.js';
import AddVideos from '../AddVideos/AddVideos.js';

class Gallery extends React.Component {
	constructor() {
		super()
		this.state = {
			viewGallery: true,
			newAlbum: false,
			addPhoto: false,
			addVideos: false
		}
	}

	changeViewGallery = () => {
		this.setState((prevState) => ({
			viewGallery: true,
			newAlbum: false,
			addPhoto: false
		}))
	}

	changeNewAlbum = () => {
		this.setState((prevState) => ({
			viewGallery: false,
			newAlbum: true,
			addPhoto: false
		}))
	}

	changeAddPhoto = () => {
		this.setState((prevState) => ({
			viewGallery: false,
			newAlbum: false,
			addPhoto: true
		}))
	}

	changeAddVideos = () => {
		this.setState((prevState) => ({
			viewGallery: false,
			newAlbum: false,
			addPhoto: false,
			addVideos: true
		}))
	}

	render() {
		return (
			<GalleryContainer>
				<TitleContainer>
					<span> Gallery </span>
				</TitleContainer>
				{
					this.props.admin ? 
					<UpperContainer>
						<Button type="button" name="View Gallery" handleClick={this.changeViewGallery} />
						<Button type="button" name="New Album" handleClick={this.changeNewAlbum} />
						<Button type="button" name="Add Photos" handleClick={this.changeAddPhoto} />
						<Button type="button" name="Add Videos" handleClick={this.changeAddVideos} />
					</UpperContainer>
					: null

				}
				<BottomContainer>
					{
						this.state.viewGallery ? <ViewGallery admin={this.props.admin}/> : 
						this.state.newAlbum ? <NewAlbum /> :
						this.state.addPhoto ? <AddPhotos /> :
						this.state.addVideos ? <AddVideos /> : null
					}
				</BottomContainer>
			</GalleryContainer>
			)
	}
}




export default Gallery;
