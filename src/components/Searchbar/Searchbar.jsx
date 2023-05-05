import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  ButtonSerchForm,
  ButtonLabel,
  SearchFormInput,
} from './searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ setQuery }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(input);
    setInput('');
  };

  return (
    <SearchbarHeader className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <ButtonSerchForm type="submit" className="button">
          <ButtonLabel className="button-label">
            <span>Search</span>
          </ButtonLabel>
        </ButtonSerchForm>
        <SearchFormInput
          className="input"
          type="text"
          value={input}
          placeholder="Search images"
          onChange={e => setInput(e.target.value)}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
