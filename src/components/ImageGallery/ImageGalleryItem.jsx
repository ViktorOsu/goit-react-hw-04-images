import { Component } from 'react';
import { ImgGalleryItem, ImgGalleryImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    const { image, openModal } = this.props;

    return (
      <ImgGalleryItem
        className="gallery-item"
        onClick={e => openModal(image.largeImageURL, image.tags)}
      >
        <ImgGalleryImage src={image.webformatURL} alt={image.tags} />
      </ImgGalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  OpenModal: PropTypes.func,
};

export default ImageGalleryItem;
