import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  ButtonSerchForm,
  ButtonLabel,
  SearchFormInput,
} from './searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuery(this.state.input);
  };

  render() {
    return (
      <SearchbarHeader className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <ButtonSerchForm type="submit" className="button">
            <ButtonLabel className="button-label">
              <span>Search</span>
            </ButtonLabel>
          </ButtonSerchForm>
          <SearchFormInput
            className="input"
            type="text"
            value={this.state.input}
            placeholder="Search images"
            onChange={e => this.setState({ input: e.target.value })}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
