import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { fetchImagesWithQuery } from '../../service/serviceApi';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGallery = ({ propQuery }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({ image: '', alt: '' });
  const [loadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (propQuery !== query) {
      setPage(1);
      setQuery(propQuery);
    }
  }, [propQuery, query]);

  useEffect(() => {
    query === ''
      ? setImages([])
      : fetchImagesWithQuery(query, page)
          .then(res => {
            setImages(prevImages =>
              page === 1 ? res.hits : [...prevImages, ...res.hits]
            );
            if (page * 12 < res.totalHits) {
              setLoadMore(true);
            } else {
              setLoadMore(false);
            }
          })
          .catch(error => setError(error.message))
          .finally(setIsLoading(false));
  }, [query, page]);

  const changePage = () => {
    setIsLoading(true);
    setPage(prev => prev + 1);
  };

  const openModal = (image, alt) => {
    setIsModalOpen(prev => !prev);
    setDataModal({ image, alt });
  };

  return (
    <>
      <ImgGallery className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        ))}
      </ImgGallery>
      {error && alert(`...oops`)}
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && <Modal image={dataModal} onClose={openModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  propQuery: PropTypes.string.isRequired,
};
