import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <AppStyle className={App}>
      <Searchbar setQuery={setQuery} />

      <ImageGallery propQuery={query} />
    </AppStyle>
  );
};
