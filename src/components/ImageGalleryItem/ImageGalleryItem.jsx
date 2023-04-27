import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
  ModalImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  largeImageURL,
  webformatURL,
  tags,
}) {
  const [isModalVisible, setToggleModal] = useState(false);

  const toggleModal = () => {
    setToggleModal(prevState => !prevState);
  };

  return (
    <>
      <ImageGalleryItemStyled>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </ImageGalleryItemStyled>
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
