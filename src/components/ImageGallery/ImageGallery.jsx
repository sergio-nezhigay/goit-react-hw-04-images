import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImagesList } from './ImageGallery.styled';

export function ImageGallery({ images }) {
  return (
    <ImagesList>
      {images.map(({ id, ...restParams }) => (
        <ImageGalleryItem key={id} {...restParams} />
      ))}
    </ImagesList>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
