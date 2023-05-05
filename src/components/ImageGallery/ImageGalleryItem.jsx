import React from 'react';
import PropTypes from 'prop-types';
import { ImgGalleryItem, ImgGalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.largeImageURL, image.tags);
  };

  return (
    <ImgGalleryItem className="gallery-item" onClick={handleClick}>
      <ImgGalleryImage src={image.webformatURL} alt={image.tags} />
    </ImgGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func,
};
