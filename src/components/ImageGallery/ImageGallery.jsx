import { useState, useEffect, useRef } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { fetchImagesWithQuery } from '../../service/serviceApi';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({ image: '', alt: '' });
  const [loadMore, setLoadMore] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    getSearchedImages();
  }, [query, page]);

  const getSearchedImages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchImagesWithQuery(query, page);
      setImages(prev => [...prev, ...data.hits]);
      if (page * 12 < data.totalHits) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (image, alt) => {
    setIsModalOpen(prev => !prev);
    setDataModal({ image, alt });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && loadMore) {
        changePage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  return (
    <>
      <ImgGallery className="gallery" ref={containerRef}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        ))}
      </ImgGallery>
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && <Modal image={dataModal} onClose={openModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

// import { useEffect, useState } from 'react';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import { ImgGallery } from './ImageGallery.styled';
// import { Button } from '../Button/Button';
// import { Modal } from '../Modal/Modal';
// import { fetchImagesWithQuery } from '../../service/serviceApi';
// import { Loader } from 'components/Loader/Loader';
// import PropTypes from 'prop-types';

// export const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [query, setQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [dataModal, setDataModal] = useState({ image: '', alt: '' });
//   const [loadMore, setLoadMore] = useState(false);

//   useEffect(() => {
//     const getSearchedImages = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchImagesWithQuery(query, page);
//         setImages(prev => [...prev, ...data.hits]);
//         if (page * 12 < data.totalHits) {
//           setLoadMore(true);
//         }
//         setLoadMore(false);
//       } catch (error) {
//         setError(error.messasge);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (query) {
//       setImages([]);
//       setPage(1);
//       getSearchedImages();
//     }
//   }, [query, page]);

//   const handleLoadMore = () => {
//     setPage(prev => prev + 1);
//   };

//   const handleOpenModal = (image, alt) => {
//     setIsModalOpen(prev => !prev);
//     setDataModal({ image, alt });
//   };

//   const handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       setIsModalOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <>
//       <ImgGallery className="gallery">
//         {images.map(image => (
//           <ImageGalleryItem
//             key={image.id}
//             image={image}
//             openModal={handleOpenModal}
//           />
//         ))}
//       </ImgGallery>
//       {isLoading && <Loader />}
//       {loadMore && <Button onClick={handleLoadMore} />}
//       {isModalOpen && <Modal image={dataModal} onClose={handleOpenModal} />}
//     </>
//   );
// };

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };

//   getSnapshotBeforeUpdate() {
//     return document.body.clientHeight + 72;
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       (prevProps.query !== this.props.query && this.props.query) ||
//       prevState.page !== this.state.page
//     ) {
//       this.getSearchedImages();
//     }
//     if (prevState.images !== this.state.images && this.state.page !== 1) {
//       window.scrollTo({
//         top: snapshot,
//         behavior: 'smooth',
//       });
//     }
//   }

//   changePage = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   openModal = (image, alt) => {
//     this.setState(({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//       dataModal: { image, alt },
//     }));
//   };

//     return (
//       <>
//         <ImgGallery className="gallery">
//           {this.state.images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               image={image}
//               openModal={this.openModal}
//             />
//           ))}
//         </ImgGallery>
//         {this.state.isLoading && <Loader />}
//         {this.state.loadMore && <Button onClick={this.changePage} />}
//         {this.state.isModalOpen && (
//           <Modal image={this.state.dataModal} onClose={this.openModal} />
//         )}
//       </>
//     );

// }

// import { useState, useEffect } from 'react';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import { ImgGallery } from './ImageGallery.styled';
// import { Button } from '../Button/Button';
// import { Modal } from '../Modal/Modal';
// import { fetchImagesWithQuery } from '../../service/serviceApi';
// import { Loader } from 'components/Loader/Loader';
// import PropTypes from 'prop-types';

// export const ImageGallery = ({ query }) => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [dataModal, setDataModal] = useState({ image: '', alt: '' });
//   const [loadMore, setLoadMore] = useState(false);

//   useEffect(() => {
//     const getSearchedImages = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchImagesWithQuery(query, page);
//         setImages(prev => [...prev, ...data.hits]);
//         if (page * 12 < data.totalHits) {
//           setLoadMore(true);
//         } else {
//           setLoadMore(false);
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (query) {
//       setImages([]);
//       setPage(1);
//       getSearchedImages();
//     }
//   }, [query, page]);

//   const handleLoadMore = () => {
//     setPage(prev => prev + 1);
//   };

//   const handleOpenModal = (image, alt) => {
//     setIsModalOpen(prev => !prev);
//     setDataModal({ image, alt });
//   };

//   const handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       setIsModalOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <>
//       <ImgGallery className="gallery">
//         {images.map(image => (
//           <ImageGalleryItem
//             key={image.id}
//             image={image}
//             openModal={handleOpenModal}
//           />
//         ))}
//       </ImgGallery>
//       {isLoading && <Loader />}
//       {loadMore && <Button onClick={handleLoadMore} />}
//       {isModalOpen && <Modal image={dataModal} onClose={handleOpenModal} />}
//     </>
//   );
// };

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };

// ======================================================

// import { Component } from 'react';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import { ImgGallery } from './ImageGallery.styled';
// import { Button } from '../Button/Button';
// import { Modal } from '../Modal/Modal';
// import { fetchImagesWithQuery } from '../../service/serviceApi';
// import { Loader } from 'components/Loader/Loader';
// import PropTypes from 'prop-types';

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: null,
//     query: '',
//     page: 1,
//     isModalOpen: false,
//     dataModal: { image: '', alt: '' },
//     loadMore: false,
//   };

//   static getDerivedStateFromProps(props, state) {
//     const { query } = props;
//     if (query !== state.query) {
//       return { page: 1, query, images: [] };
//     }
//     return null;
//   }

//   getSnapshotBeforeUpdate() {
//     return document.body.clientHeight + 72;
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       (prevProps.query !== this.props.query && this.props.query) ||
//       prevState.page !== this.state.page
//     ) {
//       this.getSearchedImages();
//     }
//     if (prevState.images !== this.state.images && this.state.page !== 1) {
//       window.scrollTo({
//         top: snapshot,
//         behavior: 'smooth',
//       });
//     }
//   }

//   getSearchedImages = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const data = await fetchImagesWithQuery(
//         this.props.query,
//         this.state.page
//       );
//       this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
//       if (this.state.page * 12 < data.totalHits) {
//         this.setState(() => ({ loadMore: true }));
//       } else this.setState(() => ({ loadMore: false }));
//     } catch (error) {
//       this.setState({ error: error.messasge });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   changePage = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   openModal = (image, alt) => {
//     this.setState(({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//       dataModal: { image, alt },
//     }));
//   };

//   render() {
//     return (
//       <>
//         <ImgGallery className="gallery">
//           {this.state.images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               image={image}
//               openModal={this.openModal}
//             />
//           ))}
//         </ImgGallery>
//         {this.state.isLoading && <Loader />}
//         {this.state.loadMore && <Button onClick={this.changePage} />}
//         {this.state.isModalOpen && (
//           <Modal image={this.state.dataModal} onClose={this.openModal} />
//         )}
//       </>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };
