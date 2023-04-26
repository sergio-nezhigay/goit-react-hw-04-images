import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
  ModalImage,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <ImageGalleryItemStyled>
          <ImageGalleryItemImage
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
          />
        </ImageGalleryItemStyled>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
